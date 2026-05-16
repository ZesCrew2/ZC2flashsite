(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"pink_atlas_1", frames: [[1150,0,272,72],[0,0,907,536],[0,538,907,536],[1424,0,193,52],[909,0,239,496],[909,498,539,139],[1424,54,70,70]]}
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



(lib.CachedBmp_14 = function() {
	this.initialize(ss["pink_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["pink_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["pink_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["pink_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap5 = function() {
	this.initialize(ss["pink_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.ffff = function() {
	this.initialize(ss["pink_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.weeeee = function() {
	this.initialize(ss["pink_atlas_1"]);
	this.gotoAndStop(6);
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
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(-67.85,-17.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.titletext, new cjs.Rectangle(-67.8,-17.9,136,36), null);


(lib.thisisatext = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(-226.75,-134.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.thisisatext, new cjs.Rectangle(-226.7,-134.1,453.5,268), null);


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
	this.instance = new lib.weeeee();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,70,70);


(lib.soundcredsclickable = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(-48.25,-13.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-48.2,-13.1,96.5,26);


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


(lib.nomaskshine = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["rgba(255,255,255,0)","rgba(255,255,255,0.09)","rgba(255,255,255,0.729)"],[0,0.471,1],-0.2,81.6,-0.2,-32.4).s().p("AgCD4QlXiJjRAxIgMACQAZi1CIiJQCninDsAAQDrAACnCnQCnCmAADsIAAAUIgSAKQhdAwh3AAQiVAAi+hMg");
	this.shape.setTransform(0.025,-0.0052);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.7,-32.4,113.5,64.8);


(lib.iconcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_7
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFA5").s().p("AiWEPQgTgHgLgOQgLgQAAgTIAAmtQAAgUALgPQALgOATgHQATgGAUADQAVACAQAPID2DXQAUARABAYQgBAZgUARIj2DYQgQAOgVACIgMABQgOAAgNgEg");
	this.shape.setTransform(10.5,6.1861);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.iconcopy, new cjs.Rectangle(-8.7,-21.3,38.5,55), null);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AiICdQhFg8gagbQgngqgQgoQgTgtAAg/QAAhEAugtQAtguBEAAQAuAAAnAaQAmAXAXApQAZgpAlgXQAogaAuAAQBDAAAuAuQAtAtAABEQAAA/gSAtQgQAognAqQgbAbhFA8QhWBKgzAxQgygxhWhKg");
	this.shape.setTransform(5.625,7.925);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.icon, new cjs.Rectangle(-25,-20,61.3,55.9), null);


(lib.shad = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.rf(["rgba(255,255,255,0)","rgba(131,57,0,0)","rgba(255,255,255,0.259)","rgba(135,66,0,0.937)"],[0,0.478,0.62,1],0,0,0,0,0,58.4).s().p("AmSGTQininAAjsQAAjrCninQCninDrAAQDsAACnCnQCnCnAADrQAADsinCnQinCnjsAAQjrAAining");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shad, new cjs.Rectangle(-57,-57,114,114), null);


(lib.colorball = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#E48931").s().p("AmuGvQiziyAAj9QAAj8CziyQCyizD8AAQD9AACyCzQCzCyAAD8QAAD9izCyQiyCzj9AAQj8AAiyizg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colorball, new cjs.Rectangle(-61,-61,122,122), null);


(lib.deeee = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Bitmap5();
	this.instance.setTransform(-119.5,-248);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.deeee, new cjs.Rectangle(-119.5,-248,239,496), null);


(lib.thisisalsoatext = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.soundcredsclickable();
	this.instance.setTransform(178.45,72.2);
	new cjs.ButtonHelper(this.instance, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_16();
	this.instance_1.setTransform(-226.75,-134.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.thisisalsoatext, new cjs.Rectangle(-226.7,-134.1,453.5,268), null);


(lib.texty2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.thisisalsoatext();
	this.instance.shadow = new cjs.Shadow("#000000",0,0,4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-231.7,-139.1,466,281);


(lib.texty1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.thisisatext();
	this.instance.shadow = new cjs.Shadow("#000000",0,0,4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-231.7,-139.1,466,281);


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


(lib.COLORORBS = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1_copy_2
	this.instance = new lib.nomaskshine();
	this.instance.setTransform(0.25,-24.6);
	this.instance.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(9));

	// Layer_1_copy
	this.instance_1 = new lib.shad();
	this.instance_1.setTransform(0,0,1.0702,1.0702);
	this.instance_1.compositeOperation = "multiply";

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(9));

	// Layer_1
	this.instance_2 = new lib.colorball();
	var instance_2Filter_1 = new cjs.ColorFilter(0.37,0.37,0.37,1,160.65,32.13,0,0);
	this.instance_2.filters = [instance_2Filter_1];
	this.instance_2.cache(-63,-63,126,126);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(9));
	this.timeline.addTween(cjs.Tween.get(instance_2Filter_1).wait(1).to(new cjs.ColorFilter(0,0,0,1,255,153,0,0), 0).wait(1).to(new cjs.ColorFilter(0,0,0,1,255,204,0,0), 0).wait(1).to(new cjs.ColorFilter(0,0,0,1,153,255,0,0), 0).wait(1).to(new cjs.ColorFilter(0,0,0,1,102,255,0,0), 0).wait(1).to(new cjs.ColorFilter(0,0,0,1,102,204,255,0), 0).wait(1).to(new cjs.ColorFilter(0,0,0,1,102,153,255,0), 0).wait(1).to(new cjs.ColorFilter(0,0,0,1,102,51,255,0), 0).wait(1).to(new cjs.ColorFilter(0,0,0,1,255,153,255,0), 0).wait(1));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_2, startFrame:1, endFrame:1, x:-63, y:-63, w:126, h:126});
	this.filterCacheList.push({instance: this.instance_2, startFrame:0, endFrame:0, x:-63, y:-63, w:126, h:126});
	this.filterCacheList.push({instance: this.instance_2, startFrame:2, endFrame:2, x:-63, y:-63, w:126, h:126});
	this.filterCacheList.push({instance: this.instance_2, startFrame:3, endFrame:3, x:-63, y:-63, w:126, h:126});
	this.filterCacheList.push({instance: this.instance_2, startFrame:4, endFrame:4, x:-63, y:-63, w:126, h:126});
	this.filterCacheList.push({instance: this.instance_2, startFrame:5, endFrame:5, x:-63, y:-63, w:126, h:126});
	this.filterCacheList.push({instance: this.instance_2, startFrame:6, endFrame:6, x:-63, y:-63, w:126, h:126});
	this.filterCacheList.push({instance: this.instance_2, startFrame:7, endFrame:7, x:-63, y:-63, w:126, h:126});
	this.filterCacheList.push({instance: this.instance_2, startFrame:8, endFrame:8, x:-63, y:-63, w:126, h:126});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61,-61,126,126);


(lib.buttonswithashadowcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.COLORORBS("synched",4);
	this.instance.setTransform(0,-0.75);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({_off:false},0).to({_off:true},1).wait(4));
	this.instance.addEventListener("tick", AdobeAn.handleFilterCache);

	// Layer_1
	this.instance_1 = new lib.COLORORBS();
	this.instance_1.setTransform(0,0.75);
	this.instance_1.shadow = new cjs.Shadow("rgba(0,0,0,0.627)",0,3,5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4).to({_off:false},0).to({_off:true},1).wait(4));
	this.instance_1.addEventListener("tick", AdobeAn.handleFilterCache);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67,-63.2,138,137);


(lib.goright = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_1 = function() {
		playSound("hoverwav");
	}
	this.frame_2 = function() {
		playSound("clickywav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0)").s().p("AkMEaQhvh1AAilQAAilBvh1QBvh1CdAAQCdAABwB1QBvB1AAClQAAClhvB1QhwB2idAAQidAAhvh2g");
	this.shape.setTransform(-0.4,-0.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3));

	// Layer 2
	this.instance = new lib.iconcopy();
	this.instance.setTransform(-2.1,1,0.6611,0.6611,0,0,180,10.6,6.2);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,0.686)",0,0,10);
	var instanceFilter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(-11,-23,43,59);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({y:2},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).wait(1).to(new cjs.ColorFilter(0.89,0.89,0.89,1,28.05,28.05,28.05,0), 0).wait(1).to(new cjs.ColorFilter(0.91,0.91,0.91,1,0,0,0,0), 0).wait(1));

	// Layer 1
	this.instance_1 = new lib.buttonswithashadowcopy("single",4);
	this.instance_1.setTransform(-0.05,-4,0.5577,0.5577,0,0,0,-0.1,-7.2);
	var instance_1Filter_2 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_1.filters = [instance_1Filter_2];
	this.instance_1.cache(-69,-65,142,141);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({startPosition:4},0).wait(1).to({y:-3},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(instance_1Filter_2).wait(1).to(new cjs.ColorFilter(0.75,0.75,0.75,1,63.75,63.75,63.75,0), 0).wait(1).to(new cjs.ColorFilter(0.81,0.81,0.81,1,0,0,0,0), 0).wait(1));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance, startFrame:1, endFrame:1, x:-11, y:-23, w:43, h:59});
	this.filterCacheList.push({instance: this.instance, startFrame:0, endFrame:0, x:-11, y:-23, w:43, h:59});
	this.filterCacheList.push({instance: this.instance, startFrame:2, endFrame:2, x:-11, y:-23, w:43, h:59});
	this.filterCacheList.push({instance: this.instance_1, startFrame:1, endFrame:1, x:-69, y:-65, w:142, h:141});
	this.filterCacheList.push({instance: this.instance_1, startFrame:0, endFrame:0, x:-69, y:-65, w:142, h:141});
	this.filterCacheList.push({instance: this.instance_1, startFrame:2, endFrame:2, x:-69, y:-65, w:142, h:141});
	this.filterCacheList.push({instance: this.instance_1, startFrame:2, endFrame:3, x:-69, y:-65, w:142, h:141});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40,-40.2,84,87.6);


(lib.goleft = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_1 = function() {
		playSound("hoverwav");
	}
	this.frame_2 = function() {
		playSound("clickywav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0)").s().p("AkMEaQhvh1AAilQAAilBvh1QBvh1CdAAQCdAABwB1QBvB1AAClQAAClhvB1QhwB2idAAQidAAhvh2g");
	this.shape.setTransform(-0.4,-0.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3));

	// Layer 2
	this.instance = new lib.iconcopy();
	this.instance.setTransform(3.6,1,0.6611,0.6611,0,0,0,10.6,6.2);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,0.686)",0,0,10);
	var instanceFilter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(-11,-23,43,59);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({y:2},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).wait(1).to(new cjs.ColorFilter(0.89,0.89,0.89,1,28.05,28.05,28.05,0), 0).wait(1).to(new cjs.ColorFilter(0.91,0.91,0.91,1,0,0,0,0), 0).wait(1));

	// Layer 1
	this.instance_1 = new lib.buttonswithashadowcopy("single",4);
	this.instance_1.setTransform(-0.05,-4,0.5577,0.5577,0,0,0,-0.1,-7.2);
	var instance_1Filter_2 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_1.filters = [instance_1Filter_2];
	this.instance_1.cache(-69,-65,142,141);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({startPosition:4},0).wait(1).to({y:-3},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(instance_1Filter_2).wait(1).to(new cjs.ColorFilter(0.75,0.75,0.75,1,63.75,63.75,63.75,0), 0).wait(1).to(new cjs.ColorFilter(0.81,0.81,0.81,1,0,0,0,0), 0).wait(1));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance, startFrame:1, endFrame:1, x:-11, y:-23, w:43, h:59});
	this.filterCacheList.push({instance: this.instance, startFrame:0, endFrame:0, x:-11, y:-23, w:43, h:59});
	this.filterCacheList.push({instance: this.instance, startFrame:2, endFrame:2, x:-11, y:-23, w:43, h:59});
	this.filterCacheList.push({instance: this.instance_1, startFrame:1, endFrame:1, x:-69, y:-65, w:142, h:141});
	this.filterCacheList.push({instance: this.instance_1, startFrame:0, endFrame:0, x:-69, y:-65, w:142, h:141});
	this.filterCacheList.push({instance: this.instance_1, startFrame:2, endFrame:2, x:-69, y:-65, w:142, h:141});
	this.filterCacheList.push({instance: this.instance_1, startFrame:2, endFrame:3, x:-69, y:-65, w:142, h:141});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40,-40.2,84,87.6);


