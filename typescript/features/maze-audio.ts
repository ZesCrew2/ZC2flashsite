import type { Lib } from '../types.js';
import {
  SPATIAL_REF_DISTANCE,
  SPATIAL_MAX_DISTANCE,
  SPATIAL_ROLLOFF,
  TILE_CENTER,
  WALL_HEIGHT,
  DOOR_GAIN,
} from './maze-config.js';

export function createSpatialPanner(
  audioCtx: AudioContext,
  x: number,
  y: number,
  offsetY = 0,
): PannerNode {
  const panner = audioCtx.createPanner();
  panner.panningModel = 'HRTF';
  panner.distanceModel = 'inverse';
  panner.refDistance = SPATIAL_REF_DISTANCE;
  panner.maxDistance = SPATIAL_MAX_DISTANCE;
  panner.rolloffFactor = SPATIAL_ROLLOFF;
  panner.positionX.value = x + TILE_CENTER;
  panner.positionY.value = WALL_HEIGHT + offsetY;
  panner.positionZ.value = y + TILE_CENTER;
  return panner;
}

export function playWebAudioSpatial(
  audioCtx: AudioContext,
  audioBuffers: Record<string, Lib>,
  bufferKey: string,
  x: number,
  y: number,
  volume = 1.0,
): void {
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffers[bufferKey];

  const panner = createSpatialPanner(audioCtx, x, y);
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = volume;

  source.connect(panner);
  panner.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  source.start(0);
}

export interface DoorAudioGraph {
  source: AudioBufferSourceNode;
  panner: PannerNode;
  gainNode: GainNode;
}

export function startDoorMoveSound(
  audioCtx: AudioContext,
  audioBuffers: Record<string, Lib>,
  midX: number,
  midY: number,
  offsetY: number,
): DoorAudioGraph {
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffers.wallMove;
  source.loop = true;

  const panner = createSpatialPanner(audioCtx, midX, midY, offsetY);
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = DOOR_GAIN;

  source.connect(panner);
  panner.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  source.start(0);

  return { source, panner, gainNode };
}
