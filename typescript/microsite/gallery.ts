import { audio } from './audio.js';
import { ticker } from './ticker.js';
import { ui } from './ui.js';
import type { Lib, GalleryOptions } from '../types.js';

export class Gallery {
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
      const update = ticker.shouldUpdate(this.lastGifUpdate, 24);
      if (!update.ready) return;
      this.lastGifUpdate = update.newTime;

      const imageObj = imgQueue.getResult(prefix + this.currentIndex);
      const dims = ui.galleryDimensions[activeCard.ratio] || ui.galleryDimensions.square;

      if (imageObj) {
        const currentScale = activeCard.scaleX;
        const layout = ui.getFitLayout(imageObj.width, imageObj.height, dims.w, dims.h);
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
          audio.play('clickywav');
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
