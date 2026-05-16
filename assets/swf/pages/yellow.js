(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"yellow_atlas_1", frames: [[541,0,84,72],[0,0,539,139],[627,0,70,70]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_6 = function() {
	this.initialize(ss["yellow_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap1 = function() {
	this.initialize(ss["yellow_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap3 = function() {
	this.initialize(ss["yellow_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.titletext = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-67.85,-17.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.titletext, new cjs.Rectangle(-67.8,-17.9,42,36), null);


(lib.Symbol62 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap3();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,70,70);


(lib.pp = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#000000","rgba(0,0,0,0)"],[0,1],0,160.9,0,-35.1).s().p("EgmCAdFMAAAg6JMBMFAAAMAAAA6Jg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pp, new cjs.Rectangle(-243.5,-186,487,372.1), null);


(lib.PencilBody = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#666666").ss(4,1,0,5).p("AjdiiIAqAAIBIAAIC3AAIBsAAIAnAAIAAFFIghAAIhyAAIifAAIgYAAIhIAAIgrAAgAjdiiIAAAA");
	this.shape.setTransform(-0.3148,-74.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C3C3C3").s().p("Ag4CjIABlFIApAAIBHAAIAAFFIhGAAg");
	this.shape_1.setTransform(-16.8625,-74.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFBF48").s().p("AgvLpIAA3RIBHAAIAYAAIAAXRg");
	this.shape_2.setTransform(-13.525,16.5375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B5B5B5").s().p("ACECjIhxAAIifAAIgZAAIAAlFIC4AAIBsAAIAnAAIAAFFg");
	this.shape_3.setTransform(5.4,-74.2875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CC536B").s().p("AC3CFIAAiXQAAhQhGAAIgmAAIiwAAQg8AAgPAtQgDAKgBAKIAACmIgpAAIgBAAIADivQAFgtAjgYQAZgTApgCIDoAAQBjAAAFBsIgBCdg");
	this.shape_4.setTransform(-0.275,-103.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F0C575").s().p("AgkhxIAAgBIBhAAIACABIh9Dkg");
	this.shape_5.setTransform(10.8875,106.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E17389").s().p("Ag1B0IAAjnIAlAAQBGAAAABQIAACXg");
	this.shape_6.setTransform(12.65,-102.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E89700").s().p("Ag5LpIACgBIAA3QIBwAAIgEXRg");
	this.shape_7.setTransform(12.9,16.5375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E47E93").s().p("Ag3B0IhIAAIAAimQAAgKAEgKQAPgtA8AAICwAAIAADng");
	this.shape_8.setTransform(-5.55,-102.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#BD8A2B").s().p("ABYBzIgrAAIB/jkIABgBIAuAAIiCDlgAhdBzIh9jkIAtgBIB6Dlg");
	this.shape_9.setTransform(0.0125,106.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#B97800").s().p("ABcNsIAAAAIgGAJgAjet0IArAAIAAXSIBgAAICdAAIAAAnIj0AAIgtABgACwKFIgDAAIhiAAIAAgnIBuAAIAF3SIAhAAIgBX5g");
	this.shape_10.setTransform(-0.3125,30.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("AhahRIAqAAIBgAAIArAAIgFAJIhYCag");
	this.shape_11.setTransform(-0.2875,126.25);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F3D08F").s().p("AgyBzIh6jlID0AAIABABIgbDkgACrhyIACAAIAAABg");
	this.shape_12.setTransform(-0.05,106.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFA909").s().p("AhPLpIAA3RICfAAIAAXQIgBABIieAAg");
	this.shape_13.setTransform(-0.75,16.5375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.PencilBody, new cjs.Rectangle(-24.5,-117.2,48.5,251.7), null);


(lib.roate = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol62();
	this.instance.setTransform(-173,122.45,6.4836,6.4836,0,0,0,35.1,35.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:35,regY:35,rotation:-0.0996,x:-173.55,y:121.85},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-0.2153,x:-173.65},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-0.3472,x:-173.6,y:121.8},0).wait(1).to({rotation:-0.4955,x:-173.65,y:121.85},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-0.6603},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-0.8417,x:-173.6},0).wait(1).to({rotation:-1.0399,y:121.9},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-1.2551,x:-173.65,y:121.85},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-1.4874,x:-173.6},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-1.737},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-2.0041},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-2.2887,x:-173.65,y:121.9},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-2.591},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-2.9113,x:-173.6},0).wait(1).to({rotation:-3.2496,x:-173.65},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-3.6062,y:121.95},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-3.9812,y:121.9},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-4.3747},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-4.7869,x:-173.6},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-5.2181,x:-173.65},0).wait(1).to({rotation:-5.6682,x:-173.7},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-6.1376,x:-173.65,y:121.95},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-6.6264,y:121.9},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-7.1348,x:-173.7},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-7.6629,y:121.95},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-8.2108},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-8.7789,y:121.9},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-9.3671,y:121.95},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-9.9758,y:122},0).wait(1).to({scaleX:6.4835,scaleY:6.4835,rotation:-10.605},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-11.255,y:121.95},0).wait(1).to({rotation:-11.9259,y:122},0).wait(1).to({rotation:-12.6179,x:-173.75,y:122.05},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-13.3311},0).wait(1).to({rotation:-14.0658,y:122},0).wait(1).to({rotation:-14.822,x:-173.7,y:122.05},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-15.6,x:-173.75,y:122},0).wait(1).to({rotation:-16.4,y:122.1},0).wait(1).to({rotation:-17.222,y:122.05},0).wait(1).to({rotation:-18.0662,x:-173.8,y:122.1},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-18.9329,x:-173.75},0).wait(1).to({rotation:-19.8222,y:122.15},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-20.7342},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-21.6691},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-22.627,x:-173.8},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-23.6082,x:-173.75,y:122.1},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-24.6127,x:-173.85,y:122.15},0).wait(1).to({rotation:-25.6407,x:-173.8},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-26.6924},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-27.7678,x:-173.85,y:122.2},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-28.8672,x:-173.8},0).wait(1).to({rotation:-29.9907},0).wait(1).to({rotation:-31.1383,y:122.25},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-32.3103,x:-173.85},0).wait(1).to({rotation:-33.5067,x:-173.9},0).wait(1).to({rotation:-34.7277,y:122.3},0).wait(1).to({rotation:-35.9733,x:-173.85},0).wait(1).to({rotation:-37.2437},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-38.539,y:122.35},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-39.8593},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-41.2046,y:122.4},0).wait(1).to({rotation:-42.575},0).wait(1).to({rotation:-43.9707,x:-173.9},0).wait(1).to({rotation:-45.3916,y:122.45},0).wait(1).to({rotation:-46.8379,x:-173.85,y:122.5},0).wait(1).to({rotation:-48.3095,y:122.55},0).wait(1).to({rotation:-49.8065,y:122.5},0).wait(1).to({rotation:-51.329,x:-173.9,y:122.6},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-52.8769,x:-173.85,y:122.55},0).wait(1).to({rotation:-54.4503,x:-173.8,y:122.6},0).wait(1).to({scaleX:6.4835,scaleY:6.4835,rotation:-56.0491,y:122.65},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-57.6734,x:-173.85},0).wait(1).to({rotation:-59.3232,y:122.7},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-60.9983},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-62.6987,x:-173.8,y:122.75},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-64.4244},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-66.1753},0).wait(1).to({rotation:-67.9512,x:-173.75,y:122.8},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-69.7522,y:122.85},0).wait(1).to({rotation:-71.578,x:-173.8},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-73.4286},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-75.3037,x:-173.75,y:122.9},0).wait(1).to({rotation:-77.2032},0).wait(1).to({rotation:-79.1269,x:-173.7,y:122.95},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-81.0746},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-83.0461,y:123},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-85.0412,x:-173.65},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-87.0595,x:-173.6,y:123.05},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-89.1009,y:123.1},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-91.1649,x:-173.55},0).wait(1).to({rotation:-93.2513,y:123.15},0).wait(1).to({scaleX:6.4835,scaleY:6.4835,rotation:-95.3598,x:-173.5},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-97.49},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-99.6415,y:123.25},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-101.8139,x:-173.45},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-104.0068,x:-173.4},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-106.2198},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-108.4524},0).wait(1).to({rotation:-110.7042,x:-173.35,y:123.3},0).wait(1).to({rotation:-112.9746,x:-173.25},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-115.2631,x:-173.3,y:123.35},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-117.5691,x:-173.25,y:123.3},0).wait(1).to({rotation:-119.8923,x:-173.2},0).wait(1).to({rotation:-122.2318,y:123.35},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-124.5873,x:-173.1,y:123.4},0).wait(1).to({rotation:-126.9579,y:123.35},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-129.3432,x:-173},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-131.7425,x:-173.05},0).wait(1).to({rotation:-134.155,x:-173},0).wait(1).to({rotation:-136.5802,x:-172.9,y:123.3},0).wait(1).to({rotation:-139.0173,x:-172.85,y:123.35},0).wait(1).to({rotation:-141.4656,y:123.4},0).wait(1).to({rotation:-143.9244,x:-172.75,y:123.35},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-146.393},0).wait(1).to({rotation:-148.8705},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-151.3564,x:-172.65,y:123.3},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-153.8496,y:123.35},0).wait(1).to({scaleX:6.4835,scaleY:6.4835,rotation:-156.3496,x:-172.6,y:123.3},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-158.8555},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-161.3665,x:-172.55,y:123.25},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-163.8819,x:-172.5},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-166.4007,x:-172.45},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-168.9223,x:-172.5,y:123.2},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-171.4457,x:-172.45},0).wait(1).to({rotation:-173.9702,x:-172.4,y:123.15},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-176.495},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-179.0193,x:-172.35,y:123.1},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-181.5422,y:123.05},0).wait(1).to({rotation:-184.063,x:-172.3,y:123.1},0).wait(1).to({rotation:-186.5809,y:123},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-189.095,x:-172.2},0).wait(1).to({rotation:-191.6046,x:-172.25,y:122.95},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-194.1089,x:-172.2,y:122.9},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-196.6072,x:-172.15},0).wait(1).to({rotation:-199.0986,x:-172.2,y:122.85},0).wait(1).to({rotation:-201.5825,x:-172.1,y:122.8},0).wait(1).to({rotation:-204.0581},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-206.5247,x:-172.15,y:122.75},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-208.9816,x:-172.1,y:122.7},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-211.428,x:-172.15},0).wait(1).to({scaleX:6.4835,scaleY:6.4835,rotation:-213.8633,x:-172.1,y:122.6},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-216.2869,x:-172.05},0).wait(1).to({rotation:-218.6981,x:-172.1},0).wait(1).to({rotation:-221.0963,x:-172.05,y:122.5},0).wait(1).to({rotation:-223.4809},0).wait(1).to({rotation:-225.8512,x:-172.1,y:122.45},0).wait(1).to({rotation:-228.2067,y:122.4},0).wait(1).to({rotation:-230.5468,x:-172.05,y:122.35},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-232.8711,x:-172.1,y:122.3},0).wait(1).to({rotation:-235.1789,x:-172.15,y:122.25},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-237.4699,x:-172.1,y:122.2},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-239.7434},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-241.9992,y:122.15},0).wait(1).to({rotation:-244.2366,x:-172.15,y:122.1},0).wait(1).to({rotation:-246.4553,y:122.15},0).wait(1).to({rotation:-248.6549,y:122.1},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-250.8351,x:-172.2},0).wait(1).to({rotation:-252.9954,x:-172.15},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-255.1355,x:-172.2,y:122.05},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-257.2551,x:-172.25},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-259.3539,x:-172.2,y:122},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-261.4315,x:-172.25,y:121.95},0).wait(1).to({rotation:-263.4878,x:-172.3,y:121.9},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-265.5225,y:121.95},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-267.5353,y:121.85},0).wait(1).to({rotation:-269.5261,x:-172.35,y:121.8},0).wait(1).to({rotation:-271.4946,x:-172.4},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-273.4406},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-275.364,x:-172.45},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-277.2646,y:121.75},0).wait(1).to({rotation:-279.1423},0).wait(1).to({rotation:-280.9969},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-282.8284},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-284.6367,y:121.7},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-286.4216,x:-172.5,y:121.65},0).wait(1).to({rotation:-288.1832,x:-172.55},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-289.9212,x:-172.6},0).wait(1).to({rotation:-291.6358},0).wait(1).to({rotation:-293.3269,x:-172.65},0).wait(1).to({rotation:-294.9943,x:-172.6},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-296.6382,x:-172.65},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-298.2586,x:-172.7},0).wait(1).to({rotation:-299.8553,y:121.6},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-301.4286,x:-172.75,y:121.65},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-302.9782,y:121.55},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-304.5044,y:121.6},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-306.0072,x:-172.8,y:121.55},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-307.4865},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-308.9425,x:-172.85,y:121.6},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-310.3752,x:-172.9},0).wait(1).to({rotation:-311.7847,y:121.55},0).wait(1).to({rotation:-313.171,x:-172.95},0).wait(1).to({rotation:-314.5343},0).wait(1).to({rotation:-315.8747,y:121.6},0).wait(1).to({rotation:-317.1921},0).wait(1).to({rotation:-318.4868,x:-173,y:121.55},0).wait(1).to({rotation:-319.7588,x:-173.05},0).wait(1).to({rotation:-321.0082,y:121.65},0).wait(1).to({rotation:-322.2352,y:121.55},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-323.4398,x:-173.1},0).wait(1).to({rotation:-324.6223,y:121.65},0).wait(1).to({rotation:-325.7826,y:121.6},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-326.9209,x:-173.15},0).wait(1).to({rotation:-328.0374,x:-173.2},0).wait(1).to({rotation:-329.1321,y:121.65},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-330.2053,x:-173.15},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-331.2571,x:-173.2,y:121.6},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-332.2875,x:-173.25,y:121.65},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-333.2967,y:121.6},0).wait(1).to({rotation:-334.2849},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-335.2522,y:121.65},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-336.1988,x:-173.3,y:121.7},0).wait(1).to({rotation:-337.1248,x:-173.25,y:121.65},0).wait(1).to({rotation:-338.0303,x:-173.3},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-338.9155,y:121.7},0).wait(1).to({rotation:-339.7805,x:-173.35},0).wait(1).to({rotation:-340.6255},0).wait(1).to({rotation:-341.4507},0).wait(1).to({rotation:-342.2561},0).wait(1).to({rotation:-343.042,x:-173.4},0).wait(1).to({rotation:-343.8085,y:121.75},0).wait(1).to({rotation:-344.5557},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-345.2838},0).wait(1).to({rotation:-345.9929,x:-173.45},0).wait(1).to({rotation:-346.6832,y:121.7},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-347.3549,x:-173.5,y:121.75},0).wait(1).to({rotation:-348.008,x:-173.45,y:121.7},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-348.6428,y:121.75},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-349.2594,x:-173.5},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-349.8579,x:-173.45},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-350.4385,x:-173.5},0).wait(1).to({rotation:-351.0013,y:121.8},0).wait(1).to({rotation:-351.5465,y:121.75},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-352.0742},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-352.5846,y:121.8},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-353.0779,x:-173.55,y:121.75},0).wait(1).to({rotation:-353.554,y:121.8},0).wait(1).to({rotation:-354.0133,x:-173.5},0).wait(1).to({rotation:-354.4559,y:121.75},0).wait(1).to({rotation:-354.8818,x:-173.55,y:121.8},0).wait(1).to({rotation:-355.2912,x:-173.6},0).wait(1).to({rotation:-355.6844,x:-173.55,y:121.85},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-356.0613},0).wait(1).to({scaleX:6.4835,scaleY:6.4835,rotation:-356.4222,y:121.8},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-356.7672,x:-173.6},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-357.0963,x:-173.55,y:121.85},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-357.4099,y:121.8},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-357.7079,x:-173.6,y:121.85},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-357.9906,x:-173.55},0).wait(1).to({scaleX:6.4836,scaleY:6.4836,rotation:-358.258,x:-173.6,y:121.8},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-358.5103,y:121.85},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-358.7476,y:121.8},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-358.9701,y:121.85},0).wait(1).to({rotation:-359.1778},0).wait(1).to({rotation:-359.371},0).wait(1).to({scaleX:6.4838,scaleY:6.4838,rotation:-359.5496,x:-173.65},0).wait(1).to({scaleX:6.4837,scaleY:6.4837,rotation:-359.7139},0).wait(1).to({rotation:-359.864,x:-173.6,y:121.9},0).wait(1).to({regX:35.1,regY:35.1,scaleX:6.4836,scaleY:6.4836,rotation:-360,x:-172.95,y:122.5},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-504.9,-210.4,666.5,667.2);


