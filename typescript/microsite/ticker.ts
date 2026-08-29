import type { Lib, TickerApi } from '../types.js';

const FPS_FLASH = 24;

export const ticker: TickerApi = {
  FPS_FLASH,

  createThrottledTick(stage: Lib, fps: number = FPS_FLASH) {
    let lastUpdate = 0;
    const interval = 1000 / fps;

    return (event: Lib) => {
      const now = createjs.Ticker.getTime();
      if (now - lastUpdate >= interval) {
        if (stage.autoClear === false && stage.canvas) {
          const ctx = stage.canvas.getContext('2d');
          if (ctx) ctx.clearRect(0, 0, stage.canvas.width, stage.canvas.height);
        }
        stage.update(event);
        lastUpdate = now - ((now - lastUpdate) % interval);
      }
    };
  },

  shouldUpdate(lastTime: number, fps: number = FPS_FLASH) {
    const now = Date.now();
    const interval = 1000 / fps;
    if (now - lastTime >= interval) {
      return { ready: true, newTime: now - ((now - lastTime) % interval) };
    }
    return { ready: false };
  },
};
