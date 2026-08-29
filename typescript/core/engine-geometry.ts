import type { Gl } from '../types.js';

export const CUBE_POSITIONS: Float32Array = new Float32Array([
  -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5,
  0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5,
  -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5,
  -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
  -0.5,
]);

export const CUBE_NORMALS: Float32Array = new Float32Array([
  0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0,
  1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0,
  0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
]);

export const CUBE_TANGENTS: Float32Array = new Float32Array([
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1,
  0, 0, -1, 0, 0, -1, 0, 0, -1,
]);

export const CUBE_UVS: Float32Array = new Float32Array([
  0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0,
  0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0,
]);

export const CUBE_INDICES: Uint16Array = new Uint16Array([
  0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16,
  18, 19, 20, 21, 22, 20, 22, 23,
]);

export function createMergedCubes(
  gl: Gl,
  offsets: Array<{ x: number; y: number; z: number }>,
): { vao: WebGLVertexArrayObject; count: number } {
  const perVerts = CUBE_POSITIONS.length / 3;
  const vertCount = perVerts * offsets.length;
  const positions = new Float32Array(vertCount * 3);
  const normals = new Float32Array(vertCount * 3);
  const tangents = new Float32Array(vertCount * 3);
  const uvs = new Float32Array(vertCount * 2);
  const indices = new Uint16Array(offsets.length * CUBE_INDICES.length);

  for (let i = 0; i < offsets.length; i++) {
    const ox = offsets[i].x;
    const oy = offsets[i].y;
    const oz = offsets[i].z;
    const vBase = i * perVerts;
    for (let v = 0; v < perVerts; v++) {
      const o3 = (vBase + v) * 3;
      positions[o3 + 0] = CUBE_POSITIONS[v * 3 + 0] + ox;
      positions[o3 + 1] = CUBE_POSITIONS[v * 3 + 1] + oy;
      positions[o3 + 2] = CUBE_POSITIONS[v * 3 + 2] + oz;
      normals[o3 + 0] = CUBE_NORMALS[v * 3 + 0];
      normals[o3 + 1] = CUBE_NORMALS[v * 3 + 1];
      normals[o3 + 2] = CUBE_NORMALS[v * 3 + 2];
      tangents[o3 + 0] = CUBE_TANGENTS[v * 3 + 0];
      tangents[o3 + 1] = CUBE_TANGENTS[v * 3 + 1];
      tangents[o3 + 2] = CUBE_TANGENTS[v * 3 + 2];
      const o2 = (vBase + v) * 2;
      uvs[o2 + 0] = CUBE_UVS[v * 2 + 0];
      uvs[o2 + 1] = CUBE_UVS[v * 2 + 1];
    }
    const iBase = i * CUBE_INDICES.length;
    const idxBase = vBase;
    for (let j = 0; j < CUBE_INDICES.length; j++) {
      indices[iBase + j] = CUBE_INDICES[j] + idxBase;
    }
  }

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

  const normBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(2);
  gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);

  const tangBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tangBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, tangents, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(3);
  gl.vertexAttribPointer(3, 3, gl.FLOAT, false, 0, 0);

  const uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

  const idxBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return { vao, count: indices.length };
}

export function createCube(gl: Gl): { vao: WebGLVertexArrayObject; count: number } {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, CUBE_POSITIONS, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

  const normBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, CUBE_NORMALS, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(2);
  gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);

  const tangBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tangBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, CUBE_TANGENTS, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(3);
  gl.vertexAttribPointer(3, 3, gl.FLOAT, false, 0, 0);

  const uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, CUBE_UVS, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

  const idxBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, CUBE_INDICES, gl.STATIC_DRAW);

  return { vao, count: CUBE_INDICES.length };
}
