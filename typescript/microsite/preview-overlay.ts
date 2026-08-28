import { audio } from './audio.js';
import { ui } from './ui.js';
import type { Lib, GalleryItem, PreviewOverlayOptions } from '../types.js';

export class PreviewOverlay {
  root: Lib;
  container: Lib;
  isOpen: boolean;
  screamInstance: Lib | null;
  options: PreviewOverlayOptions;
  stageW: number;
  stageH: number;

  constructor(root: Lib, options: PreviewOverlayOptions = {}) {
    this.root = root;
    this.container = new createjs.Container();
    this.root.addChild(this.container);
    this.isOpen = false;
    this.screamInstance = null;
    this.options = options;
    this.stageW = options.width || 460;
    this.stageH = options.height || 352;
  }

  show(entry: GalleryItem, imageObj: Lib, assetPath: string): void {
    if (this.isOpen) return;
    this.isOpen = true;

    audio.play('clickywav');
    if (entry.filename === 'INTERNAL_SCREAMING.png') {
      this.screamInstance = audio.scream();
    }

    const overlay = new createjs.Shape();
    overlay.graphics.f('rgba(0,0,0,0.85)').drawRect(0, 0, this.stageW, this.stageH);
    overlay.alpha = 0;
    this.container.addChild(overlay);

    const previewBmp = new createjs.Bitmap(imageObj);
    previewBmp.regX = imageObj.width / 2;
    previewBmp.regY = imageObj.height / 2;

    const dims = ui.galleryDimensions[entry.ratio] || ui.galleryDimensions.square;
    const layout = ui.getFitLayout(imageObj.width, imageObj.height, dims.w, dims.h);
    previewBmp.x = this.options.centerX || this.stageW / 2;
    previewBmp.y = (this.options.centerY || this.stageH / 2) + layout.y;
    previewBmp.scaleX = previewBmp.scaleY = layout.scale * 0.92;
    this.container.addChild(previewBmp);

    const margin = 40;
    const targetScale = Math.min(
      (this.stageW - margin) / imageObj.width,
      (this.stageH - margin) / imageObj.height,
      1.2,
    );

    createjs.Tween.get(overlay).to({ alpha: 1 }, 300);
    createjs.Tween.get(previewBmp).to(
      { x: this.stageW / 2, y: this.stageH / 2, scaleX: targetScale, scaleY: targetScale },
      400,
      createjs.Ease.backOut,
    );

    const finalLink =
      entry.link && entry.link.trim() !== '' ? entry.link : assetPath + entry.filename;

    previewBmp.cursor = 'pointer';
    previewBmp.on('click', (evt: Lib) => {
      evt.stopImmediatePropagation();
      audio.play('clickywav');
      const win = window.open(finalLink, '_blank');
      if (win) win.opener = null;
    });

    if (this.options.onOpen) this.options.onOpen();

    let previewGif: HTMLImageElement | null = document.getElementById(
      'preview-gif-overlay',
    ) as HTMLImageElement | null;
    if (entry.filename.toLowerCase().endsWith('.gif')) {
      if (!previewGif) {
        previewGif = document.createElement('img');
        previewGif.id = 'preview-gif-overlay';
        previewGif.style.position = 'absolute';
        previewGif.style.zIndex = '20';
        previewGif.style.display = 'none';
        const animContainer = document.getElementById('animation_container');
        if (animContainer) animContainer.appendChild(previewGif);
      }
      previewGif.src = encodeURI(assetPath + entry.filename);
      previewGif.style.cursor = 'pointer';
      previewGif.onclick = (evt: MouseEvent) => {
        evt.stopPropagation();
        audio.play('clickywav');
        const win = window.open(finalLink, '_blank');
        if (win) win.opener = null;
      };

      setTimeout(() => {
        if (!this.isOpen) return;
        previewBmp.visible = false;
        previewGif!.style.width = imageObj.width * targetScale + 'px';
        previewGif!.style.height = imageObj.height * targetScale + 'px';
        previewGif!.style.left = this.stageW / 2 - (imageObj.width * targetScale) / 2 + 'px';
        previewGif!.style.top = this.stageH / 2 - (imageObj.height * targetScale) / 2 + 'px';
        previewGif!.style.display = 'block';
      }, 400);
    }

    const closeHint = new createjs.Text(
      'Click background to close | Click image for link',
      '14px Trebuchet MS',
      '#FFFFFF',
    );
    closeHint.textAlign = 'center';
    closeHint.x = this.stageW / 2;
    closeHint.y = this.stageH - 20;
    closeHint.alpha = 0;
    this.container.addChild(closeHint);
    createjs.Tween.get(closeHint).wait(500).to({ alpha: 0.6 }, 300);

    overlay.cursor = 'zoom-out';
    overlay.on('click', () => {
      this.isOpen = false;
      if (this.screamInstance) {
        this.screamInstance.stop();
        this.screamInstance = null;
      }
      audio.play('clickywav');
      if (previewGif) previewGif.style.display = 'none';
      previewBmp.visible = true;

      createjs.Tween.get(overlay).to({ alpha: 0 }, 300);
      createjs.Tween.get(closeHint).to({ alpha: 0 }, 200);
      createjs.Tween.get(previewBmp)
        .to(
          {
            x: this.options.centerX || this.stageW / 2,
            y: (this.options.centerY || this.stageH / 2) + layout.y,
            scaleX: layout.scale * 0.92,
            scaleY: layout.scale * 0.92,
          },
          300,
          createjs.Ease.quadIn,
        )
        .call(() => {
          this.container.removeAllChildren();
          if (this.options.onClose) this.options.onClose();
        });
    });
  }
}
