import { C1 } from "./ansi";

/**
 * C0 control characters.
 *
 * These range from (0x80-0x9F) as defined in ISO 6429 (ECMA-48).
 *
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */

/**
 * Padding Character (`PAD`)
 *
 * `0x80` (`@`)
 *
 * Proposed as a "padding" or "high byte" for single-byte characters to make them two bytes long for easier interoperability with multiple byte characters.Extended Unix Code(EUC) occasionally uses this.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PAD = new C1(0x80);

/**
 * High Octet Preset (`HOP`)
 *
 * `0x81` (`A`)
 *
 * Proposed to set the high byte of a sequence of multiple byte characters so they only need one byte each, as a simple form of data compression.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const HOP = new C1(0x81);

/**
 * Break Permitted Here (`BPH`)
 *
 * `0x82` (`B`)
 *
 * Follows a graphic character where a line break is permitted. Roughly equivalent to a soft hyphen or zero-width space except it does not define what is printed at the line break.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const BPH = new C1(0x82);

/**
 * No Break Here (`NBH`)
 *
 * `0x83` (`C`)
 *
 * Follows the graphic character that is not to be broken. See also word joiner.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const NBH = new C1(0x83);

/**
 * Index (`IND`)
 *
 * `0x84` (`D`)
 *
 * Move down one line without moving horizontally, to eliminate ambiguity about the meaning of LF.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const IND = new C1(0x84);

/**
 * Next Line (`NEL`)
 *
 * `0x85` (`E`)
 *
 * Equivalent to CR+LF, to match the EBCDIC control character.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const NEL = new C1(0x85);

/**
 * Start of Selected Area (`SSA`)
 *
 * `0x86` (`F`)
 *
 * Used by block-oriented terminals. In xterm ESC F moves to the lower-left corner of the screen, since certain software assumes this behaviour.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SSA = new C1(0x86);

/**
 * End of Selected Area (`ESA`)
 *
 * `0x87` (`G`)
 *
 * Used by block-oriented terminals.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ESA = new C1(0x87);

/**
 * Character Tabulation Set / Horizontal Tabulation Set (`HTS`)
 *
 * `0x88` (`H`)
 *
 * Set a tab stop at the current position.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const HTS = new C1(0x88);

/**
 * Character Tabulation With Justification / Horizontal Tabulation With Justification (`HTJ`)
 *
 * `0x89` (`I`)
 *
 * Right-justify the text since the last tab against the next tab stop.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const HTJ = new C1(0x89);

/**
 * Line Tabulation Set / Vertical Tabulation Set (`VTS`)
 *
 * `0x8A` (`J`)
 *
 * Set a vertical tab stop.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const VTS = new C1(0x8a);

/**
 * Partial Line Forward / Partial Line Down (`PLD`)
 *
 * `0x8B` (`K`)
 *
 * To produce subscripts and superscripts in ISO/IEC 6429. Subscripts use PLD text PLU while superscripts use PLU text PLD.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PLD = new C1(0x8b);

/**
 * Partial Line Backward / Partial Line Up (`PLU`)
 *
 * `0x8C` (`L`)
 *
 * To produce subscripts and superscripts in ISO/IEC 6429. Subscripts use PLD text PLU while superscripts use PLU text PLD.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PLU = new C1(0x8c);

/**
 * Reverse Line Feed / Reverse Index (`RI`)
 *
 * `0x8D` (`M`)
 *
 * Move up one line.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const RI = new C1(0x8d);

/**
 * Single-Shift 2 (`SS2`)
 *
 * `0x8E` (`N`)
 *
 * Next character is from the G2 set.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SS2 = new C1(0x8e);

/**
 * Single-Shift 3 (`SS3`)
 *
 * `0x8F` (`O`)
 *
 * Next character is from the G3 set.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SS3 = new C1(0x8f);

/**
 * Device Control String (`DCS`)
 *
 * `0x90` (`P`)
 *
 * Followed by a string of printable characters (0x20 through 0x7E) and format effectors (0x08 through 0x0D), terminated by ST(0x9C).Xterm defined a number of these.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DCS = new C1(0x90);

/**
 * Private Use 1 (`PU1`)
 *
 * `0x91` (`Q`)
 *
 * Reserved for private function agreed on between the sender and the recipient of the data.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PU1 = new C1(0x91);

/**
 * Private Use 2 (`PU2`)
 *
 * `0x92` (`R`)
 *
 * Reserved for private function agreed on between the sender and the recipient of the data.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PU2 = new C1(0x92);

/**
 * Set Transmit State (`STS`)
 *
 * `0x93` (`S`)
 *
 * Set transmit state.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const STS = new C1(0x93);

/**
 * Cancel Character (`CCH`)
 *
 * `0x94` (`T`)
 *
 * Destructive backspace, to eliminate ambiguity about meaning of BS.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const CCH = new C1(0x94);

/**
 * Message Waiting (`MW`)
 *
 * `0x95` (`U`)
 *
 * Message waiting indicator.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const MW = new C1(0x95);

/**
 * Start of Protected Area (`SPA`)
 *
 * `0x96` (`V`)
 *
 * Used by block-oriented terminals.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SPA = new C1(0x96);

/**
 * End of Protected Area (`EPA`)
 *
 * `0x97` (`W`)
 *
 * Used by block-oriented terminals.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const EPA = new C1(0x97);

/**
 * Start of String (`SOS`)
 *
 * `0x98` (`X`)
 *
 * Followed by a control string terminated by ST (0x9C) which (unlike DCS, OSC, PM or APC) may contain any character except SOS or ST.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SOS = new C1(0x98);

/**
 * Single Graphic Character Introducer (`SGC`)
 *
 * `0x99` (`Y`)
 *
 * Intended to allow an arbitrary Unicode character to be printed; it would be followed by that character, most likely encoded in UTF-1.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SGC = new C1(0x99);

/**
 * Single Character Introducer (`SCI`)
 *
 * `0x9A` (`Z`)
 *
 * To be followed by a single printable character (0x20 through 0x7E) or format effector (0x08 through 0x0D), and to print it as ASCII no matter what graphic or control sets were in use.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SCI = new C1(0x9a);

/**
 * Control Sequence Introducer (`CSI`)
 *
 * `0x9B` (`[`)
 *
 * Used to introduce control sequences that take parameters. Used for ANSI escape sequences.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const CSI = new C1(0x9b);

/**
 * String Terminator (`ST`)
 *
 * `0x9C` (`\\`)
 *
 * Terminates a string started by DCS, SOS, OSC, PM or APC.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ST = new C1(0x9c);

/**
 * Operating System Command (`OSC`)
 *
 * `0x9D` (`]`)
 *
 * Followed by a string of printable characters (0x20 through 0x7E) and format effectors (0x08 through 0x0D), terminated by ST (0x9C), intended for use to allow in-band signaling of protocol information, but rarely used for that purpose. Some terminal emulators, including xterm, use OSC sequences for setting the window title and changing the colour palette.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const OSC = new C1(0x9d);

/**
 * Privacy Message (`PM`)
 *
 * `0x9E` (`^`)
 *
 * Privacy message for private communication.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PM = new C1(0x9e);

/**
 * Application Program Command (`APC`)
 *
 * `0x9F` (`_`)
 *
 * Application program command. Kermit used APC to transmit commands.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const APC = new C1(0x9f);
