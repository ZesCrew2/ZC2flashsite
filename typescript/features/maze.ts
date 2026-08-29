import { assets as assetManager } from '../core/asset-manager.js';
import { perf } from '../core/performance-manager.js';
import { engine } from '../core/engine-core.js';
import { Player } from './player.js';
import {
  MOUSE_SENSITIVITY,
  DOOR_SPEED_FACTOR,
  DOOR_OPEN_OFFSET,
  DOOR_CLOSED_OFFSET,
  DOOR_END_TRIGGER_OFFSET,
  WALL_STOP_VOLUME,
  TILE_CENTER,
  WALL_HEIGHT,
  INTERACT_RADIUS,
  MAX_FRAME_DT,
  FRAME_TIME_MS,
  SETTINGS_DELAY_MS,
  SETTING_REMOVE_DELAY_MS,
  TEXT_CHAR_BASE_DELAY_MS,
  TEXT_CHAR_JITTER_MS,
  HUD_MESSAGE_HOLD_MS,
  HUD_CYCLE_MIN_DELAY_MS,
  HUD_CYCLE_JITTER_MS,
  MUSIC_FADE_DURATION_MS,
  MUSIC_FADE_INTERVAL_MS,
  MUSIC_FADE_TARGET_VOLUME,
  END_RELOAD_DELAY_MS,
  FADE_OVERLAY_TRANSITION,
  HUD_FADE_TRANSITION,
  ASSET_MESSAGES,
  ASSET_WALL_DIFF,
  ASSET_WALL_NOR,
  ASSET_WALL_ROUGH,
  ASSET_FLOOR_DIFF,
  ASSET_FLOOR_NOR,
  ASSET_FLOOR_ROUGH,
  ASSET_BTN_CLOSED,
  ASSET_BTN_OPENED,
  ASSET_SKYBOX,
  ASSET_WALL_MOVE,
  ASSET_WALL_STOP,
  ASSET_MAZE_END_IMG,
  SOUND_MAZE_SELECT,
  SOUND_MAZE_TEXTBOX,
  SOUND_MAZE_SWITCH,
  SOUND_MAZE_END_SFX,
  SOUND_MAZE_MUSIC,
} from './maze-config.js';
import {
  ButtonEntity,
  DoorEntity,
  MaterialSet,
  RenderMaterial,
  createMazeMap,
  createMazeButtons,
  createMazeDoors,
} from './maze-data.js';
import { playWebAudioSpatial, startDoorMoveSound } from './maze-audio.js';
import { renderMaze } from './maze-render.js';
import type { MazeInstance, EngineInstance, PlayerInstance, Gl, Lib } from '../types.js';

function requestPointerLock(el: HTMLElement): void {
  const req = (el as Lib).requestPointerLock({ unadjustedMovement: true });
  if (req && typeof req.catch === 'function') {
    req.catch(() => {
      try {
        (el as Lib).requestPointerLock();
      } catch {
        /* ignore */
      }
    });
  }
}

export class Maze implements MazeInstance {
  canvas: HTMLCanvasElement | null = null;
  gl: Gl | null = null;
  engine: EngineInstance | null = null;
  isActive = false;
  fadeOverlay: HTMLDivElement | null = null;
  lastTime = 0;
  startTime = 0;
  audio: Lib | null = null;
  audioCtx: AudioContext | null = null;
  audioBuffers: Record<string, Lib> = {};

  cube: { vao: WebGLVertexArrayObject | null; count: number } | null = null;
  wallMesh: { vao: WebGLVertexArrayObject; count: number } | null = null;
  materials: {
    wall: MaterialSet;
    floor: MaterialSet;
    buttonClosed: WebGLTexture | null;
    buttonOpened: WebGLTexture | null;
    skybox?: RenderMaterial;
  } = {
    wall: { diffuse: null, normal: null, roughness: null },
    floor: { diffuse: null, normal: null, roughness: null },
    buttonClosed: null,
    buttonOpened: null,
  };

  map: number[][] = createMazeMap();
  buttons: ButtonEntity[] = createMazeButtons();
  doors: DoorEntity[] = createMazeDoors();

  messages: string[] = [];
  messageIndex = 0;
  hudElement: HTMLDivElement | null = null;
  allowJumpscares = true;

