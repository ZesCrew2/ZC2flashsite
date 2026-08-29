import { assets } from './asset-manager.js';
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
      setTimeout(() => self.revealSite(), 500);
    } catch (err) {
      console.error('BootManager: Loading failed', err);
      if (this.progressStatus) this.progressStatus.textContent = 'Error loading assets.';
    }
  }

  revealSite(): void {
    const self = this;
    if (this.preloader) {
      this.preloader.style.opacity = '0';
      setTimeout(() => {
        if (self.preloader) self.preloader.style.display = 'none';
      }, 500);
    }

    if (this.site) this.site.style.display = 'block';
    if (this.swirl) this.swirl.style.display = 'block';

    window.dispatchEvent(new Event('resize'));
    this.dispatchReadyEvent();
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
