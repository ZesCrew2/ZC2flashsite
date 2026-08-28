import { Microsite } from '../microsite.js';
import * as Shaders from './shaders.js';
import type { EngineInstance, Gl } from '../types.js';

export class Engine implements EngineInstance {
  gl: Gl | null = null;
  program: WebGLProgram | null = null;
  vao: WebGLVertexArrayObject | null = null;
  uniforms: Record<string, WebGLUniformLocation | null> = {};

  pool = {
    vec3: [] as Float32Array[],
    mat4: [] as Float32Array[],
    getVec3(): Float32Array {
      const v = this.vec3.pop() || vec3?.create() || new Float32Array(3);
      vec3?.set(v, 0, 0, 0);
      return v;
    },
    getMat4(): Float32Array {
      const m = this.mat4.pop() || mat4?.create() || new Float32Array(16);
      mat4?.identity(m);
      return m;
    },
    recycle(obj: Float32Array): void {
      if (obj.length === 3) this.vec3.push(obj);
      else if (obj.length === 16) this.mat4.push(obj);
    },
  };

  fbo: WebGLFramebuffer | null = null;
  renderTexture: WebGLTexture | null = null;
  entityMaskTexture: WebGLTexture | null = null;
  postProgram: WebGLProgram | null = null;
  quadVAO: WebGLVertexArrayObject | null = null;
  postUniforms: Record<string, WebGLUniformLocation | null> = {};
  currentRes = { w: 0, h: 0 };

  vsSource = Shaders.vsSource;

  fsSource = (tier = 1): string =>
    Shaders.buildFragmentSource(tier, Microsite.perf?.getSettings().precision || 'highp');

  postVS = Shaders.postVertexSource;

  postFS = (tier = 1): string =>
    Shaders.buildPostFragmentSource(tier, Microsite.perf?.getSettings().precision || 'highp');

  applyQuality(): void {
    const gl = this.gl;
    if (!gl) return;
    const tier = Microsite.perf?.TIER || 1;
    const settings = Microsite.perf?.getSettings() || {
      precision: 'highp',
      postProcessing: true,
      res: { w: 800, h: 600 },
    };

    const newProgram = this.createProgram(this.vsSource, this.fsSource(tier));
    if (newProgram) {
      if (this.program) gl.deleteProgram(this.program);
      this.program = newProgram;
      this.uniforms = {
        matrix: gl.getUniformLocation(this.program, 'u_matrix'),
        model: gl.getUniformLocation(this.program, 'u_model'),
        diffuseMap: gl.getUniformLocation(this.program, 'u_diffuseMap'),
        normalMap: gl.getUniformLocation(this.program, 'u_normalMap'),
        roughnessMap: gl.getUniformLocation(this.program, 'u_roughnessMap'),
        time: gl.getUniformLocation(this.program, 'u_time'),
        wiggleSpeed: gl.getUniformLocation(this.program, 'u_wiggleSpeed'),
        wiggleFreq: gl.getUniformLocation(this.program, 'u_wiggleFreq'),
        wiggleAmp: gl.getUniformLocation(this.program, 'u_wiggleAmp'),
        isEntity: gl.getUniformLocation(this.program, 'u_isEntity'),
        isSky: gl.getUniformLocation(this.program, 'u_isSky'),
        viewPos: gl.getUniformLocation(this.program, 'u_viewPos'),
        fogNear: gl.getUniformLocation(this.program, 'u_fogNear'),
        fogFar: gl.getUniformLocation(this.program, 'u_fogFar'),
        fogColor: gl.getUniformLocation(this.program, 'u_fogColor'),
      };
    }

    const newPostProgram = this.createProgram(this.postVS, this.postFS(tier));
    if (newPostProgram) {
      if (this.postProgram) gl.deleteProgram(this.postProgram);
      this.postProgram = newPostProgram;
      this.postUniforms = {
        scene: gl.getUniformLocation(this.postProgram, 'u_scene'),
        mask: gl.getUniformLocation(this.postProgram, 'u_mask'),
        resolution: gl.getUniformLocation(this.postProgram, 'u_resolution'),
      };
    }

    if (
      !this.currentRes ||
      this.currentRes.w !== settings.res.w ||
      this.currentRes.h !== settings.res.h
    ) {
      this.setupFramebuffer(settings.res.w, settings.res.h);
    }
  }

