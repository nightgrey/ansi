import { graphemes } from "./graphemes";
import { tokenizer } from "./parser";
import {
  runeWidth,
  type WidthOptions as UnicodeWidthOptions,
} from "./unicode-width";

export type WidthOptions = UnicodeWidthOptions;

/**
 * Returns the width of a string in cells. This is the number of
 * cells that the string will occupy when printed in a terminal. ANSI escape
 * codes are ignored and wide characters (such as east asian characters & emojis) are
 * accounted for.
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
export function stringWidth(string: string, options?: WidthOptions) {
  let width = 0;

  for (const token of tokenizer(string)) {
    if (token.type !== "TEXT") continue;

    for (const grapheme of graphemes(token.raw)) {
      width += runeWidth(grapheme.codePointAt(0), options);
    }
  }

  return width;
}
