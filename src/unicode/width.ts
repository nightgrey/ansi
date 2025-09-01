import { graphemes } from "../graphemes";
import { rune, runes } from "../runes";
import { Segmenter } from "../utils/segmenter";
import { isAscii } from "./ascii";
import { lookup } from "./lookup/width";
import { UnicodeWidthOptions } from "./types";


/**
 * Returns the number of terminal cells a Unicode code point occupies when displayed.
 *
 * This function implements the Unicode Standard Annex #11 (East Asian Width) specification
 * to determine how many terminal columns a character will consume when rendered.
 *
 * This treats the text as a sequence of runes (code points).
 *
 * @see https://github.com/mattn/go-runewidth
 * @param rune - The Unicode code point to measure (0x0 to 0x10FFFF)
 * @param options - Configuration options for width calculation
 * @param options.treatAmbigiousAsWide - When true, treats ambiguous-width characters as wide (2 cells).
 *   Useful for East Asian locales where ambiguous characters are typically rendered wide.
 * @param options.treatEmojisAsNeutral - When true, emoji characters are treated as neutral width
 *   instead of wide. Affects emoji rendering in terminal calculations.
 *
 * @returns The number of terminal cells the character occupies:
 *   - `0` for non-printable, combining, or zero-width characters
 *   - `1` for normal-width characters (most ASCII, narrow characters)
 *   - `2` for wide characters (CJK ideographs, full-width characters, most emoji)
 *
 * @example
 * ```typescript
 * // ASCII characters are 1 cell wide
 * runeWidth('A'.codePointAt(0)!); // → 1
 * runeWidth('5'.codePointAt(0)!); // → 1
 *
 * // CJK characters are 2 cells wide
 * runeWidth('中'.codePointAt(0)!); // → 2
 * runeWidth('한'.codePointAt(0)!); // → 2
 * runeWidth('あ'.codePointAt(0)!); // → 2
 *
 * // Emoji are typically 2 cells wide
 * runeWidth('🚀'.codePointAt(0)!); // → 2
 * runeWidth('😀'.codePointAt(0)!); // → 2
 *
 * // Control and combining characters are 0 cells
 * runeWidth('\t'.codePointAt(0)!); // → 0
 * runeWidth('\u0300'.codePointAt(0)!); // → 0 (combining grave accent)
 *
 * // Ambiguous characters depend on eastAsianWidth option
 * const ambiguousChar = '±'.codePointAt(0)!;
 * runeWidth(ambiguousChar); // → 1 (default)
 * runeWidth(ambiguousChar, { eastAsianWidth: true }); // → 2
 *
 * // Full-width variants are always 2 cells
 * runeWidth('Ａ'.codePointAt(0)!); // → 2 (full-width A)
 * runeWidth('１'.codePointAt(0)!); // → 2 (full-width 1)
 * ```
 *
 * @see {@link https://www.unicode.org/reports/tr11/ | Unicode Standard Annex #11}
 * @see {@link stringWidth} for measuring entire strings
 */
export function runeWidth(codePoint: number, options?: UnicodeWidthOptions): number {
    return lookup(codePoint, options) ?? 1;
}

export function stringWidth(string: string, options?: UnicodeWidthOptions): number {
    if (!string) return 0;

    let total = 0;

    // Fast path for ASCII strings
    if (isAscii(string)) {
        for (const rune of rune(string)) {
            total += runeWidth(rune, options);
        }
        return total; // No need for Math.max since ASCII chars have positive width
    }

    const g = graphemes(string);

    // Optimized Unicode handling
    for (let i = 0; i < graphemes.length; i++) {
        const codePoints = runes(g[i]);
        let gcTotal = 0;

        for (let j = 0; j < codePoints.length; j++) {
            const codePoint = codePoints[j];
            let w = runeWidth(codePoint, options);

            if (w !== 0) {
                // Handle emoji variation selectors
                const next = codePoints[j + 1];

                if (next !== undefined) {
                    // Text presentation selector (U+FE0E) - force narrow width
                    if (next === 0xFE0E) {
                        w = 1;
                        j++; // Skip the variation selector
                    }
                    // Emoji presentation selector (U+FE0F) - force wide width
                    else if (next === 0xFE0F) {
                        w = 2;
                        j++; // Skip the variation selector
                    }
                }

                // Only use width of first non-zero-width code point in grapheme
                gcTotal = w;
                break;
            }
        }

        total += gcTotal;
    }

    return total;
}


const now = performance.now();
console.log(stringWidth("👩‍👩‍👧‍👦",))
console.log(performance.now() - now);