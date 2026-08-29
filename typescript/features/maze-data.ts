import type { Lib } from '../types.js';

export interface ButtonEntity {
  x: number;
  y: number;
  state: string;
  targetId: string;
}

export interface DoorEntity {
  id: string;
  tiles: { x: number; y: number }[];
  offsetY: number;
  state: string;
  moveSource: Lib | null;
  movePanner: Lib | null;
  moveGain?: Lib;
}

export interface MaterialSet {
  diffuse: WebGLTexture | null;
  normal: WebGLTexture | null;
  roughness: WebGLTexture | null;
}

export interface RenderMaterial {
  diffuse: WebGLTexture | null;
  normal?: WebGLTexture | null;
  roughness?: WebGLTexture | null;
}

export function createMazeMap(): number[][] {
  return [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 2, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 2, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
}

export function createMazeButtons(): ButtonEntity[] {
  return [
    { x: 1, y: 5, state: 'closed', targetId: 'ent_10_9' },
    { x: 15, y: 1, state: 'closed', targetId: 'ent_19_9' },
  ];
}

export function createMazeDoors(): DoorEntity[] {
  return [
    {
      id: 'ent_10_9',
      tiles: [{ x: 10, y: 9 }],
      offsetY: 0.0,
      state: 'closed',
      moveSource: null,
      movePanner: null,
    },
    {
      id: 'ent_19_9',
      tiles: [{ x: 19, y: 9 }],
      offsetY: 0.0,
      state: 'closed',
      moveSource: null,
      movePanner: null,
    },
  ];
}
