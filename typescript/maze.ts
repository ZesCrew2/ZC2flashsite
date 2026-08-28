import { Microsite } from "./microsite.js";
import type { MazeInstance, Lib } from "./types.js";

interface ButtonEntity {
  x: number;
  y: number;
  state: string;
  targetId: string;
}

interface DoorEntity {
  id: string;
  tiles: { x: number; y: number }[];
  offsetY: number;
  state: string;
  moveSource: Lib | null;
  movePanner: Lib | null;
  moveGain?: Lib;
}

interface MaterialSet {
  diffuse: Lib;
  normal: Lib;
  roughness: Lib;
}

export class Maze implements MazeInstance {
  canvas: HTMLCanvasElement | null = null;
  gl: Lib | null = null;
  engine: Lib | null = null;
  isActive = false;
  fadeOverlay: HTMLDivElement | null = null;
  lastTime = 0;
  startTime = 0;
  audio: Lib | null = null;
  audioCtx: AudioContext | null = null;
  audioBuffers: Record<string, Lib> = {};

  cube: { vao: Lib; count: number } | null = null;
  materials: {
    wall: MaterialSet;
    floor: MaterialSet;
    buttonClosed: Lib;
    buttonOpened: Lib;
    skybox?: { diffuse: Lib };
  } = {
    wall: { diffuse: null, normal: null, roughness: null },
    floor: { diffuse: null, normal: null, roughness: null },
    buttonClosed: null,
    buttonOpened: null,
  };

  map: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 2, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 2, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  buttons: ButtonEntity[] = [
    { x: 1, y: 5, state: "closed", targetId: "ent_10_9" },
    { x: 15, y: 1, state: "closed", targetId: "ent_19_9" },
  ];

  doors: DoorEntity[] = [
    { id: "ent_10_9", tiles: [{ x: 10, y: 9 }], offsetY: 0.0, state: "closed", moveSource: null, movePanner: null },
    { id: "ent_19_9", tiles: [{ x: 19, y: 9 }], offsetY: 0.0, state: "closed", moveSource: null, movePanner: null },
  ];

  messages: string[] = [];
  messageIndex = 0;
  hudElement: HTMLDivElement | null = null;
  allowJumpscares = true;

  player: Lib = null;
  keys: Record<string, boolean> = {};
  mouseSensitivity = 0.0015;
  tickCount = 0;
  private _settingsScreen: HTMLElement | null = null;

