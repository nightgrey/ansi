/**
 * TypeScript implementation of mattn/go-runewidth
 * @see https://github.com/mattn/go-runewidth
 */

import { HashMap } from "@thi.ng/associative";
import { runes } from "../runes";
import {
  ambiguous,
  combining,
  doublewidth,
  emoji,
  isInUnicodeTable,
  isInUnicodeTables,
  narrow,
  type UnicodeTable,
} from "./tables";

class LUT extends Uint8Array {
  readonly options: WidthOptions;
  #bytes = 0;

  get bytes() {
    return this.#bytes;
  }

  constructor(options: WidthOptions = DEFAULTS) {
    super(0x110000 / 2);
    this.options = options;
    LUT.set(options, this);

    for (let i = 0; i < this.length; i++) {
      const i32 = i * 2;
      const x0 = runeWidth(i32, options);
      const x1 = runeWidth(i32 + 1, options);

      // Pack two 4-bit values into one byte
      // x0 in lower 4 bits, x1 in upper 4 bits
      this[i] = (x0 & 0xff) | ((x1 & 0xff) << 4);
    }

    // We can only set this afterwards, because otherwise the `runeWidth` calls inside the loop will return 0.
    this.#bytes = this.length;
  }

  /** Hash map for LUTs */
  private static cache = new HashMap<WidthOptions, LUT>([], {
    hash: (options) =>
      ((options.treatAmbigiousAsWide ?? DEFAULTS.treatAmbigiousAsWide)
        ? 1
        : 0) |
      (((options.treatEmojisAsNeutral ?? DEFAULTS.treatEmojisAsNeutral)
        ? 1
        : 0) <<
        1),
    cap: 4,
  });

  /**
   * Create (or get a cached) Lut instance from the given options.
   * @param options - The options to create the Lut instance from.
   */
  static fromOptions(options: WidthOptions) {
    if (LUT.has(options)) return LUT.get(options)!;
    return new LUT(options);
  }

  private static has(options: WidthOptions) {
    return LUT.cache.has(options);
  }

  private static get(options: WidthOptions) {
    return LUT.cache.get(options);
  }

  private static set(options: WidthOptions, lut: LUT) {
    LUT.cache.set(options, lut);
    return lut;
  }
}
// Private use area characters
const privateUseArea: UnicodeTable = [
  [0x00e000, 0x00f8ff],
  [0x0f0000, 0x0ffffd],
  [0x100000, 0x10fffd],
];

// Non-printable characters
const nonPrintable: UnicodeTable = [
  [0x0000, 0x001f],
  [0x007f, 0x009f],
  [0x00ad, 0x00ad],
  [0x070f, 0x070f],
  [0x180b, 0x180e],
  [0x200b, 0x200f],
  [0x2028, 0x202e],
  [0x206a, 0x206f],
  [0xd800, 0xdfff],
  [0xfeff, 0xfeff],
  [0xfff9, 0xfffb],
  [0xfffe, 0xffff],
];

export interface WidthOptions {
  /**
   * When true, treats ambiguous-width characters as wide (2 cells).
   * Useful for East Asian locales where ambiguous characters are typically rendered wide.
   * @default false
   */
  treatAmbigiousAsWide?: boolean;

  /**
   * When true, emoji characters are treated as neutral width instead of wide.
   * Affects emoji rendering in terminal calculations.
   * @default false
   */
  treatEmojisAsNeutral?: boolean;
}

export const DEFAULTS: WidthOptions = {
  /**
   * When true, treats ambiguous-width characters as wide (2 cells).
   * Useful for East Asian locales where ambiguous characters are typically rendered wide.
   * @default false
   */
  treatAmbigiousAsWide: false,

  /**
   * When true, emoji characters are treated as neutral width instead of wide.
   * Affects emoji rendering in terminal calculations.
   * @default false
   */
  treatEmojisAsNeutral: false,
};

