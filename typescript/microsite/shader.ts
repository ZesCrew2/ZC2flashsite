import type { ShaderApi } from '@/types';

export const shader: ShaderApi = {
  instance: null,

  setMode(mode: number | string) {
    if (this.instance) {
      this.instance.effectType = mode;
      console.log(`microsite: shader mode set to ${mode} --thorns`);
    }
  },

  setSpeed(speed: number) {
    if (this.instance) this.instance.speed = speed;
  },

  setIntensity(freq: number, amp: number) {
    if (this.instance) {
      this.instance.frequency = freq;
      this.instance.amplitude = amp;
    }
  },
};