  player: PlayerInstance | null = null;
  keys: Record<string, boolean> = {};
  mouseSensitivity = MOUSE_SENSITIVITY;
  tickCount = 0;
  started = false;
  lastRenderTime = 0;
  private _settingsScreen: HTMLElement | null = null;

  async init(): Promise<void> {
    if (this.isActive) return;
    this.isActive = true;

    const assets = assetManager;
    this.player = new Player();

    this.audioCtx = new (window.AudioContext || (window as Lib).webkitAudioContext)();

    this.messages = assets.getAsset(ASSET_MESSAGES) || ['...'];

    document.body.classList.add('maze-active');
    const wmp = document.getElementById('wmp') as Lib | null;
    if (wmp && wmp.pause) wmp.pause();

    this.fadeOverlay = document.createElement('div');
    this.fadeOverlay.id = 'maze-fade-overlay';
    Object.assign(this.fadeOverlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      zIndex: '20000',
      transition: FADE_OVERLAY_TRANSITION,
      pointerEvents: 'none',
    });
    document.body.appendChild(this.fadeOverlay);

    setTimeout(() => {
      const settingsScreen = document.createElement('div');
      settingsScreen.id = 'maze-settings';
      Object.assign(settingsScreen.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        zIndex: '25000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'PetscopHand, monospace',
      });
      const currentTierName = (): string => {
        const t = perf.TIER;
        return t === 1 ? 'HIGH' : t === 2 ? 'MEDIUM' : 'LOW';
      };
      settingsScreen.innerHTML = `
        <h1 style="margin-bottom: 40px; font-size: 32px; letter-spacing: 2px;">SELECT GRAPHICS QUALITY</h1>
        <div style="display: flex; gap: 20px;">
          <button class="maze-set-btn" data-tier="1" style="background: none; border: 2px solid white; color: white; padding: 10px 30px; cursor: pointer; font-family: inherit;">HIGH</button>
          <button class="maze-set-btn" data-tier="2" style="background: none; border: 2px solid white; color: white; padding: 10px 30px; cursor: pointer; font-family: inherit;">MEDIUM</button>
          <button class="maze-set-btn" data-tier="3" style="background: none; border: 2px solid white; color: white; padding: 10px 30px; cursor: pointer; font-family: inherit;">LOW</button>
        </div>
        <p id="maze-tier-label" style="margin-top: 40px; font-size: 14px; opacity: 0.6;">(Detected: ${currentTierName()})</p>
      `;
      document.body.appendChild(settingsScreen);

      if (createjs && createjs.Sound) createjs.Sound.play(SOUND_MAZE_SELECT);
      this._settingsScreen = settingsScreen;
    }, SETTINGS_DELAY_MS);

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'maze-canvas';
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '10000',
      backgroundColor: 'black',
      cursor: 'none',
    });
    document.body.appendChild(this.canvas);

    this.hudElement = document.createElement('div');
    this.hudElement.id = 'maze-hud';
    Object.assign(this.hudElement.style, {
      position: 'fixed',
      top: '30px',
      left: '30px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontFamily: "'PetscopHand', 'Courier New', Courier, monospace",
      fontSize: '24px',
      zIndex: '15000',
      pointerEvents: 'none',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
      opacity: '0',
      whiteSpace: 'pre',
      transition: HUD_FADE_TRANSITION,
    });
    document.body.appendChild(this.hudElement);

    this.engine = engine;
    this.gl = this.engine.init(this.canvas);
    this.cube = this.engine.createCube();

    // Bake all static wall tiles (map cell === 1) into a single merged mesh so
    // the entire maze geometry is drawn in one draw call instead of one per
    // tile. This is the primary fix for the lag/freezes.
    const wallOffsets: Array<{ x: number; y: number; z: number }> = [];
    for (let y = 0; y < this.map.length; y++) {
      const row = this.map[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x] === 1) {
          wallOffsets.push({ x: x + TILE_CENTER, y: WALL_HEIGHT, z: y + TILE_CENTER });
        }
      }
    }
    this.wallMesh = this.engine.createMergedCubes(wallOffsets);

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    window.addEventListener(
      'keydown',
      (e: KeyboardEvent) => (this.keys[e.key.toLowerCase()] = true),
    );
    window.addEventListener(
      'keyup',
      (e: KeyboardEvent) => (this.keys[e.key.toLowerCase()] = false),
    );

    this.player.bindMouse(this.canvas, this.mouseSensitivity);

    window.addEventListener('resize', () => {
      this.canvas!.width = window.innerWidth;
      this.canvas!.height = window.innerHeight;
      const res = perf.getSettings().res;
      this.engine.setupFramebuffer(res.w, res.h);
    });

    this.materials.wall = {
      diffuse: this.engine.createTextureFromImage(assets.getAsset(ASSET_WALL_DIFF)),
      normal: this.engine.createTextureFromImage(assets.getAsset(ASSET_WALL_NOR)),
      roughness: this.engine.createTextureFromImage(assets.getAsset(ASSET_WALL_ROUGH)),
    };
    this.materials.floor = {
      diffuse: this.engine.createTextureFromImage(assets.getAsset(ASSET_FLOOR_DIFF)),
      normal: this.engine.createTextureFromImage(assets.getAsset(ASSET_FLOOR_NOR)),
      roughness: this.engine.createTextureFromImage(assets.getAsset(ASSET_FLOOR_ROUGH)),
    };
    this.materials.buttonClosed = this.engine.createTextureFromImage(
      assets.getAsset(ASSET_BTN_CLOSED),
    );
    this.materials.buttonOpened = this.engine.createTextureFromImage(
      assets.getAsset(ASSET_BTN_OPENED),
    );
    this.materials.skybox = {
      diffuse: this.engine.createTextureFromImage(assets.getAsset(ASSET_SKYBOX), true),
    };

    const wallMoveAsset = assets.getAsset(ASSET_WALL_MOVE);
    const wallStopAsset = assets.getAsset(ASSET_WALL_STOP);

    if (window.AudioBuffer && wallMoveAsset instanceof AudioBuffer) {
      this.audioBuffers.wallMove = wallMoveAsset;
    } else if (wallMoveAsset instanceof ArrayBuffer) {
      this.audioBuffers.wallMove = await this.audioCtx.decodeAudioData(wallMoveAsset.slice(0));
    } else {
      throw new Error(
        'Maze: wall_move asset is invalid type. Got: ' +
          (wallMoveAsset ? wallMoveAsset.constructor.name : 'null'),
      );
    }

    if (window.AudioBuffer && wallStopAsset instanceof AudioBuffer) {
      this.audioBuffers.wallStop = wallStopAsset;
    } else if (wallStopAsset instanceof ArrayBuffer) {
      this.audioBuffers.wallStop = await this.audioCtx.decodeAudioData(wallStopAsset.slice(0));
    } else {
      throw new Error(
        'Maze: wall_stop asset is invalid type. Got: ' +
          (wallStopAsset ? wallStopAsset.constructor.name : 'null'),
      );
    }

    requestAnimationFrame((t) => {
      this.lastTime = t;
      this.startTime = t;

      const startMaze = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains('maze-set-btn')) return;

        const selectedTier = parseInt(target.dataset.tier ?? '0', 10);
        if (perf) {
          perf.setTier(selectedTier);
          const label = document.getElementById('maze-tier-label');
          if (label)
            label.innerText = `(Selected: ${selectedTier === 1 ? 'HIGH' : selectedTier === 2 ? 'MEDIUM' : 'LOW'})`;
        }
        this.engine.applyQuality();

        this.started = true;
        this.lastRenderTime = performance.now();

        setTimeout(() => {
          if (this._settingsScreen) {
            this._settingsScreen.remove();
            this._settingsScreen = null;
          }
        }, SETTING_REMOVE_DELAY_MS);

        this.fadeOverlay!.style.opacity = '0';
        if (this.canvas) requestPointerLock(this.canvas);

        if (this.audioCtx!.state === 'suspended') this.audioCtx!.resume();

        this.cycleHUD();

        let vol = 0;
        const duration = MUSIC_FADE_DURATION_MS;
        const interval = MUSIC_FADE_INTERVAL_MS;
        const step = MUSIC_FADE_TARGET_VOLUME / (duration / interval);

        if (createjs && createjs.Sound) {
          this.audio = createjs.Sound.play(SOUND_MAZE_MUSIC, { loop: -1, volume: 0 });
        }

        const fadeIn = setInterval(() => {
          vol += step;
          if (vol >= MUSIC_FADE_TARGET_VOLUME) {
            if (this.audio) this.audio.volume = MUSIC_FADE_TARGET_VOLUME;
            clearInterval(fadeIn);
          } else {
            if (this.audio) this.audio.volume = vol;
          }
        }, interval);

        window.removeEventListener('click', startMaze);

        window.addEventListener('click', () => {
          if (this.isActive && document.pointerLockElement !== this.canvas) {
            if (this.canvas) requestPointerLock(this.canvas);
          } else if (this.isActive) {
            this.interact();
          }
        });
      };

      window.addEventListener('click', startMaze);
      this.loop(t);
    });
  }

  async cycleHUD(): Promise<void> {
    if (!this.isActive) return;
    const msg = this.messages[this.messageIndex];
    this.hudElement!.innerText = '';
    this.hudElement!.style.opacity = '1';
    let current = '';
    for (let i = 0; i < msg.length; i++) {
      if (!this.isActive) return;
      current += msg[i];
      this.hudElement!.textContent = current;
      if (createjs && createjs.Sound) createjs.Sound.play(SOUND_MAZE_TEXTBOX, { volume: 0.1 });
      await new Promise((r) =>
        setTimeout(r, TEXT_CHAR_BASE_DELAY_MS + Math.random() * TEXT_CHAR_JITTER_MS),
      );
    }
    await new Promise((r) => setTimeout(r, HUD_MESSAGE_HOLD_MS));
    if (!this.isActive) return;
    this.hudElement!.style.opacity = '0';
    await new Promise((r) =>
      setTimeout(r, HUD_CYCLE_MIN_DELAY_MS + Math.random() * HUD_CYCLE_JITTER_MS),
    );
    this.messageIndex = (this.messageIndex + 1) % this.messages.length;
    this.cycleHUD();
  }

  interact(): void {
    this.buttons.forEach((btn) => {
      const dx = this.player.x - (btn.x + 0.5);
      const dy = this.player.y - (btn.y + 0.5);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < INTERACT_RADIUS) {
        btn.state = btn.state === 'closed' ? 'opened' : 'closed';
        if (createjs && createjs.Sound) createjs.Sound.play(SOUND_MAZE_SWITCH);

        const door = this.doors.find((d) => d.id === btn.targetId);
        if (door) {
          door.state = btn.state === 'opened' ? 'opening' : 'closing';

          const midX = door.tiles.reduce((sum, t) => sum + t.x, 0) / door.tiles.length;
          const midY = door.tiles.reduce((sum, t) => sum + t.y, 0) / door.tiles.length;

          if (door.moveSource) {
            door.moveSource.stop();
            door.moveSource = null;
          }

          const { source, panner, gainNode } = startDoorMoveSound(
            this.audioCtx!,
            this.audioBuffers,
            midX,
            midY,
            door.offsetY,
          );
          door.moveSource = source;
          door.movePanner = panner;
          door.moveGain = gainNode;
        }
      }
    });
  }

  update(dt: number): void {
    const player = this.player;
    let moveX = 0;
    let moveY = 0;
    const moveCos = Math.cos(player.dir);
    const moveSin = Math.sin(player.dir);

    if (this.keys['w'] || this.keys['arrowup']) {
      moveX += moveSin;
      moveY -= moveCos;
    }
    if (this.keys['s'] || this.keys['arrowdown']) {
      moveX -= moveSin;
      moveY += moveCos;
    }
    if (this.keys['a'] || this.keys['arrowleft']) {
      moveX -= moveCos;
      moveY -= moveSin;
    }
    if (this.keys['d'] || this.keys['arrowright']) {
      moveX += moveCos;
      moveY += moveSin;
    }

    const mag = Math.sqrt(moveX * moveX + moveY * moveY);
    if (mag > 0) {
      moveX /= mag;
      moveY /= mag;
    }

    const isSprinting = this.keys['shift'];
    const currentAccel = isSprinting ? player.accel * 2.2 : player.accel;
    player.velX += moveX * currentAccel * dt;
    player.velY += moveY * currentAccel * dt;
    player.velX *= player.friction;
    player.velY *= player.friction;

    this.doors.forEach((door) => {
      const speed = DOOR_SPEED_FACTOR * dt;
      const midX = door.tiles.reduce((sum, t) => sum + t.x, 0) / door.tiles.length;
      const midY = door.tiles.reduce((sum, t) => sum + t.y, 0) / door.tiles.length;

      if (door.state === 'opening') {
        door.offsetY += speed;
        if (door.offsetY >= DOOR_OPEN_OFFSET) {
          door.offsetY = DOOR_OPEN_OFFSET;
          door.state = 'opened';
          if (door.moveSource) {
            door.moveSource.stop();
            door.moveSource = null;
          }
          playWebAudioSpatial(
            this.audioCtx!,
            this.audioBuffers,
            'wallStop',
            midX,
            midY,
            WALL_STOP_VOLUME,
          );
        }
      } else if (door.state === 'closing') {
        door.offsetY -= speed;
        if (door.offsetY <= DOOR_CLOSED_OFFSET) {
          door.offsetY = DOOR_CLOSED_OFFSET;
          door.state = 'closed';
          if (door.moveSource) {
            door.moveSource.stop();
            door.moveSource = null;
          }
          playWebAudioSpatial(
            this.audioCtx!,
            this.audioBuffers,
            'wallStop',
            midX,
            midY,
            WALL_STOP_VOLUME,
          );
        }
      }
      if (door.movePanner) {
        door.movePanner.positionX.value = midX + TILE_CENTER;
        door.movePanner.positionY.value = WALL_HEIGHT + door.offsetY;
        door.movePanner.positionZ.value = midY + TILE_CENTER;
      }
    });

    if (this.audioCtx) {
      const listener = this.audioCtx.listener;
      const cosP = Math.cos(player.pitch);
      const sinP = Math.sin(player.pitch);
      const cosD = Math.cos(player.dir);
      const sinD = Math.sin(player.dir);

      if (listener.positionX !== undefined) {
        listener.positionX.value = player.x;
        listener.positionY.value = WALL_HEIGHT + player.bobY;
        listener.positionZ.value = player.y;
        listener.forwardX.value = cosP * sinD;
        listener.forwardY.value = sinP;
        listener.forwardZ.value = -cosP * cosD;
        listener.upX.value = -sinP * sinD;
        listener.upY.value = cosP;
        listener.upZ.value = sinP * cosD;
      } else {
        listener.setPosition(player.x, WALL_HEIGHT + player.bobY, player.y);
        listener.setOrientation(cosP * sinD, sinP, -cosP * cosD, -sinP * sinD, cosP, sinP * cosD);
      }
    }

    player.update(dt, this.keys, this.map, this.doors);

    if (Math.floor(player.x) === 19 && Math.floor(player.y) === 9) {
      const finalDoor = this.doors.find((d) => d.id === 'ent_19_9');
      if (finalDoor && finalDoor.offsetY > DOOR_END_TRIGGER_OFFSET) this.triggerEndSequence();
    }
  }

  render(time: number): void {
    renderMaze(this, time);
  }

  loop(currentTime: number): void {
    if (!this.isActive) return;
    const dt = Math.min(MAX_FRAME_DT, (currentTime - this.lastTime) / FRAME_TIME_MS);
    this.lastTime = currentTime;

    // Don't run game logic or rendering until the player has chosen a quality
    // tier (the maze is hidden behind a black overlay before then anyway).
    if (this.started) {
      const settings = perf.getSettings();
      this.tickCount++;

      this.update(dt);

      // Cap rendering to the target FPS so we don't burn the GPU on
      // high-refresh displays (e.g. 144Hz) where rAF fires much faster.
      const frameInterval = 1000 / settings.fps;
      if (
        this.tickCount % settings.logicThrottle === 0 &&
        currentTime - this.lastRenderTime >= frameInterval
      ) {
        this.render(currentTime);
        this.lastRenderTime = currentTime;
      }
    }

    requestAnimationFrame((t) => this.loop(t));
  }

  triggerEndSequence(): void {
    if (!this.isActive) return;
    this.isActive = false;
    const assets = assetManager;
    if (this.audio) {
      this.audio.stop();
      this.audio = null;
    }
    this.doors.forEach((d) => {
      if (d.moveSource) {
        d.moveSource.stop();
        d.moveSource = null;
      }
    });
    if (this.hudElement) {
      this.hudElement.remove();
      this.hudElement = null;
    }
    if (document.exitPointerLock) document.exitPointerLock();

    this.player.unbindMouse();

    const img = assets.getAsset(ASSET_MAZE_END_IMG);
    Object.assign(img.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '30000',
      objectFit: 'contain',
      backgroundColor: 'black',
    });
    document.body.appendChild(img);

    if (createjs && createjs.Sound) createjs.Sound.play(SOUND_MAZE_END_SFX);
    setTimeout(() => {
      location.reload();
    }, END_RELOAD_DELAY_MS);
  }
}

export const maze = new Maze();
