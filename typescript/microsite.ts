import type { Microsite as MicrositeApi } from './types';
import { ticker } from './microsite/ticker';
import { audio } from './microsite/audio';
import { shader } from './microsite/shader';
import { ui } from './microsite/ui';
import { AssetManager, assets } from './core/asset-manager';
import { perf } from './core/performance-manager';
import { engine } from './core/engine-core';
import { boot } from './core/boot';
import { Player } from './features/player';
import { maze } from './features/maze';

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
