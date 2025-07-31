import { COMPLEX_REGEX, SIMPLE_REGEX } from "./regex";

/**
 * Checks the given string for ANSI escape sequences with {@link SIMPLE_REGEX}.
 */
export const matches = (string: string) => {
  if (string.length < 2) return false;
  return SIMPLE_REGEX.test(string);
};

/**
 * Checks the given string for ANSI escape sequences with {@link COMPLEX_REGEX}.
 */
export const matchesComplex = (string: string) => {
  if (string.length < 2) return false;
  return COMPLEX_REGEX.test(string);
};
