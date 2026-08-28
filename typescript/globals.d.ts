export {};

declare global {
  // Third-party libraries (loaded as classic scripts before the module bundle).
  // Typed loosely by exemption — the application code is fully typed elsewhere.
  const createjs: any;
  const AdobeAn: any;
  const WMPlaylistItem: any;
  const vec3: any;
  const mat4: any;
  const quat: any;

  interface Window {
    Microsite: import("./types.js").Microsite;
    musicPlaylist?: import("./types.js").PlaylistTrack[];
    siteAudio?: import("./types.js").SiteAudio;
    playSound?: (id: string, loop?: number, offset?: number) => unknown;
    initBackgroundShader?: (path?: string) => Promise<void>;
    glMatrix?: any;
    createjs?: any;
    vec3?: any;
    mat4?: any;
    quat?: any;
    stage?: Lib;
  }
}
