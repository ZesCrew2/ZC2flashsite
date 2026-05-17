var currentStage = null;
var currentPage = null;
var currentLoader = null;
var pageLoadToken = 0;
var pageSoundsRegistered = {};

if (typeof window.playSound !== 'function') {
	window.playSound = function(id, loop, offset) {
		if (!window.siteAudio || window.siteAudio.isMuted) {
			return null;
		}
		return createjs.Sound.play(id, {'interrupt':createjs.Sound.INTERRUPT_EARLY, 'loop': loop, 'offset': offset});
	};
}

function registerPageSound(src, id) {
	if (!createjs.Sound || pageSoundsRegistered[id]) return;
	pageSoundsRegistered[id] = true;
	createjs.Sound.registerSound(src, id);
}

function resolvePageAssetPath(src) {
	var resolver = document.createElement('a');
	resolver.href = 'assets/swf/pages/' + src;
	return resolver.pathname.replace(/^\//, '');
}

function loadPage(color) {
	if (typeof createjs === 'undefined') return;
	
	// whitelist pages for security --thorns
	var validPages = ['red', 'orange', 'yellow', 'lime', 'green', 'cyan', 'blue', 'purple', 'pink'];
	if (validPages.indexOf(color) === -1) {
		console.error("security: blocked attempt to load invalid page: " + color + " --thorns");
		return;
	}

	pageLoadToken++;

	var flashContent = document.getElementById('flashContent');

	if (currentStage) {
		if (currentStage._throttledTick) {
			createjs.Ticker.removeEventListener("tick", currentStage._throttledTick);
		} else {
			createjs.Ticker.removeEventListener("tick", currentStage);
		}
		currentStage = null;
	}

	if (currentLoader) {
		currentLoader.removeAllEventListeners();
		currentLoader.close();
		currentLoader = null;
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
	var token = pageLoadToken;
	script.onload = function() {
		if (currentPage === color && pageLoadToken === token) initPage(color, token);
	};
	document.body.appendChild(script);
}

function initPage(color, token) {
	var canvas = document.getElementById('canvas');
	var anim_container = document.getElementById('animation_container');
	if (!canvas || !anim_container) return;
	var comp = AdobeAn.getComposition("B325F180281AD548AF0E7778EAE237A2");
	var lib = comp.getLibrary();
	var manifest = [];
	lib.properties.manifest.forEach(function(item) {
		var cleanSrc = item.src.replace(/\?.*$/, '');
		var fullSrc = resolvePageAssetPath(cleanSrc);
		if (/\.(mp3|wav|ogg)$/i.test(cleanSrc)) {
			registerPageSound(fullSrc, item.id);
			return;
		}
		manifest.push({ src: fullSrc, id: item.id });
	});
	var loader = new createjs.LoadQueue(false);
	currentLoader = loader;
	loader.addEventListener("fileload", function(evt) {
		if (token !== pageLoadToken || loader !== currentLoader) return;
		handlePageFileLoad(evt, comp);
	});
	loader.addEventListener("complete", function(evt) {
		if (token !== pageLoadToken || loader !== currentLoader) return;
		currentLoader = null;
		handlePageComplete(evt, comp, color);
	});
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
	
	// use throttled tick for authentic flash speed --thorns
	var throttledTick = Microsite.ticker.createThrottledTick(currentStage, lib.properties.fps);
	createjs.Ticker.addEventListener("tick", throttledTick);
	currentStage._throttledTick = throttledTick; // store for removal --thorns

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
