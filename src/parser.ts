import { parser as _parser, tokenizer as _tokenizer } from "@ansi-tools/parser";

/**
 * Parser for ANSI escape sequences.
 *
 * @example
 * ```ts
 * import { parser, tokenizer } from "@nightgrey/ansi";
 *
 * const input = String.raw`\x1b[31mHello\x1b[0m World`;
 *
 * for (const code of parser(tokenizer(input))) {
 *   console.log(code);
 * }
 *
 * // Output:
 * [
 *   {
 *     type: "CSI",
 *     pos: 0,
 *     raw: "\x1b[31m",
 *     command: "m",
 *     params: ["31"],
 *   },
 *   {
 *     type: "TEXT",
 *     pos: 8,
 *     raw: "Hello",
 *   },
 *   {
 *     type: "CSI",
 *     pos: 13,
 *     raw: "\x1b[0m",
 *     command: "m",
 *     params: ["0"],
 *   },
 * ]
 * ```
 *
 * @example
 * ```ts
 * import { Transform } from "node:stream";
 * import { parser, tokenizer } from "@nightgrey/ansi";
 *
 * const Parser = Transform.from(function* (input) {
 *   yield* parser(tokenizer(input));
 * });
 * ```
 */
export const parser = _parser;

/**
 * Tokenizer for ANSI escape sequences.
 *
 * @see {@link parser}
 */
export const tokenizer = _tokenizer;

export type {
  CODE,
  CONTROL_CODE,
  TEXT,
  TOKEN,
} from "@ansi-tools/parser/dist/escaped";
