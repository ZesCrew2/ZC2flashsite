import type {
  Lib,
  Microsite as MicrositeApi,
  TickerApi,
  ShaderApi,
  UiApi,
  AudioApi,
  GalleryItem,
  GalleryCardOptions,
  GalleryLayout,
  PreviewOverlayOptions,
  GalleryOptions,
} from './types.js';

class PreviewOverlay {
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

    Microsite.audio.play('clickywav');
    if (entry.filename === 'INTERNAL_SCREAMING.png') {
      this.screamInstance = Microsite.audio.scream();
    }

    const overlay = new createjs.Shape();
    overlay.graphics.f('rgba(0,0,0,0.85)').drawRect(0, 0, this.stageW, this.stageH);
    overlay.alpha = 0;
    this.container.addChild(overlay);

    const previewBmp = new createjs.Bitmap(imageObj);
    previewBmp.regX = imageObj.width / 2;
    previewBmp.regY = imageObj.height / 2;

    const dims =
      Microsite.ui.galleryDimensions[entry.ratio] || Microsite.ui.galleryDimensions.square;
    const layout = Microsite.ui.getFitLayout(imageObj.width, imageObj.height, dims.w, dims.h);
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
      Microsite.audio.play('clickywav');
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
        Microsite.audio.play('clickywav');
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
      Microsite.audio.play('clickywav');
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

class Gallery {
  cards: Lib[];
  currentIndex: number;
  lastSortedIndex: number;
  options: GalleryOptions;
  centerX: number;
  centerY: number;
  spacing: number;
  isAnimating: boolean;
  gifOverlay: Lib | null;
  shineOverlay: Lib | null;
  lastGifUpdate: number;
  assetPath: string;

  constructor(cards: Lib[], options: GalleryOptions = {}) {
    this.cards = cards;
    this.currentIndex = 0;
    this.lastSortedIndex = -1;
    this.options = options;
    this.centerX = options.centerX || 0;
    this.centerY = options.centerY || 0;
    this.spacing = options.spacing || 120;
    this.isAnimating = false;
    this.gifOverlay = null;
    this.shineOverlay = null;
    this.lastGifUpdate = 0;
    this.assetPath = '';
  }

  setupDOMOverlays(assetPath: string): void {
    const container = document.getElementById('animation_container');
    if (!container) return;

    this.gifOverlay = document.getElementById('gallery-gif-overlay');
    if (!this.gifOverlay) {
      this.gifOverlay = document.createElement('img');
      this.gifOverlay.id = 'gallery-gif-overlay';
      this.gifOverlay.style.cssText =
        'position:absolute;pointer-events:none;z-index:10;display:none;transition:none;';
      container.appendChild(this.gifOverlay);
    }

    this.shineOverlay = document.getElementById('gallery-shine-overlay');
    if (!this.shineOverlay) {
      this.shineOverlay = document.createElement('img');
      this.shineOverlay.id = 'gallery-shine-overlay';
      this.shineOverlay.style.cssText =
        'position:absolute;pointer-events:none;z-index:11;display:none;transition:none;';
      container.appendChild(this.shineOverlay);
    }
    this.assetPath = assetPath;
  }

