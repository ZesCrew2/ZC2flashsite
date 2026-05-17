(function() {
    "use strict";

    /*
     * microsite api - centralized control for the zescrew2 microsite
     * if it needs any changes, it can be properly updated ig --thorns
     */
    window.Microsite = {
        
        // --- ticker & timing --- --thorns
        ticker: {
            FPS_FLASH: 24,
            
            /*
             * stable throttled update for createjs stages. --thorns
             * prevents cumulative drift and ensures authentic flash speed. --thorns
             */
            createThrottledTick: function(stage, fps) {
                var lastUpdate = 0;
                var interval = 1000 / (fps || this.FPS_FLASH);
                
                return function(event) {
                    var now = createjs.Ticker.getTime();
                    if (now - lastUpdate >= interval) {
                        // if stage has autoclear=false and needs manual clear, handle here --thorns
                        if (stage.autoClear === false && stage.canvas) {
                            var ctx = stage.canvas.getContext('2d');
                            if (ctx) ctx.clearRect(0, 0, stage.canvas.width, stage.canvas.height);
                        }
                        
                        stage.update(event);
                        lastUpdate = now - ((now - lastUpdate) % interval);
                    }
                };
            },

            // sync a standard date.now() loop (like gif overlays) to site framerate --thorns
            shouldUpdate: function(lastTime, fps) {
                var now = Date.now();
                var interval = 1000 / (fps || this.FPS_FLASH);
                if (now - lastTime >= interval) {
                    return {
                        ready: true,
                        newTime: now - ((now - lastTime) % interval)
                    };
                }
                return { ready: false };
            }
        },

        // shader control --thorns
        shader: {
            instance: null,
            
            setMode: function(mode) {
                if (this.instance) {
                    this.instance.effectType = mode;
                    console.log("microsite: shader mode set to " + mode + " --thorns");
                }
            },
            
            setSpeed: function(speed) {
                if (this.instance) this.instance.speed = speed;
            },

            setIntensity: function(freq, amp) {
                if (this.instance) {
                    this.instance.frequency = freq;
                    this.instance.amplitude = amp;
                }
            }
        },

        // ui components --thorns
        ui: {
            /*
             * calculates optimal layout for an image inside a gallery card. --thorns
             */
            getFitLayout: function(imgW, imgH, cardW, cardH, padding) {
                padding = padding || 16;
                var targetW = cardW - padding;
                var targetH = cardH - padding;
                var fitScale = Math.min(targetW / imgW, targetH / imgH, 1);
                var aspectRatio = imgW / imgH;
                var yOffset = 0;
                
                // aesthetic adjustments for different orientations --thorns
                if (aspectRatio > 1.2) yOffset = -4;
                else if (aspectRatio < 0.8) yOffset = 4;
                
                return { scale: fitScale, y: yOffset };
            },

            /*
             * creates a standard gallery card container with background, image, shine and label. --thorns
             * sizeMode: "square" (1:1), "standard" (4:3), "widescreen" (16:9) --thorns
             */
            createGalleryCard: function(imageObj, options) {
                options = options || {};
                var sizeMode = options.sizeMode || "square"; 
                var baseW = options.width || 172;
                var w = baseW;
                var h = baseW;
                
                if (sizeMode === "standard") h = Math.round(baseW * 0.75); // 4:3
                else if (sizeMode === "widescreen") h = Math.round(baseW * 0.5625); // 16:9
                
                var card = new createjs.Container();
                
                // card background --thorns
                var bg = new createjs.Shape();
                bg.graphics.f(options.bgColor || "#E7E7E7")
                          .s(options.borderColor || "rgba(255,255,255,0.85)")
                          .ss(2)
                          .rr(-w/2, -h/2, w, h, 12);
                bg.shadow = new createjs.Shadow(options.shadowColor || "rgba(60,40,0,0.35)", 0, 3, 8);
                card.addChild(bg);
                
                // main art --thorns
                if (imageObj) {
                    var bmp = new createjs.Bitmap(imageObj);
                    bmp.regX = imageObj.width / 2;
                    bmp.regY = imageObj.height / 2;
                    
                    var layout = this.getFitLayout(imageObj.width, imageObj.height, w, h);
                    bmp.scaleX = bmp.scaleY = layout.scale;
                    bmp.y = layout.y;
                    
                    card.addChild(bmp);
                    card.artBmp = bmp; // expose for gif toggle logic --thorns
                }
                
                // gloss/shine overlay --thorns
                if (options.shineImage) {
                    var shine = new createjs.Bitmap(options.shineImage);
                    shine.regX = options.shineImage.width / 2;
                    shine.regY = options.shineImage.height / 2;
                    shine.scaleX = w / options.shineImage.width;
                    shine.scaleY = h / options.shineImage.height;
                    card.addChild(shine);
                    card.shineBmp = shine;
                }
                
                // label text --thorns
                if (options.displayName) {
                    var font = options.font || "14px Kronika";
                    var color = options.textColor || "#774900";
                    var label = new createjs.Text(options.displayName, font, color);
                    label.textAlign = "center";
                    label.y = (h/2) + 12;
                    label.shadow = new createjs.Shadow("rgba(255,255,255,0.8)", 0, 0, 2);
                    card.addChild(label);
                }
                
                // interaction hitarea --thorns
                var hit = new createjs.Shape();
                hit.graphics.f("#000000").rr(-w/2, -h/2, w, h + 24, 12);
                card.hitArea = hit;
                
                card.cardWidth = w;
                card.cardHeight = h;
                card.sizeMode = sizeMode;
                
                return card;
            },

            // creates a bitmap button with hover effects and sounds --thorns
            createButton: function(imageObj, options) {
                options = options || {};
                var btn = new createjs.Bitmap(imageObj);
                var scale = options.scale !== undefined ? options.scale : 1.0;
                btn.scaleX = btn.scaleY = scale;
                
                if (options.regX !== undefined) btn.regX = options.regX;
                if (options.regY !== undefined) btn.regY = options.regY;
                
                btn.cursor = "pointer";

                var isHovered = false;

                function updateVisuals() {
                    if (!btn.image || !btn.image.width) {
                        // retry once on next tick if image is set but width is 0 --thorns
                        if (btn.image) setTimeout(updateVisuals, 10);
                        return;
                    }
                    
                    // handle image swapping if hoverimage provided --thorns
                    if (isHovered && options.hoverImage) {
                        btn.image = options.hoverImage;
                    } else {
                        btn.image = imageObj;
                    }

                    var add = isHovered ? (options.brightnessAdd || 46) : 0;
                    btn.filters = [new createjs.ColorFilter(1, 1, 1, 1, add, add, (isHovered ? 12 : 0), 0)];
                    
                    if (btn.cacheCanvas) btn.updateCache();
                    else btn.cache(0, 0, btn.image.width, btn.image.height);
                }

                // dynamic setter for the button image --thorns
                btn.setImage = function(newImg, newHoverImg) {
                    imageObj = newImg;
                    if (newHoverImg) options.hoverImage = newHoverImg;
                    updateVisuals();
                };

                updateVisuals();

                btn.on("mouseover", function() {
                    isHovered = true;
                    if (options.hoverSound !== false) window.Microsite.audio.play("hoverwav");
                    updateVisuals();
                });

                btn.on("mouseout", function() {
                    isHovered = false;
                    updateVisuals();
                });

                if (options.onClick) {
                    btn.on("click", function(evt) {
                        if (options.clickSound !== false) window.Microsite.audio.play("clickywav");
                        options.onClick(evt);
                    });
                }

                return btn;
            },

            // logic for a 3d-style card gallery slider --thorns
            Gallery: function(cards, options) {
                this.cards = cards;
                this.currentIndex = 0;
                this.lastSortedIndex = -1;
                this.options = options || {};
                this.centerX = options.centerX || 0;
                this.centerY = options.centerY || 0;
                this.spacing = options.spacing || 120;
                this.isAnimating = false;

                this.move = function(direction, callback) {
                    if (this.isAnimating || this.cards.length < 2) return;
                    this.isAnimating = true;
                    
                    var count = this.cards.length;
                    this.currentIndex = ((this.currentIndex + direction % count) + count) % count;
                    
                    this.update(true);
                    
                    var self = this;
                    setTimeout(function() {
                        self.isAnimating = false;
                        if (callback) callback();
                    }, 260);
                };

                this.distanceFromCenter = function(index) {
                    var raw = index - this.currentIndex;
                    var half = this.cards.length / 2;
                    if (raw > half) raw -= this.cards.length;
                    else if (raw < -half) raw += this.cards.length;
                    return raw;
                };

                this.update = function(animated) {
                    var self = this;
                    for (var i = 0; i < this.cards.length; i++) {
                        var card = this.cards[i];
                        var offset = this.distanceFromCenter(i);
                        card._depthOffset = offset;

                        var absOffset = Math.abs(offset);
                        var targetX = this.centerX + (offset * this.spacing);
                        var targetY = this.centerY + (absOffset * 10);
                        var targetScale = absOffset === 0 ? 0.92 : (absOffset === 1 ? 0.66 : 0.48);
                        var targetAlpha = absOffset === 0 ? 1 : (absOffset === 1 ? 0.58 : 0);

                        card.visible = absOffset <= 2;
                        card.mouseEnabled = absOffset <= 1;

                        if (animated) {
                            createjs.Tween.get(card, {override:true}).to({
                                x: targetX, 
                                y: targetY, 
                                scaleX: targetScale, 
                                scaleY: targetScale, 
                                alpha: targetAlpha
                            }, 240, createjs.Ease.quadOut).addEventListener("change", (function(c) {
                                return function() { 
                                    if (options.onTweenUpdate) {
                                        var currentOffset = self.distanceFromCenter(self.cards.indexOf(c));
                                        options.onTweenUpdate(c, currentOffset);
                                    }
                                };
                            })(card));
                        } else {
                            card.x = targetX;
                            card.y = targetY;
                            card.scaleX = card.scaleY = targetScale;
                            card.alpha = targetAlpha;
                        }
                    }
                    
                    // depth sorting --thorns
                    if (this.lastSortedIndex !== this.currentIndex) {
                        var parent = this.cards[0].parent;
                        if (parent) {
                            var sorted = this.cards.slice(0).sort(function(a, b) {
                                return Math.abs(b._depthOffset) - Math.abs(a._depthOffset);
                            });
                            for (var j = 0; j < sorted.length; j++) {
                                parent.setChildIndex(sorted[j], parent.numChildren - 1);
                            }
                            this.lastSortedIndex = this.currentIndex;
                        }
                    }
                };
            }
        },

        // audio & easter eggs --thorns
        audio: {
            /**
             * standard wrapper for playingsounds. --thorns
             */
            play: function(id, loop, offset) {
                if (typeof window.playSound === "function") {
                    return window.playSound(id, loop, offset);
                }
                return null;
            },

            /**
             * play sound with an optional probability chance. --thorns
             */
            playWithChance: function(soundId, probability) {
                if (Math.random() < (probability || 1.0)) {
                    return this.play(soundId);
                }
                return null;
            },

            /**
             * standardized scream logic for internal_screaming.png --thorns
             */
            scream: function() {
                return this.playWithChance("screamwav", 0.25);
            }
        }
    };

    console.log("microsite api initialized. --thorns");

})();
