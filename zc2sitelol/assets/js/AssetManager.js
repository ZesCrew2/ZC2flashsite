(function () {
    "use strict";

    console.log("AssetManager: Script execution started.");

    /**
     * AssetManager handles site-wide asset preloading using PreloadJS.
     * Centralizes loading of images, audio, and JSON with progress tracking.
     */
    function AssetManager() {
        console.log("AssetManager: Constructing...");
        try {
            // Use XHR for better progress tracking (cross-origin requires CORS headers)
            this.queue = new createjs.LoadQueue(true);
            
            // Required for sound loading in CreateJS
            if (window.createjs && createjs.Sound) {
                console.log("AssetManager: SoundJS detected, installing plugin.");
                this.queue.installPlugin(createjs.Sound);
            } else {
                console.warn("AssetManager: SoundJS not found.");
            }

            this._onProgress = null;
            this._onComplete = null;
            this._onError = null;

            this.queue.on("progress", this._handleProgress.bind(this));
            this.queue.on("complete", this._handleComplete.bind(this));
            this.queue.on("error", this._handleError.bind(this));
        } catch (e) {
            console.error("AssetManager: Constructor failed:", e);
        }
    }

    AssetManager.prototype.load = function(manifest) {
        var self = this;
        manifest = manifest || AssetManager.MANIFEST;
        return new Promise(function(resolve, reject) {
            self._onComplete = resolve;
            self._onError = reject;
            self.queue.loadManifest(manifest);
        });
    };

    /**
     * Alias map for deduplicated asset IDs. Old code referencing removed
     * duplicate IDs will transparently fall back to the canonical ID. --thorns
     */
    AssetManager.ALIASES = {
        "site_click": "clickywav",
        "site_hover": "hoverwav",
        "site_scream": "screamwav",
        "snd_badexplosionwav": "snd_badexplosion",
        "Duccwav": "ducc"
    };

    AssetManager.prototype.getAsset = function(id) {
        var result = this.queue.getResult(id);
        if (!result && AssetManager.ALIASES[id]) {
            result = this.queue.getResult(AssetManager.ALIASES[id]);
        }
        // Check deferred results if not found in main queue --thorns
        if (!result && this._deferredResults && this._deferredResults[id]) {
            result = this._deferredResults[id];
        }
        return result;
    };

    /**
     * Loads deferred (non-critical) assets on demand. Returns a promise.
     * Safe to call multiple times — subsequent calls resolve immediately. --thorns
     */
    AssetManager.prototype.loadDeferred = function() {
        if (this._deferredLoaded) return Promise.resolve();
        if (this._deferredLoading) return this._deferredLoading;

        var self = this;
        this._deferredResults = {};
        this._deferredLoading = new Promise(function(resolve, reject) {
            var deferredQueue = new createjs.LoadQueue(true);
            if (window.createjs && createjs.Sound) {
                deferredQueue.installPlugin(createjs.Sound);
            }
            deferredQueue.on("fileload", function(evt) {
                // Store each result as it loads for immediate access --thorns
                self._deferredResults[evt.item.id] = evt.result;
            });
            deferredQueue.on("complete", function() {
                self._deferredLoaded = true;
                self._deferredLoading = null;
                console.log("AssetManager: Deferred assets loaded (" + Object.keys(self._deferredResults).length + " items). --thorns");
                resolve();
            });
            deferredQueue.on("error", function(evt) {
                console.error("AssetManager deferred error:", evt.item ? evt.item.id : "unknown");
                reject(evt);
            });
            deferredQueue.loadManifest(AssetManager.DEFERRED_MANIFEST);
        });
        return this._deferredLoading;
    };

    Object.defineProperty(AssetManager.prototype, "onProgress", {
        set: function(cb) {
            this._onProgress = cb;
        }
    });

    AssetManager.prototype._handleProgress = function(event) {
        if (this._onProgress) {
            this._onProgress(event.progress);
        }
    };

    AssetManager.prototype._handleComplete = function(event) {
        if (this._onComplete) {
            this._onComplete(event);
        }
    };

    AssetManager.prototype._handleError = function(event) {
        console.error("AssetManager error:", event.item ? event.item.id : "unknown", event.item ? event.item.src : "", event);
        if (this._onError) {
            this._onError(event);
        }
    };

    /**
     * Global manifest of all essential assets.
     */
    /**
     * CRITICAL: Assets required for initial site render (boot, banner, core UI/SFX).
     * These load during the preloader and block the site reveal.
     */
    AssetManager.MANIFEST = [
        // Core Site UI
        { id: "site_logo", src: "assets/img/zc2aeroorb.png" },
        { id: "site_speaker", src: "assets/img/speaker.png" },
        { id: "site_banner", src: "assets/img/banner/banner.png" },
        { id: "site_rss", src: "assets/img/rss.svg" },

        // Banner Assets (Atlas)
        { id: "zc2banner_atlas_1", src: "assets/swf/banner/images/zc2banner_atlas_1.png" },
        { id: "zc2banner_atlas_2", src: "assets/swf/banner/images/zc2banner_atlas_2.png" },
        { id: "zc2banner_atlas_3", src: "assets/swf/banner/images/zc2banner_atlas_3.png" },

        // Global SFX (deduplicated — aliases resolved via getAsset fallback) --thorns
        { id: "clickywav", src: "assets/sounds/clicky.wav" },
        { id: "hoverwav", src: "assets/sounds/hover.wav" },
        { id: "site_notif", src: "assets/sounds/click.webm" },
        { id: "site_medal", src: "assets/sounds/mm_medal_click.wav" },
        { id: "screamwav", src: "assets/sounds/scream.wav" },
        { id: "snd_badexplosion", src: "assets/sounds/snd_badexplosion.wav" },
        { id: "ducc", src: "assets/sounds/ducc.wav" },
        { id: "luigi1", src: "assets/sounds/mk64_luigi01.wav" },
        { id: "luigi2", src: "assets/sounds/mk64_luigi02.wav" },
        { id: "luigi3", src: "assets/sounds/mk64_luigi03.wav" },
        { id: "luigi4", src: "assets/sounds/mk64_luigi06.wav" }
    ];

    /**
     * DEFERRED: Maze textures, maze audio, and JSON loaded on-demand when
     * the maze is actually triggered (5% chance on logo click). --thorns
     * This cuts ~2MB+ from initial page load for the majority of visitors.
     */
    AssetManager.DEFERRED_MANIFEST = [
        // JSON
        { id: "maze_messages", src: "assets/json/maze_messages.json" },

        // Maze Textures - Wall
        { id: "wall_diff", src: "assets/img/maze-textures/cracked_concrete_wall/cracked_concrete_wall_diff_1k.jpg" },
        { id: "wall_nor", src: "assets/img/maze-textures/cracked_concrete_wall/cracked_concrete_wall_nor_gl_1k.png" },
        { id: "wall_rough", src: "assets/img/maze-textures/cracked_concrete_wall/cracked_concrete_wall_rough_1k.png" },

        // Maze Textures - Floor
        { id: "floor_diff", src: "assets/img/maze-textures/stained_pine_floor/stained_pine_diff_1k.jpg" },
        { id: "floor_nor", src: "assets/img/maze-textures/stained_pine_floor/stained_pine_nor_gl_1k.png" },
        { id: "floor_rough", src: "assets/img/maze-textures/stained_pine_floor/stained_pine_rough_1k.png" },

        // Maze Textures - Objects
        { id: "btn_closed", src: "assets/img/maze-textures/button_closed.png" },
        { id: "btn_opened", src: "assets/img/maze-textures/button_opened.png" },
        { id: "skybox", src: "assets/img/maze-textures/skybox.png" },
        { id: "maze_end_img", src: "assets/img/maze-textures/end_asset.png" },

        // Maze Audio (Forced binary load by bypassing SoundJS auto-detection with query param)
        { id: "wall_move", src: "assets/sounds/maze_sounds/wall_move.wav?type=binary", type: createjs.Types.BINARY },
        { id: "wall_stop", src: "assets/sounds/maze_sounds/wall_stop.wav?type=binary", type: createjs.Types.BINARY },
        { id: "maze_music", src: "assets/music/maze_music/song.mp3" },
        { id: "maze_select", src: "assets/sounds/maze_sounds/select.wav" },
        { id: "maze_textbox", src: "assets/sounds/maze_sounds/textbox.wav" },
        { id: "maze_switch", src: "assets/sounds/maze_sounds/switch_on.wav" },
        { id: "maze_end_sfx", src: "assets/sounds/maze_sounds/end_asset.wav" }
    ];

    window.Microsite = window.Microsite || {};
    window.Microsite.AssetManager = AssetManager;
    
    // Create global instance for site-wide use
    window.Microsite.assets = new AssetManager();
    console.log("AssetManager: Global instance created.");
})();
