import { ticker } from '../microsite/ticker.js';
import type { Lib } from '../types.js';

let currentStage: Lib | null = null;
let currentPage: string | null = null;
let currentLoader: Lib | null = null;
let pageLoadToken = 0;
const pageSoundsRegistered: Record<string, boolean> = {};

function registerPageSound(src: string, id: string): void {
  if (!createjs.Sound || pageSoundsRegistered[id]) return;
  pageSoundsRegistered[id] = true;
  createjs.Sound.registerSound(src, id);
}

export function resolvePageAssetPath(src: string): string {
  return new URL(`assets/swf/pages/${src}`, window.location.href).href;
}

function loadPage(color: string): void {
  if (typeof createjs === 'undefined') return;

  const validPages = ['red', 'orange', 'yellow', 'lime', 'green', 'cyan', 'blue', 'purple', 'pink'];
  if (!validPages.includes(color)) {
    console.error(`security: blocked attempt to load invalid page: ${color} --thorns`);
    return;
  }

  pageLoadToken++;
  const token = pageLoadToken;

  const flashContent = document.getElementById('flashContent');

  if (currentStage) {
    createjs.Ticker.removeEventListener('tick', currentStage._throttledTick || currentStage);
    currentStage = null;
  }

  if (currentLoader) {
    currentLoader.removeAllEventListeners();
    currentLoader.close();
    currentLoader = null;
  }

  const oldScript = document.getElementById('page-script');
  if (oldScript) oldScript.remove();

  if (!flashContent) return;
  flashContent.innerHTML = '';
  currentPage = color;

  const anim_container = document.createElement('div');
  anim_container.id = 'animation_container';
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';

  anim_container.appendChild(canvas);
  flashContent.appendChild(anim_container);

  const script = document.createElement('script');
  script.id = 'page-script';
  script.src = `assets/swf/pages/${color}.js`;
  script.onload = () => {
    if (currentPage === color && pageLoadToken === token) initPage(color, token);
  };
  document.body.appendChild(script);
}

function initPage(color: string, token: number): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
  const anim_container = document.getElementById('animation_container') as HTMLElement | null;
  if (!canvas || !anim_container) return;

  const comp = AdobeAn.getComposition('B325F180281AD548AF0E7778EAE237A2');
  const lib = comp.getLibrary();
  const manifest: Lib[] = [];

  lib.properties.manifest.forEach((item: Lib) => {
    const cleanSrc = item.src.replace(/\?.*$/, '');
    const fullSrc = resolvePageAssetPath(cleanSrc);
    if (/\.(mp3|wav|ogg)$/i.test(cleanSrc)) {
      registerPageSound(fullSrc, item.id);
    } else {
      manifest.push({ src: fullSrc, id: item.id });
    }
  });

  const loader = new createjs.LoadQueue(false);
  currentLoader = loader;
  loader.addEventListener('fileload', (evt: Lib) => {
    if (token === pageLoadToken && loader === currentLoader) {
      if (evt.item.type === 'image') comp.getImages()[evt.item.id] = evt.result;
    }
  });
  loader.addEventListener('complete', (evt: Lib) => {
    if (token === pageLoadToken && loader === currentLoader) {
      currentLoader = null;
      handlePageComplete(evt, comp, color);
    }
  });
  loader.loadManifest(manifest);
}

function handlePageComplete(evt: Lib, comp: Lib, color: string): void {
  const lib = comp.getLibrary();
  const ss = comp.getSpriteSheet();
  const { ssMetadata } = lib;

  ssMetadata.forEach((meta: Lib) => {
    ss[meta.name] = new createjs.SpriteSheet({
      images: [evt.target.getResult(meta.name)],
      frames: meta.frames,
    });
  });

  const exportRoot = new lib[color]();
  exportRoot.addEventListener('tick', AdobeAn.handleFilterCache);
  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
  currentStage = new lib.Stage(canvas);
  currentStage.enableMouseOver();
  currentStage.addChild(exportRoot);

  const throttledTick = ticker.createThrottledTick(currentStage, lib.properties.fps);
  createjs.Ticker.addEventListener('tick', throttledTick);
  currentStage._throttledTick = throttledTick;

  AdobeAn.compositionLoaded(lib.properties.id);
  fitPage();
}

function fitPage(): void {
  const container = document.getElementById('animation_container') as HTMLElement | null;
  const cvs = document.getElementById('canvas') as HTMLCanvasElement | null;
  if (!container || !cvs) return;
  const fit = Math.min(container.clientWidth / 460, container.clientHeight / 352);
  const scale = fit + (1 - fit) * 0.5;
  cvs.width = Math.round(460 * scale);
  cvs.height = Math.round(352 * scale);
}

window.addEventListener('resize', fitPage);

function scaleSite(): void {
  const site = document.getElementById('site');
  if (!site || site.clientWidth === 0) return;
  const scale = site.clientWidth / 760;
  const siteInner = document.getElementById('site-inner');
  const logoLayer = document.getElementById('logo-layer');
  const footer = document.getElementById('footer');
  if (siteInner) siteInner.style.transform = `scale(${scale})`;
  if (logoLayer) logoLayer.style.transform = `scale(${scale})`;
  if (footer) {
    footer.style.transform = `translateX(-50%) scale(${scale})`;
    footer.style.bottom = `${25 * scale}px`;
  }
}

window.addEventListener('resize', scaleSite);
scaleSite();

(() => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') || 'orange';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadPage(page));
  } else {
    loadPage(page);
  }
})();

export { loadPage };
