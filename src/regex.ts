import { BEL, ESC } from "./c0";
import { CSI, ST } from "./c1";

// Valid terminator sequences
const TERMINATORS = `(?:${BEL.toLiteral()}|${ESC.toLiteral()}|${ST.toLiteral()}|\\u005C)`;

/** Pattern to match ANSI escape sequences. */
export const PATTERN = [
  `[${CSI.toLiteral()}][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?${TERMINATORS})`,
  "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))",
].join("|");

/** Regular expression to strip ANSI escape codes from a string. */
export const STRIP_REGEX = /\\x1b\[([\x30-\x3f]*[\x20-\x2f]*[\x40-\x7e])/gu;

/** Regular expression to match `SGR` (Select Graphic Rendition) attributes. The `SGR` sequence is a number followed by "m". */
export const SGR_ATTRIBUTE_REGEX = /([0-9]+)m/u;

/** Regular expression to match incomplete ANSI escape sequences. */
export const INCOMPLETE_REGEX = /\x1b(?:\[(?:[0-9;]*)?)?$/;

/** Regular expression to match ANSI escape sequences. */
export function regex(flags: string = "g") {
  return new RegExp(PATTERN, flags);
}

/** Alternative, simpler regular expression to match ANSI escape sequences. */
export const SIMPLE_REGEX = /\x1b[[0-9;]+m/g;
