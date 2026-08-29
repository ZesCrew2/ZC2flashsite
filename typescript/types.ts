export type Lib = any;

export type Gl = WebGL2RenderingContext;

export interface PlaylistTrack {
  path: string;
  name: string;
}

export interface SiteAudio {
  isMuted: boolean;
}

export interface GalleryItem {
  filename: string;
  displayName: string;
  link: string;
  ratio: string;
}

export interface GalleryCardOptions {
  ratio?: string;
  sizeMode?: string;
  bgColor?: string;
  borderColor?: string;
  shadowColor?: string;
  shineImage?: Lib;
  displayName?: string;
  font?: string;
  textColor?: string;
  scale?: number;
  regX?: number;
  regY?: number;
  hoverImage?: Lib;
  hoverSound?: boolean;
  clickSound?: boolean;
  brightnessAdd?: number;
  onClick?: (evt: Lib) => void;
}

export interface GalleryLayout {
  scale: number;
  y: number;
}

export interface TickerApi {
  FPS_FLASH: number;
  createThrottledTick(stage: Lib, fps?: number): (event: Lib) => void;
  shouldUpdate(lastTime: number, fps?: number): { ready: boolean; newTime?: number };
}

export interface ShaderApi {
  instance: Lib | null;
  setMode(mode: number | string): void;
  setSpeed(speed: number): void;
  setIntensity(freq: number, amp: number): void;
  loadShader?: (path: string) => Promise<void>;
}

export interface UiApi {
  galleryDimensions: Record<string, { w: number; h: number }>;
  normalizeItems(
    items: GalleryItem[] | null | undefined,
    fallbackItems: GalleryItem[],
    defaultRatio?: string,
  ): GalleryItem[];
  getFitLayout(
    imgW: number,
    imgH: number,
    cardW: number,
    cardH: number,
    padding?: number,
  ): GalleryLayout;
  createGalleryCard(imageObj: Lib, options?: GalleryCardOptions): Lib;
  PreviewOverlay: new (root: Lib, options?: PreviewOverlayOptions) => Lib;
  createButton(imageObj: Lib, options?: GalleryCardOptions): Lib;
  Gallery: new (cards: Lib[], options?: GalleryOptions) => Lib;
}

export interface PreviewOverlayOptions {
  width?: number;
  height?: number;
  centerX?: number;
  centerY?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface GalleryOptions {
  centerX?: number;
  centerY?: number;
  spacing?: number;
  onTweenUpdate?: (card: Lib, offset: number) => void;
}

export interface AudioApi {
  play(id: string, loop?: number, offset?: number): unknown;
  playWithChance(soundId: string, probability?: number): unknown;
  scream(): unknown;
}

export interface AssetManagerManifestItem {
  id: string;
  src: string;
  type?: string;
}

export interface AssetManager {
  getAsset(id: string): Lib | null;
  load(manifest?: AssetManagerManifestItem[]): Promise<Lib>;
  loadAudio(): Promise<void>;
  loadDeferred(): Promise<void>;
  onProgress: ((progress: number) => void) | null;
}

export interface AssetManagerStatic {
  new (): AssetManager;
  MANIFEST: AssetManagerManifestItem[];
  DEFERRED_MANIFEST: AssetManagerManifestItem[];
  ALIASES: Record<string, string>;
}

export interface PerformanceSettings {
  fps: number;
  precision: string;
  pbr: boolean;
  wiggle: boolean;
  skybox: boolean;
  dither: boolean;
  postProcessing: boolean;
  highResAssets: boolean;
  logicThrottle: number;
  res: { w: number; h: number };
}

export interface PerformanceManager {
  TIER: number;
  init(): void;
  setTier(tier: number): void;
  detectTier(): void;
  getSettings(): PerformanceSettings;
}

export interface EngineInstance {
  gl: Gl | null;
  uniforms: Record<string, WebGLUniformLocation | null>;
  currentRes: { w: number; h: number };
  pool: {
    getVec3(): Float32Array;
    getMat4(): Float32Array;
    recycle(obj: Float32Array): void;
  };
  init(canvas: HTMLCanvasElement): Gl | null;
  createCube(): { vao: WebGLVertexArrayObject; count: number };
  createMergedCubes(offsets: Array<{ x: number; y: number; z: number }>): {
    vao: WebGLVertexArrayObject;
    count: number;
  };
  applyQuality(): void;
  setupFramebuffer(w: number, h: number): void;
  startFrame(): void;
  endFrame(
    w: number,
    h: number,
    xOffset: number,
    yOffset: number,
    screenW: number,
    screenH: number,
  ): void;
  createTextureFromImage(img: HTMLImageElement, nearest?: boolean): WebGLTexture;
}

export interface PlayerInstance {
  x: number;
  y: number;
  dir: number;
  pitch: number;
  targetDir: number;
  targetPitch: number;
  rotVelDir: number;
  rotVelPitch: number;
  rotFriction: number;
  roll: number;
  fov: number;
  velX: number;
  velY: number;
  accel: number;
  friction: number;
  neckLength: number;
  bobTimer: number;
  bobX: number;
  bobY: number;
  jitterTimer: number;
  jitter: number;
  lean: number;
  stateWeight: number;
  sprintWeight: number;
  radius: number;
  canvas?: HTMLCanvasElement;
  update(dt: number, keys: Record<string, boolean>, map: number[][], doors: Lib[]): void;
  handleMouseMove(e: MouseEvent, canvas: HTMLCanvasElement, sensitivity: number): void;
  bindMouse(canvas: HTMLCanvasElement, sensitivity: number): void;
  unbindMouse(): void;
  getEyePosition(): [number, number, number];
}

export interface MazeInstance {
  init(): Promise<void>;
}

export interface BootManagerInstance {
  init(): Promise<void>;
}

export interface Microsite {
  ticker: TickerApi;
  shader: ShaderApi;
  ui: UiApi;
  audio: AudioApi;
  AssetManager?: AssetManagerStatic;
  assets?: AssetManager;
  perf?: PerformanceManager;
  engine?: EngineInstance;
  Player?: new () => PlayerInstance;
  maze?: MazeInstance;
  boot?: BootManagerInstance;
}
