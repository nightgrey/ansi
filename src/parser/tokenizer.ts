import { tokenizer as ansiToolsTokenizer } from "@ansi-tools/parser";
import type { Parser } from "./types";
/**
 * Tokenizes for ANSI escape sequences.
 * @see {@link parser}
 */
export const tokenizer = ansiToolsTokenizer as (
  text: string,
) => Generator<Parser.Raw>;

export const tokenize = (text: string) => {
  const out: Parser.Raw[] = [];

  for (const raw of tokenizer(text)) {
    out.push(raw);
  }

  return out;
}