(lib.icon = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_6
	this.instance = new lib.PencilBody();
	this.instance.setTransform(0.45,9.45,0.2825,0.2825,46.243,0,0,-0.5,8.7);
	var instanceFilter_1 = new cjs.ColorFilter(0,0,0,1,255,255,165,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(-26,-119,53,256);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.icon, new cjs.Rectangle(-29.9,-20,60.9,59), null);


// stage content:
(lib.yellow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		if (this._artGalleryReady) {
			return;
		}
		this._artGalleryReady = true;

		var root = this;
		var galleryY = 104;
		var galleryHeight = 190;
		var centerX = 230;
		var centerY = 183;
		var navY = 314;
		var navScale = 0.28;
		var cardsLayer = new cjs.Container();
		var uiLayer = new cjs.Container();

		var maskShape = new cjs.Shape();
		maskShape.graphics.f("#000000").drawRect(0, galleryY, lib.properties.width, galleryHeight);
		cardsLayer.mask = maskShape;

		root.addChild(uiLayer);
		root.addChild(cardsLayer);

		var fallbackItems = [
			{filename:"2026 lily ref new.png", displayName:"2026 Lily Ref", link:""},
			{filename:"AMY SPINDRIFT LOLOL.png", displayName:"Amy Spindrift", link:""},
			{filename:"INTERNAL_SCREAMING.png", displayName:"Internal Screaming", link:""},
			{filename:"modern aero flash 2.png", displayName:"Modern Aero Flash 2", link:""},
			{filename:"new 2006 cover v4 flatter.png", displayName:"New 2006 Cover v4", link:""},
			{filename:"sonicv6 idle.gif", displayName:"Sonic V6 Idle", link:""},
			{filename:"vanilla wip 9.png", displayName:"Vanilla WIP 9", link:""}
		];

		function normalizeItems(items) {
			if (!items || !items.length) {
				return fallbackItems;
			}
			var normalized = [];
			for (var i = 0; i < items.length; i++) {
				if (!items[i] || !items[i].filename) {
					continue;
				}
				normalized.push({
					filename: items[i].filename,
					displayName: items[i].displayName || items[i].filename,
					link: items[i].link || ""
				});
			}
			return normalized.length ? normalized : fallbackItems;
		}

		function getArtLayout(imgW, imgH, filename) {
			var fitScale = Math.min(156 / imgW, 156 / imgH, 1);
			var aspectRatio = imgW / imgH;
			var yOffset = -8; // baseline
			
			if (aspectRatio > 1.2) {
				yOffset = -4;
			} else if (aspectRatio < 0.8) {
				yOffset = 4;
			} else {
				yOffset = 0;
			}

			return { scale: fitScale, y: yOffset };
		}

		function makeNavButton(imageObj, xPos, direction, clickHandler) {
			var btn = new cjs.Bitmap(imageObj);
			btn.scaleX = navScale;
			btn.scaleY = navScale;
			btn.regX = 128;
			btn.regY = 128;
			btn.x = xPos;
			btn.y = navY;
			btn.shadow = new cjs.Shadow("rgba(106,68,0,0.55)", 0, 2, 6);
			btn.cursor = "pointer";

			function setButtonBrightness(isBright) {
				if (!btn.image || !btn.image.width || !btn.image.height) {
					return;
				}
				var add = isBright ? 46 : 0;
				btn.filters = [new cjs.ColorFilter(1, 1, 1, 1, add, add, 12, 0)];
				if (!btn.cacheCanvas) {
					btn.cache(0, 0, btn.image.width, btn.image.height);
				} else {
					btn.updateCache();
				}
			}

			setButtonBrightness(false);

			btn.addEventListener("mouseover", function() {
				if (typeof playSound === "function") {
					playSound("hoverwav");
				}
				setButtonBrightness(true);
			});

			btn.addEventListener("mouseout", function() {
				setButtonBrightness(false);
			});

			btn.addEventListener("click", function() {
				if (typeof playSound === "function") {
					playSound("clickywav");
				}
				clickHandler(direction);
			});

			uiLayer.addChild(btn);
		}

		function buildGallery(items) {
			var artItems = normalizeItems(items);
			var imgQueue = new cjs.LoadQueue(false);
			imgQueue.setMaxConnections(8);
			imgQueue.loadFile({id:"btn_left", src:"/assets/img/yellow/left.png"});
			imgQueue.loadFile({id:"btn_right", src:"/assets/img/yellow/right.png"});
			imgQueue.loadFile({id:"shine_overlay", src:"/assets/img/yellow/shine.png"});
			for (var i = 0; i < artItems.length; i++) {
				imgQueue.loadFile({id:"art_" + i, src:encodeURI("/assets/img/yellow/art/" + artItems[i].filename)});
			}

			function renderCards() {
				var cards = [];
				var currentIndex = 0;
				var isAnimating = false;
				var spacing = 120;

				for (var j = 0; j < artItems.length; j++) {
					(function(index) {
						var itemEntry = artItems[index];
						var imageObj = imgQueue.getResult("art_" + index);
						if (!imageObj) {
							return;
						}

						var card = new cjs.Container();
						card.entry = itemEntry;

						var cardBg = new cjs.Shape();
						cardBg.graphics.f("#E7E7E7").s("rgba(255,255,255,0.85)").ss(2).rr(-86, -86, 172, 172, 12);
						cardBg.shadow = new cjs.Shadow("rgba(60,40,0,0.35)", 0, 3, 8);
						card.addChild(cardBg);

						var artBmp = new cjs.Bitmap(imageObj);
						artBmp.regX = imageObj.width / 2;
						artBmp.regY = imageObj.height / 2;
						
						var layout = getArtLayout(imageObj.width, imageObj.height);
						artBmp.scaleX = layout.scale;
						artBmp.scaleY = layout.scale;
						artBmp.y = layout.y;
						
						card.addChild(artBmp);

						// add shine overlay to every card --thorns
						var shineImage = imgQueue.getResult("shine_overlay");
						if (shineImage) {
							var shineBmp = new cjs.Bitmap(shineImage);
							shineBmp.regX = shineImage.width / 2;
							shineBmp.regY = shineImage.height / 2;
							shineBmp.scaleX = 172 / shineImage.width;
							shineBmp.scaleY = 172 / shineImage.height;
							shineBmp.y = 0; 
							card.addChild(shineBmp);
						}

						var nameLabel = new cjs.Text(card.entry.displayName, "14px Kronika", "#774900");
						nameLabel.textAlign = "center";
						nameLabel.y = 92;
						nameLabel.shadow = new cjs.Shadow("rgba(255,255,255,0.8)", 0, 0, 2);
						card.addChild(nameLabel);

						card.hitArea = new cjs.Shape();
						card.hitArea.graphics.f("#000000").rr(-88, -88, 176, 198, 12);

						if (card.entry.link && card.entry.link.trim() !== "") {
							card.cursor = "pointer";
							card.addEventListener("mouseover", function() {
								if (typeof playSound === "function") {
									playSound("hoverwav");
								}
							});
							card.addEventListener("click", function(evt) {
								if (typeof playSound === "function") {
									playSound("clickywav");
								}
								window.open(evt.currentTarget.entry.link, "_blank");
							});
						} else {
							card.cursor = "zoom-in";
							card.addEventListener("click", function(evt) {
								if (Math.abs(distanceFromCenter(cards.indexOf(card))) > 0.1) return;
								showFullPreview(card.entry, imageObj);
							});
						}

						cardsLayer.addChild(card);
						cards.push(card);
					})(j);
				}

				// preview overlay system --thorns
				var previewLayer = new cjs.Container();
				root.addChild(previewLayer);
				var isPreviewOpen = false;

				function showFullPreview(entry, imageObj) {
					if (isPreviewOpen) return;
					isPreviewOpen = true;
					if (typeof playSound === "function") playSound("clickywav");

					var overlay = new cjs.Shape();
					overlay.graphics.f("rgba(0,0,0,0.85)").drawRect(0, 0, lib.properties.width, lib.properties.height);
					overlay.alpha = 0;
					previewLayer.addChild(overlay);

					var previewBmp = new cjs.Bitmap(imageObj);
					previewBmp.regX = imageObj.width / 2;
					previewBmp.regY = imageObj.height / 2;

					var layout = getArtLayout(imageObj.width, imageObj.height);
					previewBmp.x = centerX;
					previewBmp.y = centerY + layout.y;
					previewBmp.scaleX = layout.scale * 0.92;
					previewBmp.scaleY = layout.scale * 0.92;
					previewLayer.addChild(previewBmp);

					var margin = 40;
					var targetScale = Math.min((lib.properties.width - margin) / imageObj.width, (lib.properties.height - margin) / imageObj.height, 1.2);

					cjs.Tween.get(overlay).to({alpha:1}, 300);
					cjs.Tween.get(previewBmp).to({x:lib.properties.width/2, y:lib.properties.height/2, scaleX:targetScale, scaleY:targetScale}, 400, cjs.Ease.backOut);

					uiLayer.visible = false;
					cardsLayer.visible = false;
					if (gifOverlay) gifOverlay.style.display = "none";
					if (shineOverlay) shineOverlay.style.display = "none";

					var previewGif = document.getElementById("preview-gif-overlay");
					if (entry.filename.toLowerCase().endsWith(".gif")) {
						if (!previewGif) {
							previewGif = document.createElement("img");
							previewGif.id = "preview-gif-overlay";
							previewGif.style.position = "absolute";
							previewGif.style.zIndex = "20";
							previewGif.style.display = "none";
							document.getElementById("animation_container").appendChild(previewGif);
						}
						previewGif.src = encodeURI("/assets/img/yellow/art/" + entry.filename);
						
						setTimeout(function() {
							if (!isPreviewOpen) return;
							previewBmp.visible = false;
							previewGif.style.width = (imageObj.width * targetScale) + "px";
							previewGif.style.height = (imageObj.height * targetScale) + "px";
							previewGif.style.left = (lib.properties.width/2 - (imageObj.width * targetScale / 2)) + "px";
							previewGif.style.top = (lib.properties.height/2 - (imageObj.height * targetScale / 2)) + "px";
							previewGif.style.display = "block";
						}, 400);
					}

					var closeHint = new cjs.Text("Click anywhere to close", "14px Trebuchet MS", "#FFFFFF");
					closeHint.textAlign = "center";
					closeHint.x = lib.properties.width / 2;
					closeHint.y = lib.properties.height - 20;
					closeHint.alpha = 0;
					previewLayer.addChild(closeHint);
					cjs.Tween.get(closeHint).wait(500).to({alpha:0.6}, 300);

					overlay.cursor = "zoom-out";
					overlay.addEventListener("click", function() {
						isPreviewOpen = false;
						if (typeof playSound === "function") playSound("clickywav");
						if (previewGif) previewGif.style.display = "none";
						previewBmp.visible = true;

						cjs.Tween.get(overlay).to({alpha:0}, 300);
						cjs.Tween.get(closeHint).to({alpha:0}, 200);
						cjs.Tween.get(previewBmp).to({x:centerX, y:centerY + layout.y, scaleX:layout.scale * 0.92, scaleY:layout.scale * 0.92}, 300, cjs.Ease.quadIn).call(function() {
							previewLayer.removeAllChildren();
							uiLayer.visible = true;
							cardsLayer.visible = true;
							updateGifOverlay();
						});
					});
				}

				if (!cards.length) {
					var noArtText = new cjs.Text("No art items found", "20px Trebuchet MS", "#774900");
					noArtText.textAlign = "center";
					noArtText.x = centerX;
					noArtText.y = centerY - 10;
					uiLayer.addChild(noArtText);
					return;
				}

				function wrapIndex(value) {
					var count = cards.length;
					return ((value % count) + count) % count;
				}

				function distanceFromCenter(index) {
					var raw = index - currentIndex;
					var half = cards.length / 2;
					if (raw > half) {
						raw -= cards.length;
					} else if (raw < -half) {
						raw += cards.length;
					}
					return raw;
				}

				function drawOrder() {
					var sorted = cards.slice(0).sort(function(a, b) {
						return Math.abs(b._depthOffset || 0) - Math.abs(a._depthOffset || 0);
					});
					for (var idx = 0; idx < sorted.length; idx++) {
						cardsLayer.setChildIndex(sorted[idx], cardsLayer.numChildren - 1);
					}
				}

				function updateCards(animated) {
					for (var k = 0; k < cards.length; k++) {
						var card = cards[k];
						var offset = distanceFromCenter(k);
						card._depthOffset = offset;

						var absOffset = Math.abs(offset);
						var targetX = centerX + (offset * spacing);
						var targetY = centerY + (absOffset * 10);
						var targetScale = absOffset === 0 ? 0.92 : (absOffset === 1 ? 0.66 : 0.48);
						var targetAlpha = absOffset === 0 ? 1 : (absOffset === 1 ? 0.58 : 0);

						card.visible = absOffset <= 2;
						card.mouseEnabled = absOffset <= 1;

						// cjs bitmap was rendering just the first frame of the gif (fixed) --thorns
						if (card.children[1] instanceof cjs.Bitmap) {
							if (absOffset === 0 && card.entry.filename.toLowerCase().endsWith(".gif")) {
								card.children[1].visible = false;
							} else {
								card.children[1].visible = true;
							}
						}

						if (animated) {
							cjs.Tween.removeTweens(card);
							var tween = cjs.Tween.get(card).to({x:targetX, y:targetY, scaleX:targetScale, scaleY:targetScale, alpha:targetAlpha}, 240, cjs.Ease.quadOut);
							
							// sync gif overlay during animation
							if (absOffset === 0 && card.entry.filename.toLowerCase().endsWith(".gif")) {
								tween.addEventListener("change", function() {
									updateGifOverlay();
								});
							}
						} else {
							card.x = targetX;
							card.y = targetY;
							card.scaleX = targetScale;
							card.scaleY = targetScale;
							card.alpha = targetAlpha;
						}
					}
					drawOrder();
					updateGifOverlay();
				}

				// gif animation fix: overlay html img element because cjs.Bitmap doesn't animate GIFs --thorns
				var gifOverlay = document.getElementById("gallery-gif-overlay");
				var shineOverlay = document.getElementById("gallery-shine-overlay");
				if (!gifOverlay) {
					var container = document.getElementById("animation_container");
					if (container) {
						gifOverlay = document.createElement("img");
						gifOverlay.id = "gallery-gif-overlay";
						gifOverlay.style.position = "absolute";
						gifOverlay.style.pointerEvents = "none";
						gifOverlay.style.zIndex = "10";
						gifOverlay.style.display = "none";
						gifOverlay.style.transition = "none";
						container.appendChild(gifOverlay);
						
						shineOverlay = document.createElement("img");
						shineOverlay.id = "gallery-shine-overlay";
						shineOverlay.src = encodeURI("/assets/img/yellow/shine.png");
						shineOverlay.style.position = "absolute";
						shineOverlay.style.pointerEvents = "none";
						shineOverlay.style.zIndex = "11"; // Above GIF
						shineOverlay.style.display = "none";
						shineOverlay.style.transition = "none";
						container.appendChild(shineOverlay);
					}
				}

				function updateGifOverlay() {
					if (isPreviewOpen) return;
					var activeCard = cards[currentIndex];
					if (activeCard && activeCard.entry.filename.toLowerCase().endsWith(".gif")) {
						var imageObj = imgQueue.getResult("art_" + currentIndex);
						if (imageObj) {
							var currentScale = activeCard.scaleX;
							var layout = getArtLayout(imageObj.width, imageObj.height, activeCard.entry.filename);
							var finalScale = layout.scale * currentScale;
							
							if (gifOverlay.getAttribute("data-filename") !== activeCard.entry.filename) {
								gifOverlay.src = encodeURI("/assets/img/yellow/art/" + activeCard.entry.filename);
								gifOverlay.setAttribute("data-filename", activeCard.entry.filename);
							}
							
							// Calculate ratio between stage size and CSS size
							var canvas = activeCard.stage.canvas;
							var ratio = canvas.width / canvas.clientWidth;
							
							// Get global position of the art bitmap center
							var pt = activeCard.localToGlobal(0, layout.y);
							
							gifOverlay.style.width = (imageObj.width * finalScale) + "px";
							gifOverlay.style.height = (imageObj.height * finalScale) + "px";
							
							// Position using stage coordinates / ratio and round to nearest pixel
							var x = Math.round((pt.x / ratio) - (imageObj.width * finalScale / 2));
							var y = Math.round((pt.y / ratio) - (imageObj.height * finalScale / 2));
							
							gifOverlay.style.left = x + "px";
							gifOverlay.style.top = y + "px";
							gifOverlay.style.display = "block";
							gifOverlay.style.opacity = activeCard.alpha;

							// Sync shine overlay
							if (shineOverlay) {
								var cardPt = activeCard.localToGlobal(0, 0);
								var cardWidth = 172 * currentScale;
								var cardHeight = 172 * currentScale;
								shineOverlay.style.width = cardWidth + "px";
								shineOverlay.style.height = cardHeight + "px";
								shineOverlay.style.left = Math.round(cardPt.x / ratio - (cardWidth / 2)) + "px";
								shineOverlay.style.top = Math.round(cardPt.y / ratio - (cardHeight / 2)) + "px";
								shineOverlay.style.display = "block";
								shineOverlay.style.opacity = activeCard.alpha;
							}

							gifOverlay.style.pointerEvents = activeCard.entry.link ? "auto" : "none";
							gifOverlay.style.cursor = activeCard.entry.link ? "pointer" : "default";
							gifOverlay.onclick = function() {
								if (typeof playSound === "function") playSound("clickywav");
								window.open(activeCard.entry.link, "_blank");
							};
							gifOverlay.onmouseover = function() {
								if (typeof playSound === "function") playSound("hoverwav");
							};
						}
					} else {
						if (gifOverlay) {
							gifOverlay.style.display = "none";
							gifOverlay.style.opacity = "0";
						}
						if (shineOverlay) {
							shineOverlay.style.display = "none";
							shineOverlay.style.opacity = "0";
						}
					}
				}

				function move(direction) {
					if (isAnimating || cards.length < 2) {
						return;
					}
					isAnimating = true;
					currentIndex = wrapIndex(currentIndex + direction);
					updateCards(true);
					setTimeout(function() {
						isAnimating = false;
					}, 260);
				}

				var leftBtnImage = imgQueue.getResult("btn_left");
				var rightBtnImage = imgQueue.getResult("btn_right");
				if (leftBtnImage && rightBtnImage) {
					makeNavButton(leftBtnImage, 48, -1, move);
					makeNavButton(rightBtnImage, 412, 1, move);
				}

				updateCards(false);
			}

			imgQueue.addEventListener("complete", function() {
				renderCards();
			});

			imgQueue.addEventListener("error", function() {
				console.warn("yellow.js: one or more art images failed to load");
			});

			imgQueue.load();
		}

		var configQueue = new cjs.LoadQueue(false);
		configQueue.addEventListener("complete", function() {
			var config = configQueue.getResult("artConfig");
			if (config && config.items && config.items.length) {
				buildGallery(config.items);
			} else {
				buildGallery(fallbackItems);
			}
		});

		configQueue.addEventListener("error", function() {
			console.warn("yellow.js: art-config.json failed to load; using fallback data");
			buildGallery(fallbackItems);
		});

		configQueue.loadFile({id:"artConfig", src:"/assets/img/yellow/art-config.json", type:"json"});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// Layer_2
	this.instance = new lib.icon();
	this.instance.setTransform(38,30.45,0.9448,0.9448);
	this.instance.shadow = new cjs.Shadow("#000000",0,0,8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2));
	this.instance.addEventListener("tick", AdobeAn.handleFilterCache);

	// Layer_3
	this.instance_1 = new lib.titletext();
	this.instance_1.setTransform(170.3,30,0.9448,0.9448);
	this.instance_1.shadow = new cjs.Shadow("#000000",0,0,6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2));

	// Layer_4
	this.instance_2 = new lib.Bitmap1();
	this.instance_2.setTransform(-26,-31,0.9448,0.9448);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2));

	// Layer_5
	this.instance_3 = new lib.roate();
	this.instance_3.setTransform(108.05,304.3,1.2645,1.2645,0,0,0,-173,122.5);
	this.instance_3.alpha = 0.2383;
	this.instance_3.compositeOperation = "multiply";
	var instance_3Filter_1 = new cjs.ColorFilter(0,0,0,1,217,156,0,0);
	this.instance_3.filters = [instance_3Filter_1];
	this.instance_3.cache(-507,-212,671,671);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2));
	this.timeline.addTween(cjs.Tween.get(instance_3Filter_1).wait(2));

	// Layer_6
	this.instance_4 = new lib.pp();
	this.instance_4.setTransform(230.05,175.75,0.9448,0.9448);
	this.instance_4.alpha = 0.5586;
	this.instance_4.compositeOperation = "multiply";
	var instance_4Filter_2 = new cjs.ColorFilter(0,0,0,1,189,120,0,0);
	this.instance_4.filters = [instance_4Filter_2];
	this.instance_4.cache(-245,-188,491,376);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(2));
	this.timeline.addTween(cjs.Tween.get(instance_4Filter_2).wait(2));

	// stageBackground
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1,3,true).p("EglfgdDMBK/AAAMAAAA6HMhK/AAAg");
	this.shape.setTransform(230,176);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF99").s().p("EglfAdEMAAAg6HMBK/AAAMAAAA6Hg");
	this.shape_1.setTransform(230,176);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(2));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_3, startFrame:0, endFrame:2, x:-507, y:-212, w:671, h:671});
	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(50.3,145,433,445.4);
// library properties:
lib.properties = {
	id: 'B325F180281AD548AF0E7778EAE237A2',
	width: 460,
	height: 352,
	fps: 24,
	color: "#FFFF99",
	opacity: 1.00,
	manifest: [
		{src:"images/yellow_atlas_1.png?1778909900410", id:"yellow_atlas_1"},
		{src:"../../sounds/clicky.wav", id:"clickywav"},
		{src:"../../sounds/hover.wav", id:"hoverwav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['B325F180281AD548AF0E7778EAE237A2'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
