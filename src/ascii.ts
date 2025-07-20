/**
 * This is the doc comment for file1.ts
 *
 * Specify this is a module comment and rename it to my-module:
 * @module ascii
 */

/**
 * Delete (`DEL`)
 *
 * Should be ignored. Used to delete characters on punched tape by punching out all the holes.
 *
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DEL = "\x1b?";
/** **Numerical** {@link DEL} */
export const DEL_CODE = 0x7f;
/** **Unicode** {@link DEL} */
export const DEL_UNICODE = "\u007f";
/**
 * Space (`SP`)
 *
 * Move right one character position.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SP = " ";
/** **Numerical** {@link SP} */
export const SP_CODE = 0x20;
/** **Unicode** {@link SP} */
export const SP_UNICODE = "\u0020";
