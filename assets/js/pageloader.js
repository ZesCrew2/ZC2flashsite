var currentStage = null;
var currentPage = null;

function loadPage(color) {
	if (typeof createjs === 'undefined') return;

	var flashContent = document.getElementById('flashContent');

	if (currentStage) {
		createjs.Ticker.removeEventListener("tick", currentStage);
		currentStage = null;
	}

	var oldScript = document.getElementById('page-script');
	if (oldScript) oldScript.remove();

	flashContent.innerHTML = '';
	currentPage = color;

	var anim_container = document.createElement('div');
	anim_container.id = 'animation_container';
	var canvas = document.createElement('canvas');
	canvas.id = 'canvas';

	anim_container.appendChild(canvas);
	flashContent.appendChild(anim_container);

	var script = document.createElement('script');
	script.id = 'page-script';
	script.src = 'assets/swf/pages/' + color + '.js';
	script.onload = function() { if (currentPage === color) initPage(color); };
	document.body.appendChild(script);
}

function initPage(color) {
	var canvas = document.getElementById('canvas');
	var anim_container = document.getElementById('animation_container');
	if (!canvas || !anim_container) return;
	var comp = AdobeAn.getComposition("B325F180281AD548AF0E7778EAE237A2");
	var lib = comp.getLibrary();
	var manifest = lib.properties.manifest.map(function(item) {
		return { src: 'assets/swf/pages/' + item.src.replace(/\?.*$/, ''), id: item.id };
	});
	var loader = new createjs.LoadQueue(false);
	loader.installPlugin(createjs.Sound);
	loader.addEventListener("fileload", function(evt) { handlePageFileLoad(evt, comp); });
	loader.addEventListener("complete", function(evt) { handlePageComplete(evt, comp, color); });
	loader.loadManifest(manifest);
}

function handlePageFileLoad(evt, comp) {
	if (evt.item.type == "image") { comp.getImages()[evt.item.id] = evt.result; }
}

function handlePageComplete(evt, comp, color) {
	var lib = comp.getLibrary();
	var ss = comp.getSpriteSheet();
	var ssMetadata = lib.ssMetadata;
	for (var i = 0; i < ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet({"images": [evt.target.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames});
	}
	var exportRoot = new lib[color]();
	exportRoot.addEventListener("tick", AdobeAn.handleFilterCache);
	var canvas = document.getElementById('canvas');
	currentStage = new lib.Stage(canvas);
	currentStage.enableMouseOver();
	currentStage.addChild(exportRoot);
	createjs.Ticker.framerate = lib.properties.fps;
	createjs.Ticker.addEventListener("tick", currentStage);
	AdobeAn.compositionLoaded(lib.properties.id);
	fitPage();
}

function fitPage() {
	var container = document.getElementById('animation_container');
	var cvs = document.getElementById('canvas');
	if (!container || !cvs) return;
	var fit = Math.min(container.clientWidth / 460, container.clientHeight / 352);
	var scale = fit + (1 - fit) * 0.5;
	cvs.width = Math.round(460 * scale);
	cvs.height = Math.round(352 * scale);
	
}
window.addEventListener('resize', fitPage);

function scaleSite() {
	var scale = document.getElementById('site').clientWidth / 760;
	document.getElementById('site-inner').style.transform = 'scale(' + scale + ')';
	document.getElementById('logo-layer').style.transform = 'scale(' + scale + ')';
}
window.addEventListener('resize', scaleSite);
scaleSite();

loadPage('orange');
