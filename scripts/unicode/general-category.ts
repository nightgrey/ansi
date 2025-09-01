import { GeneralCategory } from "../../src/unicode/types";
import { CodepointMap, derivedGeneralCategory } from "./utils";
import { codegen, Lookup } from "./utils";
import { parseRange } from "./utils";

async function getGeneralCategoryMap() {
    const map: CodepointMap<GeneralCategory> = new Map<number, GeneralCategory>();

    const generalCategory = await derivedGeneralCategory();

    for await (const line of generalCategory.split('\n')) {
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
                    // General category
                    const gc = GeneralCategory[field as keyof typeof GeneralCategory];
                    if (gc === undefined) {
                        throw new Error(`Unknown general category: ${field}`);
                    }

                    for (let cp = currentCode[0]; cp <= currentCode[1]; cp++) {
                        map.set(cp, gc);
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

const categories = await getGeneralCategoryMap();

export const GeneralCategoryLookup = await Lookup.from<GeneralCategory>({
    get: (codePoint: number) => categories.get(codePoint) ?? GeneralCategory.Cn,
});
