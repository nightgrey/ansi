import * as util from "node:util";
import { expect } from "vitest";
import { parser, tokenizer } from "../src/parser";

interface ExpectationResult {
  pass: boolean;
  message: () => string;
  // If you pass these, they will automatically appear inside a diff when
  // the matcher does not pass, so you don't need to print the diff yourself
  actual?: unknown;
  expected?: unknown;
}

expect.extend({
  toMatchSgr(a: string, b: string | string[] = []): ExpectationResult {
    const actual = parser(tokenizer(a))
      .filter(
        (token) =>
          token.type === "CSI" &&
          token.command === "m" &&
          token.params.length > 0,
      )
      // Note:
      // - The parser recognizes the underline + style params, like `4:1`, `4:2`, ... as two parameters, not one.
      // - \x1B[38;2;228;0;16mHello\x1B[m is parsed into params of ["38", "2", "228", "0", "16"]
      // Not sure why, but that's why we parse the parameters manually.
      .flatMap((token) => {
        return token.raw.slice("\x1B[".length, -"m".length).split(";");
      })
      .toArray()
      .filter(Boolean);

    const expected = (Array.isArray(b) ? b : b.split(";")).filter(Boolean);

    return {
      message: () => {
        if (expected.length > 0 && actual.length === 0) {
          return `Expected SGR attributes to match "${expected.join(";")}", but received none in ${util.inspect(
            a,
          )}`;
        }

        return `Expected SGR attributes to match "${expected.join(";")}", but received "${actual.join(";")}" in ${util.inspect(
          a,
        )}`;
      },

      actual: actual.join(";"),
      expected: expected.join(";"),
      pass:
        (actual.length === 0 && expected.length === 0) ||
        (actual.length === expected.length &&
          expected
            .sort()
            .every((code) => actual.some((token) => token === code))),
    };
  },
});
