import { regex } from "./regex";

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
 * @TODO Implement using parser?
 */
export function split(string: string) {
  const parts = string.match(regex());
  if (!parts) return [string];

  const result = [];
  let offset = 0;
  let ptr = 0;

  for (let i = 0; i < parts.length; i++) {
    offset = string.indexOf(parts[i], offset);
    if (offset === -1) throw new Error("Could not split string");
    if (ptr !== offset) result.push(string.slice(ptr, offset));
    if (ptr === offset && result.length) {
      result[result.length - 1] += parts[i];
    } else {
      if (offset === 0) result.push("");
      result.push(parts[i]);
    }
    ptr = offset + parts[i].length;
  }

  result.push(string.slice(ptr));
  return result;
}
