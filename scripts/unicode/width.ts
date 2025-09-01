import path from "path";
import { UnicodeWidthOptions, CharacterWidth, DefaultUnicodeWidthOptions } from "../../src/unicode/types";
import { CodepointMap, derivedEastAsianWidth, derivedGeneralCategory, Generator, parseRange } from "./utils";
import { Lookup } from "./utils";
import { HashMap } from "@thi.ng/associative";
import { memoizeAsync } from "@thi.ng/memoize";

async function getWidthMap() {
    const map: CodepointMap<CharacterWidth> = new Map();

    const eastAsianWidth = await derivedEastAsianWidth();

    for await (const line of eastAsianWidth.split('\n')) {
        if (line.length === 0) continue;

        // @missing ranges
        if (line.startsWith('# @missing: ')) {
            const semiIndex = line.indexOf(';');
            if (semiIndex === -1) continue;

            const field = line.slice(12, semiIndex);
            const dotsIndex = field.indexOf('..');
            if (dotsIndex === -1) continue;

            const from = parseInt(field.slice(0, dotsIndex), 16);
            const to = parseInt(field.slice(dotsIndex + 2), 16);

            if (from === 0 && to === 0x10ffff) continue;

            for (let cp = from; cp <= to; cp++) {
                map.set(cp, CharacterWidth.Double);
            }
            continue;
        }

        if (line[0] === '#') continue;

        const noComment = line.includes('#') ? line.slice(0, line.indexOf('#')) : line;
        const fields = noComment.split(/[; ]+/).filter(f => f.length > 0);

        if (fields.length < 2) continue;

        let currentCode = parseRange(fields[0]);

        const widthField = fields[1];
        if (widthField === 'W' ||
            widthField === 'F' ||
            // (options?.ambigiousAreNarrow && widthField === 'A')) {
            widthField === 'A') {
            for (let cp = currentCode[0]; cp <= currentCode[1]; cp++) {
                map.set(cp, CharacterWidth.Ambiguous);
            }
        }
    }

    // Process DerivedGeneralCategory.txt
    const generalCategory = await derivedGeneralCategory();

    for await (const line of generalCategory.split('\n')) {
        if (line.length === 0 || line[0] === '#') continue;

        const noComment = line.includes('#') ? line.slice(0, line.indexOf('#')) : line;
        const fields = noComment.split(/[; ]+/).filter(f => f.length > 0);

        if (fields.length < 2) continue;

        let currentCode = parseRange(fields[0]);

        // Parse general category
        const categoryField = fields[1];
        if (categoryField === 'Mn' ||  // Nonspacing_Mark
            categoryField === 'Me' ||  // Enclosing_Mark
            categoryField === 'Mc') {  // Spacing_Mark
            for (let cp = currentCode[0]; cp <= currentCode[1]; cp++) {
                map.set(cp, CharacterWidth.Zero);
            }
        } else if (categoryField === 'Cf') {
            if (!line.includes('ARABIC')) {
                // Format except Arabic
                for (let cp = currentCode[0]; cp <= currentCode[1]; cp++) {
                    map.set(cp, CharacterWidth.Zero);
                }
            }
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
                width = options?.ambigiousAreNarrow ? 1 : 2;
            } else if (codePoint === 0x2e3b) {
                // Three-em dash
                // width = 3;
            } else if (codePoint >= 0x00 && codePoint <= 0x20) {
                // C0 control codes
                width = options?.countAnsiEscapeCodes ? 2 : 0;
            } else if (codePoint >= 0x80 && codePoint <= 0x9f) {
                // C1 control codes
                width = options?.countAnsiEscapeCodes ? 2 : 0;
            } else if (
                codePoint === 0x2028 || // Line separator
                codePoint === 0x2029 || // Paragraph separator
                (codePoint >= 0x1160 && codePoint <= 0x11ff) || // Hangul syllable and ignorable
                (codePoint >= 0xd7b0 && codePoint <= 0xd7ff) ||
                (codePoint >= 0x2060 && codePoint <= 0x206f) ||
                (codePoint >= 0xfff0 && codePoint <= 0xfff8) ||
                (codePoint >= 0xe0000 && codePoint <= 0xe0fff)
            ) {
                width = 0;
            } else if (
                codePoint === 0x2e3a || // Two-em dash
                (codePoint >= 0x1f1e6 && codePoint <= 0x1f200) || // Regional indicators
                (codePoint >= 0x3400 && codePoint <= 0x4dbf) || // CJK Unified Ideographs Extension A
                (codePoint >= 0x4e00 && codePoint <= 0x9fff) || // CJK Unified Ideographs
                (codePoint >= 0xf900 && codePoint <= 0xfaff) || // CJK Compatibility Ideographs
                (codePoint >= 0x20000 && codePoint <= 0x2fffd) || // Plane 2
                (codePoint >= 0x30000 && codePoint <= 0x3fffd) // Plane 3
            ) {
                width = 2;
            } else {
                // Default case - will be overridden by specific checks below
                width = 1; // Assuming default width of 1 for most characters
            }

            // ASCII override
            if (codePoint >= 0x20 && codePoint < 0x7f) {
                width = 1;
            }

            // Soft hyphen override
            if (codePoint === 0xad) {
                width = 1;
            }

            // Backspace and delete override
            if (codePoint === 0x8 || codePoint === 0x7f) {
                width = options?.countAnsiEscapeCodes ? -1 : 0;
            }

            return Number(width);
        },
    });
}, new HashMap<UnicodeWidthOptions | undefined, Lookup<number>>([], {
    hash: (options) => ((options?.ambigiousAreNarrow ? 1 : 0) << 2) | (options?.countAnsiEscapeCodes ? 1 : 0),
    equiv: (a, b) => a?.ambigiousAreNarrow === b?.ambigiousAreNarrow && a?.countAnsiEscapeCodes === b?.countAnsiEscapeCodes,
}));
