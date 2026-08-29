import { assets } from '../core/asset-manager.js';
import { ticker } from '../microsite/ticker.js';
import type { Lib } from '../types.js';

document.addEventListener('MicrositeReady', () => initBanner());

function initBanner(): void {
  const canvas = document.getElementById('banner-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

  const comp = AdobeAn.getComposition('AA04CCBF99E11C4EA814ED2A172A239E');
  if (!comp) return;

  const lib = comp.getLibrary();
  const assetMgr = assets;
  if (!assetMgr) return;

  const images = comp.getImages();
  lib.properties.manifest.forEach((item: Lib) => {
    const preloaded = assetMgr.getAsset(item.id);
    if (preloaded) images[item.id] = preloaded;
  });

  const ss = comp.getSpriteSheet();
  const { ssMetadata } = lib;

  ssMetadata.forEach((meta: Lib) => {
    const atlasImg = assetMgr.getAsset(meta.name);
    if (atlasImg) {
      ss[meta.name] = new createjs.SpriteSheet({ images: [atlasImg], frames: meta.frames });
    }
  });

  const exportRoot = new lib.zc2banner();
  const stage = new lib.Stage(canvas);
  stage.enableMouseOver();
  stage.autoClear = true;

  const throttledTick = ticker.createThrottledTick(stage, 24);
  createjs.Ticker.addEventListener('tick', throttledTick);

  AdobeAn.compositionLoaded(lib.properties.id);
  stage.addChild(exportRoot);
}
