function playSound(id, loop, offset) {
    if (!window.siteAudio || window.siteAudio.isMuted) {
        return null;
    }
    return createjs.Sound.play(id, {'interrupt':createjs.Sound.INTERRUPT_EARLY, 'loop': loop, 'offset': offset});
}
(function() {
    var canvas = document.getElementById('banner-canvas');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);    
    var comp = AdobeAn.getComposition("AA04CCBF99E11C4EA814ED2A172A239E");
    var lib = comp.getLibrary();
    var loader = new createjs.LoadQueue(false);
    loader.installPlugin(createjs.Sound);
    loader.addEventListener("fileload", function(evt) { handleFileLoad(evt, comp); });
    loader.addEventListener("complete", function(evt) { handleComplete(evt, comp); });
    loader.loadManifest(lib.properties.manifest);
    
    function handleFileLoad(evt, comp) {
        var images = comp.getImages();
        if (evt && evt.item.type == "image") { images[evt.item.id] = evt.result; }
    }
    
    function handleComplete(evt, comp) {
        var lib = comp.getLibrary();
        var ss = comp.getSpriteSheet();
        var queue = evt.target;
        var ssMetadata = lib.ssMetadata;
        for (var i = 0; i < ssMetadata.length; i++) {
            ss[ssMetadata[i].name] = new createjs.SpriteSheet({"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames});
        }
        var exportRoot = new lib.zc2banner();
        var stage = new lib.Stage(canvas);
        stage.enableMouseOver();
        stage.autoClear = false;
        createjs.Ticker.addEventListener("tick", function(event) {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            stage.update(event);
        });
        AdobeAn.compositionLoaded(lib.properties.id);
        stage.addChild(exportRoot);
    }
})();
