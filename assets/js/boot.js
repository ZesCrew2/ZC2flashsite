(function () {
    "use strict";

    /**
     * boot.js - Site Boot Orchestrator
     * Manages the transition from preloader to interactive site.
     */
    function BootManager() {
        this.preloader = document.getElementById('preloader');
        this.progressFill = document.getElementById('progress-fill');
        this.progressStatus = document.getElementById('progress-status');
        this.site = document.getElementById('site');
        this.swirl = document.getElementById('swirl');
    }

    BootManager.prototype.init = async function() {
        console.log("BootManager: Starting initialization...");

        // Ensure assets global exists
        if (!window.Microsite || !window.Microsite.assets) {
            console.error("BootManager: AssetManager not found!");
            if (this.progressStatus) this.progressStatus.textContent = "Error: AssetManager not found!";
            return;
        }

        var assetMgr = window.Microsite.assets;
        var self = this;

        // Setup progress listener
        assetMgr.onProgress = function(progress) {
            var percent = Math.floor(progress * 100);
            if (self.progressFill) self.progressFill.style.width = percent + "%";
            if (self.progressStatus) self.progressStatus.textContent = "Loading Assets... " + percent + "%";
        };

        try {
            // Start loading
            await assetMgr.load();
            
            // Finish sequence
            if (this.progressStatus) this.progressStatus.textContent = "Complete!";
            setTimeout(function() { self.revealSite(); }, 500);
        } catch (err) {
            console.error("BootManager: Loading failed", err);
            if (this.progressStatus) this.progressStatus.textContent = "Error loading assets.";
        }
    };

    BootManager.prototype.revealSite = function() {
        console.log("BootManager: Revealing site...");
        
        var self = this;
        if (this.preloader) {
            this.preloader.style.opacity = "0";
            setTimeout(function() {
                self.preloader.style.display = "none";
            }, 500);
        }

        if (this.site) this.site.style.display = "block";
        if (this.swirl) this.swirl.style.display = "block";

        // Force layout recalculation
        window.dispatchEvent(new Event('resize'));

        // Initialize components that depend on assets
        this.dispatchReadyEvent();
    };

    BootManager.prototype.dispatchReadyEvent = function() {
        // Standard CustomEvent for other scripts to listen for
        var event = new CustomEvent('MicrositeReady', {
            detail: {
                timestamp: Date.now(),
                assets: window.Microsite.assets
            }
        });
        document.dispatchEvent(event);
    };

    // Start on DOM Content Loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log("BootManager: DOMContentLoaded");
        var boot = new BootManager();
        window.Microsite = window.Microsite || {};
        window.Microsite.boot = boot;
        boot.init();
    });

})();
