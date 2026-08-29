import { maze } from './maze.js';
import { assets } from '../core/asset-manager.js';
import { loadPage } from './pageloader.js';

document.addEventListener('DOMContentLoaded', () => {
  const logoIdleWrap = document.getElementById('logo-idle-wrap');
  let logoClickTimeout: number | null = null;

  if (logoIdleWrap) {
    logoIdleWrap.addEventListener('click', () => {
      if (logoClickTimeout) clearTimeout(logoClickTimeout);
      logoClickTimeout = window.setTimeout(() => (logoClickTimeout = null), 1000);

      if (Math.random() < 0.05) {
        if (maze) {
          if (assets && assets.loadDeferred) {
            assets.loadDeferred().then(() => maze.init());
          } else {
            maze.init();
          }
          return;
        }
      }

      loadPage('orange');
    });
  }

  const buttons = document.querySelectorAll('#buttons .btn');
  const validColors = [
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'cyan',
    'blue',
    'purple',
    'pink',
  ];

  buttons.forEach((btn) => {
    const color = [...btn.classList].find((c) => validColors.includes(c));
    if (color) {
      btn.addEventListener('click', () => {
        if (color === 'cyan') {
          window.open('https://forum.zescrew2.art/', '_blank');
        } else {
          loadPage(color);
        }
      });
    }
  });
});
