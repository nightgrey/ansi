import { strip } from "./strip";
import { graphemes } from "./graphemes";
import { runeWidth } from "./runes";
export type { Options } from "string-width";

/**
 * Returns the width of a string in cells. This is the number of
 * cells that the string will occupy when printed in a terminal. ANSI escape
 * codes are ignored and wide characters (such as East Asians and emojis) are
 * accounted for.
 *
 * This treats the text as a sequence of grapheme clusters.
 *
 * @example
 * ```
 * import { stringWidth } from './width';
 *
 * width('a');
 * //=> 1
 *
 * width('古');
 * //=> 2
 *
 * width('\u001B[1m古\u001B[22m');
 * //=> 2
 * ```
 */
export function stringWidth(string: string) {
  let width = 0;

  for (const character of graphemes(strip(string))) {
    width += runeWidth(character);
  }

  return width;
}
