import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: 'zc2sitelol',
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