  updateOverlays(isPreviewOpen: boolean, imgQueue: Lib, prefix = 'art_'): void {
    if (isPreviewOpen || !this.gifOverlay) return;

    const activeCard = this.cards[this.currentIndex];
    if (
      activeCard &&
      activeCard.entry.filename &&
      activeCard.entry.filename.toLowerCase().endsWith('.gif')
    ) {
      const update = Microsite.ticker.shouldUpdate(this.lastGifUpdate, 24);
      if (!update.ready) return;
      this.lastGifUpdate = update.newTime;

      const imageObj = imgQueue.getResult(prefix + this.currentIndex);
      const dims =
        Microsite.ui.galleryDimensions[activeCard.ratio] || Microsite.ui.galleryDimensions.square;

      if (imageObj) {
        const currentScale = activeCard.scaleX;
        const layout = Microsite.ui.getFitLayout(imageObj.width, imageObj.height, dims.w, dims.h);
        if (activeCard.ratio === 'widescreen') layout.y += 4;

        const finalScale = layout.scale * currentScale;

        if (this.gifOverlay.getAttribute('data-filename') !== activeCard.entry.filename) {
          this.gifOverlay.src = encodeURI(this.assetPath + activeCard.entry.filename);
          this.gifOverlay.setAttribute('data-filename', activeCard.entry.filename);
        }

        const canvas =
          (activeCard.stage && activeCard.stage.canvas) ||
          ((window as Lib).stage && (window as Lib).stage.canvas);
        if (!canvas) return;

        const ratio = canvas.width / canvas.clientWidth;
        const pt = activeCard.localToGlobal(0, layout.y);

        this.gifOverlay.style.width = imageObj.width * finalScale + 'px';
        this.gifOverlay.style.height = imageObj.height * finalScale + 'px';
        this.gifOverlay.style.left =
          Math.round(pt.x / ratio - (imageObj.width * finalScale) / 2) + 'px';
        this.gifOverlay.style.top =
          Math.round(pt.y / ratio - (imageObj.height * finalScale) / 2) + 'px';
        this.gifOverlay.style.display = 'block';
        this.gifOverlay.style.opacity = activeCard.alpha;

        if (this.shineOverlay) {
          if (this.shineOverlay.getAttribute('data-ratio') !== activeCard.ratio) {
            this.shineOverlay.src = encodeURI(`assets/img/shine/shine_${activeCard.ratio}.png`);
            this.shineOverlay.setAttribute('data-ratio', activeCard.ratio);
          }

          const cardPt = activeCard.localToGlobal(0, 0);
          const cardWidth = dims.w * currentScale;
          const cardHeight = dims.h * currentScale;
          this.shineOverlay.style.width = cardWidth + 'px';
          this.shineOverlay.style.height = cardHeight + 'px';
          this.shineOverlay.style.left = Math.round(cardPt.x / ratio - cardWidth / 2) + 'px';
          this.shineOverlay.style.top = Math.round(cardPt.y / ratio - cardHeight / 2) + 'px';
          this.shineOverlay.style.display = 'block';
          this.shineOverlay.style.opacity = activeCard.alpha;
        }

        this.gifOverlay.style.pointerEvents = activeCard.entry.link ? 'auto' : 'none';
        this.gifOverlay.style.cursor = activeCard.entry.link ? 'pointer' : 'default';
        this.gifOverlay.onclick = () => {
          Microsite.audio.play('clickywav');
          const win = window.open(activeCard.entry.link, '_blank');
          if (win) win.opener = null;
        };
      }
    } else {
      if (this.gifOverlay) this.gifOverlay.style.display = 'none';
      if (this.shineOverlay) this.shineOverlay.style.display = 'none';
    }
  }

  move(direction: number, callback?: () => void): void {
    if (this.isAnimating || this.cards.length < 2) return;
    this.isAnimating = true;

    const count = this.cards.length;
    this.currentIndex = (this.currentIndex + (direction % count) + count) % count;

    this.update(true);

    setTimeout(() => {
      this.isAnimating = false;
      if (callback) callback();
    }, 260);
  }

  distanceFromCenter(index: number): number {
    let raw = index - this.currentIndex;
    const half = this.cards.length / 2;
    if (raw > half) raw -= this.cards.length;
    else if (raw < -half) raw += this.cards.length;
    return raw;
  }

