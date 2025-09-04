import { HashMap } from "@thi.ng/associative";
import { memoize } from "@thi.ng/memoize";
import { UnicodeWidthOptions, stringWidth as unicodeStringWidth } from "./unicode";
import { strip } from "./strip";

export type WidthOptions = UnicodeWidthOptions & {
    /**
     * If `true`, count ANSI escape codes as part of the string width.
     * If `false`, ANSI escape codes are ignored when calculating the string width.
     * @default false
     */
    countAnsiEscapeCodes?: boolean;
}

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
export const stringWidth = typeof Bun !== 'undefined' ? Bun.stringWidth : (string: string, options?: WidthOptions) => {
    return unicodeStringWidth((options?.countAnsiEscapeCodes ?? true) ? strip(string) : string, options);
}



export { runeWidth } from "./unicode";