/**
 * Returns the number of terminal cells a Unicode code point occupies when displayed.
 *
 * This function implements the Unicode Standard Annex #11 (East Asian Width) specification
 * to determine how many terminal columns a character will consume when rendered.
 *
 * This treats the text as a sequence of wide characters and runes.
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
export function runeWidth(rune = 0, options?: WidthOptions): number {
  if (rune < 0 || rune > 0x10ffff) {
    return 0;
  }

  const OPTIONS = { ...DEFAULTS, ...options };
  const lut = LUT.fromOptions(OPTIONS);

  if (lut.bytes > 0) {
    return (lut[rune >> 1] >> ((rune & 1) * 4)) & 3;
  }

  // Optimized version
  if (!OPTIONS.treatAmbigiousAsWide) {
    switch (true) {
      case rune < 0x20:
        return 0;
      case (rune >= 0x7f && rune <= 0x9f) || rune === 0xad: // nonprint
        return 0;
      case rune < 0x300:
        return 1;
      case isInUnicodeTable(rune, narrow):
        return 1;
      case isInUnicodeTables(rune, nonPrintable, combining):
        return 0;
      case isInUnicodeTable(rune, doublewidth):
        return 2;
      default:
        return 1;
    }
  } else {
    switch (true) {
      case isInUnicodeTables(rune, nonPrintable, combining):
        return 0;
      case isInUnicodeTable(rune, narrow):
        return 1;
      case isInUnicodeTables(rune, ambiguous, doublewidth):
        return 2;
      case !options?.treatEmojisAsNeutral &&
        isInUnicodeTables(rune, ambiguous, emoji, narrow):
        return 2;
      default:
        return 1;
    }
  }
}

/**
 * Calculates the total display width of a string in terminal cells.
 *
 * This function iterates through each Unicode code point in the string and sums
 * their individual widths using the `runeWidth` function.
 *
 * This treats the text as a sequence of unicode code points.
 *
 * @param string - The string to measure
 * @param options - Configuration options passed to `runeWidth` for each character
 * @param options.treatAmbigiousAsWide - When true, treats ambiguous-width characters as wide.
 *   Important for applications targeting East Asian users.
 * @param options.treatEmojisAsNeutral - When true, emoji are treated as neutral width
 *   instead of wide.
 *
 * @returns The total number of terminal cells the string will occupy when displayed
 *
 * @example
 * ```typescript
 * // Simple ASCII strings
 * stringWidth("Hello"); // → 5
 * stringWidth("123"); // → 3
 *
 * // Mixed content with wide characters
 * stringWidth("Hello 世界"); // → 9 (5 + 1 + 2 + 2)
 * stringWidth("café"); // → 4
 *
 * // Strings with emoji
 * stringWidth("Hello 🌍!"); // → 9 (5 + 1 + 2 + 1)
 * stringWidth("🚀🌟✨"); // → 6 (2 + 2 + 2)
 *
 * // Strings with combining characters
 * stringWidth("é"); // → 1 (e + combining acute accent)
 * stringWidth("a\u0300"); // → 1 (a + combining grave accent)
 *
 * // Control characters are ignored
 * stringWidth("Hello\tWorld"); // → 10 (tab is 0 width)
 * stringWidth("Line1\nLine2"); // → 10 (newline is 0 width)
 *
 * // East Asian width handling
 * const ambiguousString = "±×÷";
 * stringWidth(ambiguousString); // → 3 (default: narrow)
 * stringWidth(ambiguousString, { eastAsianWidth: true }); // → 6 (wide)
 *
 * // Practical terminal layout example
 * function padRight(text: string, width: number): string {
 *   const textWidth = stringWidth(text);
 *   const padding = Math.max(0, width - textWidth);
 *   return text + ' '.repeat(padding);
 * }
 *
 * console.log(padRight("Name", 10) + "|");     // "Name      |"
 * console.log(padRight("名前", 10) + "|");     // "名前      |" (CJK chars are 2 cells each)
 * console.log(padRight("🚀 App", 10) + "|");  // "🚀 App    |" (emoji is 2 cells)
 * ```
 *
 * @see {@link runeWidth} for measuring individual characters
 * @see {@link https://www.unicode.org/reports/tr11/ | Unicode Standard Annex #11}
 */
export function stringWidth(
  string: string,
  options: WidthOptions = DEFAULTS,
): number {
  let width = 0;

  for (const r of runes(string)) {
    width += runeWidth(r.codePointAt(0) || 0, options);
  }

  return width;
}
