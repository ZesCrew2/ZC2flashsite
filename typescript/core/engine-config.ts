// Engine rendering tuning constants (decoupled from engine-core / maze logic).

export const FOG_NEAR = 1.0;
export const FOG_FAR = 12.0;
export const FOG_COLOR: [number, number, number, number] = [0.02, 0, 0, 1];

export const WIGGLE_SPEED = 2.0;
export const WIGGLE_FREQ = 8.0;
export const WIGGLE_AMP = 0.02;

export const CLEAR_COLOR_SKYBOX: [number, number, number, number] = [0.01, 0, 0, 1];
export const CLEAR_COLOR_DEFAULT: [number, number, number, number] = [0, 0, 0, 1];

export const TARGET_ASPECT = 4 / 3;
// Near plane must stay smaller than how close the camera eye can get to a wall
// face (collision radius 0.2 - neckLength 0.12 = ~0.08). Otherwise the near
// plane clips the wall's front face; with back-face culling on the wall then
// disappears entirely and you can see through to the other side.
export const PROJECTION_NEAR = 0.05;
export const PROJECTION_FAR = 100.0;
