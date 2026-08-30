import type { PlaylistTrack, Lib } from '@/types';
import { initFluidVisualizer } from './fluid';

const PLAYLIST = [
  { path: 'assets/music/gleeble.mp3', name: 'Lily (ZesCrew2) - Gleeble' },
  { path: 'assets/music/Virgill - Interference Ending.mp3', name: 'Virgill - Interference Ending' },
  { path: 'assets/music/Mario Paint - Monkey Song.mp3', name: 'Mario Paint - Monkey Song' },
  {
    path: 'assets/music/Animal Crossing - Town Hall (Pelly).mp3',
    name: 'Animal Crossing - Town Hall (Pelly)',
  },
  {
    path: 'assets/music/EarthBound - Your Name, Please (Noiseless).mp3',
    name: 'EarthBound - Your Name, Please (Noiseless)',
  },
  { path: 'assets/music/QT - Main Song.mp3', name: 'QT - Main Song' },
  {
    path: 'assets/music/blue switch palace - super mario world [SPC700] (fantrack) - thorns.mp3',
    name: 'Thorns - Blue Switch Palace [SPC700]',
  },
  {
    path: 'assets/music/Lily (ZesCrew2) - Bejuel (Inst).mp3',
    name: 'Lily (ZesCrew2) - Bejuel (Inst)',
  },
  {
    path: 'assets/music/All The Things She Said (Sped Up, Inst).mp3',
    name: 't.A.T.u. - All The Things She Said (Sped Up, Inst)',
  },
  { path: 'assets/music/Kalimba.mp3', name: 'Mr. Scruff - Kalimba' },
  { path: 'assets/music/weegee.mp3', name: 'sephfire, SGX - Mario Paint "Intense Color" OC ReMix' },
  {
    path: 'assets/music/Drown in the Now (Instrumental).mp3',
    name: 'The Crystal Method (Feat. Matisyahu) - Drown in the Now (Instrumental)',
  },
  {
    path: 'assets/music/Somebodys Watching Me (Instrumental).mp3',
    name: 'Mysto and Pizzi - Somebodys Watching Me (Instrumental)',
  },
  {
    path: 'assets/music/Lets Kill Tonight (Instrumental).mp3',
    name: 'Panic! at the Disco - Lets Kill Tonight (Instrumental)',
  },
  {
    path: 'assets/music/Your Game is Over (Instrumental).mp3',
    name: 'MiatriSs - Your Game is Over (Instrumental)',
  },
  {
    path: 'assets/music/seven color generator inst.mp3',
    name: '渡辺未来 - 七色ジェネレーター (Off-Vocal)',
  },
] as PlaylistTrack[];

