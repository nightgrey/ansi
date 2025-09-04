import { UnicodeWidthOptions, CharacterWidth, DefaultUnicodeWidthOptions } from "../../src/unicode/types";
import { CodepointMap, derivedCoreProperties, derivedEastAsianWidth, derivedGeneralCategory, emojiData as getEmojiData, Generator, range, split, lines, parse, emojiData } from "./utils";
import { Lookup } from "./utils";
import { HashMap } from "@thi.ng/associative";
import { memoizeAsync } from "@thi.ng/memoize";
import { emojiSet} from "./emoji";

async function getWidthMap() {
    const map: CodepointMap<CharacterWidth> = new Map();

    const eastAsianWidth = await derivedEastAsianWidth();
    const generalCategory = await derivedGeneralCategory();
    const coreProperties = await derivedCoreProperties();
    const emojiData = await getEmojiData();
    const emoji =  emojiSet

    // East Asian Width: A
    for (const [[start, end], prop] of parse(eastAsianWidth)) {
        if (prop === "A") {
            for (let cp = start; cp <= end; cp++) map.set(cp, CharacterWidth.Ambiguous);
        }
    }

    // Full-width ranges
    for (const [start, end] of [
        [0x3400, 0x4dbf],    // CJK Unified Ideographs Extension A
        [0x4e00, 0x9fff],    // CJK Unified Ideographs
        [0xf900, 0xfaff],    // CJK Compatibility Ideographs
        [0x20000, 0x2fffd],  // Plane 2
        [0x30000, 0x3fffd],  // Plane 3
    ]) {
        for (let cp = start; cp <= end; cp++) map.set(cp, CharacterWidth.Double);
    }

    // East Asian Width: F, W
    for (const [[start, end], prop] of parse(eastAsianWidth)) {
        if (prop === "F" || prop === "W") {
            // console.log(start.toString(16), end.toString(16), prop);
            for (let cp = start; cp <= end; cp++) map.set(cp, CharacterWidth.Double);
        }
    }

     // HANGUL JUNGSEONG ranges (width 0)
    for (let cp = 0x1160; cp <= 0x11ff; cp++) map.set(cp, 0);
    for (let cp = 0xd7b0; cp <= 0xd7ff; cp++) map.set(cp, 0);

    // Default_Ignorable_Code_Point
    for (const [[start, end], property] of parse(coreProperties)) {
        if (property === "Default_Ignorable_Code_Point") {
            for (let cp = start; cp <= end; cp++) map.set(cp, 0);
        }
    }

    // General Categories: Mn, Me, Zl, Zp, Cf (non-arabic)
    for (const line of parse(generalCategory)) {
        const [[start, end], cat] = line;
       if (cat === "Mn" || cat === "Me" || cat === "Mc" || cat === "Zl" || cat === "Zp") {
            for (let cp = start; cp <= end; cp++) map.set(cp, 0);
        } else if (cat === "Cf") {
            // ... exclude ARABIC characters
            if (!line.join(";").includes("ARABIC")) {
                for (let cp = start; cp <= end; cp++) map.set(cp, 0);
            }
        }
    }

    // Emoji
    for (const [[start, end]] of parse(emojiData)) {
        for (let cp = start; cp <= end; cp++) {
            if (emoji.component.has(cp)) map.set(cp, CharacterWidth.Zero);
            if (emoji.modifier.has(cp)) map.set(cp, CharacterWidth.Zero);
            if (emoji.has(cp)) map.set(cp, CharacterWidth.Single);
            if (emoji.presentation.has(cp)) map.set(cp, CharacterWidth.Double);
            if (emoji.extendedPictographic.has(cp)) map.set(cp, CharacterWidth.Double);
            if (emoji.modifierBase.has(cp)) map.set(cp, CharacterWidth.Double);
        }
    }

    return map;
}

const widths = await getWidthMap();

export const WidthLookup = memoizeAsync(async (options?: UnicodeWidthOptions) => {
    return await Lookup.from<number>({
        value(codePoint) {
            let width = widths.get(codePoint);

            if (width === CharacterWidth.Ambiguous) {
                width = (options?.ambiguousIsNarrow ?? false) ? 1 : 2;
            } else if (codePoint === 0x2e3b) {
                // Three-em dash
                width = 3;
            } else if (codePoint === 0x2e3a) {
                // Two-em dash
                width = 2
            } else if (codePoint === 0xad) {
                // Soft hyphen
                width = 1
            } else if (codePoint >= 0x00 && codePoint <= 0x20) {
                // Zero-width C0 controls
                if ((codePoint === 0x00 || codePoint === 0x05 || codePoint === 0x07 || codePoint === 0x0a ||
                    codePoint === 0x0b || codePoint === 0x0c || codePoint === 0x0d || codePoint === 0x0e || codePoint === 0x0f)) {
                    width = 0
                } else if (codePoint === 0x08) {
                    width = -1
                } else  {
                    // Other C0 controls
                    width = options?.countAnsiEscapeCodes ? 2 : 0;
                }
            } else if (codePoint >= 0x80 && codePoint <= 0x9f) {
                // C1 control codes
                width = options?.countAnsiEscapeCodes ? 2 : 0;
            } else if (codePoint >= 0x20 && codePoint < 0x7f) {
                // ASCII override

                width = 1;
            }

            return Number(width);
        },
    });
}, new HashMap<UnicodeWidthOptions | undefined, Lookup<number>>([], {
    hash: (options) => ((options?.ambiguousIsNarrow ? 1 : 0) << 2) | (options?.countAnsiEscapeCodes ? 1 : 0),
    equiv: (a, b) => a?.ambiguousIsNarrow === b?.ambiguousIsNarrow && a?.countAnsiEscapeCodes === b?.countAnsiEscapeCodes,
}));

// Testing
// import { isAsciiOnly } from "../../src/unicode";
// import { runes, graphemes } from "../../src";
// const lookup = await WidthLookup();
//
// export function runeWidth(codePoint: number): number {
//     return lookup.get(codePoint) ?? 1;
// }
//
// export function stringWidth(string: string, options?: UnicodeWidthOptions): number {
//     if (!string) return 0;

//     let width = 0;

//     if (isAsciiOnly(string)) {
//         const codePoints = runes(string);

//         for (let i = 0; i < codePoints.length; i++) {
//             width += runeWidth(codePoints[i]);
//         }

//         return width;
//     }

//     const g = graphemes(string);

//     for (let i = 0; i < g.length; i++) {
//         const codePoints = runes(g[i]);
//         let graphemeClusterWidth = 0;

//         for (let j = 0; j < codePoints.length; j++) {
//             const codePoint = codePoints[j];
//             let codePointWidth = runeWidth(codePoint);
//             if (codePointWidth !== 0) {
//                 const next = codePoints[j + 1];

//                 if (next !== undefined) {
//                     // Text presentation selector (U+FE0E) - force narrow width
//                     if (next === 0xFE0E) {
//                         codePointWidth = 1;
//                         j++; // Skip the variation selector
//                     }
//                     // Emoji presentation selector (U+FE0F) - force wide width
//                     else if (next === 0xFE0F) {
//                         codePointWidth = 2;
//                         j++; // Skip the variation selector
//                     }
//                 }

//                 // Only use width of first non-zero-width code point in grapheme
//                 graphemeClusterWidth = codePointWidth;
//                 break;
//             }
//         }

//         width += graphemeClusterWidth;
//     }

//     return width;
// }
