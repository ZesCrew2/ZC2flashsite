(function() {
    "use strict";

    function WiggleFilter(shaderSource, effectType, speed, frequency, amplitude) {
        this.Filter_constructor();
        this.effectType = effectType !== undefined ? effectType : 4;
        this.speed = speed !== undefined ? speed : 2.0;
        this.frequency = frequency !== undefined ? frequency : 10.0;
        this.amplitude = amplitude !== undefined ? amplitude : 0.015;
        this.time = 0;
        this.FRAG_SHADER_BODY = shaderSource;
        this._locations = null;
    }

    var p = createjs.extend(WiggleFilter, createjs.Filter);

    p.shaderParamSetup = function(gl, stage, shaderProgram) {
        if (!this._locations) {
            this._locations = {
                uTime: gl.getUniformLocation(shaderProgram, "uTime"),
                uEffectType: gl.getUniformLocation(shaderProgram, "uEffectType"),
                uSpeed: gl.getUniformLocation(shaderProgram, "uSpeed"),
                uFrequency: gl.getUniformLocation(shaderProgram, "uFrequency"),
                uWaveAmplitude: gl.getUniformLocation(shaderProgram, "uWaveAmplitude")
            };
        }
        gl.uniform1f(this._locations.uTime, this.time);
        gl.uniform1i(this._locations.uEffectType, this.effectType);
        gl.uniform1f(this._locations.uSpeed, this.speed);
        gl.uniform1f(this._locations.uFrequency, this.frequency);
        gl.uniform1f(this._locations.uWaveAmplitude, this.amplitude);
    };

    p.clone = function() {
        return new WiggleFilter(this.FRAG_SHADER_BODY, this.effectType, this.speed, this.frequency, this.amplitude);
    };

    createjs.WiggleFilter = createjs.promote(WiggleFilter, "Filter");

    window.initBackgroundShader = function() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "assets/shaders/wiggle.glsl", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                setupBackground(xhr.responseText);
            }
        };
        xhr.send();
    };

    function setupBackground(shaderCode) {
        var canvas = document.getElementById("bg-canvas");
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.id = "bg-canvas";
            document.body.insertBefore(canvas, document.body.firstChild);
        }

        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.zIndex = "-1"; 
        canvas.style.pointerEvents = "none";

        var stage = new createjs.StageGL(canvas, { transparent: false, antialias: true });
        
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = "assets/img/bg.png";
        img.onload = function() {
            var bitmap = new createjs.Bitmap(img);
            stage.addChild(bitmap);

            var wiggle = new createjs.WiggleFilter(shaderCode, 4, 2.0, 10.0, 0.015);
            bitmap.filters = [wiggle];
            
            // register with API --thorns
            if (window.Microsite) {
                window.Microsite.shader.instance = wiggle;
            }

            bitmap.cache(0, 0, img.width, img.height, 1, { useGL: "stage" });

            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                stage.updateViewport(canvas.width, canvas.height);
                var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                bitmap.scaleX = bitmap.scaleY = scale;
                bitmap.x = (canvas.width - img.width * scale) / 2;
                bitmap.y = (canvas.height - img.height * scale) / 2;
                bitmap.updateCache();
            }
            window.addEventListener("resize", resize);
            resize();

            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.addEventListener("tick", function(event) {
                if (event.paused) return;
                wiggle.time += event.delta / 1000;
                if (bitmap.cacheCanvas) {
                    bitmap.updateCache();
                }
                stage.update(event);
            });
        };
    }

    if (document.readyState === "complete") {
        window.initBackgroundShader();
    } else {
        window.addEventListener("load", window.initBackgroundShader);
    }
})();
