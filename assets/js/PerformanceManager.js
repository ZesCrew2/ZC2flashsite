(function () {
  "use strict";

  const PerformanceManager = {
    TIER: 1, // 1: High, 2: Mid, 3: Low
    capabilities: {
      memory: navigator.deviceMemory || 4,
      cores: navigator.hardwareConcurrency || 4,
      gpu: "unknown",
    },

    init: function () {
      const savedTier = localStorage.getItem("zc2_maze_tier");
      if (savedTier) {
        this.TIER = parseInt(savedTier);
      } else {
        this.detectTier();
      }
      
      console.log(`Performance Tier active: ${this.TIER}`, this.capabilities);
      
      // Global access
      window.Microsite = window.Microsite || {};
      window.Microsite.perf = this;
      
      // Dispatch event for other modules
      window.dispatchEvent(new CustomEvent("perf-tier-set", { detail: { tier: this.TIER } }));
    },

    setTier: function(tier) {
      this.TIER = tier;
      localStorage.setItem("zc2_maze_tier", tier);
      window.dispatchEvent(new CustomEvent("perf-tier-set", { detail: { tier: this.TIER } }));
    },

    detectTier: function () {
      const { memory, cores } = this.capabilities;
      
      // Try to get GPU info
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (gl) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          if (debugInfo) {
            this.capabilities.gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          }
        }
      } catch (e) {}

      const gpu = this.capabilities.gpu.toLowerCase();
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      // Low Tier Detection
      if (memory <= 2 || cores <= 2 || isMobile || gpu.includes("intel") || gpu.includes("mali") || gpu.includes("adreno")) {
        this.TIER = 3;
      } 
      // Mid Tier Detection
      else if (memory <= 4 || cores <= 4) {
        this.TIER = 2;
      }
      // High Tier
      else {
        this.TIER = 1;
      }
    },

    getSettings: function() {
      switch(this.TIER) {
        case 3:
          return {
            fps: 60,
            precision: "lowp",
            pbr: false,
            wiggle: false,
            skybox: false,
            dither: false,
            postProcessing: true,
            highResAssets: false,
            logicThrottle: 1, // run logic every tick
            res: { w: 400, h: 300 }
          };
        case 2:
          return {
            fps: 60,
            precision: "mediump",
            pbr: false,
            wiggle: true,
            skybox: true,
            dither: true,
            postProcessing: true,
            highResAssets: true,
            logicThrottle: 1,
            res: { w: 640, h: 480 }
          };
        default:
          return {
            fps: 60,
            precision: "highp",
            pbr: true,
            wiggle: true,
            skybox: true,
            dither: true,
            postProcessing: true,
            highResAssets: true,
            logicThrottle: 1,
            res: { w: 800, h: 600 }
          };
      }
    }
  };

  PerformanceManager.init();
})();
