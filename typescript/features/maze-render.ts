import { perf } from '../core/performance-manager.js';
import {
  WORLD_SIZE,
  TILE_CENTER,
  WALL_HEIGHT,
  FLOOR_Y,
  FLOOR_THICKNESS,
  CEIL_Y,
  BUTTON_SIZE,
  BUTTON_THIN,
  BUTTON_INSET,
  HUD_OFFSET_PX,
  HUD_MAX_WIDTH_PAD_PX,
} from './maze-config.js';
import {
  TARGET_ASPECT,
  FOG_NEAR,
  FOG_FAR,
  FOG_COLOR,
  WIGGLE_SPEED,
  WIGGLE_FREQ,
  WIGGLE_AMP,
  CLEAR_COLOR_SKYBOX,
  CLEAR_COLOR_DEFAULT,
  PROJECTION_NEAR,
  PROJECTION_FAR,
} from '../core/engine-config.js';
import type { Maze } from './maze.js';
import type { RenderMaterial } from './maze-data.js';

export function renderMaze(maze: Maze, time: number): void {
  const gl = maze.gl;
  const engine = maze.engine;
  const perfSettings = perf.getSettings();
  const targetAspect = TARGET_ASPECT;
  let viewWidth = window.innerWidth;
  let viewHeight = window.innerHeight;
  const currentAspect = viewWidth / viewHeight;
  if (currentAspect > targetAspect) viewWidth = viewHeight * targetAspect;
  else viewHeight = viewWidth / targetAspect;
  const xOffset = (window.innerWidth - viewWidth) / 2;
  const yOffset = (window.innerHeight - viewHeight) / 2;

  engine.startFrame();
  gl.disable(gl.CULL_FACE);
  gl.viewport(0, 0, engine.currentRes.w, engine.currentRes.h);

  if (perfSettings.skybox) gl.clearColor(...CLEAR_COLOR_SKYBOX);
  else gl.clearColor(...CLEAR_COLOR_DEFAULT);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const projectionMatrix = engine.pool.getMat4();
  mat4.perspective(
    projectionMatrix,
    maze.player.fov,
    TARGET_ASPECT,
    PROJECTION_NEAR,
    PROJECTION_FAR,
  );

  const viewMatrix = engine.pool.getMat4();

  const eyePos = engine.pool.getVec3();
  const pos = maze.player.getEyePosition();
  vec3.set(eyePos, pos[0], pos[1], pos[2]);

  const q = quat.create();
  quat.rotateY(q, q, -maze.player.dir);
  quat.rotateX(q, q, maze.player.pitch);
  quat.rotateZ(q, q, maze.player.roll + maze.player.lean);
  mat4.fromRotationTranslation(viewMatrix, q, eyePos);
  mat4.invert(viewMatrix, viewMatrix);

  gl.bindVertexArray(maze.cube!.vao);
  gl.uniform3fv(engine.uniforms.viewPos, eyePos);
  gl.uniform1f(engine.uniforms.fogNear, FOG_NEAR);
  gl.uniform1f(engine.uniforms.fogFar, FOG_FAR);
  gl.uniform4fv(engine.uniforms.fogColor, FOG_COLOR);
  gl.uniform1f(engine.uniforms.time, (time - maze.startTime) * 0.001);

  gl.uniform1f(engine.uniforms.wiggleSpeed, WIGGLE_SPEED);
  gl.uniform1f(engine.uniforms.wiggleFreq, WIGGLE_FREQ);
  gl.uniform1f(engine.uniforms.wiggleAmp, WIGGLE_AMP);

  const drawMesh = (
    vao: WebGLVertexArrayObject,
    count: number,
    modelMat: Float32Array,
    material: RenderMaterial,
    isEntity = 0.0,
    isSky = 0.0,
  ): void => {
    const mvpMatrix = engine.pool.getMat4();
    mat4.multiply(mvpMatrix, projectionMatrix, viewMatrix);
    mat4.multiply(mvpMatrix, mvpMatrix, modelMat);
    gl.uniformMatrix4fv(engine.uniforms.matrix, false, mvpMatrix);
    gl.uniformMatrix4fv(engine.uniforms.model, false, modelMat);
    gl.uniform1f(engine.uniforms.isEntity, isEntity);
    gl.uniform1f(engine.uniforms.isSky, isSky);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, material.diffuse);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, material.normal || maze.materials.wall.normal);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, material.roughness || maze.materials.wall.roughness);

    gl.bindVertexArray(vao);
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
    engine.pool.recycle(mvpMatrix);
  };

  if (maze.wallMesh) {
    const wallModel = engine.pool.getMat4();
    drawMesh(maze.wallMesh.vao, maze.wallMesh.count, wallModel, maze.materials.wall, 0.0);
    engine.pool.recycle(wallModel);
  }

  for (let i = 0; i < maze.buttons.length; i++) {
    const btn = maze.buttons[i];
    const x = btn.x;
    const y = btn.y;
    let px = x + TILE_CENTER;
    const py = WALL_HEIGHT;
    let pz = y + TILE_CENTER;
    let sx = BUTTON_SIZE;
    const sy = BUTTON_SIZE;
    let sz = BUTTON_SIZE;
    if (maze.map[y][x - 1] === 1) {
      px -= BUTTON_INSET;
      sx = BUTTON_THIN;
    } else if (maze.map[y][x + 1] === 1) {
      px += BUTTON_INSET;
      sx = BUTTON_THIN;
    } else if (maze.map[y - 1] && maze.map[y - 1][x] === 1) {
      pz -= BUTTON_INSET;
      sz = BUTTON_THIN;
    } else if (maze.map[y + 1] && maze.map[y + 1][x] === 1) {
      pz += BUTTON_INSET;
      sz = BUTTON_THIN;
    }
    const modelMatrix = engine.pool.getMat4();
    mat4.translate(modelMatrix, modelMatrix, [px, py, pz]);
    mat4.scale(modelMatrix, modelMatrix, [sx, sy, sz]);
    drawMesh(
      maze.cube!.vao,
      maze.cube!.count,
      modelMatrix,
      {
        diffuse: btn.state === 'closed' ? maze.materials.buttonClosed : maze.materials.buttonOpened,
      },
      1.0,
    );
    engine.pool.recycle(modelMatrix);
  }

  for (let i = 0; i < maze.doors.length; i++) {
    const door = maze.doors[i];
    for (let t = 0; t < door.tiles.length; t++) {
      const tile = door.tiles[t];
      const modelMatrix = engine.pool.getMat4();
      mat4.translate(modelMatrix, modelMatrix, [
        tile.x + TILE_CENTER,
        WALL_HEIGHT + door.offsetY,
        tile.y + TILE_CENTER,
      ]);
      drawMesh(maze.cube!.vao, maze.cube!.count, modelMatrix, maze.materials.wall, 0.0);
      engine.pool.recycle(modelMatrix);
    }
  }

  const floorModel = engine.pool.getMat4();
  mat4.translate(floorModel, floorModel, [WORLD_SIZE / 2, FLOOR_Y, WORLD_SIZE / 2]);
  mat4.scale(floorModel, floorModel, [WORLD_SIZE, FLOOR_THICKNESS, WORLD_SIZE]);
  drawMesh(maze.cube!.vao, maze.cube!.count, floorModel, maze.materials.floor, 0.0);

  let ceilModel: Float32Array | null = null;
  if (perfSettings.skybox) {
    ceilModel = engine.pool.getMat4();
    mat4.translate(ceilModel, ceilModel, [WORLD_SIZE / 2, CEIL_Y, WORLD_SIZE / 2]);
    mat4.scale(ceilModel, ceilModel, [WORLD_SIZE, FLOOR_THICKNESS, WORLD_SIZE]);
    drawMesh(maze.cube!.vao, maze.cube!.count, ceilModel, maze.materials.skybox, 0.0, 1.0);
  }

  engine.endFrame(
    engine.currentRes.w,
    engine.currentRes.h,
    xOffset,
    yOffset,
    viewWidth,
    viewHeight,
  );

  engine.pool.recycle(projectionMatrix);
  engine.pool.recycle(viewMatrix);
  engine.pool.recycle(eyePos);
  engine.pool.recycle(floorModel);
  if (ceilModel) engine.pool.recycle(ceilModel);

  if (maze.hudElement) {
    maze.hudElement.style.left = xOffset + HUD_OFFSET_PX + 'px';
    maze.hudElement.style.top = yOffset + HUD_OFFSET_PX + 'px';
    maze.hudElement.style.maxWidth = viewWidth - HUD_MAX_WIDTH_PAD_PX + 'px';
  }
}
