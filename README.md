# The ZesCrew2 Microsite!!
This is my personal website, it has tons of easter eggs! :D  
Coded by Saptarshi and Thorns (PLEASE go check these two out, they're awesome)

## Project overview

Built with TypeScript + Vite, no framework.

## Directory layout

- `typescript/` - Source code. Entry: `autoloader.ts` imports everything.
- `zc2sitelol/` - The deployable site root (HTML, CSS, assets). Vite `root` is set here.
- `flash/` - Original Flash `.fla`/`.swf` files. Legacy files, not part of the build.
- `typescript/features/rss-bg.ts` and `metro-bg.ts` - Standalone background effects, built separately via esbuild.

## Build commands

```bash
npm run build        # vite build + esbuild of rss-bg.ts and metro-bg.ts
npm run dev          # Vite dev server (rewrites bundle import to source via plugin)
npm run typecheck    # tsc with BOTH tsconfig.json and typescript/tsconfig.json (noEmit)
npm run lint         # eslint "typescript/**/*.ts"
npm run format       # prettier --write "typescript/**/*.ts"
```

## Compiled output (gitignored)

`zc2sitelol/assets/ts/` is the Vite build output and is **gitignored**. Do not edit files there directly!

## Third-party globals (loaded as classic scripts before bundle)

- `createjs` (LoadQueue, Sound)
- `AdobeAn` (Flash export)
- `vec3`, `mat4`, `quat` (gl-matrix)

Declared in `typescript/globals.d.ts`.

## Gotchas

- No CI, no tests, no pre-commit hooks.
- The `flash/` directory contains original Flash source files; they are not used by the site build.
- `assets/wmp/` contains the Windows Media Player custom element JS, loaded dynamically by `boot.ts`.

## License

This project is open source. Note that the Windows Media Player custom element (`assets/wmp/`) is **not** licensed under this project's license. Windows Media Player assets are the intellectual property of Microsoft Corporation.