import _stringLength from "string-length";
import _wcwidth from "wcwidth";

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
 * import { width } from './width';
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
 *
 * @TODO Incorporate parser?
 */
export function stringWidth(string: string) {
	return _stringLength(string, { countAnsiEscapeCodes: false });
}

/**
 * Returns the width of a string in cells. This is the number of
 * cells that the string will occupy when printed in a terminal. ANSI escape
 * codes are ignored and wide characters (such as East Asians and emojis) are
 * accounted for.
 *
 * This treats the text as a sequence of wide characters and runes.
 *
 *  * @example
 * ```
 * import { width } from './width';
 *
 * width('a');
 * //=> 1
 *
 * width('古');
 * //=> 2
 *
 * width('\u001B[1m古\u001B[22m');
 * //=> 9
 * ```
 *
 * @see http://www.unicode.org/reports/tr11/
 *
 * @TODO Incorporate parser?
 */
export const stringWidthWc = _wcwidth as (string: string) => number;
