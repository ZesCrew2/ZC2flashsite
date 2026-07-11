(function () {
  "use strict";

  /**
   * Player - Handles state, movement, and realistic POV camera logic.
   */
  class Player {
    constructor() {
      this.x = 1.5;
      this.y = 18.5;
      this.dir = 0;
      this.pitch = 0;
      this.targetDir = 0;
      this.targetPitch = 0;
      this.rotVelDir = 0;
      this.rotVelPitch = 0;
      this.rotFriction = 0.75; // More rigid damping for snappier snaps
      this.roll = 0;
      this.fov = (100 * Math.PI) / 180; // Wide Action-Cam FOV (GoPro style)
      this.velX = 0;
      this.velY = 0;
      this.accel = 0.005; // Doom-like high speed acceleration
      this.friction = 0.86; // Snappy sliding friction
      this.neckLength = 0.12; // Radius from neck pivot to eyes
      this.bobTimer = 0;
      this.bobX = 0;
      this.bobY = 0;
      this.jitterTimer = 0;
      this.jitter = 0;
      this.lean = 0;
      this.stateWeight = 0;
      this.sprintWeight = 0;
      this.radius = 0.2;
    }

    update(dt, keys, map, doors) {
      // ... movement logic ...
      let moveX = 0,
        moveY = 0;
      const moveCos = Math.cos(this.dir);
      const moveSin = Math.sin(this.dir);

      if (keys["w"] || keys["arrowup"]) {
        moveX += moveSin;
        moveY -= moveCos;
      }
      if (keys["s"] || keys["arrowdown"]) {
        moveX -= moveSin;
        moveY += moveCos;
      }
      if (keys["a"] || keys["arrowleft"]) {
        moveX -= moveCos;
        moveY -= moveSin;
      }
      if (keys["d"] || keys["arrowright"]) {
        moveX += moveCos;
        moveY += moveSin;
      }

      const mag = Math.sqrt(moveX * moveX + moveY * moveY);
      if (mag > 0) {
        moveX /= mag;
        moveY /= mag;
      }

      const isSprinting = keys["shift"];
      const currentAccel = isSprinting ? this.accel * 2.2 : this.accel;
      this.velX += moveX * currentAccel * dt;
      this.velY += moveY * currentAccel * dt;
      this.velX *= this.friction;
      this.velY *= this.friction;

      const nextX = this.x + this.velX * dt,
        nextY = this.y + this.velY * dt;
      const isWall = (x, y) => {
        const floorX = Math.floor(x),
          floorY = Math.floor(y);
        if (floorX < 0 || floorX >= 20 || floorY < 0 || floorY >= 20) return true;
        if (map[floorY][floorX] === 1) return true;
        if (map[floorY][floorX] === 3) {
          const door = doors.find((d) =>
            d.tiles.some((t) => t.x === floorX && t.y === floorY),
          );
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

      const mix = (a, b, t) => a * (1 - t) + b * t;

      // TACTICAL CAMERA CONCEPTS:
      // 1. Snappy Damping: Higher friction for rigid, tactical look-snaps
      this.targetDir += this.rotVelDir * dt;
      this.targetPitch += this.rotVelPitch * dt;

      // Clamp target pitch to prevent looking too far up/down
      this.targetPitch = Math.max(
        -Math.PI / 3,
        Math.min(Math.PI / 3, this.targetPitch),
      );

      this.rotVelDir *= Math.pow(this.rotFriction, dt);
      this.rotVelPitch *= Math.pow(this.rotFriction, dt);

      // 2. Inertia (Lerp): Keep smoothing for general drift, but snappier
      const lagFactor = 0.25; 
      this.dir += (this.targetDir - this.dir) * lagFactor * dt;
      this.pitch += (this.targetPitch - this.pitch) * lagFactor * dt;

      if (this.stateWeight > 0.01) {
        // 3. Sprinting Sway (Aggressive Diagonal Rocking)
        const walkSpeed = 0.14;
        const bobFreq = this.sprintWeight > 0.5 ? walkSpeed * 1.8 : walkSpeed;
        this.bobTimer += bobFreq * dt * this.stateWeight;

        // Tactical Crouch-Walk / Sprint Oscillation
        this.bobY = Math.sin(this.bobTimer) * (0.02 + this.sprintWeight * 0.03) * this.stateWeight;
        this.bobX = Math.cos(this.bobTimer * 0.5) * (0.03 + this.sprintWeight * 0.04) * this.stateWeight;

        // 4. High-Frequency Micro-Jitter (Helmet Vibration)
        this.jitterTimer += dt * 75.0; // Very fast noise
        const jitterIntensity = 0.001 + this.sprintWeight * 0.002;
        this.jitter = Math.sin(this.jitterTimer) * jitterIntensity * this.stateWeight;

        // 5. Weapon Weight Roll (Banking into turns + Bob Roll)
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

    handleMouseMove(e, canvas, sensitivity) {
      if (document.pointerLockElement === canvas) {
        // Add to velocities for damping effect instead of immediate position
        this.rotVelDir += e.movementX * sensitivity;
        this.rotVelPitch -= e.movementY * 0.002;

        // Clamp target pitch to prevent looking too far up/down
        this.targetPitch = Math.max(
          -Math.PI / 3,
          Math.min(Math.PI / 3, this.targetPitch),
        );
        this.lean = Math.max(-0.05, Math.min(0.05, -e.movementX * 0.001));
      }
    }

    bindMouse(canvas, sensitivity) {
      this.canvas = canvas;
      this.mouseSensitivity = sensitivity;
      this._mouseMoveHandler = (e) => {
        this.handleMouseMove(e, this.canvas, this.mouseSensitivity);
      };
      document.addEventListener("mousemove", this._mouseMoveHandler);
    }

    unbindMouse() {
      if (this._mouseMoveHandler) {
        document.removeEventListener("mousemove", this._mouseMoveHandler);
        this._mouseMoveHandler = null;
      }
    }

    getEyePosition() {
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
        this.y + forwardZ * this.neckLength
      ];
    }
  }

  window.Microsite = window.Microsite || {};
  window.Microsite.Player = Player;
})();
