(function () {
  "use strict";

  function WiggleFilter(
    shaderSource,
    effectType = 4,
    speed = 2.0,
    frequency = 10.0,
    amplitude = 0.015,
  ) {
    this.Filter_constructor();
    this.effectType = effectType;
    this.speed = speed;
    this.frequency = frequency;
    this.amplitude = amplitude;
    this.time = 0;
    this.FRAG_SHADER_BODY = shaderSource;
    this._locations = null;
  }

  const p = createjs.extend(WiggleFilter, createjs.Filter);

  p.shaderParamSetup = function (gl, stage, shaderProgram) {
    if (!this._locations) {
      this._locations = {
        uTime: gl.getUniformLocation(shaderProgram, "uTime"),
        uEffectType: gl.getUniformLocation(shaderProgram, "uEffectType"),
        uSpeed: gl.getUniformLocation(shaderProgram, "uSpeed"),
        uFrequency: gl.getUniformLocation(shaderProgram, "uFrequency"),
        uWaveAmplitude: gl.getUniformLocation(shaderProgram, "uWaveAmplitude"),
      };
    }
    gl.uniform1f(this._locations.uTime, this.time);
    gl.uniform1i(this._locations.uEffectType, this.effectType);
    gl.uniform1f(this._locations.uSpeed, this.speed);
    gl.uniform1f(this._locations.uFrequency, this.frequency);
    gl.uniform1f(this._locations.uWaveAmplitude, this.amplitude);
  };

  p.clone = function () {
    return new WiggleFilter(
      this.FRAG_SHADER_BODY,
      this.effectType,
      this.speed,
      this.frequency,
      this.amplitude,
    );
  };

  createjs.WiggleFilter = createjs.promote(WiggleFilter, "Filter");

  window.initBackgroundShader = async function (
    shaderPath = "assets/shaders/wiggle.glsl",
  ) {
    try {
      const response = await fetch(shaderPath);
      const shaderCode = await response.text();
      setupBackground(shaderCode);
    } catch (err) {
      console.error(`failed to load shader: ${err} --thorns`);
    }
  };

  function setupBackground(shaderCode) {
    let canvas = document.getElementById("bg-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "bg-canvas";
      document.body.insertBefore(canvas, document.body.firstChild);
    }

    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      zIndex: "-1",
      pointerEvents: "none",
    });

    const stage = new createjs.StageGL(canvas, {
      transparent: false,
      antialias: true,
    });

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "assets/img/bg.png";
    img.onload = () => {
      const settings = window.Microsite.perf ? window.Microsite.perf.getSettings() : { fps: 60, logicThrottle: 1, postProcessing: true };
      
      const bitmap = new createjs.Bitmap(img);
      stage.addChild(bitmap);

      // FALLBACK: If Tier 3, don't use filters at all, just show the image
      if (settings.fps > 24) {
          const wiggle = new createjs.WiggleFilter(shaderCode, 4, 2.0, 10.0, 0.015);
          bitmap.filters = [wiggle];

          if (window.Microsite) {
            window.Microsite.shader.instance = wiggle;
            window.Microsite.shader.loadShader = async (newPath) => {
              try {
                const response = await fetch(newPath);
                wiggle.FRAG_SHADER_BODY = await response.text();
                bitmap.updateCache();
              } catch (err) {
                console.error(`failed to load inner shader: ${err} --thorns`);
              }
            };
          }
          bitmap.cache(0, 0, img.width, img.height, 1, { useGL: "stage" });
      }

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stage.updateViewport(canvas.width, canvas.height);
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height,
        );
        bitmap.scaleX = bitmap.scaleY = scale;
        bitmap.x = (canvas.width - img.width * scale) / 2;
        bitmap.y = (canvas.height - img.height * scale) / 2;
        if (bitmap.cacheCanvas) bitmap.updateCache();
      };
      window.addEventListener("resize", resize);
      resize();

      createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
      createjs.Ticker.framerate = settings.fps;
      
      let tickCount = 0;
      createjs.Ticker.addEventListener("tick", (event) => {
        if (event.paused) return;
        
        tickCount++;
        // Throttle shader update on low tier
        if (tickCount % settings.logicThrottle !== 0) {
            stage.update(event);
            return;
        }

        // Only update time if the filter exists (Tier 1-2)
        const instance = window.Microsite?.shader?.instance;
        if (instance) {
          instance.time += (event.delta * settings.logicThrottle) / 1000;
          if (bitmap.cacheCanvas) bitmap.updateCache();
        }
        
        stage.update(event);
      });
    };
  }

  if (document.readyState === "complete") {
    window.initBackgroundShader();
  } else {
    window.addEventListener("load", () => window.initBackgroundShader());
  }
})();
