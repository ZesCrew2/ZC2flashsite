import { audio } from './audio';
import { PreviewOverlay } from './preview-overlay';
import { Gallery } from './gallery';
import { createGalleryPage } from './gallery-page';
import type { Lib, GalleryItem, GalleryCardOptions, GalleryLayout, UiApi } from '@/types';

const galleryDimensions = {
  square: { w: 172, h: 172 },
  standard: { w: 172, h: 129 },
  widescreen: { w: 172, h: 97 },
};

export function createButton(imageObj: Lib, options: GalleryCardOptions = {}): Lib {
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
    if (options.hoverSound !== false) audio.play('hoverwav');
    updateVisuals();
  });

  btn.on('mouseout', () => {
    isHovered = false;
    updateVisuals();
  });

  if (options.onClick) {
    btn.on('click', (evt: Lib) => {
      if (options.clickSound !== false) audio.play('clickywav');
      options.onClick!(evt);
    });
  }

  return btn;
}

export const ui: UiApi = {
  galleryDimensions,

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
    const { w, h } = galleryDimensions[ratio] || galleryDimensions.square;

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

      const layout = this.getFitLayout(imageObj.width, imageObj.height, w, h);
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
  createGalleryPage,
};
