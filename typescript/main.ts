import '@/core/performance-manager';
import '@/core/asset-manager';
import '@/core/bg-shader';
import '@/core/engine-core';
import '@/core/boot';

import '@/features/player';
import '@/features/maze';

import '@/microsite';

import { init as initSpeaker } from '@/features/speaker';
import { init as initSounds } from '@/features/sounds';
import { init as initPlaylist } from '@/features/playlist';
import { init as initLogo } from '@/features/logo';
import { init as initTitle } from '@/features/title';
import { init as initPageloader } from '@/features/pageloader';
import { init as initBanner } from '@/features/banner';
import { init as initMainEvents } from '@/features/main-events';

initSpeaker();
initSounds();
initPlaylist();
initLogo();
initTitle();
initPageloader();
initBanner();
initMainEvents();
