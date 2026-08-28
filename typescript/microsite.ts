import type { Microsite as MicrositeApi } from './types.js';
import { ticker } from './microsite/ticker.js';
import { audio } from './microsite/audio.js';
import { shader } from './microsite/shader.js';
import { ui } from './microsite/ui.js';

export const Microsite: MicrositeApi = { ticker, shader, ui, audio };
window.Microsite = Microsite;
console.log('microsite api initialized. --thorns');
