import { derivedCoreProperties, emojiData, graphemeBreakProperty } from './utils/fetch';
import { GraphemeBreakProperty, Indic } from '../../src/unicode/types';
import { parseRange } from './utils/parse';
import { CodepointMap } from './utils';

async function getIndicsMap() {
    const map: CodepointMap<Indic> = new Map<number, Indic>();

    // Process Indic
    const indic = await derivedCoreProperties();

    for await (const line of indic.split('\n')) {
        if (line.length === 0 || line[0] === '#') continue;
        if (!line.includes('InCB')) continue;

        const commentIndex = line.indexOf('#');
        const noComment = commentIndex !== -1 ? line.slice(0, commentIndex) : line;

        const fields = noComment.split(/[;\s]+/).filter(f => f.length > 0);

        if (fields.length >= 3) {
            const [from, to] = parseRange(fields[0]);
            const prop = fields[2] as keyof typeof Indic;

            if (Indic[prop] !== undefined) {
                for (let cp = from; cp <= to; cp++) {
                    map.set(cp, Indic[prop]);
                }
            } else {
                debugger
                throw new Error('InvalidProp');
            }
        }
    }

    return map;
}

async function getGraphemeBreakPropertiesMap() {
    const map: CodepointMap<GraphemeBreakProperty> = new Map<number, GraphemeBreakProperty>();
    const gbp = await graphemeBreakProperty();

    for await (const line of gbp.split('\n')) {
        if (line.length === 0 || line[0] === '#') continue;

        const commentIndex = line.indexOf('#');
        const noComment = commentIndex !== -1 ? line.slice(0, commentIndex) : line;

        const fields = noComment.split(/[;\s]+/).filter(f => f.length > 0);

        if (fields.length >= 2) {
            const [from, to] = parseRange(fields[0]);
            const prop = fields[1] as keyof typeof GraphemeBreakProperty;

            if (GraphemeBreakProperty[prop] !== undefined) {
                for (let cp = from; cp <= to; cp++) {
                    map.set(cp, GraphemeBreakProperty[prop]);
                }
            } else {
                throw new Error('InvalidProp');
            }
        }
    }

    return map;
}
