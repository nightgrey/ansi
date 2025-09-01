import { emojiData } from "./utils";
import { Generator, Lookup } from "./utils";
import { parseRange } from "./utils";

async function getEmojiMap() {
    const set = new Set<number>();

    // Process Emoji
    const data = await emojiData();

    for await (const line of data.split('\n')) {
        if (line.length === 0 || line[0] === '#') continue;
        if (!line.includes('Extended_Pictographic')) continue;

        const commentIndex = line.indexOf('#');
        const noComment = commentIndex !== -1 ? line.slice(0, commentIndex) : line;

        const fields = noComment.split(/[;\s]+/).filter(f => f.length > 0);

        if (fields.length >= 1) {
            const [from, to] = parseRange(fields[0]);

            for (let cp = from; cp <= to; cp++) {
                set.add(cp);
            }
        }
    }

    return set;
}
const emoji = await getEmojiMap();

export const EmojiLookup = await Lookup.from(new Generator({
    get(codePoint: number): boolean {
        return emoji.has(codePoint);
    }
}));
