let currentStage = null;
let currentPage = null;
let currentLoader = null;
let pageLoadToken = 0;
const pageSoundsRegistered = {};

function registerPageSound(src, id) {
  if (!createjs.Sound || pageSoundsRegistered[id]) return;
  pageSoundsRegistered[id] = true;
  createjs.Sound.registerSound(src, id);
}

function resolvePageAssetPath(src) {
  return new URL(
    `assets/swf/pages/${src}`,
    window.location.href,
  ).pathname.replace(/^\//, "");
}

function loadPage(color) {
  if (typeof createjs === "undefined") return;

  // whitelist pages for security --thorns
  const validPages = [
    "red",
    "orange",
    "yellow",
    "lime",
    "green",
    "cyan",
    "blue",
    "purple",
    "pink",
  ];
  if (!validPages.includes(color)) {
    console.error(
      `security: blocked attempt to load invalid page: ${color} --thorns`,
    );
    return;
  }

  pageLoadToken++;
  const token = pageLoadToken;

  const flashContent = document.getElementById("flashContent");

  if (currentStage) {
    createjs.Ticker.removeEventListener(
      "tick",
      currentStage._throttledTick || currentStage,
    );
    currentStage = null;
  }

  if (currentLoader) {
    currentLoader.removeAllEventListeners();
    currentLoader.close();
    currentLoader = null;
  }

  const oldScript = document.getElementById("page-script");
  if (oldScript) oldScript.remove();

  flashContent.innerHTML = "";
  currentPage = color;

  const anim_container = document.createElement("div");
  anim_container.id = "animation_container";
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";

  anim_container.appendChild(canvas);
  flashContent.appendChild(anim_container);

  const script = document.createElement("script");
  script.id = "page-script";
  script.src = `assets/swf/pages/${color}.js`;
  script.onload = () => {
    if (currentPage === color && pageLoadToken === token)
      initPage(color, token);
  };
  document.body.appendChild(script);
}

function initPage(color, token) {
  const canvas = document.getElementById("canvas");
  const anim_container = document.getElementById("animation_container");
  if (!canvas || !anim_container) return;

  const comp = AdobeAn.getComposition("B325F180281AD548AF0E7778EAE237A2");
  const lib = comp.getLibrary();
  const manifest = [];

  lib.properties.manifest.forEach((item) => {
    const cleanSrc = item.src.replace(/\?.*$/, "");
    const fullSrc = resolvePageAssetPath(cleanSrc);
    if (/\.(mp3|wav|ogg)$/i.test(cleanSrc)) {
      registerPageSound(fullSrc, item.id);
    } else {
      manifest.push({ src: fullSrc, id: item.id });
    }
  });

  const loader = new createjs.LoadQueue(false);
  currentLoader = loader;
  loader.addEventListener("fileload", (evt) => {
    if (token === pageLoadToken && loader === currentLoader) {
      if (evt.item.type === "image") comp.getImages()[evt.item.id] = evt.result;
    }
  });
  loader.addEventListener("complete", (evt) => {
    if (token === pageLoadToken && loader === currentLoader) {
      currentLoader = null;
      handlePageComplete(evt, comp, color);
    }
  });
  loader.loadManifest(manifest);
}

function handlePageComplete(evt, comp, color) {
  const lib = comp.getLibrary();
  const ss = comp.getSpriteSheet();
  const { ssMetadata } = lib;

  ssMetadata.forEach((meta) => {
    ss[meta.name] = new createjs.SpriteSheet({
      images: [evt.target.getResult(meta.name)],
      frames: meta.frames,
    });
  });

  const exportRoot = new lib[color]();
  exportRoot.addEventListener("tick", AdobeAn.handleFilterCache);
  const canvas = document.getElementById("canvas");
  currentStage = new lib.Stage(canvas);
  currentStage.enableMouseOver();
  currentStage.addChild(exportRoot);

  // use throttled tick for authentic flash speed --thorns
  const throttledTick = Microsite.ticker.createThrottledTick(
    currentStage,
    lib.properties.fps,
  );
  createjs.Ticker.addEventListener("tick", throttledTick);
  currentStage._throttledTick = throttledTick; // store for removal --thorns

  AdobeAn.compositionLoaded(lib.properties.id);
  fitPage();
}

function fitPage() {
  const container = document.getElementById("animation_container");
  const cvs = document.getElementById("canvas");
  if (!container || !cvs) return;
  const fit = Math.min(
    container.clientWidth / 460,
    container.clientHeight / 352,
  );
  const scale = fit + (1 - fit) * 0.5;
  cvs.width = Math.round(460 * scale);
  cvs.height = Math.round(352 * scale);
}
window.addEventListener("resize", fitPage);

function scaleSite() {
  const site = document.getElementById("site");
  if (!site || site.clientWidth === 0) return;
  const scale = site.clientWidth / 760;
  const siteInner = document.getElementById("site-inner");
  const logoLayer = document.getElementById("logo-layer");
  if (siteInner) siteInner.style.transform = `scale(${scale})`;
  if (logoLayer) logoLayer.style.transform = `scale(${scale})`;
}
window.addEventListener("resize", scaleSite);
scaleSite();

// Start with default page or deep link --thorns
(function () {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || "orange";

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => loadPage(page));
  } else {
    loadPage(page);
  }
})();
