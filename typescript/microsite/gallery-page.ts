import { audio } from './audio.js';
import { ui } from './ui.js';
import type { Lib, GalleryItem } from '../types.js';

export interface GalleryPageOptions {
  root: Lib;
  assetPath: string;
  imagePrefix: string;
  leftButtonSrc: string;
  rightButtonSrc: string;
  defaultRatio?: string;
  centerX?: number;
  centerY?: number;
  navY?: number;
  navScale?: number;
  spacing?: number;
  galleryY?: number;
  galleryHeight?: number;
  cardShadowColor?: string;
  cardTextColor?: string;
  cardYOffset?: number;
  navButtonShadow?: string;
  configUrl?: string;
  configKey?: string;
  stageWidth?: number;
  stageHeight?: number;
}

const LOADING_GIF = 'assets/img/loading_indicator.gif';
const SHINE_MANIFEST = [
  { id: 'shine_square', src: 'assets/img/shine/shine_square.png' },
  { id: 'shine_standard', src: 'assets/img/shine/shine_standard.png' },
  { id: 'shine_widescreen', src: 'assets/img/shine/shine_widescreen.png' },
];

export function createGalleryPage(options: GalleryPageOptions): void {
  const {
    root,
    assetPath,
    imagePrefix,
    leftButtonSrc,
    rightButtonSrc,
    defaultRatio = 'square',
    centerX = 230,
    centerY = 183,
    navY = 314,
    navScale = 0.28,
    spacing = 120,
    galleryY = 104,
    galleryHeight = 190,
    cardShadowColor = 'rgba(60,40,0,0.35)',
    cardTextColor = '#774900',
    cardYOffset = 0,
    navButtonShadow,
    configUrl,
    configKey = 'items',
    stageWidth = 460,
    stageHeight = 352,
  } = options;

  const cardsLayer = new createjs.Container();
  const uiLayer = new createjs.Container();

  const maskShape = new createjs.Shape();
  maskShape.graphics.f('#000000').drawRect(0, galleryY, stageWidth, galleryHeight);
  cardsLayer.mask = maskShape;

  root.addChild(uiLayer);
  root.addChild(cardsLayer);

  let gallery: Lib = null;

  let loadingGif: HTMLDivElement | null = null;
  const loadingEl = document.getElementById('animation_container');
  if (loadingEl) {
    loadingGif = document.createElement('div');
    loadingGif.id = 'gallery-loading-indicator';
    loadingGif.style.cssText =
      'position:absolute;left:50%;top:50%;width:96px;height:12px;' +
      'transform:translate(-50%,-50%);pointer-events:none;z-index:5;' +
      `background:url('${LOADING_GIF}') -2px -2px no-repeat;background-size:100px 16px;`;
    loadingEl.appendChild(loadingGif);
  }

  const clearLoading = (): void => {
    if (loadingGif && loadingGif.parentNode) loadingGif.parentNode.removeChild(loadingGif);
  };

  const navQueue = new createjs.LoadQueue(false);
  navQueue.setMaxConnections(8);
  navQueue.loadManifest([
    { id: 'btn_left', src: leftButtonSrc },
    { id: 'btn_right', src: rightButtonSrc },
  ]);

  navQueue.on('complete', () => {
    const makeButton = (src: string, onClick: () => void): Lib => {
      const btn = ui.createButton(navQueue.getResult(src), {
        scale: navScale,
        regX: 128,
        regY: 128,
        onClick,
      });
      if (navButtonShadow) btn.shadow = new createjs.Shadow(navButtonShadow, 0, 2, 6);
      return btn;
    };

    const lb = makeButton('btn_left', () => gallery && gallery.move(-1));
    lb.x = 48;
    lb.y = navY;
    uiLayer.addChild(lb);

    const rb = makeButton('btn_right', () => gallery && gallery.move(1));
    rb.x = 412;
    rb.y = navY;
    uiLayer.addChild(rb);
  });

  const imgQueue = new createjs.LoadQueue(false);
  imgQueue.setMaxConnections(8);
  imgQueue.loadManifest(SHINE_MANIFEST);

  const renderCards = (items: GalleryItem[]): void => {
    clearLoading();

    const preview = new ui.PreviewOverlay(root, {
      width: stageWidth,
      height: stageHeight,
      centerX,
      centerY,
      onOpen: () => {
        uiLayer.visible = cardsLayer.visible = false;
        gallery.updateOverlays(true, imgQueue, imagePrefix);
      },
      onClose: () => {
        uiLayer.visible = cardsLayer.visible = true;
        gallery.updateOverlays(false, imgQueue, imagePrefix);
      },
    });

    const cards: Lib[] = [];
    for (let i = 0; i < items.length; i++) {
      const entry = items[i];
      const imageObj = imgQueue.getResult(imagePrefix + i);
      if (!imageObj) continue;

      const card = ui.createGalleryCard(imageObj, {
        ratio: entry.ratio,
        displayName: entry.displayName,
        shineImage: imgQueue.getResult('shine_' + entry.ratio),
        shadowColor: cardShadowColor,
        textColor: cardTextColor,
      });
      if (cardYOffset && card.artBmp) card.artBmp.y += cardYOffset;
      card.entry = entry;

      if (entry.link && entry.link.trim() !== '') {
        card.cursor = 'pointer';
        card.on('mouseover', () => audio.play('hoverwav'));
        card.on('click', (evt: Lib) => {
          audio.play('clickywav');
          const win = window.open(evt.currentTarget.entry.link, '_blank');
          if (win) win.opener = null;
        });
      } else {
        card.cursor = 'zoom-in';
        card.on('click', () => {
          if (Math.abs(gallery.distanceFromCenter(cards.indexOf(card))) > 0.1) return;
          preview.show(entry, imageObj, assetPath);
        });
      }

      cardsLayer.addChild(card);
      cards.push(card);
    }

    if (!cards.length) {
      const text = new createjs.Text('No items found', '20px Trebuchet MS', cardTextColor);
      text.textAlign = 'center';
      text.x = centerX;
      text.y = centerY - 10;
      uiLayer.addChild(text);
      return;
    }

    gallery = new ui.Gallery(cards, {
      centerX,
      centerY,
      spacing,
      onTweenUpdate: (card: Lib, offset: number) => {
        if (card.artBmp) {
          card.artBmp.visible = !(
            Math.abs(offset) < 0.1 && card.entry.filename.toLowerCase().endsWith('.gif')
          );
        }
        gallery.updateOverlays(preview.isOpen, imgQueue, imagePrefix);
      },
    });

    gallery.setupDOMOverlays(assetPath);
    gallery.update(false);
    gallery.updateOverlays(false, imgQueue, imagePrefix);
  };

  const build = (items: GalleryItem[]): void => {
    const normalized = ui.normalizeItems(items, [], defaultRatio);
    for (let i = 0; i < normalized.length; i++) {
      imgQueue.loadFile({
        id: imagePrefix + i,
        src: encodeURI(assetPath + normalized[i].filename),
      });
    }
    imgQueue.on('complete', () => renderCards(normalized));
    imgQueue.load();
    navQueue.load();
  };

  if (configUrl) {
    const configQueue = new createjs.LoadQueue(true);
    configQueue.on('complete', () => {
      const cfg = configQueue.getResult('config');
      build(cfg && cfg[configKey] ? cfg[configKey] : []);
    });
    configQueue.on('error', () => build([]));
    configQueue.loadFile({ id: 'config', src: configUrl, type: 'json' });
  } else {
    build([]);
  }
}
