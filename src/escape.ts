import * as thing from "@thi.ng/strings/escape";

/**
 * Replaces `\uxxxx` UTF-16 escapes, full `\Uxxxxxxxx` UTF-32 codepoint escapes
 * and other well-known backslash escape sequences with the characters they represent.
 *
 * @remarks
 * Any unknown named escape sequences (e.g. `\1`) will remain as is.
 *
 * @see https://en.wikipedia.org/wiki/UTF-16#Code_points_from_U+010000_to_U+10FFFF
 * @see https://www.unicode.org/charts/
 * @see https://www.branah.com/unicode-converter
 *
 * @example
 * ```ts tangle:../export/unescape.ts
 * import { unescape } from "@thi.ng/strings";
 *
 * console.log(
 *   unescape("\\ud83d\\ude0e \\U0001f60e")
 * );
 * // '😎 😎'
 * ```
 *
 * @param src -
 */
export const unescape = thing.unescape;

/**
 * Escapes all non-ASCII characters (and well-known 0x0x control chars) using
 * backslash escape sequences.
 *
 * @remarks
 *
 * - Well-known low-ASCII control chars will be escaped using backslash, e.g.
 *   0x0a => `\n`
 * - Non-BMP chars will be escaped using `\Uxxxxxxxx`
 * - Chars outside 0x20 - 0x7e range will be escaped using `\uxxxxx`
 *
 * Also see {@link unescape}.
 *
 * @param src -
 */
export const escape = thing.escape;
