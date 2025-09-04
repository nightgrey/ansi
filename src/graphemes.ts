import { memoize1 } from "@thi.ng/memoize";
import { runeWidth } from "./unicode";
import { Segmenter } from "./utils/segmenter";

export type GraphemeCluster = {
  grapheme: string;
  rest: string;
  width: number;
};

/**
 * Splits a string into grapheme clusters
 *
 * @example
 * ```ts
 * import { graphemes } from './graphemes';
 *
 * for (const g of grapheme('👋 Hello World')) {
 *     console.log(g);
 * }
 *
 * // Output:
 * // 👋
 * // Hello
 * // World
 * ```
 * @param string
 */
export const grapheme = (string: string) => Segmenter.shared.grapheme(string);
export const graphemeCluster = (string: string) => Segmenter.shared.graphemeCluster(string);

/**
 * Splits a string into an array of grapheme clusters
 */
export const graphemes = memoize1((string: string) => Segmenter.shared.graphemes(string));

/**
 * Returns the maximum display width of any graphemes in the string.
 */
export function maxGraphemeWidth(string: string): number {
  let maxWidth = 0;

  for (const g of graphemes(string)) {
    const w = runeWidth(g.codePointAt(0) ?? 0);
    if (w > maxWidth) {
      maxWidth = w;
    }
  }

  return maxWidth;
}

export function firstGrapheme(string: string) {
  return Segmenter.shared.grapheme(string).next().value ?? "";
}

const DEFAULT_GRAPHEME_CLUSTER: GraphemeCluster = {
  grapheme: "",
  get rest() {
    return "";
  },
  get width() {
    return 0;
  },
};

export function firstGraphemeCluster(string: string) {
  return graphemeCluster(string).next().value ?? DEFAULT_GRAPHEME_CLUSTER;
}
