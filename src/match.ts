import { regex } from "./regex";

/**
 * Checks the given string for ANSI escape sequences.
 *
 * @param string - The string to check
 * @returns whether or not the string contains an ANSI escape sequence
 */
export const match = (string: string) => {
  if (string.length < 2) return false;
  return regex().test(string);
};
