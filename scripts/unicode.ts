import { packageDirectory } from "pkg-dir";
import { WidthLookup } from "./unicode/width"
import { codegen, Lookup, Tables, TablesProps } from "./unicode/utils";
import path from "path";
import { HashMap } from "@thi.ng/associative";
import { UnicodeWidthOptions } from "../src/unicode/types";

const root = await packageDirectory();
if (!root) throw new Error("Could not find package directory");

const src = path.resolve(root, "./src");
const unicode = path.resolve(src, "./unicode");
const lookup = path.resolve(unicode, "./lookup");

const OPTIONS: UnicodeWidthOptions[] = [
    { ambigiousAreNarrow: false, countAnsiEscapeCodes: false },
    { ambigiousAreNarrow: true, countAnsiEscapeCodes: false },
    { ambigiousAreNarrow: false, countAnsiEscapeCodes: true },
    { ambigiousAreNarrow: true, countAnsiEscapeCodes: true },
];

await Bun.write(path.resolve(lookup, "./width.ts"), `
import { UnicodeWidthOptions} from "../types";

const TABLES = {
    ${(await Promise.all(OPTIONS.map(async (options) => {
    const lookup = (await WidthLookup(options));

    return `${((options?.ambigiousAreNarrow ? 1 : 0) << 2) | (options?.countAnsiEscapeCodes ? 1 : 0)}: {
            STAGE_1: new Uint16Array([${lookup.tables.STAGE_1.join(',')}]),
            STAGE_2: new Uint16Array([${lookup.tables.STAGE_2.join(',')}]),
            STAGE_3: [${lookup.tables.STAGE_3.map(v => JSON.stringify(v)).join(',')}]
}`
}))).join(',\n')}
}

function hash(options?: UnicodeWidthOptions) {
    return (((options?.ambigiousAreNarrow ? 1 : 0) << 2) | (options?.countAnsiEscapeCodes ? 1 : 0)) as keyof typeof TABLES
}

/**
 * Looks up value for the given code point.
 */
export function lookup(codePoint: number, options?: UnicodeWidthOptions) {
    const tables = options ? TABLES[hash(options)] : TABLES[0];
    const high = codePoint >> 8;
    const low = codePoint & 0xFF;
    const stage2Index = tables.STAGE_1[high];
    const stage3Index = tables.STAGE_2[stage2Index + low];
    return tables.STAGE_3[stage3Index] ?? 0;
}
`);