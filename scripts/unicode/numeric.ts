import { derivedNumericType } from "./utils";
import { Lookup } from "./utils";
import { parseRange } from "./utils";

async function getNumericMap() {
    const map = new Map<number, number>();

    const numeric = await derivedNumericType();
    for (const line of numeric.split('\n')) {
        if (line.length === 0 || line[0] === '#') continue;

        const commentIndex = line.indexOf('#');
        const noComment = commentIndex !== -1 ? line.slice(0, commentIndex) : line;

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
                    // Numeric type
                    let bit = 0;

                    if (field === "Numeric") bit = 1;
                    if (field === "Digit") bit = 2;
                    if (field === "Decimal") bit = 4;

                    if (bit !== 0) {
                        for (let cp = currentCode[0]; cp <= currentCode[1]; cp++) {
                            const existingValue = map.get(cp) ?? 0;
                            map.set(cp, existingValue | bit);
                        }
                    }
                    break;
                }
                default:
                    // Skip other fields
                    break;
            }
        }
    }

    return map;
}

const numeric = await getNumericMap();

export const NumericLookup = await Lookup.from({
    get: (codePoint) => numeric.get(codePoint) ?? 0,
});