// stage content:
(lib.pink = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,58,116];
	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.goright.removeAllEventListeners("click");
		this.goright.addEventListener("click", function() {
			this.gotoAndPlay(1);
		}.bind(this));
	}
	this.frame_58 = function() {
		this.stop();
		this.goleft.removeAllEventListeners("click");
		this.goleft.addEventListener("click", function() {
			this.gotoAndPlay(59);
		}.bind(this));
	}
	this.frame_116 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(58).call(this.frame_58).wait(58).call(this.frame_116).wait(1));

	// Layer_3
	this.goright = new lib.goleft();
	this.goright.name = "goright";
	this.goright.setTransform(31.45,316.7,0.5684,0.5684,0,0,0,-0.1,-4);
	new cjs.ButtonHelper(this.goright, 0, 1, 2);

	this.instance = new lib.goright("single",2);
	this.instance.setTransform(31.45,477.35,0.5684,0.5684,0,0,0,-0.1,-4);
	this.instance._off = true;

	this.goleft = new lib.goright();
	this.goleft.name = "goleft";
	this.goleft.setTransform(31.45,316.7,0.5684,0.5684,0,0,0,-0.1,-4);
	this.goleft._off = true;
	new cjs.ButtonHelper(this.goleft, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.goright).wait(1).to({mode:"single",startPosition:2},0).wait(1).to({regX:-0.4,regY:-0.2,x:31.25,y:318.85},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:2},0).wait(1).to({regX:-0.1,regY:-4,x:31.45,y:316.7},0).wait(1).to({regX:-0.4,regY:-0.2,x:31.25,y:318.05},0).wait(1).to({y:315.65},0).wait(1).to({y:312.35},0).wait(1).to({y:310.1},0).wait(1).to({regX:-0.1,regY:-4,x:31.45,y:307.25},0).wait(1).to({regX:-0.4,regY:-0.2,x:31.25,y:312.65},0).wait(1).to({y:321.05},0).wait(1).to({y:335.6},0).wait(1).to({y:356.65},0).wait(1).to({y:382.95},0).wait(1).to({y:410.75},0).wait(1).to({y:435.6},0).wait(1).to({y:454.9},0).wait(1).to({y:468.2},0).wait(1).to({y:476.1},0).wait(1).to({regX:-0.1,regY:-4,x:31.45,y:477.35},0).to({_off:true},15).wait(58).to({_off:false},0).wait(1).to({regX:-0.4,regY:-0.2,x:31.25,y:476.2},0).wait(1).to({y:467.8},0).wait(1).to({y:453.25},0).wait(1).to({y:432.2},0).wait(1).to({y:405.9},0).wait(1).to({y:378.1},0).wait(1).to({y:353.25},0).wait(1).to({y:333.95},0).wait(1).to({y:320.65},0).wait(1).to({y:312.75},0).wait(1).to({regX:-0.1,regY:-4,x:31.45,y:307.25},0).wait(1).to({regX:-0.4,regY:-0.2,x:31.25,y:310.15},0).wait(1).to({y:312.55},0).wait(1).to({y:315.85},0).wait(1).to({y:318.1},0).wait(1).to({regX:-0.1,regY:-4,x:31.45,y:316.7},0).to({mode:"independent"},5).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(37).to({_off:false},0).wait(1).to({regX:-0.4,regY:-0.2,x:31.25,y:476.2},0).wait(1).to({y:467.8},0).wait(1).to({y:453.25},0).wait(1).to({y:432.2},0).wait(1).to({y:405.9},0).wait(1).to({y:378.1},0).wait(1).to({y:353.25},0).wait(1).to({y:333.95},0).wait(1).to({y:320.65},0).wait(1).to({y:312.75},0).wait(1).to({regX:-0.1,regY:-4,x:31.45,y:307.25},0).wait(1).to({regX:-0.4,regY:-0.2,x:31.25,y:310.15},0).wait(1).to({y:312.55},0).wait(1).to({y:315.85},0).wait(1).to({y:318.1},0).wait(1).to({regX:-0.1,regY:-4,x:31.45,y:316.7},0).to({_off:true,mode:"independent"},5).wait(59));
	this.timeline.addTween(cjs.Tween.get(this.goleft).wait(53).to({_off:false},5).wait(1).to({mode:"single",startPosition:2},0).wait(1).to({regX:-0.4,regY:-0.2,x:31.25,y:318.85},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:2},0).wait(1).to({regX:-0.1,regY:-4,x:31.45,y:316.7},0).wait(1).to({regX:-0.4,regY:-0.2,x:31.25,y:318.05},0).wait(1).to({y:315.65},0).wait(1).to({y:312.35},0).wait(1).to({y:310.1},0).wait(1).to({regX:-0.1,regY:-4,x:31.45,y:307.25},0).wait(1).to({regX:-0.4,regY:-0.2,x:31.25,y:312.65},0).wait(1).to({y:321.05},0).wait(1).to({y:335.6},0).wait(1).to({y:356.65},0).wait(1).to({y:382.95},0).wait(1).to({y:410.75},0).wait(1).to({y:435.6},0).wait(1).to({y:454.9},0).wait(1).to({y:468.2},0).wait(1).to({y:476.1},0).wait(1).to({regX:-0.1,regY:-4,x:31.45,y:477.35},0).to({_off:true},15).wait(22));
	this.goright.addEventListener("tick", AdobeAn.handleFilterCache);
	this.instance.addEventListener("tick", AdobeAn.handleFilterCache);
	this.goleft.addEventListener("tick", AdobeAn.handleFilterCache);

	// Layer_5_copy_2
	this.instance_1 = new lib.texty1("synched",0);
	this.instance_1.setTransform(232.65,208.05,0.9448,0.9448);

	this.instance_2 = new lib.texty2("synched",0);
	this.instance_2.setTransform(-220.85,208.05,0.9448,0.9448);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({startPosition:0},0).wait(1).to({x:269.3491},0).wait(1).to({x:306.461},0).wait(1).to({x:343.3188},0).wait(1).to({x:379.2617},0).wait(1).to({x:413.7065},0).wait(1).to({x:446.198},0).wait(1).to({x:476.4302},0).wait(1).to({x:504.2384},0).wait(1).to({x:529.5744},0).wait(1).to({x:552.4762},0).wait(1).to({x:573.0385},0).wait(1).to({x:591.3896},0).wait(1).to({x:607.6737},0).wait(1).to({x:622.0397},0).wait(1).to({x:634.6337},0).wait(1).to({x:645.5945},0).wait(1).to({x:655.0516},0).wait(1).to({x:663.1242},0).wait(1).to({x:669.9212},0).wait(1).to({x:675.5416},0).wait(1).to({x:680.0749},0).wait(1).to({x:683.6024},0).wait(1).to({x:686.15},0).to({_off:true},11).wait(58).to({_off:false,x:-220.85},0).wait(1).to({x:-218.2341},0).wait(1).to({x:-212.8001},0).wait(1).to({x:-204.2541},0).wait(1).to({x:-192.2931},0).wait(1).to({x:-176.6285},0).wait(1).to({x:-157.0276},0).wait(1).to({x:-133.3784},0).wait(1).to({x:-105.7801},0).wait(1).to({x:-74.6426},0).wait(1).to({x:-40.7588},0).wait(1).to({x:-5.2908},0).wait(1).to({x:30.3677},0).wait(1).to({x:64.8231},0).wait(1).to({x:96.9102},0).wait(1).to({x:125.8226},0).wait(1).to({x:151.1232},0).wait(1).to({x:172.675},0).wait(1).to({x:190.546},0).wait(1).to({x:204.9252},0).wait(1).to({x:216.0605},0).wait(1).to({x:224.2196},0).wait(1).to({x:229.6666},0).wait(1).to({x:232.65},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(35).to({_off:false},0).wait(1).to({x:-218.2341},0).wait(1).to({x:-212.8001},0).wait(1).to({x:-204.2541},0).wait(1).to({x:-192.2931},0).wait(1).to({x:-176.6285},0).wait(1).to({x:-157.0276},0).wait(1).to({x:-133.3784},0).wait(1).to({x:-105.7801},0).wait(1).to({x:-74.6426},0).wait(1).to({x:-40.7588},0).wait(1).to({x:-5.2908},0).wait(1).to({x:30.3677},0).wait(1).to({x:64.8231},0).wait(1).to({x:96.9102},0).wait(1).to({x:125.8226},0).wait(1).to({x:151.1232},0).wait(1).to({x:172.675},0).wait(1).to({x:190.546},0).wait(1).to({x:204.9252},0).wait(1).to({x:216.0605},0).wait(1).to({x:224.2196},0).wait(1).to({x:229.6666},0).wait(1).to({x:232.65},0).wait(1).to({startPosition:0},0).wait(1).to({x:269.3491},0).wait(1).to({x:306.461},0).wait(1).to({x:343.3188},0).wait(1).to({x:379.2617},0).wait(1).to({x:413.7065},0).wait(1).to({x:446.198},0).wait(1).to({x:476.4302},0).wait(1).to({x:504.2384},0).wait(1).to({x:529.5744},0).wait(1).to({x:552.4762},0).wait(1).to({x:573.0385},0).wait(1).to({x:591.3896},0).wait(1).to({x:607.6737},0).wait(1).to({x:622.0397},0).wait(1).to({x:634.6337},0).wait(1).to({x:645.5945},0).wait(1).to({x:655.0516},0).wait(1).to({x:663.1242},0).wait(1).to({x:669.9212},0).wait(1).to({x:675.5416},0).wait(1).to({x:680.0749},0).wait(1).to({x:683.6024},0).wait(1).to({x:686.15},0).to({_off:true},11).wait(24));

	// Layer_5_copy_2
	this.instance_3 = new lib.icon();
	this.instance_3.setTransform(38,30.45,0.9448,0.9448);
	this.instance_3.shadow = new cjs.Shadow("rgba(0,0,0,0.686)",0,0,8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(117));

	// Layer_9
	this.instance_4 = new lib.titletext();
	this.instance_4.setTransform(170.3,30,0.9448,0.9448);
	this.instance_4.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(117));

	// Layer_5_copy_2
	this.instance_5 = new lib.ffff();
	this.instance_5.setTransform(-26,-31,0.9448,0.9448);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(117));

	// Layer_16
	this.instance_6 = new lib.deeee();
	this.instance_6.setTransform(98.5,215);
	this.instance_6.compositeOperation = "overlay";

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(117));

	// Layer_17
	this.instance_7 = new lib.roate();
	this.instance_7.setTransform(108.05,304.3,1.2645,1.2645,0,0,0,-173,122.5);
	this.instance_7.alpha = 0.3281;
	this.instance_7.compositeOperation = "overlay";

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(117));

	// Layer_18
	this.instance_8 = new lib.pp();
	this.instance_8.setTransform(230.05,175.75,0.9448,0.9448);
	this.instance_8.compositeOperation = "overlay";

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(117));

	// stageBackground
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1,3,true).p("EglfgdDMBK/AAAMAAAA6HMhK/AAAg");
	this.shape.setTransform(230,176);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#9999CC").s().p("EglfAdEMAAAg6HMBK/AAAMAAAA6Hg");
	this.shape_1.setTransform(230,176);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(117));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-210,143,1119.9,447.4);
// library properties:
lib.properties = {
	id: 'B325F180281AD548AF0E7778EAE237A2',
	width: 460,
	height: 352,
	fps: 24,
	color: "#9999CC",
	opacity: 1.00,
	manifest: [
		{src:"images/pink_atlas_1.png?1778910332797", id:"pink_atlas_1"},
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
