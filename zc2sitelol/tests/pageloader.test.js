const test = require('node:test');
const assert = require('node:assert');
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
    addEventListener: () => {},
    location: { search: '', href: 'http://localhost/' }
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

// Load the compiled pageloader module and expose its entry points
test.before(async () => {
    const pl = await import(path.resolve(__dirname, '../assets/ts/features/pageloader.js'));
    global.loadPage = pl.loadPage;
    global.resolvePageAssetPath = pl.resolvePageAssetPath;
});

test('PL-01: loadPage blocks non-whitelisted pages', () => {
    window.lastError = null;
    loadPage('malicious');
    assert.match(window.lastError, /security: blocked attempt to load invalid page/);
    
    window.lastError = null;
    loadPage('red'); // Valid page
    assert.strictEqual(window.lastError, null);
});

test('PL-02: resolvePageAssetPath returns an absolute URL resolved from the page location', () => {
  const pathResult = resolvePageAssetPath('test.mp3');
  // resolvePageAssetPath now returns an absolute URL so it loads correctly
  // regardless of where the site is served (e.g. /zc2sitelol/ subpath).
  assert.strictEqual(pathResult, 'http://localhost/assets/swf/pages/test.mp3');
});

// Restore console at end (optional since it's a test process)
// test.after(() => { console.error = originalConsoleError; });
