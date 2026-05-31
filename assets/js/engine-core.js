(function () {
  "use strict";

  const Engine = {
    gl: null,
    program: null,
    vao: null,
    uniforms: {},

    // Object Pooling for math objects --thorns
    pool: {
      vec3: [],
      mat4: [],
      getVec3: function() { 
        const v = this.vec3.pop() || window.vec3?.create() || new Float32Array(3); 
        window.vec3?.set(v, 0, 0, 0);
        return v;
      },
      getMat4: function() { 
        const m = this.mat4.pop() || window.mat4?.create() || new Float32Array(16); 
        window.mat4?.identity(m);
        return m;
      },
      recycle: function(obj) {
        if (obj.length === 3) this.vec3.push(obj);
        else if (obj.length === 16) this.mat4.push(obj);
      }
    },
    
    // Post-processing
    fbo: null,
    renderTexture: null,
    entityMaskTexture: null, 
    postProgram: null,
    quadVAO: null,
    postUniforms: {},

    // PBR Shaders
    vsSource: `#version 300 es
      in vec4 a_position;
      in vec2 a_texcoord;
      in vec3 a_normal;
      in vec3 a_tangent;
      uniform mat4 u_matrix;
      uniform mat4 u_model;
      out vec2 v_texcoord;
      out vec3 v_normal;
      out vec3 v_tangent;
      out vec3 v_worldPos;
      void main() {
        gl_Position = u_matrix * a_position;
        v_texcoord = a_texcoord;
        v_worldPos = (u_model * a_position).xyz;
        v_normal = mat3(u_model) * a_normal;
        v_tangent = mat3(u_model) * a_tangent;
      }`,

    fsSource: function(tier = 1) {
      const precision = window.Microsite.perf?.getSettings().precision || 'highp';
      return `#version 300 es
      precision ${precision} float;
      #define TIER ${tier}
      in vec2 v_texcoord;
      in vec3 v_normal;
      in vec3 v_tangent;
      in vec3 v_worldPos;
      
      uniform sampler2D u_diffuseMap;
      uniform sampler2D u_normalMap;
      uniform sampler2D u_roughnessMap;
      
      uniform float u_time;
      uniform float u_wiggleSpeed;
      uniform float u_wiggleFreq;
      uniform float u_wiggleAmp;
      uniform float u_isEntity; 
      uniform float u_isSky;

      uniform vec3 u_viewPos;
      uniform float u_fogNear;
      uniform float u_fogFar;
      uniform vec4 u_fogColor;

      layout(location = 0) out vec4 outColor;
      layout(location = 1) out vec4 outMask;

      vec2 wiggle(vec2 pt) {
        #if TIER < 3
          float offsetY = sin(pt.x * u_wiggleFreq + u_time * u_wiggleSpeed) * u_wiggleAmp;
          float offsetX = sin(pt.y * u_wiggleFreq + u_time * u_wiggleSpeed) * u_wiggleAmp;
          return vec2(pt.x + offsetX, pt.y + offsetY);
        #else
          return pt;
        #endif
      }

      void main() {
        if (u_isSky > 0.5) {
          #if TIER == 3
            outColor = vec4(u_fogColor.rgb, 1.0);
            outMask = vec4(0.0, 0.0, 0.0, 1.0);
            return;
          #endif
        }

        vec2 uv;
        if (u_isSky > 0.5) {
          vec3 viewDir = normalize(v_worldPos - u_viewPos);
          float theta = atan(viewDir.z, viewDir.x);
          uv = vec2(theta / 6.28318530718 + 0.5, v_texcoord.y); 
          uv.y = viewDir.y * 0.5 + 0.5;
        } else {
          uv = wiggle(v_texcoord);
        }

        vec3 normal = normalize(v_normal);
        vec3 worldNormal = normal;
        float roughness = 0.5;
        float spec = 0.0;

        #if TIER < 2
          vec3 tangent = normalize(v_tangent);
          vec3 bitangent = normalize(cross(normal, tangent));
          mat3 TBN = mat3(tangent, bitangent, normal);
          vec3 mapNormal = texture(u_normalMap, uv).rgb * 2.0 - 1.0;
          worldNormal = normalize(TBN * mapNormal);
        #endif

        vec3 lightPos = u_viewPos;
        vec3 lightDir = normalize(lightPos - v_worldPos);
        float diff = max(dot(worldNormal, lightDir), 0.1);

        if (u_isSky > 0.5) {
          diff = 1.0; // Sky is self-illuminated
          spec = 0.0;
        } else {
          #if TIER < 3
            vec3 viewDir = normalize(u_viewPos - v_worldPos);
            vec3 reflectDir = reflect(-lightDir, worldNormal);
            #if TIER < 2
              roughness = texture(u_roughnessMap, uv).r;
            #endif
            spec = pow(max(dot(viewDir, reflectDir), 0.0), mix(64.0, 2.0, roughness)) * (1.0 - roughness);
          #endif
        }

        vec4 texColor = texture(u_diffuseMap, uv);
        vec3 finalColor = texColor.rgb * diff + spec;

        float dist = distance(u_viewPos, v_worldPos);
        float fogFactor = smoothstep(u_fogNear, u_fogFar, dist);
        if (u_isSky > 0.5) fogFactor = 0.0; // No fog on sky

        outColor = vec4(mix(finalColor, u_fogColor.rgb, fogFactor), 1.0);
        outMask = vec4(u_isEntity, 0.0, 0.0, 1.0);
      }
`;
    },

    // Post-processing Shaders (Gendither ONLY)
    postVS: `#version 300 es
      in vec4 a_position;
      in vec2 a_texcoord;
      out vec2 v_texcoord;
      void main() {
        gl_Position = a_position;
        v_texcoord = a_texcoord;
      }`,

    postFS: function(tier = 1) {
      const precision = window.Microsite.perf?.getSettings().precision || 'highp';
      return `#version 300 es
      precision ${precision} float;
      #define TIER ${tier}
      in vec2 v_texcoord;
      uniform sampler2D u_scene;
      uniform sampler2D u_mask;
      uniform vec2 u_resolution;
      out vec4 outColor;

      const int ditherTable[16] = int[](0,1,0,1,16,15,16,15,0,1,0,1,16,15,16,15);

      void main() {
        vec4 base = texture(u_scene, v_texcoord);
        float isEntity = texture(u_mask, v_texcoord).r;
        vec3 final = base.rgb;

        if (isEntity < 0.5) {
          #if TIER < 3
            // Gendither
            vec2 screenPos = v_texcoord * u_resolution;
            int ditherIndex = int(mod(screenPos.x, 4.0)) * 4 + int(mod(screenPos.y, 4.0));
            int ditherValue = ditherTable[ditherIndex];
            final += vec3(float(ditherValue)) * 0.0039215686;
            final = floor(final * 4.4) / 4.4;
          #endif
        }

        outColor = vec4(final, 1.0);
      }`;
    },

    applyQuality: function() {
      const gl = this.gl;
      if (!gl) return;
      const tier = window.Microsite.perf?.TIER || 1;
      const settings = window.Microsite.perf?.getSettings() || { precision: 'highp', postProcessing: true, res: { w: 800, h: 600 } };
      
      // Recompile shaders
      const newProgram = this.createProgram(this.vsSource, typeof this.fsSource === "function" ? this.fsSource(tier) : this.fsSource);
      if (newProgram) {
        if (this.program) gl.deleteProgram(this.program);
        this.program = newProgram;
        this.uniforms = {
          matrix: gl.getUniformLocation(this.program, "u_matrix"),
          model: gl.getUniformLocation(this.program, "u_model"),
          diffuseMap: gl.getUniformLocation(this.program, "u_diffuseMap"),
          normalMap: gl.getUniformLocation(this.program, "u_normalMap"),
          roughnessMap: gl.getUniformLocation(this.program, "u_roughnessMap"),
          time: gl.getUniformLocation(this.program, "u_time"),
          wiggleSpeed: gl.getUniformLocation(this.program, "u_wiggleSpeed"),
          wiggleFreq: gl.getUniformLocation(this.program, "u_wiggleFreq"),
          wiggleAmp: gl.getUniformLocation(this.program, "u_wiggleAmp"),
          isEntity: gl.getUniformLocation(this.program, "u_isEntity"),
          isSky: gl.getUniformLocation(this.program, "u_isSky"),
          viewPos: gl.getUniformLocation(this.program, "u_viewPos"),
          fogNear: gl.getUniformLocation(this.program, "u_fogNear"),
          fogFar: gl.getUniformLocation(this.program, "u_fogFar"),
          fogColor: gl.getUniformLocation(this.program, "u_fogColor"),
        };
      }

      const newPostProgram = this.createProgram(this.postVS, typeof this.postFS === "function" ? this.postFS(tier) : this.postFS);
      if (newPostProgram) {
        if (this.postProgram) gl.deleteProgram(this.postProgram);
        this.postProgram = newPostProgram;
        this.postUniforms = {
          scene: gl.getUniformLocation(this.postProgram, "u_scene"),
          mask: gl.getUniformLocation(this.postProgram, "u_mask"),
          resolution: gl.getUniformLocation(this.postProgram, "u_resolution"),
        };
      }

      // Resolution scaling check
      if (!this.currentRes || this.currentRes.w !== settings.res.w || this.currentRes.h !== settings.res.h) {
        this.setupFramebuffer(settings.res.w, settings.res.h);
      }
    },

    init: function (canvas) {
      const gl = canvas.getContext("webgl2", { antialias: true });
      if (!gl) return null;
      this.gl = gl;
      if (window.glMatrix) Object.assign(window, window.glMatrix);
      
      this.applyQuality();
      this.setupQuad();
      
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.CULL_FACE);
      return gl;
    },

    setupFramebuffer: function(w, h) {
      const gl = this.gl;
      if (this.fbo) gl.deleteFramebuffer(this.fbo);
      this.fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
      
      this.renderTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.renderTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.renderTexture, 0);
      
      this.entityMaskTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.entityMaskTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, this.entityMaskTexture, 0);
      
      gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1]);
      
      const depthBuffer = gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
      
      this.currentRes = { w, h };
    },

    setupQuad: function() {
      const gl = this.gl;
      this.quadVAO = gl.createVertexArray();
      gl.bindVertexArray(this.quadVAO);
      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      const uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0, 1,0, 0,1, 0,1, 1,0, 1,1]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
    },

    startFrame: function() {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
      this.gl.viewport(0, 0, this.currentRes.w, this.currentRes.h);
      this.gl.useProgram(this.program);
    },

    endFrame: function(w, h, xOffset, yOffset, screenW, screenH) {
      const gl = this.gl;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(xOffset, yOffset, screenW, screenH);
      gl.useProgram(this.postProgram);
      gl.bindVertexArray(this.quadVAO);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.renderTexture);
      gl.uniform1i(this.postUniforms.scene, 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.entityMaskTexture);
      gl.uniform1i(this.postUniforms.mask, 1);
      gl.uniform2f(this.postUniforms.resolution, this.currentRes.w, this.currentRes.h);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },

    createShader: function (type, source) {
      const shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        console.error(this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
        return null;
      }
      return shader;
    },

    createProgram: function (vsSource, fsSource) {
      const vs = this.createShader(this.gl.VERTEX_SHADER, vsSource);
      const fs = this.createShader(this.gl.FRAGMENT_SHADER, fsSource);
      const program = this.gl.createProgram();
      this.gl.attachShader(program, vs);
      this.gl.attachShader(program, fs);
      this.gl.linkProgram(program);
      return program;
    },

    createCube: function () {
      const gl = this.gl;
      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      const positions = new Float32Array([-0.5,-0.5, 0.5, 0.5,-0.5, 0.5, 0.5, 0.5, 0.5,-0.5, 0.5, 0.5, -0.5,-0.5,-0.5,-0.5, 0.5,-0.5, 0.5, 0.5,-0.5, 0.5,-0.5,-0.5, -0.5, 0.5,-0.5,-0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,-0.5, -0.5,-0.5,-0.5, 0.5,-0.5,-0.5, 0.5,-0.5, 0.5,-0.5,-0.5, 0.5, 0.5,-0.5,-0.5, 0.5, 0.5,-0.5, 0.5, 0.5, 0.5, 0.5,-0.5, 0.5, -0.5,-0.5,-0.5,-0.5,-0.5, 0.5,-0.5, 0.5, 0.5,-0.5, 0.5,-0.5]);
      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
      const normals = new Float32Array([0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, -1,0,0, -1,0,0, -1,0,0, -1,0,0]);
      const normBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);
      const tangents = new Float32Array([1,0,0, 1,0,0, 1,0,0, 1,0,0, -1,0,0, -1,0,0, -1,0,0, -1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1]);
      const tangBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, tangBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, tangents, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(3); gl.vertexAttribPointer(3, 3, gl.FLOAT, false, 0, 0);
      const uvs = new Float32Array([0,0, 1,0, 1,1, 0,1, 0,0, 0,1, 1,1, 1,0, 0,0, 0,1, 1,1, 1,0, 0,0, 1,0, 1,1, 0,1, 0,0, 0,1, 1,1, 1,0, 0,0, 0,1, 1,1, 1,0]);
      const uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
      const indices = new Uint16Array([0,1,2, 0,2,3, 4,5,6, 4,6,7, 8,9,10, 8,10,11, 12,13,14, 12,14,15, 16,17,18, 16,18,19, 20,21,22, 20,22,23]);
      const idxBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
      return { vao, count: indices.length };
    },

    loadTexture: async function(url) {
      const gl = this.gl;
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([50, 0, 0, 255]));
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          gl.generateMipmap(gl.TEXTURE_2D);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          resolve(tex);
        };
        img.onerror = () => {
          console.error("Failed to load texture:", url);
          reject(new Error("Failed to load texture: " + url));
        };
        img.src = url;
      });
    },

    createTextureFromImage: function(img) {
      const gl = this.gl;
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return tex;
    }
  };

  window.Microsite = window.Microsite || {};
  window.Microsite.engine = Engine;
})();
