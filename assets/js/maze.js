(function () {
  "use strict";

  const Maze = {
    canvas: null,
    gl: null,
    engine: null,
    isActive: false,
    fadeOverlay: null,
    lastTime: 0,
    startTime: 0,
    audio: null,
    audioCtx: null,
    audioBuffers: {},
    
    // Geometry & Materials
    cube: null,
    materials: {
      wall: { diffuse: null, normal: null, roughness: null },
      floor: { diffuse: null, normal: null, roughness: null },
      buttonClosed: null,
      buttonOpened: null
    },

    // Map: 1 = Wall, 0 = Empty, 2 = Button, 3 = Dynamic Moving Wall
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,2,0,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0,1,0,1],
      [1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1],
      [1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0,0,1],
      [1,2,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,0,0,0,0,1],
      [1,0,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
      [1,0,1,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,3],
      [1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,1],
      [1,0,1,0,0,0,0,1,1,1,1,0,1,1,1,0,0,0,0,1],
      [1,1,1,0,0,1,0,0,0,0,1,0,0,0,1,1,1,0,0,1],
      [1,0,0,0,0,1,1,1,0,0,1,0,0,0,1,0,0,0,0,1],
      [1,0,0,0,0,1,0,0,0,0,1,0,1,1,1,0,0,0,0,1],
      [1,1,1,0,0,1,1,1,1,0,1,0,0,0,1,0,0,0,0,1],
      [1,0,0,0,0,1,0,0,1,0,1,1,1,0,1,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    buttons: [
      { x: 1, y: 5, state: "closed", targetId: "ent_10_9" },
      { x: 15, y: 1, state: "closed", targetId: "ent_19_9" }
    ],

    doors: [
      { id: "ent_10_9", tiles: [{x: 10, y: 9}], offsetY: 0.0, state: "closed", moveSource: null, movePanner: null },
      { id: "ent_19_9", tiles: [{x: 19, y: 9}], offsetY: 0.0, state: "closed", moveSource: null, movePanner: null }
    ],

    // Psychological HUD
    messages: [],
    messageIndex: 0,
    hudElement: null,
    allowJumpscares: true,

    player: {
      x: 1.5,
      y: 18.5,
      dir: 0,
      pitch: 0,
      roll: 0,
      fov: (60 * Math.PI) / 180,
      velX: 0,
      velY: 0,
      accel: 0.003,
      friction: 0.88,
      bobTimer: 0,
      bobX: 0,
      bobY: 0,
      lean: 0,
      stateWeight: 0,
      sprintWeight: 0,
      jitter: 0,
      radius: 0.2, 
    },

    keys: {},
    mouseSensitivity: 0.0015,

    init: async function () {
      if (this.isActive) return;
      this.isActive = true;

      // Initialize Web Audio Context
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      // Fetch psychological messages
      try {
        const msgResp = await fetch("assets/json/maze_messages.json");
        this.messages = await msgResp.json();
      } catch (e) {
        console.warn("Failed to load maze messages, using defaults.");
        this.messages = ["..."];
      }

      document.body.classList.add("maze-active");
      const wmp = document.getElementById("wmp");
      if (wmp && wmp.pause) wmp.pause();
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }

      this.fadeOverlay = document.createElement("div");
      this.fadeOverlay.id = "maze-fade-overlay";
      Object.assign(this.fadeOverlay.style, {
        position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
        backgroundColor: "black", zIndex: "20000", transition: "opacity 4s ease", pointerEvents: "none",
      });
      document.body.appendChild(this.fadeOverlay);

      this.canvas = document.createElement("canvas");
      this.canvas.id = "maze-canvas";
      Object.assign(this.canvas.style, {
        position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
        zIndex: "10000", backgroundColor: "black", cursor: "none",
      });
      document.body.appendChild(this.canvas);

      // Create HUD Element
      this.hudElement = document.createElement("div");
      this.hudElement.id = "maze-hud";
      Object.assign(this.hudElement.style, {
        position: "fixed",
        top: "30px",
        left: "30px",
        color: "rgba(255, 255, 255, 0.9)",
        fontFamily: "'PetscopHand', 'Courier New', Courier, monospace",
        fontSize: "24px",
        zIndex: "15000",
        pointerEvents: "none",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
        opacity: "0",
        transition: "opacity 2s ease"
      });
      document.body.appendChild(this.hudElement);

      this.engine = window.Microsite.engine;
      this.gl = this.engine.init(this.canvas);
      this.cube = this.engine.createCube();

      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      window.addEventListener("keydown", (e) => (this.keys[e.key.toLowerCase()] = true));
      window.addEventListener("keyup", (e) => (this.keys[e.key.toLowerCase()] = false));

      document.addEventListener("mousemove", (e) => {
        if (document.pointerLockElement === this.canvas) {
          const mouseX = e.movementX;
          this.player.dir += mouseX * this.mouseSensitivity;
          this.player.pitch -= e.movementY * 0.002;
          this.player.pitch = Math.max(-Math.PI/3, Math.min(Math.PI/3, this.player.pitch));
          this.player.lean = Math.max(-0.05, Math.min(0.05, -mouseX * 0.001));
        }
      });

      window.addEventListener("resize", () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.engine.setupFramebuffer(800, 600);
      });

      const basePath = "assets/img/maze-textures/";
      const [wD, wN, wR, fD, fN, fR, bC, bO] = await Promise.all([
        this.engine.loadTexture(basePath + "cracked_concrete_wall/cracked_concrete_wall_diff_1k.jpg"),
        this.engine.loadTexture(basePath + "cracked_concrete_wall/cracked_concrete_wall_nor_gl_1k.png"),
        this.engine.loadTexture(basePath + "cracked_concrete_wall/cracked_concrete_wall_rough_1k.png"),
        this.engine.loadTexture(basePath + "stained_pine_floor/stained_pine_diff_1k.jpg"),
        this.engine.loadTexture(basePath + "stained_pine_floor/stained_pine_nor_gl_1k.png"),
        this.engine.loadTexture(basePath + "stained_pine_floor/stained_pine_rough_1k.png"),
        this.engine.loadTexture(basePath + "button_closed.png"),
        this.engine.loadTexture(basePath + "button_opened.png"),
      ]);

      this.materials.wall = { diffuse: wD, normal: wN, roughness: wR };
      this.materials.floor = { diffuse: fD, normal: fN, roughness: fR };
      this.materials.buttonClosed = bC;
      this.materials.buttonOpened = bO;

      // Pre-load audio buffers for seamless Web Audio looping
      const loadBuffer = async (url) => {
        const resp = await fetch(url);
        const arrayBuffer = await resp.arrayBuffer();
        return await this.audioCtx.decodeAudioData(arrayBuffer);
      };

      this.audioBuffers.wallMove = await loadBuffer("assets/sounds/maze_sounds/wall_move.wav");
      this.audioBuffers.wallStop = await loadBuffer("assets/sounds/maze_sounds/wall_stop.wav");

      this.audio = new Audio("assets/music/maze_music/song.mp3");
      this.audio.loop = true;
      this.audio.volume = 0;
      
      requestAnimationFrame((t) => {
        this.lastTime = t;
        this.startTime = t;
        
        const startMaze = () => {
          this.fadeOverlay.style.opacity = "0";
          this.canvas.requestPointerLock({ unadjustedMovement: true });
          
          if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
          }

          this.cycleHUD();

          let vol = 0;
          const duration = 5000, interval = 100, step = 0.7 / (duration / interval);
          
          this.audio.play().catch(() => {});
          const fadeIn = setInterval(() => {
            vol += step;
            if (vol >= 0.7) { this.audio.volume = 0.7; clearInterval(fadeIn); }
            else this.audio.volume = vol;
          }, interval);
          
          window.removeEventListener("click", startMaze);

          // Allow re-locking pointer on click if it was lost (e.g., F11)
          window.addEventListener("click", () => {
            if (this.isActive && document.pointerLockElement !== this.canvas) {
              this.canvas.requestPointerLock({ unadjustedMovement: true });
            } else if (this.isActive) {
              this.interact();
            }
          });
        };
        
        window.addEventListener("click", startMaze);
        this.loop(t);
      });
    },

    cycleHUD: async function() {
      if (!this.isActive) return;
      const msg = this.messages[this.messageIndex];
      this.hudElement.innerText = "";
      this.hudElement.style.opacity = "1";
      for (let i = 0; i < msg.length; i++) {
        if (!this.isActive) return;
        if (msg[i] === " ") this.hudElement.innerHTML += "&nbsp;";
        else {
          this.hudElement.innerText += msg[i];
          const typewriterSfx = new Audio("assets/sounds/maze_sounds/textbox.wav");
          typewriterSfx.volume = 0.1;
          typewriterSfx.play().catch(() => {});
        }
        await new Promise(r => setTimeout(r, 50 + Math.random() * 50));
      }
      await new Promise(r => setTimeout(r, 5000));
      if (!this.isActive) return;
      this.hudElement.style.opacity = "0";
      await new Promise(r => setTimeout(r, 5000 + Math.random() * 10000));
      this.messageIndex = (this.messageIndex + 1) % this.messages.length;
      this.cycleHUD();
    },

    interact: function() {
      this.buttons.forEach(btn => {
        const dx = this.player.x - (btn.x + 0.5);
        const dy = this.player.y - (btn.y + 0.5);
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 1.2) {
          btn.state = btn.state === "closed" ? "opened" : "closed";
          new Audio("assets/sounds/maze_sounds/switch_on.wav").play().catch(() => {});
          
          const door = this.doors.find(d => d.id === btn.targetId);
          if (door) {
            door.state = btn.state === "opened" ? "opening" : "closing";
            
            const midX = door.tiles.reduce((sum, t) => sum + t.x, 0) / door.tiles.length;
            const midY = door.tiles.reduce((sum, t) => sum + t.y, 0) / door.tiles.length;

            // Seamless Web Audio Looping
            if (door.moveSource) {
              door.moveSource.stop();
              door.moveSource = null;
            }
            
            const source = this.audioCtx.createBufferSource();
            source.buffer = this.audioBuffers.wallMove;
            source.loop = true;
            
            const panner = this.audioCtx.createPanner();
            panner.panningModel = 'HRTF';
            panner.distanceModel = 'inverse';
            panner.refDistance = 0.5;
            panner.maxDistance = 20;
            panner.rolloffFactor = 1.5;
            
            panner.positionX.value = midX + 0.5;
            panner.positionY.value = 0.5 + door.offsetY;
            panner.positionZ.value = midY + 0.5;
            
            source.connect(panner);
            panner.connect(this.audioCtx.destination);
            
            door.moveSource = source;
            door.movePanner = panner;
            source.start(0);
          }
        }
      });
    },

    update: function (dt) {
      let moveX = 0, moveY = 0;
      const moveCos = Math.cos(this.player.dir);
      const moveSin = Math.sin(this.player.dir);
      
      if (this.keys["w"] || this.keys["arrowup"]) { moveX += moveSin; moveY -= moveCos; }
      if (this.keys["s"] || this.keys["arrowdown"]) { moveX -= moveSin; moveY += moveCos; }
      if (this.keys["a"] || this.keys["arrowleft"]) { moveX -= moveCos; moveY -= moveSin; }
      if (this.keys["d"] || this.keys["arrowright"]) { moveX += moveCos; moveY += moveSin; }

      const mag = Math.sqrt(moveX * moveX + moveY * moveY);
      if (mag > 0) { moveX /= mag; moveY /= mag; }

      const isSprinting = this.keys["shift"];
      const currentAccel = isSprinting ? this.player.accel * 2.2 : this.player.accel;
      this.player.velX += moveX * currentAccel * dt;
      this.player.velY += moveY * currentAccel * dt;
      this.player.velX *= this.player.friction;
      this.player.velY *= this.player.friction;

      // Update Doors (Slide UP into ceiling)
      this.doors.forEach(door => {
        const speed = 0.01 * dt;
        const midX = door.tiles.reduce((sum, t) => sum + t.x, 0) / door.tiles.length;
        const midY = door.tiles.reduce((sum, t) => sum + t.y, 0) / door.tiles.length;

        if (door.state === "opening") {
          door.offsetY += speed;
          if (door.offsetY >= 1.1) {
            door.offsetY = 1.1;
            door.state = "opened";
            if (door.moveSource) { door.moveSource.stop(); door.moveSource = null; }
            this.playWebAudioSpatial("wallStop", midX, midY);
          }
        } else if (door.state === "closing") {
          door.offsetY -= speed;
          if (door.offsetY <= 0.0) {
            door.offsetY = 0.0;
            door.state = "closed";
            if (door.moveSource) { door.moveSource.stop(); door.moveSource = null; }
            this.playWebAudioSpatial("wallStop", midX, midY);
          }
        }
        if (door.movePanner) {
          door.movePanner.positionX.value = midX + 0.5;
          door.movePanner.positionY.value = 0.5 + door.offsetY;
          door.movePanner.positionZ.value = midY + 0.5;
        }
      });

      // Update Audio Listener position and orientation
      if (this.audioCtx) {
        const listener = this.audioCtx.listener;
        const cosP = Math.cos(this.player.pitch);
        const sinP = Math.sin(this.player.pitch);
        const cosD = Math.cos(this.player.dir);
        const sinD = Math.sin(this.player.dir);

        // Position (match eye level)
        listener.positionX.value = this.player.x;
        listener.positionY.value = 0.5 + this.player.bobY;
        listener.positionZ.value = this.player.y;
        
        // Forward vector
        listener.forwardX.value = cosP * sinD;
        listener.forwardY.value = sinP;
        listener.forwardZ.value = -cosP * cosD;
        
        // Up vector (orthogonal to forward)
        listener.upX.value = -sinP * sinD;
        listener.upY.value = cosP;
        listener.upZ.value = sinP * cosD;
      }

      const nextX = this.player.x + this.player.velX * dt, nextY = this.player.y + this.player.velY * dt;
      const isWall = (x, y) => {
        const floorX = Math.floor(x), floorY = Math.floor(y);
        if (floorX < 0 || floorX >= 20 || floorY < 0 || floorY >= 20) return true;
        if (this.map[floorY][floorX] === 1) return true;
        if (this.map[floorY][floorX] === 3) {
          const door = this.doors.find(d => d.tiles.some(t => t.x === floorX && t.y === floorY));
          return door && door.offsetY < 0.8;
        }
        return false;
      };
      const r = this.player.radius;
      if (!isWall(nextX + (this.player.velX > 0 ? r : -r), this.player.y)) this.player.x = nextX; else this.player.velX = 0;
      if (!isWall(this.player.x, nextY + (this.player.velY > 0 ? r : -r))) this.player.y = nextY; else this.player.velY = 0;

      const speed = Math.sqrt(this.player.velX * this.player.velX + this.player.velY * this.player.velY);
      const targetStateWeight = speed > 0.001 ? 1.0 : 0.0;
      const targetSprintWeight = (speed > 0.001 && isSprinting) ? 1.0 : 0.0;
      this.player.stateWeight += (targetStateWeight - this.player.stateWeight) * 0.08 * dt;
      this.player.sprintWeight += (targetSprintWeight - this.player.sprintWeight) * 0.08 * dt;

      const mix = (a, b, t) => a * (1 - t) + b * t;
      if (this.player.stateWeight > 0.01) {
        const currentBobSpeed = mix(0.12, 0.18, this.player.sprintWeight);
        this.player.bobTimer += currentBobSpeed * dt;
        this.player.jitter = Math.sin(this.player.bobTimer * 7.0) * 0.002 * this.player.stateWeight;
        this.player.bobX = Math.cos(this.player.bobTimer) * mix(0.03, 0.05, this.player.sprintWeight) * this.player.stateWeight;
        this.player.bobY = (Math.sin(this.player.bobTimer * 2) * mix(0.02, 0.04, this.player.sprintWeight) * this.player.stateWeight) + this.player.jitter;
        this.player.roll = Math.sin(this.player.bobTimer) * mix(0.015, 0.03, this.player.sprintWeight) * this.player.stateWeight;
      } else {
        this.player.bobX *= 0.9; this.player.bobY *= 0.9; this.player.roll *= 0.9;
      }
      this.player.lean *= 0.95;

      if (Math.floor(this.player.x) === 19 && Math.floor(this.player.y) === 9) {
        const finalDoor = this.doors.find(d => d.id === "ent_19_9");
        if (finalDoor && finalDoor.offsetY > 0.8) {
          this.triggerEndSequence();
        }
      }
    },

    playWebAudioSpatial: function(bufferKey, x, y) {
      const source = this.audioCtx.createBufferSource();
      source.buffer = this.audioBuffers[bufferKey];
      
      const panner = this.audioCtx.createPanner();
      panner.panningModel = 'HRTF';
      panner.distanceModel = 'inverse';
      panner.refDistance = 0.5;
      panner.maxDistance = 20;
      panner.rolloffFactor = 1.5;
      
      const door = this.doors.find(d => d.tiles.some(t => t.x === x && t.y === y));
      
      panner.positionX.value = x + 0.5;
      panner.positionY.value = 0.5 + (door ? door.offsetY : 0);
      panner.positionZ.value = y + 0.5;
      
      source.connect(panner);
      panner.connect(this.audioCtx.destination);
      source.start(0);
    },

    render: function (time) {
      const gl = this.gl;
      const targetAspect = 4 / 3;
      let viewWidth = window.innerWidth, viewHeight = window.innerHeight;
      const currentAspect = viewWidth / viewHeight;
      if (currentAspect > targetAspect) viewWidth = viewHeight * targetAspect; else viewHeight = viewWidth / targetAspect;
      const xOffset = (window.innerWidth - viewWidth) / 2, yOffset = (window.innerHeight - viewHeight) / 2;

      this.engine.startFrame();
      gl.viewport(0, 0, 800, 600);
      gl.clearColor(0.01, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const projectionMatrix = mat4.create();
      mat4.perspective(projectionMatrix, this.player.fov, targetAspect, 0.1, 100.0);
      const viewMatrix = mat4.create();
      const eyePos = vec3.fromValues(this.player.x + this.player.bobX, 0.5 + this.player.bobY, this.player.y);
      const q = quat.create();
      quat.rotateY(q, q, -this.player.dir);
      quat.rotateX(q, q, this.player.pitch);
      quat.rotateZ(q, q, this.player.roll + this.player.lean);
      mat4.fromRotationTranslation(viewMatrix, q, eyePos);
      mat4.invert(viewMatrix, viewMatrix);

      gl.bindVertexArray(this.cube.vao);
      gl.uniform3fv(this.engine.uniforms.viewPos, eyePos);
      gl.uniform1f(this.engine.uniforms.fogNear, 1.0);
      gl.uniform1f(this.engine.uniforms.fogFar, 12.0);
      gl.uniform4fv(this.engine.uniforms.fogColor, [0.02, 0, 0, 1]);
      gl.uniform1f(this.engine.uniforms.time, (time - this.startTime) * 0.001);
      gl.uniform1f(this.engine.uniforms.wiggleSpeed, 2.0);
      gl.uniform1f(this.engine.uniforms.wiggleFreq, 8.0);
      gl.uniform1f(this.engine.uniforms.wiggleAmp, 0.02);

      const drawMesh = (modelMat, material, isEntity = 0.0) => {
        const mvpMatrix = mat4.create();
        mat4.multiply(mvpMatrix, projectionMatrix, viewMatrix);
        mat4.multiply(mvpMatrix, mvpMatrix, modelMat);
        gl.uniformMatrix4fv(this.engine.uniforms.matrix, false, mvpMatrix);
        gl.uniformMatrix4fv(this.engine.uniforms.model, false, modelMat);
        gl.uniform1f(this.engine.uniforms.isEntity, isEntity);
        
        gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, material.diffuse);
        gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, (material.normal || this.materials.wall.normal));
        gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, (material.roughness || this.materials.wall.roughness));
        gl.drawElements(gl.TRIANGLES, this.cube.count, gl.UNSIGNED_SHORT, 0);
      };

      for (let y = 0; y < this.map.length; y++) {
        for (let x = 0; x < this.map[y].length; x++) {
          const cell = this.map[y][x];
          if (cell === 1) {
            const modelMatrix = mat4.create();
            mat4.translate(modelMatrix, modelMatrix, [x + 0.5, 0.5, y + 0.5]);
            drawMesh(modelMatrix, this.materials.wall, 0.0);
          } else if (cell === 2) {
            const btn = this.buttons.find(b => b.x === x && b.y === y);
            const modelMatrix = mat4.create();
            let px = x + 0.5, py = 0.5, pz = y + 0.5, sx = 0.3, sy = 0.3, sz = 0.3;
            if (this.map[y][x-1] === 1) { px -= 0.52; sx = 0.05; }
            else if (this.map[y][x+1] === 1) { px += 0.52; sx = 0.05; }
            else if (this.map[y-1][x] === 1) { pz -= 0.52; sz = 0.05; }
            else if (this.map[y+1][x] === 1) { pz += 0.52; sz = 0.05; }
            mat4.translate(modelMatrix, modelMatrix, [px, py, pz]);
            mat4.scale(modelMatrix, modelMatrix, [sx, sy, sz]);
            drawMesh(modelMatrix, { diffuse: btn.state === "closed" ? this.materials.buttonClosed : this.materials.buttonOpened }, 1.0);
          } else if (cell === 3) {
            const door = this.doors.find(d => d.tiles.some(t => t.x === x && t.y === y));
            const modelMatrix = mat4.create();
            mat4.translate(modelMatrix, modelMatrix, [x + 0.5, 0.5 + door.offsetY, y + 0.5]);
            drawMesh(modelMatrix, this.materials.wall, 0.0);
          }
        }
      }
      const floorModel = mat4.create(); mat4.translate(floorModel, floorModel, [10, -0.01, 10]); mat4.scale(floorModel, floorModel, [20, 0.1, 20]);
      drawMesh(floorModel, this.materials.floor, 0.0);
      const ceilModel = mat4.create(); mat4.translate(ceilModel, ceilModel, [10, 1.01, 10]); mat4.scale(ceilModel, ceilModel, [20, 0.1, 20]);
      drawMesh(ceilModel, this.materials.wall, 0.0);

      this.engine.endFrame(800, 600, xOffset, yOffset, viewWidth, viewHeight);
      if (this.hudElement) {
        this.hudElement.style.left = (xOffset + 30) + "px";
        this.hudElement.style.top = (yOffset + 30) + "px";
        this.hudElement.style.maxWidth = (viewWidth - 60) + "px";
      }
    },

    loop: function (currentTime) {
      if (!this.isActive) return;
      const dt = Math.min(1.2, (currentTime - this.lastTime) / 16.6);
      this.lastTime = currentTime;
      this.update(dt);
      this.render(currentTime);
      requestAnimationFrame((t) => this.loop(t));
    },

    triggerEndSequence: function () {
      if (!this.isActive) return;
      this.isActive = false;
      if (this.audio) { this.audio.pause(); this.audio = null; }
      this.doors.forEach(d => { if (d.moveSource) { d.moveSource.stop(); d.moveSource = null; } });
      if (this.hudElement) { this.hudElement.remove(); this.hudElement = null; }
      if (document.exitPointerLock) document.exitPointerLock();
      const img = new Image();
      img.src = "assets/img/maze-textures/end_asset.png";
      Object.assign(img.style, { 
        position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", 
        zIndex: "30000", objectFit: "contain", backgroundColor: "black" 
      });
      document.body.appendChild(img);
      new Audio("assets/sounds/maze_sounds/end_asset.wav").play().catch(() => {});
      setTimeout(() => { if (document.exitFullscreen) document.exitFullscreen().catch(() => {}); location.reload(); }, 1500);
    },
  };

  window.Microsite = window.Microsite || {};
  window.Microsite.maze = Maze;
})();