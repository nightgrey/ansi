import { C0 } from "./ansi";

/**
 * C0 control characters.
 *
 * These range from (0x00-0x1F) as defined in ISO 646 (ASCII).
 *
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */

/**
 * Null (`NUL`)
 *
 * `0x00` (`@`)
 *
 * Does nothing. The code of blank paper tape, and also used for padding to slow transmission.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const NUL = new C0(0x00);

/**
 * Start of Heading (`SOH`)
 *
 * `0x01` (`A`)
 *
 * First character of the heading of a message.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SOH = new C0(0x01);

/**
 * Start of Text (`STX`)
 *
 * `0x02` (`B`)
 *
 * Terminates the header and starts the message text.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const STX = new C0(0x02);

/**
 * End of Text (`ETX`)
 *
 * `0x03` (`C`)
 *
 * Ends the message text, starts a footer (up to the next TC character).
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ETX = new C0(0x03);

/**
 * End of Transmission (`EOT`)
 *
 * `0x04` (`D`)
 *
 * Ends the transmission of one or more messages. May place terminals on standby.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const EOT = new C0(0x04);

/**
 * Enquiry (`ENQ`)
 *
 * `0x05` (`E`)
 *
 * Trigger a response at the receiving end, to see if it is still present.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ENQ = new C0(0x05);

/**
 * Acknowledge (`ACK`)
 *
 * `0x06` (`F`)
 *
 * Indication of successful receipt of a message.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ACK = new C0(0x06);

/**
 * Bell (`BEL`)
 *
 * `0x07` (`G`)
 *
 * Call for attention from an operator.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const BEL = new C0(0x07);

/**
 * Backspace (`BS`)
 *
 * `0x08` (`H`)
 *
 * Move one position leftwards. Next character may overprint or replace the character that was there.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const BS = new C0(0x08);

/**
 * Horizontal Tab (`HT`)
 *
 * `0x09` (`I`)
 *
 * Move right to the next tab stop.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const HT = new C0(0x09);

/**
 * Line Feed (`LF`)
 *
 * `0x0A` (`J`)
 *
 * Move down to the same position on the next line (some devices also moved to the left column).
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const LF = new C0(0x0a);

/**
 * Vertical Tab (`VT`)
 *
 * `0x0B` (`K`)
 *
 * Move down to the next vertical tab stop.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const VT = new C0(0x0b);

/**
 * Form Feed (`FF`)
 *
 * `0x0C` (`L`)
 *
 * Move down to the top of the next page.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const FF = new C0(0x0c);

/**
 * Carriage Return (`CR`)
 *
 * `0x0D` (`M`)
 *
 * Move to column zero while staying on the same line.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const CR = new C0(0x0d);

/**
 * Shift Out (`SO`)
 *
 * `0x0E` (`N`)
 *
 * Switch to an alternative character set.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SO = new C0(0x0e);

/**
 * Shift In (`SI`)
 *
 * `0x0F` (`O`)
 *
 * Return to regular character set after SO.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SI = new C0(0x0f);

/**
 * Data Link Escape (`DLE`)
 *
 * `0x10` (`P`)
 *
 * Causes a limited number of contiguously following characters to be interpreted in some different way.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DLE = new C0(0x10);

/**
 * Device Control 1 (XON) (`DC1`)
 *
 * `0x11` (`Q`)
 *
 * Turn on devices. Used for software flow control and paper tape reader control.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DC1 = new C0(0x11);

/**
 * Device Control 2 (`DC2`)
 *
 * `0x12` (`R`)
 *
 * Device control character. Teletype used this for paper tape operations.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DC2 = new C0(0x12);

/**
 * Device Control 3 (XOFF) (`DC3`)
 *
 * `0x13` (`S`)
 *
 * Turn off devices. Used for software flow control and paper tape punch control.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DC3 = new C0(0x13);

/**
 * Device Control 4 (`DC4`)
 *
 * `0x14` (`T`)
 *
 * Device control character. Teletype used this for paper tape operations.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DC4 = new C0(0x14);

/**
 * Negative Acknowledge (`NAK`)
 *
 * `0x15` (`U`)
 *
 * Negative response to a sender, such as a detected error.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const NAK = new C0(0x15);

/**
 * Synchronous Idle (`SYN`)
 *
 * `0x16` (`V`)
 *
 * Sent in synchronous transmission systems when no other character is being transmitted.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SYN = new C0(0x16);

/**
 * End of Transmission Block (`ETB`)
 *
 * `0x17` (`W`)
 *
 * End of a transmission block of data when data are divided into such blocks for transmission purposes.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ETB = new C0(0x17);

/**
 * Cancel (`CAN`)
 *
 * `0x18` (`X`)
 *
 * Indicates that the data preceding it are in error or are to be disregarded.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const CAN = new C0(0x18);

/**
 * End of Medium (`EM`)
 *
 * `0x19` (`Y`)
 *
 * Indicates on paper or magnetic tapes that the end of the usable portion of the tape had been reached.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const EM = new C0(0x19);

/**
 * Substitute (`SUB`)
 *
 * `0x1A` (`Z`)
 *
 * Replaces a character that was found to be invalid or in error. Should be ignored.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SUB = new C0(0x1a);

/**
 * Escape (`ESC`)
 *
 * `0x1B` (`[`)
 *
 * Alters the meaning of a limited number of following bytes. Nowadays this is almost always used to introduce an ANSI escape sequence.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ESC = new C0(0x1b);

/**
 * File Separator (`FS`)
 *
 * `0x1C` (`\`)
 *
 * Can be used as delimiters to mark fields of data structures. FS is a higher level separator than GS, RS, and US.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const FS = new C0(0x1c);

/**
 * Group Separator (`GS`)
 *
 * `0x1D` (`]`)
 *
 * Can be used as delimiters to mark fields of data structures. GS is a mid-level separator between FS and RS.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const GS = new C0(0x1d);

/**
 * Record Separator (`RS`)
 *
 * `0x1E` (`^`)
 *
 * Can be used as delimiters to mark fields of data structures. RS is a lower level separator than GS but higher than US.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const RS = new C0(0x1e);

/**
 * Unit Separator (`US`)
 *
 * `0x1F` (`_`)
 *
 * Can be used as delimiters to mark fields of data structures. US is the lowest level separator.
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const US = new C0(0x1f);

// Aliases

/* Alias for {@link HT} */
export const TAB = HT;
/* Alias for {@link LF} */
export const NEWLINE = LF;
/* Alias for {@link CR} */
export const RETURN = CR;
/* Alias for {@link ESC} */
export const ESCAPE = ESC;
/* Alias for {@link DC1} */
export const XON = DC1;
/* Alias for {@link DC3} */
export const XOFF = DC3;
/* Alias for {@link BEL} */
export const BELL = BEL;