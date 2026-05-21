const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// Mock window and other browser globals
const window = {
    createjs: {
        Ticker: {
            addEventListener: () => {},
            removeEventListener: () => {}
        },
        Sound: {
            registerSound: () => {},
            play: () => {}
        },
        LoadQueue: function() {
            this.addEventListener = () => {};
            this.loadManifest = () => {};
            this.removeAllEventListeners = () => {};
            this.close = () => {};
        }
    },
    AdobeAn: {
        getComposition: () => ({
            getLibrary: () => ({
                properties: { manifest: [] }
            })
        }),
        handleFilterCache: () => {}
    },
    Microsite: {
        ticker: {
            createThrottledTick: () => {}
        }
    },
    addEventListener: () => {}
};

global.window = window;
global.createjs = window.createjs;
global.AdobeAn = window.AdobeAn;
global.Microsite = window.Microsite;

// Mock console globally to catch errors
const originalConsoleError = console.error;
global.console.error = (msg) => { 
    window.lastError = msg; 
    // originalConsoleError(msg); // optional
};

const mockElement = {
    style: {},
    appendChild: () => {},
    remove: () => {},
    innerHTML: '',
    id: ''
};

global.document = {
    getElementById: (id) => {
        if (id === 'flashContent') return mockElement;
        if (id === 'site') return { clientWidth: 760 };
        return mockElement;
    },
    createElement: (tag) => {
        if (tag === 'a') return { href: '', pathname: '' };
        return { ...mockElement };
    },
    body: { appendChild: () => {} }
};

// Load the pageloader.js file and export functions to global
const plPath = path.resolve(__dirname, '../assets/js/pageloader.js');
const plCode = fs.readFileSync(plPath, 'utf8');
eval(plCode);

test('PL-01: loadPage blocks non-whitelisted pages', () => {
    window.lastError = null;
    loadPage('malicious');
    assert.match(window.lastError, /security: blocked attempt to load invalid page/);
    
    window.lastError = null;
    loadPage('red'); // Valid page
    assert.strictEqual(window.lastError, null);
});

test('PL-02: resolvePageAssetPath returns correct relative path', () => {
    // Mock the anchor tag behavior in browser
    const originalCreateElement = global.document.createElement;
    global.document.createElement = (tag) => {
        if (tag === 'a') {
            const a = {
                set href(val) {
                    // Simple mock: assume it resolves to /assets/swf/pages/val
                    this.pathname = '/assets/swf/pages/' + val.split('/').pop();
                },
                pathname: ''
            };
            return a;
        }
        return { ...mockElement };
    };

    const pathResult = resolvePageAssetPath('test.mp3');
    // resolvePageAssetPath implementation: return resolver.pathname.replace(/^\//, '');
    assert.strictEqual(pathResult, 'assets/swf/pages/test.mp3');
    
    global.document.createElement = originalCreateElement;
});

// Restore console at end (optional since it's a test process)
// test.after(() => { console.error = originalConsoleError; });
