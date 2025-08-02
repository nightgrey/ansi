import { tokenizer as ansiToolsTokenizer } from "@ansi-tools/parser";
import type { Parser } from "./types";
/**
 * Tokenizes for ANSI escape sequences.
 * @see {@link parser}
 */
export const tokenizer = ansiToolsTokenizer as (
  text: string,
) => Generator<Parser.Raw>;
