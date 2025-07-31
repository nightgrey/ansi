import {Segmenter} from "./utils/segmenter";
import {runeWidth} from "./runes";

const SEGMENTER = new Segmenter();

/**
 * Splits a string into grapheme clusters
 *
 * @example
 * ```ts
 * import { graphemes } from './graphemes';
 *
 * for (const grapheme of graphemes('👋 Hello World')) {
 *     console.log(grapheme);
 * }
 *
 * // Output:
 * // 👋
 * // Hello
 * // World
 * ```
 * @param string
 */
export function* graphemes(string: string) {
  for (const { segment } of SEGMENTER.segment(string)) {
    yield segment;
  }

  return;
}


/**
 * Splits a string into an array of grapheme clusters
 */
export const splitByGraphemes = (string: string) => {
    const out: string[] = [];

    for (const { segment } of SEGMENTER.segment(string)) {
        out.push(segment);
    }

    return out;
};

/**
 * Returns the maximum display width of any grapheme cluster in the string.
 */
export function maxGraphemeWidth(string: string): number {
  let maxWidth = 0;

  for (const grapheme of graphemes(string)) {
    const w = runeWidth(grapheme);
    if (w > maxWidth) {
      maxWidth = w;
    }
  }

  return maxWidth;
}


export function firstGrapheme(string: string) {
    return SEGMENTER.segment(string).next().value?.segment ?? "";
}