  update(animated: boolean): void {
    this.cards.forEach((card: Lib) => {
      const offset = this.distanceFromCenter(this.cards.indexOf(card));
      card._depthOffset = offset;

      const absOffset = Math.abs(offset);
      const targetX = this.centerX + offset * this.spacing;
      const targetY = this.centerY + absOffset * 10;
      const targetScale = absOffset === 0 ? 0.92 : absOffset === 1 ? 0.66 : 0.48;
      const targetAlpha = absOffset === 0 ? 1 : absOffset === 1 ? 0.58 : 0;

      card.visible = absOffset <= 2;
      card.mouseEnabled = absOffset <= 1;

      if (animated) {
        createjs.Tween.get(card, { override: true })
          .to(
            {
              x: targetX,
              y: targetY,
              scaleX: targetScale,
              scaleY: targetScale,
              alpha: targetAlpha,
            },
            240,
            createjs.Ease.quadOut,
          )
          .addEventListener('change', () => {
            if (this.options.onTweenUpdate) {
              const currentOffset = this.distanceFromCenter(this.cards.indexOf(card));
              this.options.onTweenUpdate(card, currentOffset);
            }
          });
      } else {
        card.x = targetX;
        card.y = targetY;
        card.scaleX = card.scaleY = targetScale;
        card.alpha = targetAlpha;
      }
    });

    if (this.lastSortedIndex !== this.currentIndex) {
      const parent = this.cards[0].parent;
      if (parent) {
        const sorted = [...this.cards].sort(
          (a: Lib, b: Lib) => Math.abs(b._depthOffset) - Math.abs(a._depthOffset),
        );
        sorted.forEach((c: Lib) => parent.setChildIndex(c, parent.numChildren - 1));
        this.lastSortedIndex = this.currentIndex;
      }
    }
  }
}

const ticker: TickerApi = {
  FPS_FLASH: 24,

  createThrottledTick(stage: Lib, fps: number = Microsite.ticker.FPS_FLASH) {
    let lastUpdate = 0;
    const interval = 1000 / fps;

    return (event: Lib) => {
      const now = createjs.Ticker.getTime();
      if (now - lastUpdate >= interval) {
        if (stage.autoClear === false && stage.canvas) {
          const ctx = stage.canvas.getContext('2d');
          if (ctx) ctx.clearRect(0, 0, stage.canvas.width, stage.canvas.height);
        }
        stage.update(event);
        lastUpdate = now - ((now - lastUpdate) % interval);
      }
    };
  },

  shouldUpdate(lastTime: number, fps: number = Microsite.ticker.FPS_FLASH) {
    const now = Date.now();
    const interval = 1000 / fps;
    if (now - lastTime >= interval) {
      return { ready: true, newTime: now - ((now - lastTime) % interval) };
    }
    return { ready: false };
  },
};

const shader: ShaderApi = {
  instance: null,

  setMode(mode: number | string) {
    if (this.instance) {
      this.instance.effectType = mode;
      console.log(`microsite: shader mode set to ${mode} --thorns`);
    }
  },

  setSpeed(speed: number) {
    if (this.instance) this.instance.speed = speed;
  },

  setIntensity(freq: number, amp: number) {
    if (this.instance) {
      this.instance.frequency = freq;
      this.instance.amplitude = amp;
    }
  },
};

const ui: UiApi = {
  galleryDimensions: {
    square: { w: 172, h: 172 },
    standard: { w: 172, h: 129 },
    widescreen: { w: 172, h: 97 },
  },

  normalizeItems(
    items: GalleryItem[] | null | undefined,
    fallbackItems: GalleryItem[],
    defaultRatio = 'square',
  ): GalleryItem[] {
    if (!items || !items.length) return fallbackItems;
    return items
      .filter((i) => i && i.filename)
      .map((i) => ({
        filename: i.filename,
        displayName: i.displayName || i.filename,
        link: i.link || '',
        ratio: i.ratio || defaultRatio,
      }));
  },

  getFitLayout(
    imgW: number,
    imgH: number,
    cardW: number,
    cardH: number,
    padding = 16,
  ): GalleryLayout {
    const targetW = cardW - padding;
    const targetH = cardH - padding;
    const fitScale = Math.min(targetW / imgW, targetH / imgH, 1);
    const aspectRatio = imgW / imgH;
    let yOffset = 0;

    if (aspectRatio > 1.2) yOffset = -4;
    else if (aspectRatio < 0.8) yOffset = 4;

    return { scale: fitScale, y: yOffset };
  },

  createGalleryCard(imageObj: Lib, options: GalleryCardOptions = {}): Lib {
    const ratio = options.ratio || options.sizeMode || 'square';
    const { w, h } = Microsite.ui.galleryDimensions[ratio] || Microsite.ui.galleryDimensions.square;

    const card = new createjs.Container();

    const bg = new createjs.Shape();
    bg.graphics
      .f(options.bgColor || '#E7E7E7')
      .s(options.borderColor || 'rgba(255,255,255,0.85)')
      .ss(2)
      .rr(-w / 2, -h / 2, w, h, 12);
    bg.shadow = new createjs.Shadow(options.shadowColor || 'rgba(60,40,0,0.35)', 0, 3, 8);
    card.addChild(bg);

    if (imageObj) {
      const bmp = new createjs.Bitmap(imageObj);
      bmp.regX = imageObj.width / 2;
      bmp.regY = imageObj.height / 2;

      const layout = Microsite.ui.getFitLayout(imageObj.width, imageObj.height, w, h);
      bmp.scaleX = bmp.scaleY = layout.scale;
      bmp.y = layout.y;

      card.addChild(bmp);
      card.artBmp = bmp;
    }

    if (options.shineImage) {
      const shine = new createjs.Bitmap(options.shineImage);
      shine.regX = options.shineImage.width / 2;
      shine.regY = options.shineImage.height / 2;
      shine.scaleX = w / options.shineImage.width;
      shine.scaleY = h / options.shineImage.height;
      card.addChild(shine);
      card.shineBmp = shine;
    }

    if (options.displayName) {
      const font = options.font || '14px Kronika';
      const color = options.textColor || '#774900';
      const label = new createjs.Text(options.displayName, font, color);
      label.textAlign = 'center';
      label.y = h / 2 + 12;
      label.shadow = new createjs.Shadow('rgba(255,255,255,0.8)', 0, 0, 2);
      card.addChild(label);
    }

    const hit = new createjs.Shape();
    hit.graphics.f('#000000').rr(-w / 2, -h / 2, w, h + 24, 12);
    card.hitArea = hit;

    card.cardWidth = w;
    card.cardHeight = h;
    card.sizeMode = ratio;
    card.ratio = ratio;

    return card;
  },

  PreviewOverlay,
  createButton,
  Gallery,
};

function createButton(imageObj: Lib, options: GalleryCardOptions = {}): Lib {
  const btn = new createjs.Bitmap(imageObj);
  const scale = options.scale !== undefined ? options.scale : 1.0;
  btn.scaleX = btn.scaleY = scale;

  if (options.regX !== undefined) btn.regX = options.regX;
  if (options.regY !== undefined) btn.regY = options.regY;

  btn.cursor = 'pointer';

  let isHovered = false;

  const updateVisuals = () => {
    if (!btn.image || !btn.image.width) {
      if (btn.image) setTimeout(updateVisuals, 10);
      return;
    }

    btn.image = isHovered && options.hoverImage ? options.hoverImage : imageObj;

    const add = isHovered ? options.brightnessAdd || 46 : 0;
    btn.filters = [new createjs.ColorFilter(1, 1, 1, 1, add, add, isHovered ? 12 : 0, 0)];

    if (btn.cacheCanvas) btn.updateCache();
    else btn.cache(0, 0, btn.image.width, btn.image.height);
  };

  btn.setImage = (newImg: Lib, newHoverImg?: Lib) => {
    imageObj = newImg;
    if (newHoverImg) options.hoverImage = newHoverImg;
    updateVisuals();
  };

  updateVisuals();

  btn.on('mouseover', () => {
    isHovered = true;
    if (options.hoverSound !== false) Microsite.audio.play('hoverwav');
    updateVisuals();
  });

  btn.on('mouseout', () => {
    isHovered = false;
    updateVisuals();
  });

  if (options.onClick) {
    btn.on('click', (evt: Lib) => {
      if (options.clickSound !== false) Microsite.audio.play('clickywav');
      options.onClick!(evt);
    });
  }

  return btn;
}

const audio: AudioApi = {
  play(id: string, loop?: number, offset?: number) {
    if (typeof window.playSound === 'function') {
      return window.playSound(id, loop, offset);
    }
    return null;
  },

  playWithChance(soundId: string, probability = 1.0) {
    if (Math.random() < probability) {
      return this.play(soundId);
    }
    return null;
  },

  scream() {
    return this.playWithChance('screamwav', 0.25);
  },
};

export const Microsite: MicrositeApi = { ticker, shader, ui, audio };
window.Microsite = Microsite;
console.log('microsite api initialized. --thorns');
