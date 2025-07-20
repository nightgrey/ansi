import { defOpV } from "@thi.ng/vectors/defopv";

/**
 * Lookup table for RGB -> 216-color 6x6x6 cube values.
 * The values are the indices of the cube in the lookup table.
 *
 * @see https://en.wikipedia.org/wiki/Color_cube
 *
 * @remarks
 * This is how the table was generated:
 *
 * ```
 * const RGB_TO_CUBE = new Uint8Array(256);
 * for (let i = 0; i < 256; i++) {
 *   if (i < 48) RGB_TO_CUBE[i] = 0;
 *   else if (i < 115)
 *     RGB_TO_CUBE[i] = 1; // (95 + 135) / 2
 *   else if (i < 155)
 *     RGB_TO_CUBE[i] = 2; // (135 + 175) / 2
 *   else if (i < 195)
 *     RGB_TO_CUBE[i] = 3; // (175 + 215) / 2
 *   else if (i < 235)
 *     RGB_TO_CUBE[i] = 4; // (215 + 255) / 2
 *   else RGB_TO_CUBE[i] = 5;
 * }
 * ```
 */
export const SRGB_TO_CUBE = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
  3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
  3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
];

/**
 * Map RGB to 6x6x6 cube value.
 */
export const [srgbCube, srgbCube2, srgbCube3, srgbCube4] = defOpV(
  (a) => SRGB_TO_CUBE[a],
);

export const CUBE_TO_SRGB = [0x00, 0x5f, 0x87, 0xaf, 0xd7, 0xff];

/**
 * Map 6x6x6 cube value back to RGB.
 */
export const [cubeSrgb, cubeSrgb2, cubeSrgb3, cubeSrgb4] = defOpV(
  (a) => CUBE_TO_SRGB[a],
);
