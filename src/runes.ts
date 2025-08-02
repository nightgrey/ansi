/**
 * Splits a string into runes (unicode code points)
 *
 * @example
 * ```ts
 * import { runes } from './runes';
 *
 * for (const rune of runes("Hello 🌍 世界")) {
 *     console.log(rune);
 * }
 *
 * // ['H', 'e', 'l', 'l', 'o', ' ', '🌍', ' ', '世', '界']
 * ```
 * @param string
 */
export function runes(string: string) {
  return string[Symbol.iterator]();
}

/**
 * Splits a string into an array of runes (unicode code points)
 */
export const splitByRunes = (string: string) => {
  const out: string[] = [];

  for (const rune of string) {
    out.push(rune);
  }

  return out;
};

export { maxGraphemeWidth as maxRuneWidth } from "./graphemes";

/**
 * Returns the first rune from a string, or empty string if none.
 */
export function firstRune(string: string): string {
  return runes(string).next().value ?? "";
}
