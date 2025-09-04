import { range, emojiData, split, lines, emojiZwjSequences, emojiSequences } from "./utils";
import { Generator, Lookup } from "./utils";

export async function getEmojiSet() {
    const emoji = new Set<number>();
    const presentation = new Set<number>();
    const modifier = new Set<number>();
    const modifierBase = new Set<number>();
    const extendedPictographic = new Set<number>();
    const component = new Set<number>();

    // Process Emoji
    const data = await emojiData();

    for (const line of lines(data)) {
        const f = split(line);
        if (!f) continue;

        const [codes, prop] = f;
        const [start, end] = range(codes);

        for (let cp = start; cp <= end; cp++) {
            if (prop === "Emoji") emoji.add(cp);
            else if (prop === "Emoji_Component") component.add(cp);
            else if (prop === "Emoji_Presentation") presentation.add(cp);
            else if (prop === "Emoji_Modifier") modifier.add(cp);
            else if (prop === "Emoji_Modifier_Base") modifierBase.add(cp);
            else if (prop === "Extended_Pictographic") extendedPictographic.add(cp);
        }
    }

    return Object.defineProperties(emoji, {
        presentation: { value: presentation },
        modifier: { value: modifier },
        modifierBase: { value: modifierBase },
        extendedPictographic: { value: extendedPictographic },
        component: { value: component },
    }) as Set<number> & {
        component: Set<number>;
        presentation: Set<number>;
        modifier: Set<number>;
        modifierBase: Set<number>;
        extendedPictographic: Set<number>;
    };
}

export const emojiSet = await getEmojiSet();

export const EmojiLookup = await Lookup.from<boolean>({
    value(codePoint) {
        return emojiSet.has(codePoint);
    }
});

export const EmojiPresentationLookup = await Lookup.from<boolean>({
    value(codePoint) {
        return emojiSet.presentation.has(codePoint);
    }
});

export const EmojiModifierLookup = await Lookup.from<boolean>({
    value(codePoint) {
        return emojiSet.modifier.has(codePoint);
    }
});

export const EmojiModifierBaseLookup = await Lookup.from<boolean>({
    value(codePoint) {
        return emojiSet.modifierBase.has(codePoint);
    }
});

export const EmojiExtendedPictographicLookup = await Lookup.from<boolean>({
    value(codePoint) {
        return emojiSet.extendedPictographic.has(codePoint);
    }
});

export async function getEmojiZwjSequencesMap() {
    const data = await emojiZwjSequences();
    const set = new Set<number[]>();
    for (const line of lines(data)) {

        const f = split(line);
        if (f.length < 1) continue;
        const seq = f[0].split(/[ ]+/).filter(Boolean).map(x => parseInt(x, 16));
        if (seq.length > 0) {
            // set.add(seq.map(c => c.toString(16)).join("+"));
            set.add(seq)
        }
    }
    return set;
}

export async function getEmojiSequencesMap() {
    const data = await emojiSequences();
    const set = new Set<number[]>();
    for (const line of lines(data)) {

        const f = split(line);
        if (f.length < 1) continue;

        // sequences file uses ranges and sequences:
        // - Ranges: "1F1E6..1F1FF ; Regional_Indicator"
        // - Sequences: "0023 FE0F 20E3 ; keycap"
        const lhs = f[0];
        if (lhs.includes("..")) {
            // Range entries: we cannot enumerate all flags as pairs here; these aren't sequences themselves
            // We'll skip adding range-only entries as sequence keys. Flags will be captured by grapheme RGI ZWJ? Not necessary here.
            continue;
        } else {
            const seq = lhs.split(/[ ]+/).filter(Boolean).map(x => parseInt(x, 16));
            if (seq.length > 0) {
                // set.add(seq.map(c => c.toString(16)).join("+"));
                set.add(seq);
            }
        }
    }
    return set;
}

export const emojZwjSequencesSet = await getEmojiZwjSequencesMap();
export const emojiSequencesSet = await getEmojiSequencesMap();
