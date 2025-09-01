import { CodepointMap, propList } from "./utils";
import { Generator, Lookup } from "./utils";
import { parseRange } from "./utils";

async function getPropsMap() {
    const map: CodepointMap = new Map<number, number>();
    const props = await propList();

    for await (const line of props.split('\n')) {
        // Skip empty lines and comments
        if (line.length === 0 || line[0] === '#') continue;

        // Remove comments from the line
        const octoIndex = line.indexOf('#');
        const noComment = octoIndex !== -1 ? line.substring(0, octoIndex) : line;

        // Split by semicolon and space, filter out empty strings
        const fields = noComment.split(/[; ]+/).filter(field => field.length > 0);

        let currentCode: [number, number] = [0, 0];

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];

            switch (i) {
                case 0: {
                    currentCode = parseRange(field);
                    break;
                }
                case 1: {
                    // Core property
                    let bit = 0;

                    if (field === 'White_Space') bit = 1;
                    if (field === 'Hex_Digit') bit = 2;
                    if (field === 'Diacritic') bit = 4;

                    if (bit !== 0) {
                        // Apply the property bit to all code points in the range
                        for (let cp = currentCode[0]; cp <= currentCode[1]; cp++) {
                            const existingValue = map.get(cp) || 0;
                            map.set(cp, existingValue | bit);
                        }
                    }
                    break;
                }
                default:
                    // Ignore other fields
                    break;
            }
        }
    }

    return map;
}

const props = await getPropsMap();

export const PropLookup = await Lookup.from({
    get: (codePoint: number) => props.get(codePoint) ?? 0,
});