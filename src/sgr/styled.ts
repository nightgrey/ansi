import type { Attributes } from "./attributes";

/**
 * An interface for style-able objects.
 * @see {@link Style}
 */
export interface Styled {
  /** SGR style attributes */
  attributes: Attributes;

  /** Renders given string with style attributes */
  format(string: string): string;

  /** Renders SGR escape sequence with style attributes */
  toString(): string;
}
