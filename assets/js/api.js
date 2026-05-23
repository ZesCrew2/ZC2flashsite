(function () {
  "use strict";

  /*
   * microsite api - centralized control for the zescrew2 microsite
   * if it needs any changes, it can be properly updated ig --thorns
   */
  const Microsite = {
    // --- ticker & timing --- --thorns
    ticker: {
      FPS_FLASH: 24,

      /*
       * stable throttled update for createjs stages. --thorns
       * prevents cumulative drift and ensures authentic flash speed. --thorns
       */
      createThrottledTick(stage, fps = this.FPS_FLASH) {
        let lastUpdate = 0;
        const interval = 1000 / fps;

        return (event) => {
          const now = createjs.Ticker.getTime();
          if (now - lastUpdate >= interval) {
            // if stage has autoclear=false and needs manual clear, handle here --thorns
            if (stage.autoClear === false && stage.canvas) {
              const ctx = stage.canvas.getContext("2d");
              if (ctx)
                ctx.clearRect(0, 0, stage.canvas.width, stage.canvas.height);
            }

            stage.update(event);
            lastUpdate = now - ((now - lastUpdate) % interval);
          }
        };
      },

      // sync a standard date.now() loop (like gif overlays) to site framerate --thorns
      shouldUpdate(lastTime, fps = this.FPS_FLASH) {
        const now = Date.now();
        const interval = 1000 / fps;
        if (now - lastTime >= interval) {
          return {
            ready: true,
            newTime: now - ((now - lastTime) % interval),
          };
        }
        return { ready: false };
      },
    },

    // shader control --thorns
    shader: {
      instance: null,

      setMode(mode) {
        if (this.instance) {
          this.instance.effectType = mode;
          console.log(`microsite: shader mode set to ${mode} --thorns`);
        }
      },

      setSpeed(speed) {
        if (this.instance) this.instance.speed = speed;
      },

      setIntensity(freq, amp) {
        if (this.instance) {
          this.instance.frequency = freq;
          this.instance.amplitude = amp;
        }
      },
    },

    // ui components --thorns
    ui: {
      // Locked dimensions for the 3 supported aspect ratios --thorns
      galleryDimensions: {
        square: { w: 172, h: 172 }, // 1:1
        standard: { w: 172, h: 129 }, // 4:3
        widescreen: { w: 172, h: 97 }, // 16:9
      },

      /*
       * ensures item data has consistent fields. --thorns
       */
      normalizeItems: function (items, fallbackItems, defaultRatio = "square") {
        if (!items || !items.length) return fallbackItems;
        return items
          .filter((i) => i && i.filename)
          .map((i) => ({
            filename: i.filename,
            displayName: i.displayName || i.filename,
            link: i.link || "",
            ratio: i.ratio || defaultRatio,
          }));
      },

      /*
       * calculates optimal layout for an image inside a gallery card. --thorns
       */
      getFitLayout: function (imgW, imgH, cardW, cardH, padding = 16) {
        const targetW = cardW - padding;
        const targetH = cardH - padding;
        const fitScale = Math.min(targetW / imgW, targetH / imgH, 1);
        const aspectRatio = imgW / imgH;
        let yOffset = 0;

        // aesthetic adjustments for different orientations --thorns
        if (aspectRatio > 1.2) yOffset = -4;
        else if (aspectRatio < 0.8) yOffset = 4;

        return { scale: fitScale, y: yOffset };
      },

      /*
       * creates a standard gallery card container with background, image, shine and label. --thorns
       * sizeMode/ratio: "square" (1:1), "standard" (4:3), "widescreen" (16:9) --thorns
       */
      createGalleryCard: function (imageObj, options = {}) {
        const ratio = options.ratio || options.sizeMode || "square";
        const { w, h } =
          this.galleryDimensions[ratio] || this.galleryDimensions.square;

        const card = new createjs.Container();

        // card background --thorns
        const bg = new createjs.Shape();
        bg.graphics
          .f(options.bgColor || "#E7E7E7")
          .s(options.borderColor || "rgba(255,255,255,0.85)")
          .ss(2)
          .rr(-w / 2, -h / 2, w, h, 12);
        bg.shadow = new createjs.Shadow(
          options.shadowColor || "rgba(60,40,0,0.35)",
          0,
          3,
          8,
        );
        card.addChild(bg);

        // main art --thorns
        if (imageObj) {
          const bmp = new createjs.Bitmap(imageObj);
          bmp.regX = imageObj.width / 2;
          bmp.regY = imageObj.height / 2;

          const layout = this.getFitLayout(
            imageObj.width,
            imageObj.height,
            w,
            h,
          );
          bmp.scaleX = bmp.scaleY = layout.scale;
          bmp.y = layout.y;

          card.addChild(bmp);
          card.artBmp = bmp; // expose for gif toggle logic --thorns
        }

        // gloss/shine overlay --thorns
        if (options.shineImage) {
          const shine = new createjs.Bitmap(options.shineImage);
          shine.regX = options.shineImage.width / 2;
          shine.regY = options.shineImage.height / 2;
          shine.scaleX = w / options.shineImage.width;
          shine.scaleY = h / options.shineImage.height;
          card.addChild(shine);
          card.shineBmp = shine;
        }

        // label text --thorns
        if (options.displayName) {
          const font = options.font || "14px Kronika";
          const color = options.textColor || "#774900";
          const label = new createjs.Text(options.displayName, font, color);
          label.textAlign = "center";
          label.y = h / 2 + 12;
          label.shadow = new createjs.Shadow("rgba(255,255,255,0.8)", 0, 0, 2);
          card.addChild(label);
        }

        // interaction hitarea --thorns
        const hit = new createjs.Shape();
        hit.graphics.f("#000000").rr(-w / 2, -h / 2, w, h + 24, 12);
        card.hitArea = hit;

        card.cardWidth = w;
        card.cardHeight = h;
        card.sizeMode = ratio;
        card.ratio = ratio;

        return card;
      },

      /*
       * manages full-screen image previews with gif support. --thorns
       */
      PreviewOverlay: function (root, options = {}) {
        this.root = root;
        this.container = new createjs.Container();
        this.root.addChild(this.container);
        this.isOpen = false;
        this.screamInstance = null;

        const stageW = options.width || 460;
        const stageH = options.height || 352;

        this.show = (entry, imageObj, assetPath) => {
          if (this.isOpen) return;
          this.isOpen = true;

          Microsite.audio.play("clickywav");
          if (entry.filename === "INTERNAL_SCREAMING.png") {
            this.screamInstance = Microsite.audio.scream();
          }

          const overlay = new createjs.Shape();
          overlay.graphics.f("rgba(0,0,0,0.85)").drawRect(0, 0, stageW, stageH);
          overlay.alpha = 0;
          this.container.addChild(overlay);

          const previewBmp = new createjs.Bitmap(imageObj);
          previewBmp.regX = imageObj.width / 2;
          previewBmp.regY = imageObj.height / 2;

          const dims =
            Microsite.ui.galleryDimensions[entry.ratio] ||
            Microsite.ui.galleryDimensions.square;
          const layout = Microsite.ui.getFitLayout(
            imageObj.width,
            imageObj.height,
            dims.w,
            dims.h,
          );
          previewBmp.x = options.centerX || stageW / 2;
          previewBmp.y = (options.centerY || stageH / 2) + layout.y;
          previewBmp.scaleX = previewBmp.scaleY = layout.scale * 0.92;
          this.container.addChild(previewBmp);

          const margin = 40;
          const targetScale = Math.min(
            (stageW - margin) / imageObj.width,
            (stageH - margin) / imageObj.height,
            1.2,
          );

          createjs.Tween.get(overlay).to({ alpha: 1 }, 300);
          createjs.Tween.get(previewBmp).to(
            {
              x: stageW / 2,
              y: stageH / 2,
              scaleX: targetScale,
              scaleY: targetScale,
            },
            400,
            createjs.Ease.backOut,
          );

          const finalLink =
            entry.link && entry.link.trim() !== ""
              ? entry.link
              : assetPath + entry.filename;

          previewBmp.cursor = "pointer";
          previewBmp.on("click", (evt) => {
            evt.stopImmediatePropagation();
            Microsite.audio.play("clickywav");
            const win = window.open(finalLink, "_blank");
            if (win) win.opener = null;
          });

          if (options.onOpen) options.onOpen();

          let previewGif = document.getElementById("preview-gif-overlay");
          if (entry.filename.toLowerCase().endsWith(".gif")) {
            if (!previewGif) {
              previewGif = document.createElement("img");
              previewGif.id = "preview-gif-overlay";
              previewGif.style.position = "absolute";
              previewGif.style.zIndex = "20";
              previewGif.style.display = "none";
              const animContainer = document.getElementById(
                "animation_container",
              );
              if (animContainer) animContainer.appendChild(previewGif);
            }
            previewGif.src = encodeURI(assetPath + entry.filename);
            previewGif.style.cursor = "pointer";
            previewGif.onclick = (evt) => {
              evt.stopPropagation();
              Microsite.audio.play("clickywav");
              const win = window.open(finalLink, "_blank");
              if (win) win.opener = null;
            };

            setTimeout(() => {
              if (!this.isOpen) return;
              previewBmp.visible = false;
              previewGif.style.width = imageObj.width * targetScale + "px";
              previewGif.style.height = imageObj.height * targetScale + "px";
              previewGif.style.left =
                stageW / 2 - (imageObj.width * targetScale) / 2 + "px";
              previewGif.style.top =
                stageH / 2 - (imageObj.height * targetScale) / 2 + "px";
              previewGif.style.display = "block";
            }, 400);
          }

          const closeHint = new createjs.Text(
            "Click background to close | Click image for link",
            "14px Trebuchet MS",
            "#FFFFFF",
          );
          closeHint.textAlign = "center";
          closeHint.x = stageW / 2;
          closeHint.y = stageH - 20;
          closeHint.alpha = 0;
          this.container.addChild(closeHint);
          createjs.Tween.get(closeHint).wait(500).to({ alpha: 0.6 }, 300);

          overlay.cursor = "zoom-out";
          overlay.on("click", () => {
            this.isOpen = false;
            if (this.screamInstance) {
              this.screamInstance.stop();
              this.screamInstance = null;
            }
            Microsite.audio.play("clickywav");
            if (previewGif) previewGif.style.display = "none";
            previewBmp.visible = true;

            createjs.Tween.get(overlay).to({ alpha: 0 }, 300);
            createjs.Tween.get(closeHint).to({ alpha: 0 }, 200);
            createjs.Tween.get(previewBmp)
              .to(
                {
                  x: options.centerX || stageW / 2,
                  y: (options.centerY || stageH / 2) + layout.y,
                  scaleX: layout.scale * 0.92,
                  scaleY: layout.scale * 0.92,
                },
                300,
                createjs.Ease.quadIn,
              )
              .call(() => {
                this.container.removeAllChildren();
                if (options.onClose) options.onClose();
              });
          });
        };
      },

      // creates a bitmap button with hover effects and sounds --thorns
      createButton: function (imageObj, options = {}) {
        const btn = new createjs.Bitmap(imageObj);
        const scale = options.scale !== undefined ? options.scale : 1.0;
        btn.scaleX = btn.scaleY = scale;

        if (options.regX !== undefined) btn.regX = options.regX;
        if (options.regY !== undefined) btn.regY = options.regY;

        btn.cursor = "pointer";

        let isHovered = false;

        const updateVisuals = () => {
          if (!btn.image || !btn.image.width) {
            // retry once on next tick if image is set but width is 0 --thorns
            if (btn.image) setTimeout(updateVisuals, 10);
            return;
          }

          // handle image swapping if hoverimage provided --thorns
          btn.image =
            isHovered && options.hoverImage ? options.hoverImage : imageObj;

          const add = isHovered ? options.brightnessAdd || 46 : 0;
          btn.filters = [
            new createjs.ColorFilter(
              1,
              1,
              1,
              1,
              add,
              add,
              isHovered ? 12 : 0,
              0,
            ),
          ];

          if (btn.cacheCanvas) btn.updateCache();
          else btn.cache(0, 0, btn.image.width, btn.image.height);
        };

        // dynamic setter for the button image --thorns
        btn.setImage = (newImg, newHoverImg) => {
          imageObj = newImg;
          if (newHoverImg) options.hoverImage = newHoverImg;
          updateVisuals();
        };

        updateVisuals();

        btn.on("mouseover", () => {
          isHovered = true;
          if (options.hoverSound !== false)
            window.Microsite.audio.play("hoverwav");
          updateVisuals();
        });

        btn.on("mouseout", () => {
          isHovered = false;
          updateVisuals();
        });

        if (options.onClick) {
          btn.on("click", (evt) => {
            if (options.clickSound !== false)
              window.Microsite.audio.play("clickywav");
            options.onClick(evt);
          });
        }

        return btn;
      },

      // logic for a 3d-style card gallery slider --thorns
      Gallery: function (cards, options = {}) {
        this.cards = cards;
        this.currentIndex = 0;
        this.lastSortedIndex = -1;
        this.options = options;
        this.centerX = options.centerX || 0;
        this.centerY = options.centerY || 0;
        this.spacing = options.spacing || 120;
        this.isAnimating = false;

        this.gifOverlay = null;
        this.shineOverlay = null;
        this.lastGifUpdate = 0;

        /*
         * creates or retrieves DOM overlays for GIFs and shine effects. --thorns
         */
        this.setupDOMOverlays = (assetPath) => {
          const container = document.getElementById("animation_container");
          if (!container) return;

          this.gifOverlay = document.getElementById("gallery-gif-overlay");
          if (!this.gifOverlay) {
            this.gifOverlay = document.createElement("img");
            this.gifOverlay.id = "gallery-gif-overlay";
            this.gifOverlay.style.cssText =
              "position:absolute;pointer-events:none;z-index:10;display:none;transition:none;";
            container.appendChild(this.gifOverlay);
          }

          this.shineOverlay = document.getElementById("gallery-shine-overlay");
          if (!this.shineOverlay) {
            this.shineOverlay = document.createElement("img");
            this.shineOverlay.id = "gallery-shine-overlay";
            this.shineOverlay.style.cssText =
              "position:absolute;pointer-events:none;z-index:11;display:none;transition:none;";
            container.appendChild(this.shineOverlay);
          }
          this.assetPath = assetPath;
        };

        /*
         * syncs DOM overlays with the currently active gallery card. --thorns
         */
        this.updateOverlays = (isPreviewOpen, imgQueue, prefix = "art_") => {
          if (isPreviewOpen || !this.gifOverlay) return;

          const activeCard = this.cards[this.currentIndex];
          if (
            activeCard &&
            activeCard.entry.filename &&
            activeCard.entry.filename.toLowerCase().endsWith(".gif")
          ) {
            const update = Microsite.ticker.shouldUpdate(
              this.lastGifUpdate,
              24,
            );
            if (!update.ready) return;
            this.lastGifUpdate = update.newTime;

            const imageObj = imgQueue.getResult(prefix + this.currentIndex);
            const dims =
              Microsite.ui.galleryDimensions[activeCard.ratio] ||
              Microsite.ui.galleryDimensions.square;

            if (imageObj) {
              const currentScale = activeCard.scaleX;
              const layout = Microsite.ui.getFitLayout(
                imageObj.width,
                imageObj.height,
                dims.w,
                dims.h,
              );
              // manual offset for green/yellow style --thorns
              if (activeCard.ratio === "widescreen") layout.y += 4;

              const finalScale = layout.scale * currentScale;

              if (
                this.gifOverlay.getAttribute("data-filename") !==
                activeCard.entry.filename
              ) {
                this.gifOverlay.src = encodeURI(
                  this.assetPath + activeCard.entry.filename,
                );
                this.gifOverlay.setAttribute(
                  "data-filename",
                  activeCard.entry.filename,
                );
              }

              const canvas =
                (activeCard.stage && activeCard.stage.canvas) ||
                (window.stage && window.stage.canvas);
              if (!canvas) return;

              const ratio = canvas.width / canvas.clientWidth;
              const pt = activeCard.localToGlobal(0, layout.y);

              this.gifOverlay.style.width = imageObj.width * finalScale + "px";
              this.gifOverlay.style.height =
                imageObj.height * finalScale + "px";
              this.gifOverlay.style.left =
                Math.round(pt.x / ratio - (imageObj.width * finalScale) / 2) +
                "px";
              this.gifOverlay.style.top =
                Math.round(pt.y / ratio - (imageObj.height * finalScale) / 2) +
                "px";
              this.gifOverlay.style.display = "block";
              this.gifOverlay.style.opacity = activeCard.alpha;

              if (this.shineOverlay) {
                if (
                  this.shineOverlay.getAttribute("data-ratio") !==
                  activeCard.ratio
                ) {
                  this.shineOverlay.src = encodeURI(
                    `assets/img/shine/shine_${activeCard.ratio}.png`,
                  );
                  this.shineOverlay.setAttribute(
                    "data-ratio",
                    activeCard.ratio,
                  );
                }

                const cardPt = activeCard.localToGlobal(0, 0);
                const cardWidth = dims.w * currentScale;
                const cardHeight = dims.h * currentScale;
                this.shineOverlay.style.width = cardWidth + "px";
                this.shineOverlay.style.height = cardHeight + "px";
                this.shineOverlay.style.left =
                  Math.round(cardPt.x / ratio - cardWidth / 2) + "px";
                this.shineOverlay.style.top =
                  Math.round(cardPt.y / ratio - cardHeight / 2) + "px";
                this.shineOverlay.style.display = "block";
                this.shineOverlay.style.opacity = activeCard.alpha;
              }

              this.gifOverlay.style.pointerEvents = activeCard.entry.link
                ? "auto"
                : "none";
              this.gifOverlay.style.cursor = activeCard.entry.link
                ? "pointer"
                : "default";
              this.gifOverlay.onclick = () => {
                Microsite.audio.play("clickywav");
                const win = window.open(activeCard.entry.link, "_blank");
                if (win) win.opener = null;
              };
            }
          } else {
            if (this.gifOverlay) this.gifOverlay.style.display = "none";
            if (this.shineOverlay) this.shineOverlay.style.display = "none";
          }
        };

        this.move = (direction, callback) => {
          if (this.isAnimating || this.cards.length < 2) return;
          this.isAnimating = true;

          const count = this.cards.length;
          this.currentIndex =
            (this.currentIndex + (direction % count) + count) % count;

          this.update(true);

          setTimeout(() => {
            this.isAnimating = false;
            if (callback) callback();
          }, 260);
        };

        this.distanceFromCenter = (index) => {
          let raw = index - this.currentIndex;
          const half = this.cards.length / 2;
          if (raw > half) raw -= this.cards.length;
          else if (raw < -half) raw += this.cards.length;
          return raw;
        };

        this.update = (animated) => {
          this.cards.forEach((card, i) => {
            const offset = this.distanceFromCenter(i);
            card._depthOffset = offset;

            const absOffset = Math.abs(offset);
            const targetX = this.centerX + offset * this.spacing;
            const targetY = this.centerY + absOffset * 10;
            const targetScale =
              absOffset === 0 ? 0.92 : absOffset === 1 ? 0.66 : 0.48;
            const targetAlpha =
              absOffset === 0 ? 1 : absOffset === 1 ? 0.58 : 0;

            card.visible = absOffset <= 2;
            card.mouseEnabled = absOffset <= 1;

            if (animated) {
              createjs.Tween.get(card, { override: true })
                .to(
                  {
                    x: targetX,
                    y: targetY,
                    scaleX: targetScale,
                    scaleY: targetScale,
                    alpha: targetAlpha,
                  },
                  240,
                  createjs.Ease.quadOut,
                )
                .addEventListener("change", () => {
                  if (options.onTweenUpdate) {
                    const currentOffset = this.distanceFromCenter(
                      this.cards.indexOf(card),
                    );
                    options.onTweenUpdate(card, currentOffset);
                  }
                });
            } else {
              card.x = targetX;
              card.y = targetY;
              card.scaleX = card.scaleY = targetScale;
              card.alpha = targetAlpha;
            }
          });

          // depth sorting --thorns
          if (this.lastSortedIndex !== this.currentIndex) {
            const parent = this.cards[0].parent;
            if (parent) {
              const sorted = [...this.cards].sort((a, b) => {
                return Math.abs(b._depthOffset) - Math.abs(a._depthOffset);
              });
              sorted.forEach((c) => {
                parent.setChildIndex(c, parent.numChildren - 1);
              });
              this.lastSortedIndex = this.currentIndex;
            }
          }
        };
      },
    },

    // audio & easter eggs --thorns
    audio: {
      /**
       * standard wrapper for playingsounds. --thorns
       */
      play(id, loop, offset) {
        if (typeof window.playSound === "function") {
          return window.playSound(id, loop, offset);
        }
        return null;
      },

      /**
       * play sound with an optional probability chance. --thorns
       */
      playWithChance(soundId, probability = 1.0) {
        if (Math.random() < probability) {
          return this.play(soundId);
        }
        return null;
      },

      /**
       * standardized scream logic for internal_screaming.png --thorns
       */
      scream() {
        return this.playWithChance("screamwav", 0.25);
      },
    },
  };

  window.Microsite = Microsite;
  console.log("microsite api initialized. --thorns");
})();