  async init(): Promise<void> {
    if (this.isActive) return;
    this.isActive = true;

    const assets = Microsite.assets!;
    this.player = new Microsite.Player!();

    this.audioCtx = new (window.AudioContext || (window as Lib).webkitAudioContext)();

    this.messages = assets.getAsset("maze_messages") || ["..."];

    document.body.classList.add("maze-active");
    const wmp = document.getElementById("wmp") as Lib | null;
    if (wmp && wmp.pause) wmp.pause();

    this.fadeOverlay = document.createElement("div");
    this.fadeOverlay.id = "maze-fade-overlay";
    Object.assign(this.fadeOverlay.style, {
      position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
      backgroundColor: "black", zIndex: "20000", transition: "opacity 4s ease", pointerEvents: "none",
    });
    document.body.appendChild(this.fadeOverlay);

    setTimeout(() => {
      const settingsScreen = document.createElement("div");
      settingsScreen.id = "maze-settings";
      Object.assign(settingsScreen.style, {
        position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
        backgroundColor: "black", zIndex: "25000", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", color: "white", fontFamily: "PetscopHand, monospace",
      });
      const currentTierName = (): string => {
        const t = Microsite.perf?.TIER;
        return t === 1 ? "HIGH" : t === 2 ? "MEDIUM" : "LOW";
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

      if (createjs && createjs.Sound) createjs.Sound.play("maze_select");
      this._settingsScreen = settingsScreen;
    }, 3000);

    this.canvas = document.createElement("canvas");
    this.canvas.id = "maze-canvas";
    Object.assign(this.canvas.style, {
      position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
      zIndex: "10000", backgroundColor: "black", cursor: "none",
    });
    document.body.appendChild(this.canvas);

    this.hudElement = document.createElement("div");
    this.hudElement.id = "maze-hud";
    Object.assign(this.hudElement.style, {
      position: "fixed", top: "30px", left: "30px",
      color: "rgba(255, 255, 255, 0.9)",
      fontFamily: "'PetscopHand', 'Courier New', Courier, monospace",
      fontSize: "24px", zIndex: "15000", pointerEvents: "none",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", opacity: "0", transition: "opacity 2s ease",
    });
    document.body.appendChild(this.hudElement);

    this.engine = Microsite.engine!;
    this.gl = this.engine.init(this.canvas);
    this.cube = this.engine.createCube();

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    window.addEventListener("keydown", (e: KeyboardEvent) => (this.keys[e.key.toLowerCase()] = true));
    window.addEventListener("keyup", (e: KeyboardEvent) => (this.keys[e.key.toLowerCase()] = false));

    this.player.bindMouse(this.canvas, this.mouseSensitivity);

    window.addEventListener("resize", () => {
      this.canvas!.width = window.innerWidth;
      this.canvas!.height = window.innerHeight;
      const res = Microsite.perf?.getSettings().res || { w: 800, h: 600 };
      this.engine.setupFramebuffer(res.w, res.h);
    });

    this.materials.wall = {
      diffuse: this.engine.createTextureFromImage(assets.getAsset("wall_diff")),
      normal: this.engine.createTextureFromImage(assets.getAsset("wall_nor")),
      roughness: this.engine.createTextureFromImage(assets.getAsset("wall_rough")),
    };
    this.materials.floor = {
      diffuse: this.engine.createTextureFromImage(assets.getAsset("floor_diff")),
      normal: this.engine.createTextureFromImage(assets.getAsset("floor_nor")),
      roughness: this.engine.createTextureFromImage(assets.getAsset("floor_rough")),
    };
    this.materials.buttonClosed = this.engine.createTextureFromImage(assets.getAsset("btn_closed"));
    this.materials.buttonOpened = this.engine.createTextureFromImage(assets.getAsset("btn_opened"));
    this.materials.skybox = { diffuse: this.engine.createTextureFromImage(assets.getAsset("skybox"), true) };

    const wallMoveAsset = assets.getAsset("wall_move");
    const wallStopAsset = assets.getAsset("wall_stop");

    if (window.AudioBuffer && wallMoveAsset instanceof AudioBuffer) {
      this.audioBuffers.wallMove = wallMoveAsset;
    } else if (wallMoveAsset instanceof ArrayBuffer) {
      this.audioBuffers.wallMove = await this.audioCtx.decodeAudioData(wallMoveAsset.slice(0));
    } else {
      throw new Error("Maze: wall_move asset is invalid type. Got: " + (wallMoveAsset ? wallMoveAsset.constructor.name : "null"));
    }

    if (window.AudioBuffer && wallStopAsset instanceof AudioBuffer) {
      this.audioBuffers.wallStop = wallStopAsset;
    } else if (wallStopAsset instanceof ArrayBuffer) {
      this.audioBuffers.wallStop = await this.audioCtx.decodeAudioData(wallStopAsset.slice(0));
    } else {
      throw new Error("Maze: wall_stop asset is invalid type. Got: " + (wallStopAsset ? wallStopAsset.constructor.name : "null"));
    }

    requestAnimationFrame((t) => {
      this.lastTime = t;
      this.startTime = t;

      const startMaze = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains("maze-set-btn")) return;

        const selectedTier = parseInt(target.dataset.tier ?? "0", 10);
        if (Microsite.perf) {
          Microsite.perf.setTier(selectedTier);
          const label = document.getElementById("maze-tier-label");
          if (label) label.innerText = `(Selected: ${selectedTier === 1 ? "HIGH" : selectedTier === 2 ? "MEDIUM" : "LOW"})`;
        }
        this.engine.applyQuality();

        setTimeout(() => {
          if (this._settingsScreen) {
            this._settingsScreen.remove();
            this._settingsScreen = null;
          }
        }, 200);

        this.fadeOverlay!.style.opacity = "0";
        this.canvas!.requestPointerLock({ unadjustedMovement: true });

        if (this.audioCtx!.state === "suspended") this.audioCtx!.resume();

        this.cycleHUD();

        let vol = 0;
        const duration = 5000;
        const interval = 100;
        const step = 0.7 / (duration / interval);

        if (createjs && createjs.Sound) {
          this.audio = createjs.Sound.play("maze_music", { loop: -1, volume: 0 });
        }

        const fadeIn = setInterval(() => {
          vol += step;
          if (vol >= 0.7) {
            if (this.audio) this.audio.volume = 0.7;
            clearInterval(fadeIn);
          } else {
            if (this.audio) this.audio.volume = vol;
          }
        }, interval);

        window.removeEventListener("click", startMaze);

        window.addEventListener("click", () => {
          if (this.isActive && document.pointerLockElement !== this.canvas) {
            this.canvas!.requestPointerLock({ unadjustedMovement: true });
          } else if (this.isActive) {
            this.interact();
          }
        });
      };

      window.addEventListener("click", startMaze);
      this.loop(t);
    });
  }

  async cycleHUD(): Promise<void> {
    if (!this.isActive) return;
    const msg = this.messages[this.messageIndex];
    this.hudElement!.innerText = "";
    this.hudElement!.style.opacity = "1";
    for (let i = 0; i < msg.length; i++) {
      if (!this.isActive) return;
      if (msg[i] === " ") this.hudElement!.innerHTML += "&nbsp;";
      else {
        this.hudElement!.innerText += msg[i];
        if (createjs && createjs.Sound) createjs.Sound.play("maze_textbox", { volume: 0.1 });
      }
      await new Promise((r) => setTimeout(r, 50 + Math.random() * 50));
    }
    await new Promise((r) => setTimeout(r, 5000));
    if (!this.isActive) return;
    this.hudElement!.style.opacity = "0";
    await new Promise((r) => setTimeout(r, 5000 + Math.random() * 10000));
    this.messageIndex = (this.messageIndex + 1) % this.messages.length;
    this.cycleHUD();
  }

  interact(): void {
    this.buttons.forEach((btn) => {
      const dx = this.player.x - (btn.x + 0.5);
      const dy = this.player.y - (btn.y + 0.5);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.2) {
        btn.state = btn.state === "closed" ? "opened" : "closed";
        if (createjs && createjs.Sound) createjs.Sound.play("maze_switch");

        const door = this.doors.find((d) => d.id === btn.targetId);
        if (door) {
          door.state = btn.state === "opened" ? "opening" : "closing";

          const midX = door.tiles.reduce((sum, t) => sum + t.x, 0) / door.tiles.length;
          const midY = door.tiles.reduce((sum, t) => sum + t.y, 0) / door.tiles.length;

          if (door.moveSource) {
            door.moveSource.stop();
            door.moveSource = null;
          }

          const source = this.audioCtx!.createBufferSource();
          source.buffer = this.audioBuffers.wallMove;
          source.loop = true;

          const panner = this.audioCtx!.createPanner();
          panner.panningModel = "HRTF";
          panner.distanceModel = "inverse";
          panner.refDistance = 0.5;
          panner.maxDistance = 20;
          panner.rolloffFactor = 1.5;

          panner.positionX.value = midX + 0.5;
          panner.positionY.value = 0.5 + door.offsetY;
          panner.positionZ.value = midY + 0.5;

          const gainNode = this.audioCtx!.createGain();
          gainNode.gain.value = 4.0;

          source.connect(panner);
          panner.connect(gainNode);
          gainNode.connect(this.audioCtx!.destination);

          door.moveSource = source;
          door.movePanner = panner;
          door.moveGain = gainNode;
          source.start(0);
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

    if (this.keys["w"] || this.keys["arrowup"]) { moveX += moveSin; moveY -= moveCos; }
    if (this.keys["s"] || this.keys["arrowdown"]) { moveX -= moveSin; moveY += moveCos; }
    if (this.keys["a"] || this.keys["arrowleft"]) { moveX -= moveCos; moveY -= moveSin; }
    if (this.keys["d"] || this.keys["arrowright"]) { moveX += moveCos; moveY += moveSin; }

    const mag = Math.sqrt(moveX * moveX + moveY * moveY);
    if (mag > 0) { moveX /= mag; moveY /= mag; }

    const isSprinting = this.keys["shift"];
    const currentAccel = isSprinting ? player.accel * 2.2 : player.accel;
    player.velX += moveX * currentAccel * dt;
    player.velY += moveY * currentAccel * dt;
    player.velX *= player.friction;
    player.velY *= player.friction;

    this.doors.forEach((door) => {
      const speed = 0.01 * dt;
      const midX = door.tiles.reduce((sum, t) => sum + t.x, 0) / door.tiles.length;
      const midY = door.tiles.reduce((sum, t) => sum + t.y, 0) / door.tiles.length;

      if (door.state === "opening") {
        door.offsetY += speed;
        if (door.offsetY >= 1.1) {
          door.offsetY = 1.1;
          door.state = "opened";
          if (door.moveSource) { door.moveSource.stop(); door.moveSource = null; }
          this.playWebAudioSpatial("wallStop", midX, midY, 5.0);
        }
      } else if (door.state === "closing") {
        door.offsetY -= speed;
        if (door.offsetY <= 0.0) {
          door.offsetY = 0.0;
          door.state = "closed";
          if (door.moveSource) { door.moveSource.stop(); door.moveSource = null; }
          this.playWebAudioSpatial("wallStop", midX, midY, 5.0);
        }
      }
      if (door.movePanner) {
        door.movePanner.positionX.value = midX + 0.5;
        door.movePanner.positionY.value = 0.5 + door.offsetY;
        door.movePanner.positionZ.value = midY + 0.5;
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
        listener.positionY.value = 0.5 + player.bobY;
        listener.positionZ.value = player.y;
        listener.forwardX.value = cosP * sinD;
        listener.forwardY.value = sinP;
        listener.forwardZ.value = -cosP * cosD;
        listener.upX.value = -sinP * sinD;
        listener.upY.value = cosP;
        listener.upZ.value = sinP * cosD;
      } else {
        listener.setPosition(player.x, 0.5 + player.bobY, player.y);
        listener.setOrientation(cosP * sinD, sinP, -cosP * cosD, -sinP * sinD, cosP, sinP * cosD);
      }
    }

    player.update(dt, this.keys, this.map, this.doors);

    if (Math.floor(player.x) === 19 && Math.floor(player.y) === 9) {
      const finalDoor = this.doors.find((d) => d.id === "ent_19_9");
      if (finalDoor && finalDoor.offsetY > 0.8) this.triggerEndSequence();
    }
  }

  playWebAudioSpatial(bufferKey: string, x: number, y: number, volume = 1.0): void {
    const source = this.audioCtx!.createBufferSource();
    source.buffer = this.audioBuffers[bufferKey];

    const panner = this.audioCtx!.createPanner();
    panner.panningModel = "HRTF";
    panner.distanceModel = "inverse";
    panner.refDistance = 0.5;
    panner.maxDistance = 20;
    panner.rolloffFactor = 1.5;

    const door = this.doors.find((d) => d.tiles.some((t) => t.x === x && t.y === y));

    panner.positionX.value = x + 0.5;
    panner.positionY.value = 0.5 + (door ? door.offsetY : 0);
    panner.positionZ.value = y + 0.5;

    const gainNode = this.audioCtx!.createGain();
    gainNode.gain.value = volume;

    source.connect(panner);
    panner.connect(gainNode);
    gainNode.connect(this.audioCtx!.destination);
    source.start(0);
  }

  render(time: number): void {
    const gl = this.gl;
    const engine = this.engine;
    const perfSettings = Microsite.perf?.getSettings() || { skybox: true };
    const targetAspect = 4 / 3;
    let viewWidth = window.innerWidth;
    let viewHeight = window.innerHeight;
    const currentAspect = viewWidth / viewHeight;
    if (currentAspect > targetAspect) viewWidth = viewHeight * targetAspect;
    else viewHeight = viewWidth / targetAspect;
    const xOffset = (window.innerWidth - viewWidth) / 2;
    const yOffset = (window.innerHeight - viewHeight) / 2;

    engine.startFrame();
    gl.viewport(0, 0, engine.currentRes.w, engine.currentRes.h);

    if (perfSettings.skybox) gl.clearColor(0.01, 0, 0, 1);
    else gl.clearColor(0, 0, 0, 1);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const projectionMatrix = engine.pool.getMat4();
    mat4.perspective(projectionMatrix, this.player.fov, targetAspect, 0.1, 100.0);

    const viewMatrix = engine.pool.getMat4();

    const eyePos = engine.pool.getVec3();
    const pos = this.player.getEyePosition();
    vec3.set(eyePos, pos[0], pos[1], pos[2]);

    const q = quat.create();
    quat.rotateY(q, q, -this.player.dir);
    quat.rotateX(q, q, this.player.pitch);
    quat.rotateZ(q, q, this.player.roll + this.player.lean);
    mat4.fromRotationTranslation(viewMatrix, q, eyePos);
    mat4.invert(viewMatrix, viewMatrix);

    gl.bindVertexArray(this.cube!.vao);
    gl.uniform3fv(engine.uniforms.viewPos, eyePos);
    gl.uniform1f(engine.uniforms.fogNear, 1.0);
    gl.uniform1f(engine.uniforms.fogFar, 12.0);
    gl.uniform4fv(engine.uniforms.fogColor, [0.02, 0, 0, 1]);
    gl.uniform1f(engine.uniforms.time, (time - this.startTime) * 0.001);

    gl.uniform1f(engine.uniforms.wiggleSpeed, 2.0);
    gl.uniform1f(engine.uniforms.wiggleFreq, 8.0);
    gl.uniform1f(engine.uniforms.wiggleAmp, 0.02);

    const drawMesh = (modelMat: Lib, material: Lib, isEntity = 0.0, isSky = 0.0): void => {
      const mvpMatrix = engine.pool.getMat4();
      mat4.multiply(mvpMatrix, projectionMatrix, viewMatrix);
      mat4.multiply(mvpMatrix, mvpMatrix, modelMat);
      gl.uniformMatrix4fv(engine.uniforms.matrix, false, mvpMatrix);
      gl.uniformMatrix4fv(engine.uniforms.model, false, modelMat);
      gl.uniform1f(engine.uniforms.isEntity, isEntity);
      gl.uniform1f(engine.uniforms.isSky, isSky);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, material.diffuse);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, material.normal || this.materials.wall.normal);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, material.roughness || this.materials.wall.roughness);
      gl.drawElements(gl.TRIANGLES, this.cube!.count, gl.UNSIGNED_SHORT, 0);
      engine.pool.recycle(mvpMatrix);
    };

    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        const cell = this.map[y][x];
        const modelMatrix = engine.pool.getMat4();
        if (cell === 1) {
          mat4.translate(modelMatrix, modelMatrix, [x + 0.5, 0.5, y + 0.5]);
          drawMesh(modelMatrix, this.materials.wall, 0.0);
        } else if (cell === 2) {
          const btn = this.buttons.find((b) => b.x === x && b.y === y);
          let px = x + 0.5;
          let py = 0.5;
          let pz = y + 0.5;
          let sx = 0.3;
          let sy = 0.3;
          let sz = 0.3;
          if (this.map[y][x - 1] === 1) { px -= 0.52; sx = 0.05; }
          else if (this.map[y][x + 1] === 1) { px += 0.52; sx = 0.05; }
          else if (this.map[y - 1][x] === 1) { pz -= 0.52; sz = 0.05; }
          else if (this.map[y + 1][x] === 1) { pz += 0.52; sz = 0.05; }
          mat4.translate(modelMatrix, modelMatrix, [px, py, pz]);
          mat4.scale(modelMatrix, modelMatrix, [sx, sy, sz]);
          drawMesh(modelMatrix, { diffuse: btn!.state === "closed" ? this.materials.buttonClosed : this.materials.buttonOpened }, 1.0);
        } else if (cell === 3) {
          const door = this.doors.find((d) => d.tiles.some((t) => t.x === x && t.y === y));
          mat4.translate(modelMatrix, modelMatrix, [x + 0.5, 0.5 + door!.offsetY, y + 0.5]);
          drawMesh(modelMatrix, this.materials.wall, 0.0);
        }
        engine.pool.recycle(modelMatrix);
      }
    }

    const floorModel = engine.pool.getMat4();
    mat4.translate(floorModel, floorModel, [10, -0.01, 10]);
    mat4.scale(floorModel, floorModel, [20, 0.1, 20]);
    drawMesh(floorModel, this.materials.floor, 0.0);

    let ceilModel: Lib | null = null;
    if (perfSettings.skybox) {
      ceilModel = engine.pool.getMat4();
      mat4.translate(ceilModel, ceilModel, [10, 1.01, 10]);
      mat4.scale(ceilModel, ceilModel, [20, 0.1, 20]);
      drawMesh(ceilModel, this.materials.skybox, 0.0, 1.0);
    }

    engine.endFrame(engine.currentRes.w, engine.currentRes.h, xOffset, yOffset, viewWidth, viewHeight);

    engine.pool.recycle(projectionMatrix);
    engine.pool.recycle(viewMatrix);
    engine.pool.recycle(eyePos);
    engine.pool.recycle(floorModel);
    if (ceilModel) engine.pool.recycle(ceilModel);

    if (this.hudElement) {
      this.hudElement.style.left = xOffset + 30 + "px";
      this.hudElement.style.top = yOffset + 30 + "px";
      this.hudElement.style.maxWidth = viewWidth - 60 + "px";
    }
  }

  loop(currentTime: number): void {
    if (!this.isActive) return;
    const dt = Math.min(1.2, (currentTime - this.lastTime) / 16.6);
    this.lastTime = currentTime;

    const settings = Microsite.perf?.getSettings() || { logicThrottle: 1 };
    this.tickCount++;

    this.update(dt);

    if (this.tickCount % settings.logicThrottle === 0) {
      this.render(currentTime);
    }

    requestAnimationFrame((t) => this.loop(t));
  }

  triggerEndSequence(): void {
    if (!this.isActive) return;
    this.isActive = false;
    const assets = Microsite.assets!;
    if (this.audio) { this.audio.stop(); this.audio = null; }
    this.doors.forEach((d) => { if (d.moveSource) { d.moveSource.stop(); d.moveSource = null; } });
    if (this.hudElement) { this.hudElement.remove(); this.hudElement = null; }
    if (document.exitPointerLock) document.exitPointerLock();

    this.player.unbindMouse();

    const img = assets.getAsset("maze_end_img");
    Object.assign(img.style, {
      position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
      zIndex: "30000", objectFit: "contain", backgroundColor: "black",
    });
    document.body.appendChild(img);

    if (createjs && createjs.Sound) createjs.Sound.play("maze_end_sfx");
    setTimeout(() => { location.reload(); }, 1500);
  }
}

Microsite.maze = new Maze();
