import "vitest";

interface CustomMatchers<R = unknown> {
  /**
   * Matches both SGR codes and content in an ANSI escape sequence
   *
   * @remarks The parser recognizes the underline + style params, like `4:1`, `4:2`, ... as two parameters, not one.
   * @param expected - Single code or array of SGR codes (e.g., "1" or ["1", "3"])
   */
  toMatchSgr(expected?: string | string[]): R;
}
import "vitest";

declare module "vitest" {
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
