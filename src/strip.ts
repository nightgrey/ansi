import { STRIP_REGEX } from "./regex";

/**
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 *
 * @example
 * ```ts
 * strip('\u001B[4mUnicorn\u001B[0m');
 * //=> 'Unicorn'
 *
 * strip('\u001B]8;;https://github.com\u0007Click\u001B]8;;\u0007');
 * //=> 'Click'
 * ```
 *
 * @TODO Implement using parser?
 */
export const strip = (string: string) => {
  return string.replace(STRIP_REGEX, "");
};
