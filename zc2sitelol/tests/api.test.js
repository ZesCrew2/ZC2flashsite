const test = require('node:test');
const assert = require('node:assert');
const path = require('path');

// Mock window and other browser globals
const window = {
    createjs: {
        Ticker: {
            getTime: () => Date.now()
        },
        Tween: {
            get: () => ({ to: () => ({ addEventListener: () => {} }) })
        },
        Ease: {
            quadOut: {}
        }
    },
    console: console
};
global.window = window;
global.createjs = window.createjs;

// Load the compiled Microsite namespace module
test.before(async () => {
    await import(path.resolve(__dirname, '../assets/ts/microsite.js'));
});

test('API-01: ticker.shouldUpdate returns true only when interval elapsed', () => {
    const fps = 24;
    const interval = 1000 / fps;
    const startTime = 10000;
    
    // Mock Date.now()
    const originalDateNow = Date.now;
    
    // Should be false immediately
    Date.now = () => startTime;
    let result = window.Microsite.ticker.shouldUpdate(startTime, fps);
    assert.strictEqual(result.ready, false, 'Should not be ready immediately');
    
    // Should be false just before interval
    Date.now = () => startTime + interval - 1; // 1ms before
    result = window.Microsite.ticker.shouldUpdate(startTime, fps);
    assert.strictEqual(result.ready, false, 'Should not be ready before interval');
    
    // Should be true when interval reached
    // We add a tiny bit to account for JS floating point precision issues observed in previous run
    Date.now = () => startTime + interval + 0.001;
    result = window.Microsite.ticker.shouldUpdate(startTime, fps);
    assert.strictEqual(result.ready, true, `Should be ready when interval elapsed`);
    
    // Restore
    Date.now = originalDateNow;
});

test('API-02: ui.getFitLayout calculates correct scale and orientation offsets', () => {
    const ui = window.Microsite.ui;
    
    // Test square fit - Implementation caps at 1.0 and defaults padding to 16
    let layout = ui.getFitLayout(100, 100, 200, 200, 16);
    assert.strictEqual(layout.scale, 1, 'Scale should be capped at 1.0');
    assert.strictEqual(layout.y, 0);
    
    // Test landscape (aspect > 1.2)
    // imgW=200, imgH=100. cardW=116, cardH=116. padding=16. targetW=100, targetH=100.
    // scale = min(100/200, 100/100, 1) = 0.5
    layout = ui.getFitLayout(200, 100, 116, 116, 16);
    assert.strictEqual(layout.scale, 0.5);
    assert.strictEqual(layout.y, -4);
    
    // Test portrait (aspect < 0.8)
    layout = ui.getFitLayout(100, 200, 116, 116, 16);
    assert.strictEqual(layout.scale, 0.5);
    assert.strictEqual(layout.y, 4);
});

test('API-03: ui.Gallery index wraps correctly on move', (t) => {
    const ui = window.Microsite.ui;
    const cards = [
        { parent: { setChildIndex: () => {}, numChildren: 10 }, x:0, y:0, scaleX:1, scaleY:1, alpha:1 },
        { parent: { setChildIndex: () => {}, numChildren: 10 }, x:0, y:0, scaleX:1, scaleY:1, alpha:1 },
        { parent: { setChildIndex: () => {}, numChildren: 10 }, x:0, y:0, scaleX:1, scaleY:1, alpha:1 }
    ];
    const gallery = new ui.Gallery(cards, {});
    
    assert.strictEqual(gallery.currentIndex, 0);
    
    // Move forward
    gallery.move(1);
    assert.strictEqual(gallery.currentIndex, 1);
    
    // Move forward again
    gallery.isAnimating = false; // reset for test
    gallery.move(1);
    assert.strictEqual(gallery.currentIndex, 2);
    
    // Wrap forward
    gallery.isAnimating = false;
    gallery.move(1);
    assert.strictEqual(gallery.currentIndex, 0);
    
    // Move backward (wrap)
    gallery.isAnimating = false;
    gallery.move(-1);
    assert.strictEqual(gallery.currentIndex, 2);
});

test('API-04: audio.playWithChance respects probability', () => {
    const audio = window.Microsite.audio;
    let played = false;
    audio.play = () => { played = true; };
    
    // Mock Math.random
    const originalRandom = Math.random;
    
    // 100% chance
    Math.random = () => 0.5;
    played = false;
    audio.playWithChance('test', 1.0);
    assert.strictEqual(played, true);
    
    // 0% chance - THIS SHOULD PASS IF BUG IS FIXED, FAIL IF BUG EXISTS
    // Implementation: if (Math.random() < (probability || 1.0))
    // 0.0 || 1.0 is 1.0. So 0.5 < 1.0 is true.
    Math.random = () => 0.5;
    played = false;
    audio.playWithChance('test', 0.0);
    assert.strictEqual(played, false, '0% probability should not play sound (BLOCKER: Implementation uses probability || 1.0)');
    
    Math.random = originalRandom;
});