export function init(): void {
  window.musicPlaylist = PLAYLIST;

  const initPlayer = () => {
    const player = document.getElementById('wmp') as Lib | null;
    if (!player) return;

    if (typeof WMPlaylistItem === 'undefined' || typeof player.addToPlaylist !== 'function') {
      return;
    }

    window.musicPlaylist!.forEach((track: PlaylistTrack) => {
      player.addToPlaylist(
        new WMPlaylistItem({
          src: track.path,
          audio_only: false,
          metadata: { title: track.name },
          poster: 'assets/img/bg.png',
        }),
      );
    });

    let lastTrackKey = '';

    const updateTitle = () => {
      if (!player.shadowRoot) return;
      const current = player.currentItem;
      const overlay = player.shadowRoot.querySelector('.title-overlay');
      if (overlay && current && current.metadata) {
        const titleText = current.metadata.title || 'Unknown Track';
        if (overlay.textContent !== titleText) {
          overlay.textContent = titleText;
        }
        const key = `${player.currentPlaylistIndex}:${titleText}`;
        if (key !== lastTrackKey) {
          lastTrackKey = key;
          ui.show();
          ui.scheduleHide(4000);
        }
      }
    };

    const ui = initUiAutoHide(player);

    player.addEventListener('play', updateTitle);
    player.addEventListener('playing', updateTitle);

    const setupObserver = () => {
      if (!player.shadowRoot) {
        requestAnimationFrame(setupObserver);
        return;
      }
      const observer = new MutationObserver(updateTitle);
      observer.observe(player.shadowRoot, { childList: true, subtree: true, characterData: true });
    };
    setupObserver();

    initVisualizer(player);
  };

  const initUiAutoHide = (
    player: Lib,
  ): { show: () => void; scheduleHide: (delay: number) => void } => {
    let timer: number | null = null;
    let overPersist = false;
    let mouseX = -1;
    let mouseY = -1;

    const persistSelectors = [
      '.controls',
      '.seek',
      '.gutter-left',
      '.gutter-right',
      '.title-overlay',
    ];

    const getPersistElements = (): (HTMLElement | null)[] => {
      if (!player.shadowRoot) return [];
      return persistSelectors.map(
        (sel) => player.shadowRoot!.querySelector(sel) as HTMLElement | null,
      );
    };

    const isOverPersist = (): boolean => {
      if (mouseX < 0 || mouseY < 0) return false;
      return getPersistElements().some((el) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return (
          mouseX >= r.left && mouseX <= r.right && mouseY >= r.top && mouseY <= r.bottom
        );
      });
    };

    const show = () => {
      player.classList.remove('hide-ui');
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    const scheduleHide = (delay: number) => {
      if (overPersist || isOverPersist()) return;
      if (timer !== null) clearTimeout(timer);
      timer = window.setTimeout(() => player.classList.add('hide-ui'), delay);
    };

    const refresh = () => {
      const nowOver = isOverPersist();
      if (nowOver && !overPersist) {
        overPersist = true;
        show();
      } else if (!nowOver && overPersist) {
        overPersist = false;
        scheduleHide(3000);
      }
    };

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      refresh();
    });

    player.addEventListener('mousemove', () => {
      show();
      scheduleHide(3000);
    });
    player.addEventListener('mouseenter', () => {
      show();
      scheduleHide(3000);
    });
    player.addEventListener('mouseleave', () => {
      scheduleHide(1000);
    });

    show();
    scheduleHide(3000);
    return { show, scheduleHide };
  };

  const initVisualizer = (player: Lib): void => {
    const shadow = player.shadowRoot;
    if (!shadow) return;

    const content = shadow.querySelector('.content') as HTMLElement | null;
    const video = shadow.querySelector('video') as HTMLVideoElement | null;
    if (!content || !video) return;

    let canvas = shadow.querySelector('canvas.visualizer') as HTMLCanvasElement | null;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'visualizer';
      content.insertBefore(canvas, content.firstChild);
    }

    let audioCtx: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let data: Uint8Array | null = null;
    let sourceConnected = false;

    const ensureAudio = () => {
      if (sourceConnected) {
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        return;
      }
      try {
        const AC: typeof AudioContext =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        audioCtx = new AC();
        const src = audioCtx.createMediaElementSource(video);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.8;
        src.connect(analyser);
        analyser.connect(audioCtx.destination);
        data = new Uint8Array(analyser.frequencyBinCount);
        sourceConnected = true;
        if (audioCtx.state === 'suspended') audioCtx.resume();
      } catch (err) {
        console.warn('visualizer: could not build audio graph', err);
      }
    };

    player.addEventListener('play', ensureAudio);
    video.addEventListener('playing', ensureAudio);
    video.addEventListener('play', ensureAudio);

    const getAudio = (): Float32Array | null => {
      if (!analyser || !data) return null;
      const playing = !video.paused && !video.ended && video.currentTime > 0;
      if (!playing) return null;
      analyser.getByteFrequencyData(data as unknown as Uint8Array<ArrayBuffer>);
      const out = new Float32Array(data.length);
      for (let i = 0; i < data.length; i++) out[i] = data[i] / 255;
      return out;
    };

    const setup = () => {
      if (!player.shadowRoot || !canvas) {
        requestAnimationFrame(setup);
        return;
      }
      requestAnimationFrame(() => initFluidVisualizer(canvas, getAudio));
    };
    setup();
  };

  const start = () => {
    if (window.wmplayerReady) {
      initPlayer();
      return;
    }
    window.addEventListener('wmplayer:ready', initPlayer, { once: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}
