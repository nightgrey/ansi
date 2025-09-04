/**
 * Unicode Grapheme Cluster Break Property classes
 * Based on Unicode Standard Annex #29 (UAX #29)
 * @see https://unicode.org/reports/tr29/#Grapheme_Cluster_Break_Property_Values
 */
export enum BoundaryClass {
    /** Invalid or unassigned code point */
    Invalid = 0,
    /** Control characters (CR, LF, etc.) */
    Control = 1,
    /** Extend characters (combining marks, etc.) */
    Extend = 2,
    /** Prepend characters */
    Prepend = 3,
    /** Regional Indicator symbols */
    RegionalIndicator = 4,
    /** Spacing combining marks */
    SpacingMark = 5,
    /** Hangul syllable type L (Leading Jamo) */
    L = 6,
    /** Hangul syllable type V (Vowel Jamo) */
    V = 7,
    /** Hangul syllable type T (Trailing Jamo) */
    T = 8,
    /** Hangul syllable type LV (LV Syllable) */
    LV = 9,
    /** Hangul syllable type LVT (LVT Syllable) */
    LVT = 10,
    /** Zero Width Joiner */
    ZWJ = 11,
    /** Extended Pictographic (emojis, etc.) */
    ExtendedPictographic = 12,
}

/**
 * Character width for terminal/display purposes
 */
export enum CharacterWidth {
    /** Zero-width characters (combining marks, control chars, etc.) */
    Zero = 0,
    /** Normal width characters */
    Single = 1,
    /** Double-width characters (CJK ideographs, etc.) */
    Double = 2,
    /** Ambiguous width (depends on context/locale) */
    Ambiguous = "?",
}

/**
 * Unicode General Category (major classes)
 * @see https://unicode.org/reports/tr44/#General_Category_Values
 */
export enum GeneralCategory {
    Cc, // Other, Control
    Cf, // Other, Format
    Cn, // Other, Unassigned
    Co, // Other, Private Use
    Cs, // Other, Surrogate
    Ll, // Letter, Lowercase
    Lm, // Letter, Modifier
    Lo, // Letter, Other
    Lu, // Letter, Uppercase
    Lt, // Letter, Titlecase
    Mc, // Mark, Spacing Combining
    Me, // Mark, Enclosing
    Mn, // Mark, Non-Spacing
    Nd, // Number, Decimal Digit
    Nl, // Number, Letter
    No, // Number, Other
    Pc, // Punctuation, Connector
    Pd, // Punctuation, Dash
    Pe, // Punctuation, Close
    Pf, // Punctuation, Final quote (may behave like Ps or Pe depending on usage)
    Pi, // Punctuation, Initial quote (may behave like Ps or Pe depending on usage)
    Po, // Punctuation, Other
    Ps, // Punctuation, Open
    Sc, // Symbol, Currency
    Sk, // Symbol, Modifier
    Sm, // Symbol, Math
    So, // Symbol, Other
    Zl, // Separator, Line
    Zp, // Separator, Paragraph
    Zs, // Separator, Space
};


// /**
//  * Comprehensive Unicode character properties
//  */
// export interface UnicodeProperties {
//     /** Display width (0, 1, 2, or -1 for ambiguous) */
//     readonly width: CharacterWidth;

//     // /** Unicode General Category */
//     readonly category: GeneralCategory;

//     /** Grapheme cluster boundary classification */
//     readonly boundaryClass: BoundaryClass;

//     /** Whether the character is an emoji */
//     readonly isEmoji: boolean;

//     /** Whether the character is uppercase */
//     readonly isUppercase: boolean;

//     /** Whether the character is lowercase */
//     readonly isLowercase: boolean;

//     /** Whether the character is a letter */
//     readonly isLetter: boolean;

//     /** Whether the character is a digit */
//     readonly isDigit: boolean;

//     /** Whether the character is whitespace */
//     readonly isWhitespace: boolean;

//     /** Whether the character is a control character */
//     readonly isControl: boolean;

//     /** Whether the character is printable */
//     readonly isPrintable: boolean;

//     /** Numeric value if the character represents a number, undefined otherwise */
//     readonly numericValue?: number;

//     /** Unicode code point */
//     readonly codePoint: number;

//     /** Unicode block name */
//     readonly block?: string;

//     /** Unicode script (Latin, Cyrillic, Han, etc.) */
//     readonly script?: string;
// }


/**
 * Options for calculating character widths
 */
export type UnicodeWidthOptions = Partial<{
    /**
     * When true, treats ambiguous-width characters as narrow (1 cells) instead of wide (2 cells).
     * @default false
     */
    ambiguousIsNarrow: boolean;
}>;

export const DefaultUnicodeWidthOptions = Object.freeze({
    ambiguousIsNarrow: false,
} as Required<UnicodeWidthOptions>)


/// Indic syllable type.
export enum Indic {
    None = "none",
    Consonant = "Consonant",
    Extend = "Extend",
    Linker = "Linker",
}

/// Grapheme break property.
export enum GraphemeBreakProperty {
    None = "none",
    Control = "Control",
    CR = "CR",
    Extend = "Extend",
    L = "L",
    LF = "LF",
    LV = "LV",
    LVT = "LVT",
    Prepend = "Prepend",
    Regional_Indicator = "Regional_Indicator",
    SpacingMark = "SpacingMark",
    T = "T",
    V = "V",
    ZWJ = "ZWJ",
}
