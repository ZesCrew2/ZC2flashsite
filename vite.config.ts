import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const autoloaderSource = fileURLToPath(
  new URL('./typescript/autoloader.ts', import.meta.url),
);
const BUNDLE_SRC = 'assets/ts/microsite.bundle.js';

const devSourcePlugin = {
  name: 'dev-source-rewrite',
  apply: 'serve' as const,
  transformIndexHtml(html: string) {
    return html.replace(BUNDLE_SRC, `/@fs${autoloaderSource}`);
  },
};

export default defineConfig(({ mode }) => ({
  root: 'zc2sitelol',
  plugins: [devSourcePlugin],
  server: {
    fs: {
      allow: [fileURLToPath(new URL('.', import.meta.url))],
    },
  },
  build: {
    outDir: 'assets/ts',
    emptyOutDir: true,
    target: 'es2020',
    cssCodeSplit: false,
    minify: 'esbuild',
    sourcemap: mode === 'development',
    rollupOptions: {
      input: 'typescript/autoloader.ts',
      output: {
        format: 'es',
        entryFileNames: 'microsite.bundle.js',
        chunkFileNames: 'microsite.bundle.js',
        assetFileNames: 'microsite.bundle.[ext]',
        inlineDynamicImports: true,
      },
    },
  },
}));
