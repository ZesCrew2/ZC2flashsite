import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const mainSource = fileURLToPath(
  new URL('./typescript/main.ts', import.meta.url),
);
const BUNDLE_SRC = 'assets/ts/microsite.bundle.js';

const devSourcePlugin = {
  name: 'dev-source-rewrite',
  apply: 'serve' as const,
  transformIndexHtml(html: string) {
    return html.replace(BUNDLE_SRC, `/@fs${mainSource}`);
  },
};

export default defineConfig(({ mode }) => ({
  root: 'zc2sitelol',
  plugins: [devSourcePlugin],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'typescript'),
    },
  },
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
      input: 'typescript/main.ts',
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
