import ansiTruncate, { type Options } from "ansi-truncate";
export type TruncateOptions = Options;

/**
 * Truncate a string to a specific width, respecting ANSI, Unicode, and
 * fullwidth characters.
 *
 * @example
 * ```
 * import { truncate } from './truncate';
 *
 * truncate('unicorn', 4);
 * //=> 'uni…'
 *
 * // Truncate at different positions
 * truncate('unicorn', 4, {position: 'start'});
 * //=> '…orn'
 *
 * truncate('unicorn', 4, {position: 'middle'});
 * //=> 'un…n'
 *
 * truncate('\u001B[31municorn\u001B[39m', 4);
 * //=> '\u001B[31muni\u001B[39m…'
 *
 * // Truncate Unicode surrogate pairs
 * truncate('uni\uD83C\uDE00corn', 5);
 * //=> 'uni\uD83C\uDE00…'
 *
 * // Truncate fullwidth characters
 * truncate('안녕하세요', 3);
 * //=> '안…'
 *
 * // Truncate the paragraph to the terminal width
 * const paragraph = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.';
 * truncate(paragraph, process.stdout.columns);
 * //=> 'Lorem ipsum dolor sit amet, consectetuer adipiscing…'
 * ```
 * 
 * @param string - The text to truncate.
 * @param columns - The number of columns to occupy in the terminal.
 * @param options - Truncate options
 * @returns The truncated string.
 * 
 * @TODO Implement using parser?
 */
export const truncate = ansiTruncate as (string: string, columns: number, options?: TruncateOptions) => string;