  init(canvas: HTMLCanvasElement): Gl | null {
    const gl = canvas.getContext('webgl2', { antialias: true });
    if (!gl) return null;
    this.gl = gl;
    if (window.glMatrix) Object.assign(window, window.glMatrix);

    this.applyQuality();
    this.setupQuad();

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    return gl;
  }

  setupFramebuffer(w: number, h: number): void {
    const gl = this.gl;
    if (this.fbo) gl.deleteFramebuffer(this.fbo);
    this.fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);

    this.renderTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.renderTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      this.renderTexture,
      0,
    );

    this.entityMaskTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.entityMaskTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT1,
      gl.TEXTURE_2D,
      this.entityMaskTexture,
      0,
    );

    gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1]);

    const depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

    this.currentRes = { w, h };
  }

  setupQuad(): void {
    const gl = this.gl;
    this.quadVAO = gl.createVertexArray();
    gl.bindVertexArray(this.quadVAO);
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
  }

  startFrame(): void {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
    this.gl.viewport(0, 0, this.currentRes.w, this.currentRes.h);
    this.gl.useProgram(this.program);
  }

  endFrame(
    w: number,
    h: number,
    xOffset: number,
    yOffset: number,
    screenW: number,
    screenH: number,
  ): void {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(xOffset, yOffset, screenW, screenH);
    gl.useProgram(this.postProgram);
    gl.bindVertexArray(this.quadVAO);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.renderTexture);
    gl.uniform1i(this.postUniforms.scene, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.entityMaskTexture);
    gl.uniform1i(this.postUniforms.mask, 1);
    gl.uniform2f(this.postUniforms.resolution, this.currentRes.w, this.currentRes.h);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  createShader(type: number, source: string): WebGLShader | null {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  createProgram(vsSource: string, fsSource: string): WebGLProgram | null {
    const vs = this.createShader(this.gl.VERTEX_SHADER, vsSource);
    const fs = this.createShader(this.gl.FRAGMENT_SHADER, fsSource);
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vs);
    this.gl.attachShader(program, fs);
    this.gl.linkProgram(program);
    return program;
  }

  createCube(): { vao: WebGLVertexArrayObject; count: number } {
    const gl = this.gl;
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const positions = new Float32Array([
      -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5,
      -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
      0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5,
      -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5,
      0.5, 0.5, -0.5, 0.5, -0.5,
    ]);
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    const normals = new Float32Array([
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0,
      0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
      -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    ]);
    const normBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);
    const tangents = new Float32Array([
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0,
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
      0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    ]);
    const tangBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tangBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, tangents, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(3);
    gl.vertexAttribPointer(3, 3, gl.FLOAT, false, 0, 0);
    const uvs = new Float32Array([
      0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0,
      1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0,
    ]);
    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
    const indices = new Uint16Array([
      0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18,
      16, 18, 19, 20, 21, 22, 20, 22, 23,
    ]);
    const idxBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return { vao, count: indices.length };
  }

  loadTexture(url: string): Promise<WebGLTexture> {
    const gl = this.gl;
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([50, 0, 0, 255]),
    );
    return new Promise<WebGLTexture>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        resolve(tex);
      };
      img.onerror = () => {
        console.error('Failed to load texture:', url);
        reject(new Error('Failed to load texture: ' + url));
      };
      img.src = url;
    });
  }

  createTextureFromImage(img: HTMLImageElement, nearest = false): WebGLTexture {
    const gl = this.gl;
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    if (nearest) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }
    return tex;
  }
}

Microsite.engine = new Engine();
