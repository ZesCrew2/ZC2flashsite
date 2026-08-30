import { audio } from '@/microsite/audio';

export function init(): void {
  const setup = (): void => {
  const logo = document.getElementById('logo');
  if (!logo) return;

  logo.addEventListener('click', () => {
    if (window.siteAudio && !window.siteAudio.isMuted) {
      audio.play('site_medal');
    }

    logo.classList.remove('logo-clicked');
    void logo.offsetWidth;
    logo.classList.add('logo-clicked');

    logo.addEventListener('animationend', () => logo.classList.remove('logo-clicked'), {
      once: true,
    });
  });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}
