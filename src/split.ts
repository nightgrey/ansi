import {tokenizer} from "./parser";

/**
 * Split a string along ANSI escape sequences.
 *
 * @example
 * ```
 * import { split } from './split';
 *
 * split('a\u001b[1mb\u001b[22mc');
 * //=> ['a', 'b', 'c']
 * ```
 * @param string - The string to split
 * @returns Array of string parts split along ANSI escape sequences
 *
 */
export function split(string: string) {
    let out: string[] = [];

    for (const token of tokenizer(string)) {
        if (token.type !== "TEXT") continue;
        out.push(token.raw)
    }

    return out;
}
