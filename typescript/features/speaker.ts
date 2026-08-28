import { Microsite } from '../microsite.js';
import type { Lib } from '../types.js';

window.siteAudio = { isMuted: true };

const init = (): void => {
  const speaker = document.getElementById('speaker') as HTMLImageElement | null;
  const musicPlayer = document.getElementById('music-player');
  const restoreBtn = document.getElementById('music-restore');
  const wmp = document.getElementById('wmp') as Lib | null;
  if (!speaker || !musicPlayer || !restoreBtn || !wmp) return;

  let hasStarted = false;
  wmp.volume = 0.5;

  speaker.addEventListener('click', () => {
    restoreBtn.style.display = 'none';
    window.siteAudio!.isMuted = !window.siteAudio!.isMuted;

    if (window.siteAudio!.isMuted) {
      musicPlayer.classList.remove('unmuted');
      musicPlayer.classList.remove('show');
      wmp.pause();
    } else {
      musicPlayer.classList.add('unmuted');
      musicPlayer.classList.add('show');

      if (!hasStarted) {
        hasStarted = true;
        wmp.currentPlaylistIndex = Math.floor(Math.random() * window.musicPlaylist!.length);
      }
      wmp.play();
      Microsite.audio.play('clickywav');
    }
  });

  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let dragTicking = false;
  const titleBar = musicPlayer.querySelector('.title-bar') as HTMLElement | null;

  titleBar!.addEventListener('mousedown', (e: MouseEvent) => {
    if ((e.target as Element).closest('.title-bar-controls')) return;
    isDragging = true;
    const rect = musicPlayer.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    Object.assign(musicPlayer.style, {
      right: 'auto',
      bottom: 'auto',
      left: `${rect.left}px`,
      top: `${rect.top}px`,
    });
    musicPlayer.classList.add('dragging');
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging || dragTicking) return;
    dragTicking = true;

    requestAnimationFrame(() => {
      let x = e.clientX - dragOffsetX;
      let y = e.clientY - dragOffsetY;
      x = Math.max(0, Math.min(x, window.innerWidth - musicPlayer.offsetWidth));
      y = Math.max(0, Math.min(y, window.innerHeight - musicPlayer.offsetHeight));
      musicPlayer.style.left = `${x}px`;
      musicPlayer.style.top = `${y}px`;
      dragTicking = false;
    });
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    musicPlayer.classList.remove('dragging');
  });

  const setFly = () => {
    const r = musicPlayer.getBoundingClientRect();
    musicPlayer.style.setProperty('--fly-x', `${window.innerWidth - 20 - r.right}px`);
    musicPlayer.style.setProperty('--fly-y', `${window.innerHeight - 20 - r.bottom}px`);
  };

  const flyAway = () => {
    if (!musicPlayer.classList.contains('show') || musicPlayer.classList.contains('minimizing'))
      return;
    if (document.activeElement?.closest('.title-bar-controls'))
      (document.activeElement as HTMLElement | null)?.blur();

    setFly();
    musicPlayer.classList.add('minimizing');
    musicPlayer.addEventListener(
      'animationend',
      () => {
        musicPlayer.classList.remove('show', 'minimizing');
        if (!window.siteAudio!.isMuted) restoreBtn.style.display = 'block';
      },
      { once: true },
    );
  };

  const closeButton = musicPlayer.querySelector(
    'button[aria-label="Close"]',
  ) as HTMLButtonElement | null;
  const minimizeButton = musicPlayer.querySelector(
    'button[aria-label="Minimize"]',
  ) as HTMLButtonElement | null;

  const blockSpaceOnWindowControls = (e: KeyboardEvent) => {
    if (['Space', ' ', 'Spacebar'].includes(e.key) || e.code === 'Space') {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  [closeButton, minimizeButton].forEach((btn) => {
    btn!.addEventListener('keydown', blockSpaceOnWindowControls);
    btn!.addEventListener('click', flyAway);
  });

  (musicPlayer.querySelector(
    'button[aria-label="Maximize"]',
  ) as HTMLButtonElement | null)!.disabled = true;

  restoreBtn.addEventListener('click', () => {
    setFly();
    musicPlayer.classList.add('show', 'restoring');
    restoreBtn.style.display = 'none';
    musicPlayer.addEventListener(
      'animationend',
      () => {
        musicPlayer.classList.remove('restoring');
      },
      { once: true },
    );
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
