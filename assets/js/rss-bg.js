(function () {
  "use strict";

  const canvas = document.createElement("canvas");
  canvas.id = "checker-bg";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1";
  document.body.insertBefore(canvas, document.body.firstChild);

  const gl = canvas.getContext("webgl");
  if (!gl) return;

  const vs = `
        attribute vec2 position;
        void main() {
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

  const fs = `
        precision mediump float;
        uniform float uTime;
        uniform vec2 uResolution;
        void main() {
            vec2 uv = gl_FragCoord.xy / uResolution.xy;
            uv.x *= uResolution.x / uResolution.y;
            uv.x += uTime * 0.05;
            uv.y += uTime * 0.05;
            vec2 pos = floor(uv * 12.0);
            float pattern = mod(pos.x + pos.y, 2.0);
            gl_FragColor = vec4(mix(vec3(0.08), vec3(0.12), pattern), 1.0);
        }
    `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  const program = gl.createProgram();
  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const posLoc = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const timeLoc = gl.getUniformLocation(program, "uTime");
  const resLoc = gl.getUniformLocation(program, "uResolution");

  function render(time) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(timeLoc, time * 0.001);
    gl.uniform2f(resLoc, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();
