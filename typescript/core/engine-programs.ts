import type { Gl } from '../types.js';

export function createShader(gl: Gl, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createProgram(gl: Gl, vsSource: string, fsSource: string): WebGLProgram | null {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  return program;
}

export function createUniformTable(
  gl: Gl,
  program: WebGLProgram,
): Record<string, WebGLUniformLocation | null> {
  return {
    matrix: gl.getUniformLocation(program, 'u_matrix'),
    model: gl.getUniformLocation(program, 'u_model'),
    diffuseMap: gl.getUniformLocation(program, 'u_diffuseMap'),
    normalMap: gl.getUniformLocation(program, 'u_normalMap'),
    roughnessMap: gl.getUniformLocation(program, 'u_roughnessMap'),
    time: gl.getUniformLocation(program, 'u_time'),
    wiggleSpeed: gl.getUniformLocation(program, 'u_wiggleSpeed'),
    wiggleFreq: gl.getUniformLocation(program, 'u_wiggleFreq'),
    wiggleAmp: gl.getUniformLocation(program, 'u_wiggleAmp'),
    isEntity: gl.getUniformLocation(program, 'u_isEntity'),
    isSky: gl.getUniformLocation(program, 'u_isSky'),
    viewPos: gl.getUniformLocation(program, 'u_viewPos'),
    fogNear: gl.getUniformLocation(program, 'u_fogNear'),
    fogFar: gl.getUniformLocation(program, 'u_fogFar'),
    fogColor: gl.getUniformLocation(program, 'u_fogColor'),
  };
}

export function createPostUniformTable(
  gl: Gl,
  program: WebGLProgram,
): Record<string, WebGLUniformLocation | null> {
  return {
    scene: gl.getUniformLocation(program, 'u_scene'),
    mask: gl.getUniformLocation(program, 'u_mask'),
    resolution: gl.getUniformLocation(program, 'u_resolution'),
  };
}
