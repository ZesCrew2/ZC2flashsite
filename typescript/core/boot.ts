import { assets } from './asset-manager.js';
import { initBackgroundShader } from './bg-shader.js';
import type { BootManagerInstance } from '../types.js';

export class BootManager implements BootManagerInstance {
  preloader: HTMLElement | null = null;
  progressFill: HTMLElement | null = null;
  progressStatus: HTMLElement | null = null;
  site: HTMLElement | null = null;
  swirl: HTMLElement | null = null;

  async init(): Promise<void> {
    this.preloader = document.getElementById('preloader');
    this.progressFill = document.getElementById('progress-fill');
    this.progressStatus = document.getElementById('progress-status');
    this.site = document.getElementById('site');
    this.swirl = document.getElementById('swirl');

    if (!assets) {
      console.error('BootManager: AssetManager not found!');
      if (this.progressStatus) this.progressStatus.textContent = 'Error: AssetManager not found!';
      return;
    }

    const assetMgr = assets;
    const self = this;

    assetMgr.onProgress = (progress: number) => {
      const percent = Math.floor(progress * 100);
      if (self.progressFill) {
        self.progressFill.style.width = percent + '%';
        const container = self.progressFill.parentElement;
        if (container && container.getAttribute('role') === 'progressbar') {
          container.setAttribute('aria-valuenow', String(percent));
        }
      }
      if (self.progressStatus)
        self.progressStatus.textContent = 'Loading Assets... ' + percent + '%';
    };

    try {
      await assetMgr.load();
      if (this.progressStatus) this.progressStatus.textContent = 'Complete!';

      // Progress bar is complete — now preload audio + glsl in the
      // background. This must NOT block the reveal of the site.
      if (assets && assets.loadAudio) {
        assets
          .loadAudio()
          .catch((err) => console.error('BootManager: audio preload failed', err));
      }
      initBackgroundShader()
        .catch((err) => console.error('BootManager: shader preload failed', err));

      setTimeout(() => self.revealSite(), 500);
    } catch (err) {
      console.error('BootManager: Loading failed', err);
      if (this.progressStatus) this.progressStatus.textContent = 'Error loading assets.';
    }
  }

  revealSite(): void {
    const self = this;
    const finish = () => {
      if (self.preloader) self.preloader.style.display = 'none';
      // The progress bar is now gone — lazily load the Windows Media Player
      // (and, via wmplayer.js itself, its stylesheets) in the background. This
      // mirrors how audio is preloaded *after* the loading screen completes, so
      // the player never competes with the initial load. It must not block the
      // reveal of the site.
      self.loadWmPlayer();
    };

    if (this.preloader) {
      this.preloader.style.opacity = '0';
      setTimeout(finish, 500);
    } else {
      finish();
    }

    if (this.site) this.site.style.display = 'block';
    if (this.swirl) this.swirl.style.display = 'block';

    window.dispatchEvent(new Event('resize'));
    this.dispatchReadyEvent();
  }

  /**
   * Inject the Windows Media Player scripts into the page sequentially, after
   * the progress bar has been removed. wmplayer.js also loads its own
   * stylesheets (via absolute URLs resolved from its own src), so this covers
   * all of the player's assets. Once every script has executed, a
   * `wmplayer:ready` event is dispatched so dependent code (e.g. the playlist
   * wiring) can run.
   */
  loadWmPlayer(): void {
    if (window.wmplayerReady) return;

    const sources = [
      'assets/wmp/wmplayer.playlist.js',
      'assets/wmp/wmplayer.slider.js',
      'assets/wmp/wmplayer.js',
    ];
    let index = 0;

    const loadNext = () => {
      if (index >= sources.length) {
        window.wmplayerReady = true;
        window.dispatchEvent(new Event('wmplayer:ready'));
        return;
      }
      const src = sources[index++];
      const script = document.createElement('script');
      script.src = src;
      script.onload = loadNext;
      script.onerror = () => {
        console.error('BootManager: failed to load wmplayer asset', src);
        loadNext();
      };
      document.body.appendChild(script);
    };

    loadNext();
  }

  dispatchReadyEvent(): void {
    const event = new CustomEvent('MicrositeReady', {
      detail: { timestamp: Date.now(), assets },
    });
    document.dispatchEvent(event);
  }
}

export const boot = new BootManager();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    boot.init();
  });
}
