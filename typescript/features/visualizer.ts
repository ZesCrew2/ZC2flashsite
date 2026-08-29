import type { Lib } from '../types.js';

export const initVisualizer = (player: Lib): void => {
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
  const ctx2d = canvas.getContext('2d');
  if (!ctx2d) return;

  const resize = () => {
    const rect = content.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas!.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas!.height = Math.max(1, Math.floor(rect.height * dpr));
  };
  resize();
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(resize).observe(content);
  } else {
    window.addEventListener('resize', resize);
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
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      audioCtx = new AC();
      const src = audioCtx.createMediaElementSource(video);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.82;
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

  const draw = () => {
    requestAnimationFrame(draw);

    const w = canvas!.width;
    const h = canvas!.height;

    const bg = ctx2d!.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#050507');
    bg.addColorStop(1, '#0c0c12');
    ctx2d!.fillStyle = bg;
    ctx2d!.fillRect(0, 0, w, h);

    const playing = !video.paused && !video.ended && video.currentTime > 0;

    let bins: number[] | null = null;
    if (analyser && data) {
      analyser.getByteFrequencyData(data as unknown as Uint8Array<ArrayBuffer>);
      bins = Array.from(data);
    }

    const bars = 64;
    const binCount = bins ? bins.length : bars;
    const step = Math.max(1, Math.floor(binCount / bars));
    const gap = Math.max(1, Math.floor((w / bars) * 0.18));
    const barW = (w - gap * (bars - 1)) / bars;
    const t = performance.now() / 1000;

    for (let i = 0; i < bars; i++) {
      let v: number;
      if (bins) {
        let sum = 0;
        for (let j = 0; j < step; j++) sum += bins[i * step + j];
        v = sum / step / 255;
      } else if (playing) {
        const beat = 0.6 + 0.4 * Math.abs(Math.sin(t * 2.2));
        v =
          (0.18 +
            0.4 * (0.5 + 0.5 * Math.sin(t * 3.1 + i * 0.35)) *
              (0.5 + 0.5 * Math.sin(t * 1.7 + i * 0.12))) *
          beat;
      } else {
        v = 0;
      }

      const barH = Math.max(2, v * h * 0.92);
      const x = i * (barW + gap);
      const y = h - barH;

      const grad = ctx2d!.createLinearGradient(0, h, 0, y);
      grad.addColorStop(0, '#00e676');
      grad.addColorStop(0.55, '#ffea00');
      grad.addColorStop(1, '#ff1744');
      ctx2d!.fillStyle = grad;
      ctx2d!.fillRect(x, y, barW, barH);
    }
  };
  draw();
};
