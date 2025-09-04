import { graphemes } from "../graphemes";
import { rune, runes } from "../runes";
import { Segmenter } from "../utils/segmenter";
import { isAsciiOnly } from "./ascii";
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
 * @param rune - The Unicode code point to measure (0x0 to 0x10FFFF)
 * @param options - Configuration options for width calculation
 * @see {@link https://www.unicode.org/reports/tr11/ | Unicode Standard Annex #11}
 * @see {@link stringWidth} for measuring entire strings
 */
export function runeWidth(codePoint: number, options?: UnicodeWidthOptions): number {
    return lookup(codePoint, options) ?? 1;
}

export function stringWidth(string: string, options?: UnicodeWidthOptions): number {
    if (!string) return 0;

    let width = 0;

    if (isAsciiOnly(string)) {
        for (const r of runes(string)) {
            width += runeWidth(r, options);
        }

        return width;
    }

    const g = graphemes(string);

    for (let i = 0; i < g.length; i++) {
        const codePoints = runes(g[i]);

        let graphemeClusterWidth = 0;

        for (let j = 0; j < codePoints.length; j++) {
            const codePoint = codePoints[j];

            let codePointWidth = runeWidth(codePoint, options);
            if (codePointWidth !== 0) {
                const next = codePoints[j + 1];

                if (next !== undefined) {
                    // Text presentation selector (U+FE0E) - force narrow width
                    if (next === 0xFE0E) {
                        codePointWidth = 1;
                        j++; // Skip the variation selector
                    }
                    // Emoji presentation selector (U+FE0F) - force wide width
                    else if (next === 0xFE0F) {
                        codePointWidth = 2;
                        j++; // Skip the variation selector
                    }
                }

                // Only use width of first non-zero-width code point in grapheme
                graphemeClusterWidth = codePointWidth;
                break;
            }
        }

        width += graphemeClusterWidth;
    }

    return width;
}
