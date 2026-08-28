import { Microsite } from "./microsite.js";
import type { PerformanceManager as IPerformanceManager, PerformanceSettings, Lib } from "./types.js";

export class PerformanceManager implements IPerformanceManager {
  TIER = 1;
  capabilities = {
    memory: (navigator as Lib).deviceMemory || 4,
    cores: navigator.hardwareConcurrency || 4,
    gpu: "unknown",
  };

  init(): void {
    const savedTier = localStorage.getItem("zc2_maze_tier");
    if (savedTier) {
      this.TIER = parseInt(savedTier, 10);
    } else {
      this.detectTier();
    }

    console.log(`Performance Tier active: ${this.TIER}`, this.capabilities);

    Microsite.perf = this;
    window.dispatchEvent(new CustomEvent("perf-tier-set", { detail: { tier: this.TIER } }));
  }

  setTier(tier: number): void {
    this.TIER = tier;
    localStorage.setItem("zc2_maze_tier", String(tier));
    window.dispatchEvent(new CustomEvent("perf-tier-set", { detail: { tier: this.TIER } }));
  }

  detectTier(): void {
    const { memory, cores } = this.capabilities;

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          this.capabilities.gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
      }
    } catch (e) {
      /* ignore */
    }

    const gpu = this.capabilities.gpu.toLowerCase();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (memory <= 2 || cores <= 2 || isMobile || gpu.includes("intel") || gpu.includes("mali") || gpu.includes("adreno")) {
      this.TIER = 3;
    } else if (memory <= 4 || cores <= 4) {
      this.TIER = 2;
    } else {
      this.TIER = 1;
    }
  }

  getSettings(): PerformanceSettings {
    switch (this.TIER) {
      case 3:
        return {
          fps: 60, precision: "lowp", pbr: false, wiggle: false, skybox: false,
          dither: false, postProcessing: true, highResAssets: false, logicThrottle: 1,
          res: { w: 400, h: 300 },
        };
      case 2:
        return {
          fps: 60, precision: "mediump", pbr: false, wiggle: true, skybox: true,
          dither: true, postProcessing: true, highResAssets: true, logicThrottle: 1,
          res: { w: 640, h: 480 },
        };
      default:
        return {
          fps: 60, precision: "highp", pbr: true, wiggle: true, skybox: true,
          dither: true, postProcessing: true, highResAssets: true, logicThrottle: 1,
          res: { w: 800, h: 600 },
        };
    }
  }
}

const perf = new PerformanceManager();
perf.init();
