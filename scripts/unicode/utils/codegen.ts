import { PathLike } from "fs";
import path from "path";
import { Lookup } from "./lookup";

/**
 * Writes the lookup tables as TypeScript to the given output.
 * Returns a string containing the generated TypeScript code.
 * @param lookup 
 * @param serialize 
 * @returns e.g. `export const TABLES = { ... };`
 */
export const codegen = async (lookup: Lookup<number>, out?: PathLike, options?: {
    serialize?: (value: number) => any,
}) => {
    const serialize = options?.serialize ?? JSON.stringify;
    let output = `/**
 * This file is auto-generated.
 * @see ./scripts/unicode.ts
 */

const TABLES = {
    STAGE_1: new Uint16Array([${lookup.tables.STAGE_1.join(',')}]),
    STAGE_2: new Uint16Array([${lookup.tables.STAGE_2.join(',')}]),
    STAGE_3: [${lookup.tables.STAGE_3.map(v => serialize(v)).join(',')}],
};

/**
 * Looks up value for the given code point.
 */
export function lookup(codePoint: number) {
    const high = codePoint >> 8;
    const low = codePoint & 0xFF;
    const stage2Index = TABLES.STAGE_1[high];
    const stage3Index = TABLES.STAGE_2[stage2Index + low];
    return TABLES.STAGE_3[stage3Index];
} 
`;

    if (out) await Bun.write(out, path.resolve(import.meta.dir, output))

    return output
}