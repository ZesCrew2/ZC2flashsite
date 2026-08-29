const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');

// Mock window and other browser globals
class MockLoadQueue {
    constructor() {
        this.addEventListener = () => {};
        this.on = () => {};
        this.loadManifest = () => {};
        this.removeAllEventListeners = () => {};
        this.close = () => {};
        this.installPlugin = () => {};
        this.getResult = () => null;
    }
}

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
        LoadQueue: MockLoadQueue,
        Types: {
            BINARY: 'binary'
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
    dispatchEvent: () => {},
    location: { search: '', href: 'http://localhost/' }
};

global.window = window;
global.createjs = window.createjs;
global.AdobeAn = window.AdobeAn;
global.Microsite = window.Microsite;

global.localStorage = {
    getItem: () => null,
    setItem: () => {}
};
global.navigator = {
    deviceMemory: 4,
    hardwareConcurrency: 4,
    userAgent: 'node'
};
global.document = {
    createElement: () => ({ getContext: () => null }),
    getElementById: (id) => (id === 'flashContent' ? { innerHTML: '' } : { clientWidth: 760 }),
    addEventListener: () => {},
    body: { appendChild: () => {} }
};
global.CustomEvent =
    global.CustomEvent ||
    class {
        constructor(type, opts) {
            this.type = type;
            this.detail = opts && opts.detail;
        }
    };
global.vec3 = {
    create: () => new Float32Array(3),
    set: () => {}
};
global.mat4 = {
    create: () => new Float32Array(16),
    identity: () => {}
};
global.quat = {
    create: () => new Float32Array(4)
};

const mockEl = () => ({
    style: {},
    appendChild: () => {},
    remove: () => {},
    innerHTML: '',
    id: '',
    src: '',
    onload: null,
    addEventListener: () => {},
    getContext: () => null,
    clientWidth: 760
});
global.document = {
    getElementById: (id) => (id === 'site' ? { clientWidth: 760 } : mockEl()),
    createElement: () => mockEl(),
    addEventListener: () => {},
    body: { appendChild: () => {} }
};

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
    getElementById: (id) => (id === 'site' ? { clientWidth: 760 } : mockEl()),
    createElement: () => mockEl(),
    addEventListener: () => {},
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
