import { distEucledian3, type RGB, type SRGB } from "@thi.ng/color";
import type { BasicColor, IndexedColor } from "../color";
import { INDEXED_TO_BASIC } from "./constants";
import { int2553 } from "./int255";
import { cubeSrgb3, srgbCube3 } from "./srgb-cube";

const TEMP_RGB = new Uint8Array(3);
const TEMP_CUBE6 = new Uint8Array(3);
const TEMP_CUBE = new Uint8Array(3);

/**
 * Converts a color to the xterm(1) 256 color palette.
 *
 * xterm provides a 6x6x6 color cube (16 - 231) and 24 greys (232 - 255). We
 * map our RGB color to the closest in the cube, also work out the closest
 * grey, and use the nearest of the two based on the lightness of the color.
 *
 * Note that the xterm has much lower resolution for darker colors (they are
 * not evenly spread out), so our 6 levels are not evenly spread: 0x0, 0x5f
 * (95), 0x87 (135), 0xaf (175), 0xd7 (215) and 0xff (255). Greys are more
 * evenly spread (8, 18, 28 ... 238).
 *
 * @param src The color to convert
 * @returns ANSI 256 color index
 */
export function srgbIndexedColor(src: SRGB): IndexedColor {
  const color = int2553(TEMP_RGB, src) as RGB;
  const [r, g, b] = color;
  const cube6 = srgbCube3(TEMP_CUBE6, color) as RGB;
  const [qr, qg, qb] = cube6;
  const cube = cubeSrgb3(TEMP_CUBE, cube6) as RGB;
  const [cr, cg, cb] = cube;

  // Calculate cube index
  const cubeIndex = 16 + (36 * qr + 6 * qg + qb);

  // Check for exact match
  if (cr === r && cg === g && cb === b) {
    return cubeIndex;
  }

  // Average the RGB values to get the grayscale
  const averagedGray = Math.round((r + g + b) / 3);
  // Grayscale index
  let grayIndex: number;
  // Actual gray value
  let actualGray: number;

  if (averagedGray < 8) {
    grayIndex = 232; // First gray
    actualGray = 8;
  } else if (averagedGray > 238) {
    grayIndex = 255; // Last gray (white)
    actualGray = 238;
  } else {
    const grayLevel = Math.round((averagedGray - 8) / 10);
    grayIndex = 232 + grayLevel;
    actualGray = 8 + grayLevel * 10;
  }

  return distEucledian3(color, cube) <=
    distEucledian3(color, [actualGray, actualGray, actualGray])
    ? cubeIndex
    : grayIndex;
}

/**
 * Converts a color to the xterm(1) 16 color palette.
 *
 * Ties to find a match in the 256 xterm(1) color palette, and then map that to
 * the 16-color ANSI palette.
 *
 * @param src The color to convert
 * @returns  ANSI 16 color index
 */
export function srgbBasicColor(src: SRGB): BasicColor {
  return INDEXED_TO_BASIC[srgbIndexedColor(src)];
}

export function srgbBasicColorAlt(src: SRGB): IndexedColor {
  const [r, g, b] = int2553(TEMP_RGB, src) as RGB;
  // We use the extended greyscale palette here, with the exception of
  // black and white. normal palette only has 4 greyscale shades.
  if (r === g && g === b) {
    if (r < 8) {
      return 16;
    }

    if (r > 248) {
      return 231;
    }

    return Math.round(((r - 8) / 247) * 24) + 232;
  }

  return (
    16 +
    36 * Math.round((r / 255) * 5) +
    6 * Math.round((g / 255) * 5) +
    Math.round((b / 255) * 5)
  );
}
