(function (cjs, an) {
  var p; // shortcut to reference prototypes
  var lib = {};
  var ss = {};
  var img = {};
  lib.ssMetadata = [
    {
      name: "yellow_atlas_1",
      frames: [
        [541, 0, 84, 72],
        [0, 0, 539, 139],
        [627, 0, 70, 70],
      ],
    },
  ];

  (lib.AnMovieClip = function () {
    this.actionFrames = [];
    this.ignorePause = false;
    this.gotoAndPlay = function (positionOrLabel) {
      cjs.MovieClip.prototype.gotoAndPlay.call(this, positionOrLabel);
    };
    this.play = function () {
      cjs.MovieClip.prototype.play.call(this);
    };
    this.gotoAndStop = function (positionOrLabel) {
      cjs.MovieClip.prototype.gotoAndStop.call(this, positionOrLabel);
    };
    this.stop = function () {
      cjs.MovieClip.prototype.stop.call(this);
    };
  }).prototype = p = new cjs.MovieClip();
  // symbols:

  (lib.CachedBmp_6 = function () {
    this.initialize(ss["yellow_atlas_1"]);
    this.gotoAndStop(0);
  }).prototype = p = new cjs.Sprite();

  (lib.Bitmap1 = function () {
    this.initialize(ss["yellow_atlas_1"]);
    this.gotoAndStop(1);
  }).prototype = p = new cjs.Sprite();

  (lib.Bitmap3 = function () {
    this.initialize(ss["yellow_atlas_1"]);
    this.gotoAndStop(2);
  }).prototype = p = new cjs.Sprite();
  // helper functions:

  function mc_symbol_clone() {
    var clone = this._cloneProps(
      new this.constructor(
        this.mode,
        this.startPosition,
        this.loop,
        this.reversed,
      ),
    );
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

  (lib.titletext = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Layer_1
    this.instance = new lib.CachedBmp_6();
    this.instance.setTransform(-67.85, -17.95, 0.5, 0.5);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.titletext,
    new cjs.Rectangle(-67.8, -17.9, 42, 36),
    null,
  );

  (lib.Symbol62 = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Layer_1
    this.instance = new lib.Bitmap3();

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 70, 70);

  (lib.pp = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Layer_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .lf(["#000000", "rgba(0,0,0,0)"], [0, 1], 0, 160.9, 0, -35.1)
      .s()
      .p("EgmCAdFMAAAg6JMBMFAAAMAAAA6Jg");
    this.shape.setTransform(0, 0.025);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.pp,
    new cjs.Rectangle(-243.5, -186, 487, 372.1),
    null,
  );

  (lib.PencilBody = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Layer_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f()
      .s("#666666")
      .ss(4, 1, 0, 5)
      .p(
        "AjdiiIAqAAIBIAAIC3AAIBsAAIAnAAIAAFFIghAAIhyAAIifAAIgYAAIhIAAIgrAAgAjdiiIAAAA",
      );
    this.shape.setTransform(-0.3148, -74.275);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#C3C3C3").s().p("Ag4CjIABlFIApAAIBHAAIAAFFIhGAAg");
    this.shape_1.setTransform(-16.8625, -74.275);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#FFBF48").s().p("AgvLpIAA3RIBHAAIAYAAIAAXRg");
    this.shape_2.setTransform(-13.525, 16.5375);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics
      .f("#B5B5B5")
      .s()
      .p("ACECjIhxAAIifAAIgZAAIAAlFIC4AAIBsAAIAnAAIAAFFg");
    this.shape_3.setTransform(5.4, -74.2875);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics
      .f("#CC536B")
      .s()
      .p(
        "AC3CFIAAiXQAAhQhGAAIgmAAIiwAAQg8AAgPAtQgDAKgBAKIAACmIgpAAIgBAAIADivQAFgtAjgYQAZgTApgCIDoAAQBjAAAFBsIgBCdg",
      );
    this.shape_4.setTransform(-0.275, -103.925);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics.f("#F0C575").s().p("AgkhxIAAgBIBhAAIACABIh9Dkg");
    this.shape_5.setTransform(10.8875, 106.55);

    this.shape_6 = new cjs.Shape();
    this.shape_6.graphics.f("#E17389").s().p("Ag1B0IAAjnIAlAAQBGAAAABQIAACXg");
    this.shape_6.setTransform(12.65, -102.225);

    this.shape_7 = new cjs.Shape();
    this.shape_7.graphics.f("#E89700").s().p("Ag5LpIACgBIAA3QIBwAAIgEXRg");
    this.shape_7.setTransform(12.9, 16.5375);

    this.shape_8 = new cjs.Shape();
    this.shape_8.graphics
      .f("#E47E93")
      .s()
      .p("Ag3B0IhIAAIAAimQAAgKAEgKQAPgtA8AAICwAAIAADng");
    this.shape_8.setTransform(-5.55, -102.225);

    this.shape_9 = new cjs.Shape();
    this.shape_9.graphics
      .f("#BD8A2B")
      .s()
      .p("ABYBzIgrAAIB/jkIABgBIAuAAIiCDlgAhdBzIh9jkIAtgBIB6Dlg");
    this.shape_9.setTransform(0.0125, 106.55);

    this.shape_10 = new cjs.Shape();
    this.shape_10.graphics
      .f("#B97800")
      .s()
      .p(
        "ABcNsIAAAAIgGAJgAjet0IArAAIAAXSIBgAAICdAAIAAAnIj0AAIgtABgACwKFIgDAAIhiAAIAAgnIBuAAIAF3SIAhAAIgBX5g",
      );
    this.shape_10.setTransform(-0.3125, 30.5);

    this.shape_11 = new cjs.Shape();
    this.shape_11.graphics
      .f("#333333")
      .s()
      .p("AhahRIAqAAIBgAAIArAAIgFAJIhYCag");
    this.shape_11.setTransform(-0.2875, 126.25);

    this.shape_12 = new cjs.Shape();
    this.shape_12.graphics
      .f("#F3D08F")
      .s()
      .p("AgyBzIh6jlID0AAIABABIgbDkgACrhyIACAAIAAABg");
    this.shape_12.setTransform(-0.05, 106.55);

    this.shape_13 = new cjs.Shape();
    this.shape_13.graphics
      .f("#FFA909")
      .s()
      .p("AhPLpIAA3RICfAAIAAXQIgBABIieAAg");
    this.shape_13.setTransform(-0.75, 16.5375);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_13 },
            { t: this.shape_12 },
            { t: this.shape_11 },
            { t: this.shape_10 },
            { t: this.shape_9 },
            { t: this.shape_8 },
            { t: this.shape_7 },
            { t: this.shape_6 },
            { t: this.shape_5 },
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape },
          ],
        })
        .wait(1),
    );

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.PencilBody,
    new cjs.Rectangle(-24.5, -117.2, 48.5, 251.7),
    null,
  );

  (lib.roate = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Layer_1
    this.instance = new lib.Symbol62();
    this.instance.setTransform(
      -173,
      122.45,
      6.4836,
      6.4836,
      0,
      0,
      0,
      35.1,
      35.1,
    );

    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .wait(1)
        .to({ regX: 35, regY: 35, rotation: -0.0996, x: -173.55, y: 121.85 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -0.2153, x: -173.65 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4838,
            scaleY: 6.4838,
            rotation: -0.3472,
            x: -173.6,
            y: 121.8,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -0.4955, x: -173.65, y: 121.85 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -0.6603 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -0.8417, x: -173.6 }, 0)
        .wait(1)
        .to({ rotation: -1.0399, y: 121.9 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4838,
            scaleY: 6.4838,
            rotation: -1.2551,
            x: -173.65,
            y: 121.85,
          },
          0,
        )
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -1.4874, x: -173.6 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -1.737 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -2.0041 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4838,
            scaleY: 6.4838,
            rotation: -2.2887,
            x: -173.65,
            y: 121.9,
          },
          0,
        )
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -2.591 }, 0)
        .wait(1)
        .to({ scaleX: 6.4838, scaleY: 6.4838, rotation: -2.9113, x: -173.6 }, 0)
        .wait(1)
        .to({ rotation: -3.2496, x: -173.65 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -3.6062, y: 121.95 }, 0)
        .wait(1)
        .to({ scaleX: 6.4838, scaleY: 6.4838, rotation: -3.9812, y: 121.9 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -4.3747 }, 0)
        .wait(1)
        .to({ scaleX: 6.4838, scaleY: 6.4838, rotation: -4.7869, x: -173.6 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -5.2181, x: -173.65 },
          0,
        )
        .wait(1)
        .to({ rotation: -5.6682, x: -173.7 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -6.1376,
            x: -173.65,
            y: 121.95,
          },
          0,
        )
        .wait(1)
        .to({ scaleX: 6.4838, scaleY: 6.4838, rotation: -6.6264, y: 121.9 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -7.1348, x: -173.7 }, 0)
        .wait(1)
        .to({ scaleX: 6.4838, scaleY: 6.4838, rotation: -7.6629, y: 121.95 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -8.2108 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -8.7789, y: 121.9 }, 0)
        .wait(1)
        .to({ scaleX: 6.4838, scaleY: 6.4838, rotation: -9.3671, y: 121.95 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -9.9758, y: 122 }, 0)
        .wait(1)
        .to({ scaleX: 6.4835, scaleY: 6.4835, rotation: -10.605 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -11.255, y: 121.95 }, 0)
        .wait(1)
        .to({ rotation: -11.9259, y: 122 }, 0)
        .wait(1)
        .to({ rotation: -12.6179, x: -173.75, y: 122.05 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -13.3311 }, 0)
        .wait(1)
        .to({ rotation: -14.0658, y: 122 }, 0)
        .wait(1)
        .to({ rotation: -14.822, x: -173.7, y: 122.05 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -15.6,
            x: -173.75,
            y: 122,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -16.4, y: 122.1 }, 0)
        .wait(1)
        .to({ rotation: -17.222, y: 122.05 }, 0)
        .wait(1)
        .to({ rotation: -18.0662, x: -173.8, y: 122.1 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -18.9329, x: -173.75 },
          0,
        )
        .wait(1)
        .to({ rotation: -19.8222, y: 122.15 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -20.7342 }, 0)
        .wait(1)
        .to({ scaleX: 6.4838, scaleY: 6.4838, rotation: -21.6691 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -22.627, x: -173.8 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -23.6082,
            x: -173.75,
            y: 122.1,
          },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -24.6127,
            x: -173.85,
            y: 122.15,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -25.6407, x: -173.8 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -26.6924 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -27.7678,
            x: -173.85,
            y: 122.2,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -28.8672, x: -173.8 },
          0,
        )
        .wait(1)
        .to({ rotation: -29.9907 }, 0)
        .wait(1)
        .to({ rotation: -31.1383, y: 122.25 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -32.3103, x: -173.85 },
          0,
        )
        .wait(1)
        .to({ rotation: -33.5067, x: -173.9 }, 0)
        .wait(1)
        .to({ rotation: -34.7277, y: 122.3 }, 0)
        .wait(1)
        .to({ rotation: -35.9733, x: -173.85 }, 0)
        .wait(1)
        .to({ rotation: -37.2437 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -38.539, y: 122.35 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -39.8593 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -41.2046, y: 122.4 }, 0)
        .wait(1)
        .to({ rotation: -42.575 }, 0)
        .wait(1)
        .to({ rotation: -43.9707, x: -173.9 }, 0)
        .wait(1)
        .to({ rotation: -45.3916, y: 122.45 }, 0)
        .wait(1)
        .to({ rotation: -46.8379, x: -173.85, y: 122.5 }, 0)
        .wait(1)
        .to({ rotation: -48.3095, y: 122.55 }, 0)
        .wait(1)
        .to({ rotation: -49.8065, y: 122.5 }, 0)
        .wait(1)
        .to({ rotation: -51.329, x: -173.9, y: 122.6 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -52.8769,
            x: -173.85,
            y: 122.55,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -54.4503, x: -173.8, y: 122.6 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4835, scaleY: 6.4835, rotation: -56.0491, y: 122.65 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -57.6734, x: -173.85 },
          0,
        )
        .wait(1)
        .to({ rotation: -59.3232, y: 122.7 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -60.9983 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -62.6987,
            x: -173.8,
            y: 122.75,
          },
          0,
        )
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -64.4244 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -66.1753 }, 0)
        .wait(1)
        .to({ rotation: -67.9512, x: -173.75, y: 122.8 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -69.7522, y: 122.85 },
          0,
        )
        .wait(1)
        .to({ rotation: -71.578, x: -173.8 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -73.4286 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -75.3037,
            x: -173.75,
            y: 122.9,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -77.2032 }, 0)
        .wait(1)
        .to({ rotation: -79.1269, x: -173.7, y: 122.95 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -81.0746 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -83.0461, y: 123 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4838, scaleY: 6.4838, rotation: -85.0412, x: -173.65 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -87.0595,
            x: -173.6,
            y: 123.05,
          },
          0,
        )
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -89.1009, y: 123.1 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4838, scaleY: 6.4838, rotation: -91.1649, x: -173.55 },
          0,
        )
        .wait(1)
        .to({ rotation: -93.2513, y: 123.15 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4835, scaleY: 6.4835, rotation: -95.3598, x: -173.5 },
          0,
        )
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -97.49 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -99.6415, y: 123.25 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -101.8139, x: -173.45 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -104.0068, x: -173.4 },
          0,
        )
        .wait(1)
        .to({ scaleX: 6.4838, scaleY: 6.4838, rotation: -106.2198 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -108.4524 }, 0)
        .wait(1)
        .to({ rotation: -110.7042, x: -173.35, y: 123.3 }, 0)
        .wait(1)
        .to({ rotation: -112.9746, x: -173.25 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -115.2631,
            x: -173.3,
            y: 123.35,
          },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -117.5691,
            x: -173.25,
            y: 123.3,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -119.8923, x: -173.2 }, 0)
        .wait(1)
        .to({ rotation: -122.2318, y: 123.35 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -124.5873,
            x: -173.1,
            y: 123.4,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -126.9579, y: 123.35 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -129.3432, x: -173 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -131.7425, x: -173.05 },
          0,
        )
        .wait(1)
        .to({ rotation: -134.155, x: -173 }, 0)
        .wait(1)
        .to({ rotation: -136.5802, x: -172.9, y: 123.3 }, 0)
        .wait(1)
        .to({ rotation: -139.0173, x: -172.85, y: 123.35 }, 0)
        .wait(1)
        .to({ rotation: -141.4656, y: 123.4 }, 0)
        .wait(1)
        .to({ rotation: -143.9244, x: -172.75, y: 123.35 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -146.393 }, 0)
        .wait(1)
        .to({ rotation: -148.8705 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -151.3564,
            x: -172.65,
            y: 123.3,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -153.8496, y: 123.35 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4835,
            scaleY: 6.4835,
            rotation: -156.3496,
            x: -172.6,
            y: 123.3,
          },
          0,
        )
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -158.8555 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -161.3665,
            x: -172.55,
            y: 123.25,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4838, scaleY: 6.4838, rotation: -163.8819, x: -172.5 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -166.4007, x: -172.45 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4838,
            scaleY: 6.4838,
            rotation: -168.9223,
            x: -172.5,
            y: 123.2,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -171.4457, x: -172.45 },
          0,
        )
        .wait(1)
        .to({ rotation: -173.9702, x: -172.4, y: 123.15 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -176.495 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -179.0193,
            x: -172.35,
            y: 123.1,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4838, scaleY: 6.4838, rotation: -181.5422, y: 123.05 },
          0,
        )
        .wait(1)
        .to({ rotation: -184.063, x: -172.3, y: 123.1 }, 0)
        .wait(1)
        .to({ rotation: -186.5809, y: 123 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -189.095, x: -172.2 },
          0,
        )
        .wait(1)
        .to({ rotation: -191.6046, x: -172.25, y: 122.95 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -194.1089,
            x: -172.2,
            y: 122.9,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -196.6072, x: -172.15 },
          0,
        )
        .wait(1)
        .to({ rotation: -199.0986, x: -172.2, y: 122.85 }, 0)
        .wait(1)
        .to({ rotation: -201.5825, x: -172.1, y: 122.8 }, 0)
        .wait(1)
        .to({ rotation: -204.0581 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -206.5247,
            x: -172.15,
            y: 122.75,
          },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -208.9816,
            x: -172.1,
            y: 122.7,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -211.428, x: -172.15 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4835,
            scaleY: 6.4835,
            rotation: -213.8633,
            x: -172.1,
            y: 122.6,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -216.2869, x: -172.05 },
          0,
        )
        .wait(1)
        .to({ rotation: -218.6981, x: -172.1 }, 0)
        .wait(1)
        .to({ rotation: -221.0963, x: -172.05, y: 122.5 }, 0)
        .wait(1)
        .to({ rotation: -223.4809 }, 0)
        .wait(1)
        .to({ rotation: -225.8512, x: -172.1, y: 122.45 }, 0)
        .wait(1)
        .to({ rotation: -228.2067, y: 122.4 }, 0)
        .wait(1)
        .to({ rotation: -230.5468, x: -172.05, y: 122.35 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -232.8711,
            x: -172.1,
            y: 122.3,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -235.1789, x: -172.15, y: 122.25 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -237.4699,
            x: -172.1,
            y: 122.2,
          },
          0,
        )
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -239.7434 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -241.9992, y: 122.15 },
          0,
        )
        .wait(1)
        .to({ rotation: -244.2366, x: -172.15, y: 122.1 }, 0)
        .wait(1)
        .to({ rotation: -246.4553, y: 122.15 }, 0)
        .wait(1)
        .to({ rotation: -248.6549, y: 122.1 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -250.8351, x: -172.2 },
          0,
        )
        .wait(1)
        .to({ rotation: -252.9954, x: -172.15 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -255.1355,
            x: -172.2,
            y: 122.05,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4838, scaleY: 6.4838, rotation: -257.2551, x: -172.25 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -259.3539,
            x: -172.2,
            y: 122,
          },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4838,
            scaleY: 6.4838,
            rotation: -261.4315,
            x: -172.25,
            y: 121.95,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -263.4878, x: -172.3, y: 121.9 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -265.5225, y: 121.95 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4838, scaleY: 6.4838, rotation: -267.5353, y: 121.85 },
          0,
        )
        .wait(1)
        .to({ rotation: -269.5261, x: -172.35, y: 121.8 }, 0)
        .wait(1)
        .to({ rotation: -271.4946, x: -172.4 }, 0)
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -273.4406 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -275.364, x: -172.45 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -277.2646, y: 121.75 },
          0,
        )
        .wait(1)
        .to({ rotation: -279.1423 }, 0)
        .wait(1)
        .to({ rotation: -280.9969 }, 0)
        .wait(1)
        .to({ scaleX: 6.4838, scaleY: 6.4838, rotation: -282.8284 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -284.6367, y: 121.7 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -286.4216,
            x: -172.5,
            y: 121.65,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -288.1832, x: -172.55 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -289.9212, x: -172.6 },
          0,
        )
        .wait(1)
        .to({ rotation: -291.6358 }, 0)
        .wait(1)
        .to({ rotation: -293.3269, x: -172.65 }, 0)
        .wait(1)
        .to({ rotation: -294.9943, x: -172.6 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -296.6382, x: -172.65 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -298.2586, x: -172.7 },
          0,
        )
        .wait(1)
        .to({ rotation: -299.8553, y: 121.6 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -301.4286,
            x: -172.75,
            y: 121.65,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -302.9782, y: 121.55 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -304.5044, y: 121.6 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -306.0072,
            x: -172.8,
            y: 121.55,
          },
          0,
        )
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -307.4865 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -308.9425,
            x: -172.85,
            y: 121.6,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -310.3752, x: -172.9 },
          0,
        )
        .wait(1)
        .to({ rotation: -311.7847, y: 121.55 }, 0)
        .wait(1)
        .to({ rotation: -313.171, x: -172.95 }, 0)
        .wait(1)
        .to({ rotation: -314.5343 }, 0)
        .wait(1)
        .to({ rotation: -315.8747, y: 121.6 }, 0)
        .wait(1)
        .to({ rotation: -317.1921 }, 0)
        .wait(1)
        .to({ rotation: -318.4868, x: -173, y: 121.55 }, 0)
        .wait(1)
        .to({ rotation: -319.7588, x: -173.05 }, 0)
        .wait(1)
        .to({ rotation: -321.0082, y: 121.65 }, 0)
        .wait(1)
        .to({ rotation: -322.2352, y: 121.55 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -323.4398, x: -173.1 },
          0,
        )
        .wait(1)
        .to({ rotation: -324.6223, y: 121.65 }, 0)
        .wait(1)
        .to({ rotation: -325.7826, y: 121.6 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -326.9209, x: -173.15 },
          0,
        )
        .wait(1)
        .to({ rotation: -328.0374, x: -173.2 }, 0)
        .wait(1)
        .to({ rotation: -329.1321, y: 121.65 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -330.2053, x: -173.15 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -331.2571,
            x: -173.2,
            y: 121.6,
          },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -332.2875,
            x: -173.25,
            y: 121.65,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -333.2967, y: 121.6 },
          0,
        )
        .wait(1)
        .to({ rotation: -334.2849 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -335.2522, y: 121.65 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -336.1988,
            x: -173.3,
            y: 121.7,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -337.1248, x: -173.25, y: 121.65 }, 0)
        .wait(1)
        .to({ rotation: -338.0303, x: -173.3 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -338.9155, y: 121.7 },
          0,
        )
        .wait(1)
        .to({ rotation: -339.7805, x: -173.35 }, 0)
        .wait(1)
        .to({ rotation: -340.6255 }, 0)
        .wait(1)
        .to({ rotation: -341.4507 }, 0)
        .wait(1)
        .to({ rotation: -342.2561 }, 0)
        .wait(1)
        .to({ rotation: -343.042, x: -173.4 }, 0)
        .wait(1)
        .to({ rotation: -343.8085, y: 121.75 }, 0)
        .wait(1)
        .to({ rotation: -344.5557 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -345.2838 }, 0)
        .wait(1)
        .to({ rotation: -345.9929, x: -173.45 }, 0)
        .wait(1)
        .to({ rotation: -346.6832, y: 121.7 }, 0)
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -347.3549,
            x: -173.5,
            y: 121.75,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -348.008, x: -173.45, y: 121.7 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -348.6428, y: 121.75 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -349.2594, x: -173.5 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4838, scaleY: 6.4838, rotation: -349.8579, x: -173.45 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -350.4385, x: -173.5 },
          0,
        )
        .wait(1)
        .to({ rotation: -351.0013, y: 121.8 }, 0)
        .wait(1)
        .to({ rotation: -351.5465, y: 121.75 }, 0)
        .wait(1)
        .to({ scaleX: 6.4836, scaleY: 6.4836, rotation: -352.0742 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4838, scaleY: 6.4838, rotation: -352.5846, y: 121.8 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -353.0779,
            x: -173.55,
            y: 121.75,
          },
          0,
        )
        .wait(1)
        .to({ rotation: -353.554, y: 121.8 }, 0)
        .wait(1)
        .to({ rotation: -354.0133, x: -173.5 }, 0)
        .wait(1)
        .to({ rotation: -354.4559, y: 121.75 }, 0)
        .wait(1)
        .to({ rotation: -354.8818, x: -173.55, y: 121.8 }, 0)
        .wait(1)
        .to({ rotation: -355.2912, x: -173.6 }, 0)
        .wait(1)
        .to({ rotation: -355.6844, x: -173.55, y: 121.85 }, 0)
        .wait(1)
        .to({ scaleX: 6.4838, scaleY: 6.4838, rotation: -356.0613 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4835, scaleY: 6.4835, rotation: -356.4222, y: 121.8 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4838, scaleY: 6.4838, rotation: -356.7672, x: -173.6 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4837,
            scaleY: 6.4837,
            rotation: -357.0963,
            x: -173.55,
            y: 121.85,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4836, scaleY: 6.4836, rotation: -357.4099, y: 121.8 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4838,
            scaleY: 6.4838,
            rotation: -357.7079,
            x: -173.6,
            y: 121.85,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -357.9906, x: -173.55 },
          0,
        )
        .wait(1)
        .to(
          {
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -358.258,
            x: -173.6,
            y: 121.8,
          },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -358.5103, y: 121.85 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4838, scaleY: 6.4838, rotation: -358.7476, y: 121.8 },
          0,
        )
        .wait(1)
        .to(
          { scaleX: 6.4837, scaleY: 6.4837, rotation: -358.9701, y: 121.85 },
          0,
        )
        .wait(1)
        .to({ rotation: -359.1778 }, 0)
        .wait(1)
        .to({ rotation: -359.371 }, 0)
        .wait(1)
        .to(
          { scaleX: 6.4838, scaleY: 6.4838, rotation: -359.5496, x: -173.65 },
          0,
        )
        .wait(1)
        .to({ scaleX: 6.4837, scaleY: 6.4837, rotation: -359.7139 }, 0)
        .wait(1)
        .to({ rotation: -359.864, x: -173.6, y: 121.9 }, 0)
        .wait(1)
        .to(
          {
            regX: 35.1,
            regY: 35.1,
            scaleX: 6.4836,
            scaleY: 6.4836,
            rotation: -360,
            x: -172.95,
            y: 122.5,
          },
          0,
        )
        .wait(1),
    );

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-504.9, -210.4, 666.5, 667.2);

  (lib.icon = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Layer_6
    this.instance = new lib.PencilBody();
    this.instance.setTransform(
      0.45,
      9.45,
      0.2825,
      0.2825,
      46.243,
      0,
      0,
      -0.5,
      8.7,
    );
    var instanceFilter_1 = new cjs.ColorFilter(0, 0, 0, 1, 255, 255, 165, 0);
    this.instance.filters = [instanceFilter_1];
    this.instance.cache(-26, -119, 53, 256);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
    this.timeline.addTween(cjs.Tween.get(instanceFilter_1).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.icon,
    new cjs.Rectangle(-29.9, -20, 60.9, 59),
    null,
  );

  // stage content:
  (lib.yellow = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    this.actionFrames = [0];
    // timeline functions:
    this.frame_0 = function () {
      this.stop();
      if (this._artGalleryReady) return;
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
      maskShape.graphics
        .f("#000000")
        .drawRect(0, galleryY, lib.properties.width, galleryHeight);
      cardsLayer.mask = maskShape;

      root.addChild(uiLayer);
      root.addChild(cardsLayer);

      var fallbackItems = [
        {
          filename: "2026 lily ref new.png",
          displayName: "2026 Lily Ref",
          link: "",
        },
        {
          filename: "AMY SPINDRIFT LOLOL.png",
          displayName: "Amy Spindrift",
          link: "",
        },
        {
          filename: "INTERNAL_SCREAMING.png",
          displayName: "Internal Screaming",
          link: "",
        },
        {
          filename: "modern aero flash 2.png",
          displayName: "Modern Aero Flash 2",
          link: "",
        },
        {
          filename: "new 2006 cover v4 flatter.png",
          displayName: "New 2006 Cover v4",
          link: "",
        },
        {
          filename: "sonicv6 idle.gif",
          displayName: "Sonic V6 Idle",
          link: "",
        },
        {
          filename: "vanilla wip 9.png",
          displayName: "Vanilla WIP 9",
          link: "",
        },
      ];

      function buildGallery(items) {
        var artItems = Microsite.ui.normalizeItems(
          items,
          fallbackItems,
          "square",
        );
        var imgQueue = new cjs.LoadQueue(false);
        imgQueue.setMaxConnections(8);
        imgQueue.loadManifest([
          { id: "btn_left", src: "assets/img/yellow/left.png" },
          { id: "btn_right", src: "assets/img/yellow/right.png" },
          { id: "shine_square", src: "assets/img/shine/shine_square.png" },
          { id: "shine_standard", src: "assets/img/shine/shine_standard.png" },
          {
            id: "shine_widescreen",
            src: "assets/img/shine/shine_widescreen.png",
          },
        ]);

        for (var i = 0; i < artItems.length; i++) {
          imgQueue.loadFile({
            id: "art_" + i,
            src: encodeURI("assets/img/yellow/art/" + artItems[i].filename),
          });
        }

        function renderCards() {
          var cards = [];
          var preview = new Microsite.ui.PreviewOverlay(root, {
            width: lib.properties.width,
            height: lib.properties.height,
            centerX: centerX,
            centerY: centerY,
            onOpen: function () {
              uiLayer.visible = cardsLayer.visible = false;
              gallery.updateOverlays(true, imgQueue, "art_");
            },
            onClose: function () {
              uiLayer.visible = cardsLayer.visible = true;
              gallery.updateOverlays(false, imgQueue, "art_");
            },
          });

          for (var j = 0; j < artItems.length; j++) {
            (function (index) {
              var itemEntry = artItems[index];
              var imageObj = imgQueue.getResult("art_" + index);
              if (!imageObj) return;

              var card = Microsite.ui.createGalleryCard(imageObj, {
                ratio: itemEntry.ratio,
                displayName: itemEntry.displayName,
                shineImage: imgQueue.getResult("shine_" + itemEntry.ratio),
                shadowColor: "rgba(60,40,0,0.35)",
                textColor: "#774900",
              });
              card.entry = itemEntry;

              if (card.entry.link && card.entry.link.trim() !== "") {
                card.cursor = "pointer";
                card.on("mouseover", function () {
                  Microsite.audio.play("hoverwav");
                });
                card.on("click", function (evt) {
                  Microsite.audio.play("clickywav");
                  var win = window.open(evt.currentTarget.entry.link, "_blank");
                  if (win) win.opener = null;
                });
              } else {
                card.cursor = "zoom-in";
                card.on("click", function () {
                  if (
                    Math.abs(gallery.distanceFromCenter(cards.indexOf(card))) >
                    0.1
                  )
                    return;
                  preview.show(card.entry, imageObj, "assets/img/yellow/art/");
                });
              }

              cardsLayer.addChild(card);
              cards.push(card);
            })(j);
          }

          if (!cards.length) {
            var noArtText = new cjs.Text(
              "No art items found",
              "20px Trebuchet MS",
              "#774900",
            );
            noArtText.textAlign = "center";
            noArtText.x = centerX;
            noArtText.y = centerY - 10;
            uiLayer.addChild(noArtText);
            return;
          }

          var gallery = new Microsite.ui.Gallery(cards, {
            centerX: centerX,
            centerY: centerY,
            spacing: 120,
            onTweenUpdate: function (card, offset) {
              if (card.artBmp) {
                card.artBmp.visible = !(
                  Math.abs(offset) < 0.1 &&
                  card.entry.filename.toLowerCase().endsWith(".gif")
                );
              }
              gallery.updateOverlays(preview.isOpen, imgQueue, "art_");
            },
          });

          gallery.setupDOMOverlays("assets/img/yellow/art/");

          var lb = Microsite.ui.createButton(imgQueue.getResult("btn_left"), {
            scale: navScale,
            regX: 128,
            regY: 128,
            shadowColor: "rgba(106,68,0,0.55)",
            onClick: function () {
              gallery.move(-1);
            },
          });
          lb.x = 48;
          lb.y = navY;
          uiLayer.addChild(lb);

          var rb = Microsite.ui.createButton(imgQueue.getResult("btn_right"), {
            scale: navScale,
            regX: 128,
            regY: 128,
            shadowColor: "rgba(106,68,0,0.55)",
            onClick: function () {
              gallery.move(1);
            },
          });
          rb.x = 412;
          rb.y = navY;
          uiLayer.addChild(rb);

          gallery.update(false);
          gallery.updateOverlays(false, imgQueue, "art_");
        }

        imgQueue.on("complete", renderCards);
        imgQueue.load();
      }

      var configQueue = new cjs.LoadQueue(false);
      configQueue.on("complete", function () {
        var config = configQueue.getResult("artConfig");
        buildGallery(config && config.items ? config.items : fallbackItems);
      });
      configQueue.on("error", function () {
        buildGallery(fallbackItems);
      });
      configQueue.loadFile({
        id: "artConfig",
        src: "assets/img/yellow/art-config.json",
        type: "json",
      });
    };

    // actions tween:
    this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

    // Layer_2
    this.instance = new lib.icon();
    this.instance.setTransform(38, 30.45, 0.9448, 0.9448);
    this.instance.shadow = new cjs.Shadow("#000000", 0, 0, 8);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(2));
    this.instance.addEventListener("tick", AdobeAn.handleFilterCache);

    // Layer_3
    this.instance_1 = new lib.titletext();
    this.instance_1.setTransform(170.3, 30, 0.9448, 0.9448);
    this.instance_1.shadow = new cjs.Shadow("#000000", 0, 0, 6);

    this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2));

    // Layer_4
    this.instance_2 = new lib.Bitmap1();
    this.instance_2.setTransform(-26, -31, 0.9448, 0.9448);

    this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2));

    // Layer_5
    this.instance_3 = new lib.roate();
    this.instance_3.setTransform(
      108.05,
      304.3,
      1.2645,
      1.2645,
      0,
      0,
      0,
      -173,
      122.5,
    );
    this.instance_3.alpha = 0.2383;
    this.instance_3.compositeOperation = "multiply";
    var instance_3Filter_1 = new cjs.ColorFilter(0, 0, 0, 1, 217, 156, 0, 0);
    this.instance_3.filters = [instance_3Filter_1];
    this.instance_3.cache(-507, -212, 671, 671);

    this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2));
    this.timeline.addTween(cjs.Tween.get(instance_3Filter_1).wait(2));

    // Layer_6
    this.instance_4 = new lib.pp();
    this.instance_4.setTransform(230.05, 175.75, 0.9448, 0.9448);
    this.instance_4.alpha = 0.5586;
    this.instance_4.compositeOperation = "multiply";
    var instance_4Filter_2 = new cjs.ColorFilter(0, 0, 0, 1, 189, 120, 0, 0);
    this.instance_4.filters = [instance_4Filter_2];
    this.instance_4.cache(-245, -188, 491, 376);

    this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(2));
    this.timeline.addTween(cjs.Tween.get(instance_4Filter_2).wait(2));

    // stageBackground
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f()
      .s("rgba(0,0,0,0)")
      .ss(1, 1, 1, 3, true)
      .p("EglfgdDMBK/AAAMAAAA6HMhK/AAAg");
    this.shape.setTransform(230, 176);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#FFFF99").s().p("EglfAdEMAAAg6HMBK/AAAMAAAA6Hg");
    this.shape_1.setTransform(230, 176);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] })
        .wait(2),
    );

    this.filterCacheList = [];
    this.filterCacheList.push({
      instance: this.instance_3,
      startFrame: 0,
      endFrame: 2,
      x: -507,
      y: -212,
      w: 671,
      h: 671,
    });
    this._renderFirstFrame();
  }).prototype = p = new lib.AnMovieClip();
  p.nominalBounds = new cjs.Rectangle(50.3, 145, 433, 445.4);
  // library properties:
  lib.properties = {
    id: "B325F180281AD548AF0E7778EAE237A2",
    width: 460,
    height: 352,
    fps: 24,
    color: "#FFFF99",
    opacity: 1.0,
    manifest: [
      { src: "images/yellow_atlas_1.png?1778909900410", id: "yellow_atlas_1" },
      { src: "../../sounds/clicky.wav", id: "clickywav" },
      { src: "../../sounds/hover.wav", id: "hoverwav" },
      { src: "../../sounds/scream.wav", id: "screamwav" },
    ],
    preloads: [],
  };

  // bootstrap callback support:

  (lib.Stage = function (canvas) {
    createjs.Stage.call(this, canvas);
  }).prototype = p = new createjs.Stage();

  p.setAutoPlay = function (autoPlay) {
    this.tickEnabled = autoPlay;
  };
  p.play = function () {
    this.tickEnabled = true;
    this.getChildAt(0).gotoAndPlay(this.getTimelinePosition());
  };
  p.stop = function (ms) {
    if (ms) this.seek(ms);
    this.tickEnabled = false;
  };
  p.seek = function (ms) {
    this.tickEnabled = true;
    this.getChildAt(0).gotoAndStop((lib.properties.fps * ms) / 1000);
  };
  p.getDuration = function () {
    return (this.getChildAt(0).totalFrames / lib.properties.fps) * 1000;
  };

  p.getTimelinePosition = function () {
    return (this.getChildAt(0).currentFrame / lib.properties.fps) * 1000;
  };

  an.bootcompsLoaded = an.bootcompsLoaded || [];
  if (!an.bootstrapListeners) {
    an.bootstrapListeners = [];
  }

  an.bootstrapCallback = function (fnCallback) {
    an.bootstrapListeners.push(fnCallback);
    if (an.bootcompsLoaded.length > 0) {
      for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
        fnCallback(an.bootcompsLoaded[i]);
      }
    }
  };

  an.compositions = an.compositions || {};
  an.compositions["B325F180281AD548AF0E7778EAE237A2"] = {
    getStage: function () {
      return exportRoot.stage;
    },
    getLibrary: function () {
      return lib;
    },
    getSpriteSheet: function () {
      return ss;
    },
    getImages: function () {
      return img;
    },
  };

  an.compositionLoaded = function (id) {
    an.bootcompsLoaded.push(id);
    for (var j = 0; j < an.bootstrapListeners.length; j++) {
      an.bootstrapListeners[j](id);
    }
  };

  an.getComposition = function (id) {
    return an.compositions[id];
  };

  an.makeResponsive = function (
    isResp,
    respDim,
    isScale,
    scaleType,
    domContainers,
  ) {
    var lastW,
      lastH,
      lastS = 1;
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    function resizeCanvas() {
      var w = lib.properties.width,
        h = lib.properties.height;
      var iw = window.innerWidth,
        ih = window.innerHeight;
      var pRatio = window.devicePixelRatio || 1,
        xRatio = iw / w,
        yRatio = ih / h,
        sRatio = 1;
      if (isResp) {
        if (
          (respDim == "width" && lastW == iw) ||
          (respDim == "height" && lastH == ih)
        ) {
          sRatio = lastS;
        } else if (!isScale) {
          if (iw < w || ih < h) sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 1) {
          sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 2) {
          sRatio = Math.max(xRatio, yRatio);
        }
      }
      domContainers[0].width = w * pRatio * sRatio;
      domContainers[0].height = h * pRatio * sRatio;
      domContainers.forEach(function (container) {
        container.style.width = w * sRatio + "px";
        container.style.height = h * sRatio + "px";
      });
      stage.scaleX = pRatio * sRatio;
      stage.scaleY = pRatio * sRatio;
      lastW = iw;
      lastH = ih;
      lastS = sRatio;
      stage.tickOnUpdate = false;
      stage.update();
      stage.tickOnUpdate = true;
    }
  };
  an.handleSoundStreamOnTick = function (event) {
    if (!event.paused) {
      var stageChild = stage.getChildAt(0);
      if (!stageChild.paused || stageChild.ignorePause) {
        stageChild.syncStreamSounds();
      }
    }
  };
  an.handleFilterCache = function (event) {
    if (!event.paused) {
      var target = event.target;
      if (target) {
        if (target.filterCacheList) {
          for (var index = 0; index < target.filterCacheList.length; index++) {
            var cacheInst = target.filterCacheList[index];
            if (
              cacheInst.startFrame <= target.currentFrame &&
              target.currentFrame <= cacheInst.endFrame
            ) {
              cacheInst.instance.cache(
                cacheInst.x,
                cacheInst.y,
                cacheInst.w,
                cacheInst.h,
              );
            }
          }
        }
      }
    }
  };
})((createjs = createjs || {}), (AdobeAn = AdobeAn || {}));
var createjs, AdobeAn;
