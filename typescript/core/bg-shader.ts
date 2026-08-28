import { Microsite } from '../microsite.js';
import type { Lib } from '../types.js';

const FilterBase = createjs.Filter as new () => Lib;

class WiggleFilter extends FilterBase {
  effectType: number;
  speed: number;
  frequency: number;
  amplitude: number;
  time: number;
  FRAG_SHADER_BODY: string;
  private _locations: Lib | null;

  constructor(
    shaderSource: string,
    effectType = 4,
    speed = 2.0,
    frequency = 10.0,
    amplitude = 0.015,
  ) {
    super();
    this.effectType = effectType;
    this.speed = speed;
    this.frequency = frequency;
    this.amplitude = amplitude;
    this.time = 0;
    this.FRAG_SHADER_BODY = shaderSource;
    this._locations = null;
  }

  shaderParamSetup(gl: WebGLRenderingContext, _stage: Lib, shaderProgram: Lib): void {
    if (!this._locations) {
      this._locations = {
        uTime: gl.getUniformLocation(shaderProgram, 'uTime'),
        uEffectType: gl.getUniformLocation(shaderProgram, 'uEffectType'),
        uSpeed: gl.getUniformLocation(shaderProgram, 'uSpeed'),
        uFrequency: gl.getUniformLocation(shaderProgram, 'uFrequency'),
        uWaveAmplitude: gl.getUniformLocation(shaderProgram, 'uWaveAmplitude'),
      };
    }
    gl.uniform1f(this._locations.uTime, this.time);
    gl.uniform1i(this._locations.uEffectType, this.effectType);
    gl.uniform1f(this._locations.uSpeed, this.speed);
    gl.uniform1f(this._locations.uFrequency, this.frequency);
    gl.uniform1f(this._locations.uWaveAmplitude, this.amplitude);
  }

  clone(): WiggleFilter {
    return new WiggleFilter(
      this.FRAG_SHADER_BODY,
      this.effectType,
      this.speed,
      this.frequency,
      this.amplitude,
    );
  }
}

createjs.WiggleFilter = WiggleFilter;

async function initBackgroundShader(shaderPath = 'assets/shaders/wiggle.glsl'): Promise<void> {
  try {
    const response = await fetch(shaderPath);
    const shaderCode = await response.text();
    setupBackground(shaderCode);
  } catch (err) {
    console.error(`failed to load shader: ${err} --thorns`);
  }
}

function setupBackground(shaderCode: string): void {
  let canvas: HTMLCanvasElement | null = document.getElementById(
    'bg-canvas',
  ) as HTMLCanvasElement | null;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);
  }

  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '-1',
    pointerEvents: 'none',
  });

  const stage = new createjs.StageGL(canvas, { transparent: false, antialias: true });

  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = 'assets/img/bg.png';
  img.onload = () => {
    const settings = Microsite.perf
      ? Microsite.perf.getSettings()
      : { fps: 60, logicThrottle: 1, postProcessing: true };

    const bitmap = new createjs.Bitmap(img);
    stage.addChild(bitmap);

    if (settings.fps > 24) {
      const wiggle = new createjs.WiggleFilter(shaderCode, 4, 2.0, 10.0, 0.015);
      bitmap.filters = [wiggle];

      Microsite.shader.instance = wiggle;
      Microsite.shader.loadShader = async (newPath: string) => {
        try {
          const response = await fetch(newPath);
          wiggle.FRAG_SHADER_BODY = await response.text();
          bitmap.updateCache();
        } catch (err) {
          console.error(`failed to load inner shader: ${err} --thorns`);
        }
      };

      bitmap.cache(0, 0, img.width, img.height, 1, { useGL: 'stage' });
    }

    const resize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      stage.updateViewport(canvas!.width, canvas!.height);
      const scale = Math.max(canvas!.width / img.width, canvas!.height / img.height);
      bitmap.scaleX = bitmap.scaleY = scale;
      bitmap.x = (canvas!.width - img.width * scale) / 2;
      bitmap.y = (canvas!.height - img.height * scale) / 2;
      if (bitmap.cacheCanvas) bitmap.updateCache();
    };
    window.addEventListener('resize', resize);
    resize();

    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.framerate = settings.fps;

    let tickCount = 0;
    createjs.Ticker.addEventListener('tick', (event: Lib) => {
      if (event.paused) return;

      tickCount++;
      if (tickCount % settings.logicThrottle !== 0) {
        stage.update(event);
        return;
      }

      const instance = Microsite.shader.instance;
      if (instance) {
        instance.time += (event.delta * settings.logicThrottle) / 1000;
        if (bitmap.cacheCanvas) bitmap.updateCache();
      }

      stage.update(event);
    });
  };
}

window.initBackgroundShader = initBackgroundShader;

if (document.readyState === 'complete') {
  initBackgroundShader();
} else {
  window.addEventListener('load', () => initBackgroundShader());
}
