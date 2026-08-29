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

  let plasmaCanvas: HTMLCanvasElement | null = null;
  let plasmaCtx: CanvasRenderingContext2D | null = null;
  let plasmaImg: ImageData | null = null;

  const draw = () => {
    requestAnimationFrame(draw);

    const w = canvas!.width;
    const h = canvas!.height;

    const playing = !video.paused && !video.ended && video.currentTime > 0;

    let bins: number[] | null = null;
    if (analyser && data) {
      analyser.getByteFrequencyData(data as unknown as Uint8Array<ArrayBuffer>);
      bins = Array.from(data);
    }

    const t = performance.now() / 1000;

    const NB = 8;
    const bands = new Array<number>(NB);
    let energy = 0;
    if (bins) {
      const usable = Math.max(1, Math.floor(bins.length * 0.7));
      for (let k = 0; k < NB; k++) {
        const a = Math.floor((k / NB) * usable);
        const b = Math.max(a + 1, Math.floor(((k + 1) / NB) * usable));
        let s = 0;
        for (let i = a; i < b; i++) s += bins[i];
        const e = s / ((b - a) * 255);
        bands[k] = e;
        energy += e;
      }
      energy /= NB;
    } else if (playing) {
      for (let k = 0; k < NB; k++) {
        const e = 0.15 + 0.22 * Math.abs(Math.sin(t * (1.4 + k * 0.4) + k));
        bands[k] = e;
        energy += e;
      }
      energy /= NB;
    } else {
      for (let k = 0; k < NB; k++) bands[k] = 0;
      energy = 0;
    }

    const ang: number[] = [];
    const fk: number[] = [];
    const spd: number[] = [];
    for (let k = 0; k < NB; k++) {
      ang.push(k * 2.39996323);
      fk.push(1 + k * 0.85);
      spd.push(0.7 + k * 0.35);
    }

    const PW = 200;
    const PH = Math.max(2, Math.round((PW * h) / w));
    if (!plasmaCanvas || plasmaCanvas.width !== PW || plasmaCanvas.height !== PH) {
      plasmaCanvas = document.createElement('canvas');
      plasmaCanvas.width = PW;
      plasmaCanvas.height = PH;
      plasmaCtx = plasmaCanvas.getContext('2d');
      plasmaImg = plasmaCtx ? plasmaCtx.createImageData(PW, PH) : null;
    }
    const pctx = plasmaCtx;
    const pimg = plasmaImg;
    if (!pctx || !pimg) return;

    const img = pimg.data;
    const TAU = Math.PI * 2;
    const hueShift = t * 0.12 + energy * 1.4 + bands[2] * 0.8;
    const scale = 2.2 + energy * 2.2;
    const bri = 0.5 + 0.75 * energy;
    const warp = 0.1 + energy * 0.35 + bands[0] * 0.2;
    const treble = bands[NB - 1];

    for (let y = 0; y < PH; y++) {
      const v = y / PH;
      for (let x = 0; x < PW; x++) {
        const u = x / PW;

        const uu = u + warp * Math.sin(v * scale * 1.7 + t * 1.6 + bands[1] * 4);
        const vv = v + warp * Math.cos(u * scale * 1.7 + t * 1.2 + bands[3] * 4);

        let val = 0;
        let amp = 0;
        for (let k = 0; k < NB; k++) {
          const cx = Math.cos(ang[k]);
          const cy = Math.sin(ang[k]);
          const ph =
            (uu * cx + vv * cy) * scale * fk[k] + t * spd[k] + bands[k] * t * 2.0;
          const a = 0.3 + bands[k] * 1.6;
          val += a * Math.sin(ph);
          amp += a;
        }
        val += 0.5 * treble * Math.sin((uu + vv) * scale * 3.0 + t * 4.0 + bands[NB - 2] * 6);
        amp += 0.5 * treble;
        val = val / amp;
        val = val * 0.5 + 0.5;

        const r = 0.5 + 0.5 * Math.cos(TAU * val + hueShift);
        const g = 0.5 + 0.5 * Math.cos(TAU * val + hueShift + 2.094);
        const b = 0.5 + 0.5 * Math.cos(TAU * val + hueShift + 4.188);
        const i = (y * PW + x) * 4;
        const rr = r * 255 * bri;
        const gg = g * 255 * bri;
        const bb = b * 255 * bri;
        img[i] = rr > 255 ? 255 : rr;
        img[i + 1] = gg > 255 ? 255 : gg;
        img[i + 2] = bb > 255 ? 255 : bb;
        img[i + 3] = 255;
      }
    }

    pctx.putImageData(pimg, 0, 0);

    ctx2d!.globalCompositeOperation = 'source-over';
    ctx2d!.imageSmoothingEnabled = true;
    ctx2d!.drawImage(plasmaCanvas, 0, 0, w, h);
  };
  draw();
};
