/**
 * Splits a string into runes (unicode code points)
 *
 * ```
 * @param string
 */
export function* rune(string: string) {
  for (const i of string) {
    yield i.codePointAt(0)!;
  }
}


/**
 * Splits a string into an array of runes (unicode code points)
 */
export const runes = (string: string) => {
  const out: number[] = [];

  for (const rune of string) {
    out.push(rune.codePointAt(0)!);
  }

  return out;
};

/**
 * Returns the first rune from a string, or empty string if none.
 */
export function firstRune(string: string) {
  return rune(string).next().value ?? 0;
}
