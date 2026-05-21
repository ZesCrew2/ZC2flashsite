(() => {
  const playSound = (id, loop, offset) => {
    if (!window.siteAudio || window.siteAudio.isMuted) return null;
    return createjs.Sound.play(id, {
      interrupt: createjs.Sound.INTERRUPT_EARLY,
      loop: loop,
      offset: offset,
    });
  };
  window.playSound = playSound;

  const canvas = document.getElementById("banner-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

  const comp = AdobeAn.getComposition("AA04CCBF99E11C4EA814ED2A172A239E");
  const lib = comp.getLibrary();
  const loader = new createjs.LoadQueue(false);

  loader.installPlugin(createjs.Sound);
  loader.addEventListener("fileload", (evt) => {
    if (evt && evt.item.type === "image")
      comp.getImages()[evt.item.id] = evt.result;
  });
  loader.addEventListener("complete", (evt) => {
    const ss = comp.getSpriteSheet();
    const queue = evt.target;
    const { ssMetadata } = lib;

    ssMetadata.forEach((meta) => {
      ss[meta.name] = new createjs.SpriteSheet({
        images: [queue.getResult(meta.name)],
        frames: meta.frames,
      });
    });

    const exportRoot = new lib.zc2banner();
    const stage = new lib.Stage(canvas);
    stage.enableMouseOver();
    stage.autoClear = true;

    // throttled tick for authentic 24 fps banner speed --thorns
    const throttledTick = Microsite.ticker.createThrottledTick(stage, 24);
    createjs.Ticker.addEventListener("tick", throttledTick);

    AdobeAn.compositionLoaded(lib.properties.id);
    stage.addChild(exportRoot);
  });
  loader.loadManifest(lib.properties.manifest);
})();
