import { Microsite } from '../microsite.js';
import type {
  AssetManager as IAssetManager,
  AssetManagerManifestItem,
  AssetManagerStatic,
  Lib,
} from '../types.js';

export class AssetManager implements IAssetManager {
  queue: Lib;
  onProgress: ((progress: number) => void) | null = null;
  private _onComplete: ((event: Lib) => void) | null = null;
  private _onError: ((event: Lib) => void) | null = null;
  private _deferredResults: Record<string, Lib> | null = null;
  private _deferredLoaded = false;
  private _deferredLoading: Promise<void> | null = null;

  constructor() {
    this.queue = new createjs.LoadQueue(true);

    if (createjs && createjs.Sound) {
      this.queue.installPlugin(createjs.Sound);
    }

    this.queue.on('progress', this._handleProgress.bind(this));
    this.queue.on('complete', this._handleComplete.bind(this));
    this.queue.on('error', this._handleError.bind(this));
  }

  load(manifest?: AssetManagerManifestItem[]): Promise<Lib> {
    manifest = manifest || (AssetManager.MANIFEST as AssetManagerManifestItem[]);
    return new Promise<Lib>((resolve, reject) => {
      this._onComplete = resolve;
      this._onError = reject;
      this.queue.loadManifest(manifest);
    });
  }

  static ALIASES: Record<string, string> = {
    site_click: 'clickywav',
    site_hover: 'hoverwav',
    site_scream: 'screamwav',
    snd_badexplosionwav: 'snd_badexplosion',
    Duccwav: 'ducc',
  };

  getAsset(id: string): Lib | null {
    let result = this.queue.getResult(id);
    if (!result && AssetManager.ALIASES[id]) {
      result = this.queue.getResult(AssetManager.ALIASES[id]);
    }
    if (!result && this._deferredResults && this._deferredResults[id]) {
      result = this._deferredResults[id];
    }
    return result;
  }

  loadDeferred(): Promise<void> {
    if (this._deferredLoaded) return Promise.resolve();
    if (this._deferredLoading) return this._deferredLoading;

    this._deferredResults = {};
    this._deferredLoading = new Promise<void>((resolve, reject) => {
      const deferredQueue = new createjs.LoadQueue(true);
      if (createjs && createjs.Sound) {
        deferredQueue.installPlugin(createjs.Sound);
      }
      deferredQueue.on('fileload', (evt: Lib) => {
        this._deferredResults![evt.item.id] = evt.result;
      });
      deferredQueue.on('complete', () => {
        this._deferredLoaded = true;
        this._deferredLoading = null;
        resolve();
      });
      deferredQueue.on('error', (evt: Lib) => {
        reject(evt);
      });
      deferredQueue.loadManifest(AssetManager.DEFERRED_MANIFEST);
    });
    return this._deferredLoading;
  }

  private _handleProgress(event: Lib): void {
    if (this.onProgress) this.onProgress(event.progress);
  }

  private _handleComplete(event: Lib): void {
    if (this._onComplete) this._onComplete(event);
  }

  private _handleError(event: Lib): void {
    if (this._onError) this._onError(event);
  }

  static MANIFEST: AssetManagerManifestItem[] = [
    { id: 'site_logo', src: 'assets/img/zc2aeroorb.png' },
    { id: 'site_speaker', src: 'assets/img/speaker.png' },
    { id: 'site_banner', src: 'assets/img/banner/banner.png' },
    { id: 'site_rss', src: 'assets/img/rss.svg' },
    { id: 'zc2banner_atlas_1', src: 'assets/swf/banner/images/zc2banner_atlas_1.png' },
    { id: 'zc2banner_atlas_2', src: 'assets/swf/banner/images/zc2banner_atlas_2.png' },
    { id: 'zc2banner_atlas_3', src: 'assets/swf/banner/images/zc2banner_atlas_3.png' },
    { id: 'clickywav', src: 'assets/sounds/clicky.wav' },
    { id: 'hoverwav', src: 'assets/sounds/hover.wav' },
    { id: 'site_notif', src: 'assets/sounds/click.webm' },
    { id: 'site_medal', src: 'assets/sounds/mm_medal_click.wav' },
    { id: 'screamwav', src: 'assets/sounds/scream.wav' },
    { id: 'snd_badexplosion', src: 'assets/sounds/snd_badexplosion.wav' },
    { id: 'ducc', src: 'assets/sounds/ducc.wav' },
    { id: 'luigi1', src: 'assets/sounds/mk64_luigi01.wav' },
    { id: 'luigi2', src: 'assets/sounds/mk64_luigi02.wav' },
    { id: 'luigi3', src: 'assets/sounds/mk64_luigi03.wav' },
    { id: 'luigi4', src: 'assets/sounds/mk64_luigi06.wav' },
  ];

  static DEFERRED_MANIFEST: AssetManagerManifestItem[] = [
    { id: 'maze_messages', src: 'assets/json/maze_messages.json' },
    {
      id: 'wall_diff',
      src: 'assets/img/maze-textures/cracked_concrete_wall/cracked_concrete_wall_diff_1k.jpg',
    },
    {
      id: 'wall_nor',
      src: 'assets/img/maze-textures/cracked_concrete_wall/cracked_concrete_wall_nor_gl_1k.png',
    },
    {
      id: 'wall_rough',
      src: 'assets/img/maze-textures/cracked_concrete_wall/cracked_concrete_wall_rough_1k.png',
    },
    {
      id: 'floor_diff',
      src: 'assets/img/maze-textures/stained_pine_floor/stained_pine_diff_1k.jpg',
    },
    {
      id: 'floor_nor',
      src: 'assets/img/maze-textures/stained_pine_floor/stained_pine_nor_gl_1k.png',
    },
    {
      id: 'floor_rough',
      src: 'assets/img/maze-textures/stained_pine_floor/stained_pine_rough_1k.png',
    },
    { id: 'btn_closed', src: 'assets/img/maze-textures/button_closed.png' },
    { id: 'btn_opened', src: 'assets/img/maze-textures/button_opened.png' },
    { id: 'skybox', src: 'assets/img/maze-textures/skybox.png' },
    { id: 'maze_end_img', src: 'assets/img/maze-textures/end_asset.png' },
    {
      id: 'wall_move',
      src: 'assets/sounds/maze_sounds/wall_move.wav?type=binary',
      type: createjs.Types.BINARY,
    },
    {
      id: 'wall_stop',
      src: 'assets/sounds/maze_sounds/wall_stop.wav?type=binary',
      type: createjs.Types.BINARY,
    },
    { id: 'maze_music', src: 'assets/music/maze_music/song.mp3' },
    { id: 'maze_select', src: 'assets/sounds/maze_sounds/select.wav' },
    { id: 'maze_textbox', src: 'assets/sounds/maze_sounds/textbox.wav' },
    { id: 'maze_switch', src: 'assets/sounds/maze_sounds/switch_on.wav' },
    { id: 'maze_end_sfx', src: 'assets/sounds/maze_sounds/end_asset.wav' },
  ];
}

Microsite.AssetManager = AssetManager;
Microsite.assets = new AssetManager();
