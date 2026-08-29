import type { Microsite as MicrositeApi } from './types.js';
import { ticker } from './microsite/ticker.js';
import { audio } from './microsite/audio.js';
import { shader } from './microsite/shader.js';
import { ui } from './microsite/ui.js';
import { AssetManager, assets } from './core/asset-manager.js';
import { perf } from './core/performance-manager.js';
import { engine } from './core/engine-core.js';
import { boot } from './core/boot.js';
import { Player } from './features/player.js';
import { maze } from './features/maze.js';

export const Microsite: MicrositeApi = {
  ticker,
  shader,
  ui,
  audio,
  AssetManager,
  assets,
  perf,
  engine,
  boot,
  Player,
  maze,
};

window.Microsite = Microsite;
console.log('microsite api initialized. --thorns');
