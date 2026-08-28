import { Microsite } from '../microsite.js';
import type { PlayerInstance, Lib } from '../types.js';

export class Player implements PlayerInstance {
  x = 1.5;
  y = 18.5;
  dir = 0;
  pitch = 0;
  targetDir = 0;
  targetPitch = 0;
  rotVelDir = 0;
  rotVelPitch = 0;
  rotFriction = 0.75;
  roll = 0;
  fov = (100 * Math.PI) / 180;
  velX = 0;
  velY = 0;
  accel = 0.005;
  friction = 0.86;
  neckLength = 0.12;
  bobTimer = 0;
  bobX = 0;
  bobY = 0;
  jitterTimer = 0;
  jitter = 0;
  lean = 0;
  stateWeight = 0;
  sprintWeight = 0;
  radius = 0.2;
  canvas?: HTMLCanvasElement;
  private _mouseMoveHandler?: (e: MouseEvent) => void;

  update(dt: number, keys: Record<string, boolean>, map: number[][], doors: Lib[]): void {
    let moveX = 0;
    let moveY = 0;
    const moveCos = Math.cos(this.dir);
    const moveSin = Math.sin(this.dir);

    if (keys['w'] || keys['arrowup']) {
      moveX += moveSin;
      moveY -= moveCos;
    }
    if (keys['s'] || keys['arrowdown']) {
      moveX -= moveSin;
      moveY += moveCos;
    }
    if (keys['a'] || keys['arrowleft']) {
      moveX -= moveCos;
      moveY -= moveSin;
    }
    if (keys['d'] || keys['arrowright']) {
      moveX += moveCos;
      moveY += moveSin;
    }

    const mag = Math.sqrt(moveX * moveX + moveY * moveY);
    if (mag > 0) {
      moveX /= mag;
      moveY /= mag;
    }

    const isSprinting = keys['shift'];
    const currentAccel = isSprinting ? this.accel * 2.2 : this.accel;
    this.velX += moveX * currentAccel * dt;
    this.velY += moveY * currentAccel * dt;
    this.velX *= this.friction;
    this.velY *= this.friction;

    const nextX = this.x + this.velX * dt;
    const nextY = this.y + this.velY * dt;
    const isWall = (x: number, y: number): boolean => {
      const floorX = Math.floor(x);
      const floorY = Math.floor(y);
      if (floorX < 0 || floorX >= 20 || floorY < 0 || floorY >= 20) return true;
      if (map[floorY][floorX] === 1) return true;
      if (map[floorY][floorX] === 3) {
        const door = doors.find((d) => d.tiles.some((t: Lib) => t.x === floorX && t.y === floorY));
        return door && door.offsetY < 0.8;
      }
      return false;
    };

    const r = this.radius;
    if (!isWall(nextX + (this.velX > 0 ? r : -r), this.y)) this.x = nextX;
    else this.velX = 0;
    if (!isWall(this.x, nextY + (this.velY > 0 ? r : -r))) this.y = nextY;
    else this.velY = 0;

    const speed = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
    const targetStateWeight = speed > 0.001 ? 1.0 : 0.0;
    const targetSprintWeight = speed > 0.001 && isSprinting ? 1.0 : 0.0;
    this.stateWeight += (targetStateWeight - this.stateWeight) * 0.08 * dt;
    this.sprintWeight += (targetSprintWeight - this.sprintWeight) * 0.08 * dt;

    const mix = (a: number, b: number, t: number): number => a * (1 - t) + b * t;

    this.targetDir += this.rotVelDir * dt;
    this.targetPitch += this.rotVelPitch * dt;

    this.targetPitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, this.targetPitch));

    this.rotVelDir *= Math.pow(this.rotFriction, dt);
    this.rotVelPitch *= Math.pow(this.rotFriction, dt);

    const lagFactor = 0.25;
    this.dir += (this.targetDir - this.dir) * lagFactor * dt;
    this.pitch += (this.targetPitch - this.pitch) * lagFactor * dt;

    if (this.stateWeight > 0.01) {
      const walkSpeed = 0.14;
      const bobFreq = this.sprintWeight > 0.5 ? walkSpeed * 1.8 : walkSpeed;
      this.bobTimer += bobFreq * dt * this.stateWeight;

      this.bobY = Math.sin(this.bobTimer) * (0.02 + this.sprintWeight * 0.03) * this.stateWeight;
      this.bobX =
        Math.cos(this.bobTimer * 0.5) * (0.03 + this.sprintWeight * 0.04) * this.stateWeight;

      this.jitterTimer += dt * 75.0;
      const jitterIntensity = 0.001 + this.sprintWeight * 0.002;
      this.jitter = Math.sin(this.jitterTimer) * jitterIntensity * this.stateWeight;

      const leanIntensity = 0.8;
      const targetRoll = (this.dir - this.targetDir) * leanIntensity;
      this.roll = mix(
        this.roll,
        targetRoll + Math.sin(this.bobTimer * 0.5) * (0.02 + this.sprintWeight * 0.04),
        0.1,
      );
    } else {
      this.bobX *= 0.9;
      this.bobY *= 0.9;
      this.roll *= 0.9;
      this.jitter = 0;
    }
    this.lean *= 0.95;
  }

  handleMouseMove(e: MouseEvent, _canvas: HTMLCanvasElement, sensitivity: number): void {
    if (document.pointerLockElement === _canvas) {
      this.rotVelDir += e.movementX * sensitivity;
      this.rotVelPitch -= e.movementY * 0.002;

      this.targetPitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, this.targetPitch));
      this.lean = Math.max(-0.05, Math.min(0.05, -e.movementX * 0.001));
    }
  }

  bindMouse(canvas: HTMLCanvasElement, sensitivity: number): void {
    this.canvas = canvas;
    this._mouseMoveHandler = (e: MouseEvent) => this.handleMouseMove(e, canvas, sensitivity);
    document.addEventListener('mousemove', this._mouseMoveHandler);
  }

  unbindMouse(): void {
    if (this._mouseMoveHandler) {
      document.removeEventListener('mousemove', this._mouseMoveHandler);
      this._mouseMoveHandler = undefined;
    }
  }

  getEyePosition(): [number, number, number] {
    const cosP = Math.cos(this.pitch);
    const sinP = Math.sin(this.pitch);
    const cosD = Math.cos(this.dir);
    const sinD = Math.sin(this.dir);

    const forwardX = cosP * sinD;
    const forwardY = sinP;
    const forwardZ = -cosP * cosD;

    return [
      this.x + this.bobX + forwardX * this.neckLength,
      0.5 + this.bobY + this.jitter + forwardY * this.neckLength,
      this.y + forwardZ * this.neckLength,
    ];
  }
}

Microsite.Player = Player;
