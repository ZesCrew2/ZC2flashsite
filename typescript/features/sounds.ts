import { AssetManager } from '../core/asset-manager.js';
import { audio } from '../microsite/audio.js';
import type { Lib } from '../types.js';

const init = (): void => {
  if (typeof window.playSound !== 'function') {
    window.playSound = function (id: string, loop?: number, offset?: number) {
      if (window.siteAudio && window.siteAudio.isMuted) return null;

      let resolvedId = id;
      if (AssetManager && AssetManager.ALIASES) {
        resolvedId = AssetManager.ALIASES[id] || id;
      }

      return createjs.Sound.play(resolvedId, {
        interrupt: createjs.Sound.INTERRUPT_ANY,
        loop: loop || 0,
        offset: offset || 0,
      });
    };
  }

  document.addEventListener('mouseover', (e: MouseEvent) => {
    if ((e.target as Lib).classList.contains('btn')) {
      audio.play('hoverwav');
    }
  });

  document.addEventListener('mousedown', (e: MouseEvent) => {
    if ((e.target as Lib).classList.contains('btn')) {
      audio.play('clickywav');
    }
  });

  const speaker = document.getElementById('speaker');
  if (speaker) {
    speaker.addEventListener('mouseover', () => audio.play('hoverwav'));
  }

  const saptarshi = document.querySelector('.saptarshi-text');
  if (saptarshi) {
    saptarshi.addEventListener('click', () => audio.play('site_notif'));
  }

  const thorns = document.querySelector('.thorns-text');
  const luigiIds = ['luigi1', 'luigi2', 'luigi3', 'luigi4'];
  if (thorns) {
    thorns.addEventListener('click', () => {
      const randomId = luigiIds[Math.floor(Math.random() * luigiIds.length)];
      audio.play(randomId);
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
