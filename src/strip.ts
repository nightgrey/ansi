import { memoize1 } from "@thi.ng/memoize/memoize1";
import { tokenizer } from "./parser";

/**
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 */
export const strip = memoize1(function strip(string: string) {
  let out = "";

  for (const token of tokenizer(string)) {
    if (token.type !== "TEXT") continue;
    out += token.raw;
  }

  return out;
});
