import * as Shaders from './shaders.js';
import { perf } from './performance-manager.js';
import { createCube } from './engine-geometry.js';
import { loadTexture, createTextureFromImage } from './engine-textures.js';
import { createShader, createProgram, createUniformTable, createPostUniformTable } from './engine-programs.js';
import { createFramebuffer, setupQuad } from './engine-framebuffer.js';
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
    Shaders.buildFragmentSource(tier, perf.getSettings().precision);

  postVS = Shaders.postVertexSource;

  postFS = (tier = 1): string =>
    Shaders.buildPostFragmentSource(tier, perf.getSettings().precision);

  applyQuality(): void {
    const gl = this.gl;
    if (!gl) return;
    const tier = perf.TIER;
    const settings = perf.getSettings();

    const newProgram = this.createProgram(this.vsSource, this.fsSource(tier));
    if (newProgram) {
      if (this.program) gl.deleteProgram(this.program);
      this.program = newProgram;
      this.uniforms = createUniformTable(gl, this.program);
    }

    const newPostProgram = this.createProgram(this.postVS, this.postFS(tier));
    if (newPostProgram) {
      if (this.postProgram) gl.deleteProgram(this.postProgram);
      this.postProgram = newPostProgram;
      this.postUniforms = createPostUniformTable(gl, this.postProgram);
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
    const targets = createFramebuffer(gl, w, h);
    this.fbo = targets.fbo;
    this.renderTexture = targets.renderTexture;
    this.entityMaskTexture = targets.entityMaskTexture;
    this.currentRes = { w, h };
  }

  setupQuad(): void {
    this.quadVAO = setupQuad(this.gl);
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
    return createShader(this.gl, type, source);
  }

  createProgram(vsSource: string, fsSource: string): WebGLProgram | null {
    return createProgram(this.gl, vsSource, fsSource);
  }

  createCube(): { vao: WebGLVertexArrayObject; count: number } {
    return createCube(this.gl);
  }

  loadTexture(url: string): Promise<WebGLTexture> {
    return loadTexture(this.gl, url);
  }

  createTextureFromImage(img: HTMLImageElement, nearest = false): WebGLTexture {
    return createTextureFromImage(this.gl, img, nearest);
  }
}

export const engine = new Engine();
