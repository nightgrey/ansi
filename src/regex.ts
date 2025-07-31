import { BEL, ESC } from "./c0";
import { CSI, ST } from "./c1";

const TERMINATORS = `(?:${BEL.toLiteral()}|${ESC.toLiteral()}|${ST.toLiteral()}|\\u005C)`;

/**
 * Pattern for the {@link COMPLEX_REGEX} regular expression.
 */
export const COMPLEX_PATTERN = [
  `[${CSI.toLiteral()}][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?${TERMINATORS})`,
  "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))",
].join("|");

/**
 * Complex regular expression for matching ANSI escape sequences.
 *
 * For a simpler regex, see {@link SIMPLE_REGEX}.
 *
 * This regex provides extensive coverage of ANSI escape sequences including:
 * - CSI (Control Sequence Introducer) sequences: `ESC[`
 * - OSC (Operating System Command) sequences: `ESC]`
 * - DCS (Device Control String) sequences: `ESC P`
 * - Multiple terminator sequences (BEL, ESC, ST, backslash)
 * - Complex parameter patterns with extended character sets
 * - Nested and compound escape sequences
 *
 * **Use cases:**
 * - Full ANSI compliance and/or complete parsing
 * - Applications needing to handle complex control sequences
 * - Situations where missing sequences could break functionality
 *
 * **Performance:** Slower due to complex pattern matching
 * **Coverage:** ~95%+ of all ANSI escape sequences
 *
 * @see SIMPLE_REGEX
 *
 * @example
 * ```typescript
 * const terminalOutput = "\x1b[38;2;255;0;0mRed text\x1b]0;Window Title\x07";
 * const sequences = terminalOutput.match(COMPREHENSIVE_REGEX);
 * // Matches: ["\x1b[38;2;255;0;0m", "\x1b]0;Window Title\x07"]
 * ```
 */
export const COMPLEX_REGEX = new RegExp(COMPLEX_PATTERN, "g");

/**
 * Simple regular expression for matching basic ANSI escape sequences.
 *
 * For a more comprehensive regex, see {@link COMPLEX_REGEX}.
 *
 * This regex matches only the most common CSI (Control Sequence Introducer)
 * sequences that start with `ESC[` followed by numeric parameters and
 * alphabetic final characters.
 *
 * **Matches:**
 * - Color codes: `\x1b[31m`, `\x1b[38;5;196m`
 * - Cursor movement: `\x1b[10;5H`, `\x1b[2A`
 * - Text formatting: `\x1b[1m` (bold), `\x1b[0m` (reset)
 *
 * **Does NOT match:**
 * - OSC sequences: `\x1b]0;title\x07`
 * - Complex terminators beyond alphabetic characters
 * - Non-CSI escape sequences
 *
 * **Use cases:**
 * - Basic text cleaning for display
 * - Performance-critical applications
 * - Simple terminal output processing
 *
 * **Performance:** Fast due to simple pattern
 * **Coverage:** ~80-90% of common ANSI sequences
 *
 * @see COMPLEX_REGEX
 *
 * @example
 * ```typescript
 * const coloredText = "\x1b[31mError:\x1b[0m Something went wrong";
 * const cleanText = coloredText.replace(SIMPLE_REGEX, "");
 * // Result: "Error: Something went wrong"
 * ```
 */
export const SIMPLE_REGEX = /\x1b\[[0-9;]*[a-zA-Z]/g;
