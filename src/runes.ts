import {isAmbiguous, isFullWidth, isWide} from "./utils/unicode";


/**
 * Splits a string into runes (Unicode points).
 *
 * @example
 * ```ts
 * import { runes } from './runes';
 *
 * for (const rune of runes("Hello 🌍 世界")) {
 *     console.log(rune);
 * }
 *
 * // ['H', 'e', 'l', 'l', 'o', ' ', '🌍', ' ', '世', '界']
 * ```
 * @param string
 */
export function runes(string: string) {
    return string[Symbol.iterator]();
}

/**
 * Splits a string into an array of grapheme clusters (runes).
 */
export const splitByRunes = (string: string) => {
    const out: string[] = [];

    for (const rune of string) {
        out.push(rune);
    }

    return out;
};

export { maxGraphemeWidth as maxRuneWidth } from "./graphemes";

/**
 * Returns the first grapheme cluster (rune) from a string, or empty string if none.
 */
export function firstRune(string: string): string {
  return runes(string).next().value ?? "";
}

const CONTROL_CHARS_REGEX = /^[\x00-\x1F\x7F-\x9F]$/;
const IGNORABLE_REGEX = /^\p{Default_Ignorable_Code_Point}$/u;
const EMOJI_REGEX = /\p{RGI_Emoji}/v;


/**
 * Returns the width of a Unicode code point in cells. This is the number of
 * cells that the string will occupy when printed in a terminal. ANSI escape
 * codes are ignored and wide characters (such as East Asians and emojis) are
 * accounted for.
 */
export function runeWidth(character: string) {
    const codePoint = character.codePointAt(0);
    if (!codePoint) return 0

    // Fast path: ASCII printable characters (most common case)
    if (codePoint >= 0x20 && codePoint <= 0x7E) {
        return 1
    }

    // Control characters
    if (CONTROL_CHARS_REGEX.test(character)) {
        return 0
    }

    // Surrogate pairs (invalid in this context)
    if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
        return 0
    }

    // Zero-width and COMBINING characters (combined check)
    if ((
        (codePoint >= 0x0300 && codePoint <= 0x036F) ||
        (codePoint >= 0x1AB0 && codePoint <= 0x1AFF) ||
        (codePoint >= 0x1DC0 && codePoint <= 0x1DFF) ||
        (codePoint >= 0x20D0 && codePoint <= 0x20FF) ||
        (codePoint >= 0xFE20 && codePoint <= 0xFE2F) ||
        (codePoint >= 0xFE00 && codePoint <= 0xFE0F) ||
        (codePoint >= 0x200B && codePoint <= 0x200F) ||
        codePoint === 0xFEFF
    )) {
        return 0
    }

    // Default ignorable code points (covers many edge cases)
    if (IGNORABLE_REGEX.test(character)) {
        return 0
    }

    // Emoji check (wide characters)
    if (EMOJI_REGEX.test(character)) {
        return 2
    }

    // East Asian width check
    if (isFullWidth(codePoint) || isWide(codePoint)) {
        return 2
    }

    if (isAmbiguous(codePoint)) {
        return 1
    }

    // Default case
    return 1;
}
