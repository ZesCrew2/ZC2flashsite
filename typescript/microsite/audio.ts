import type { AudioApi } from '../types.js';

export const audio: AudioApi = {
  play(id: string, loop?: number, offset?: number) {
    if (typeof window.playSound === 'function') {
      return window.playSound(id, loop, offset);
    }
    return null;
  },

  playWithChance(soundId: string, probability = 1.0) {
    if (Math.random() < probability) {
      return this.play(soundId);
    }
    return null;
  },

  scream() {
    return this.playWithChance('screamwav', 0.25);
  },
};
