import { C0 } from "./ansi";

/**
 * C0 control characters.
 *
 * These range from (0x00-0x1F) as defined in ISO 646 (ASCII).
 *
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */

/**
 * C0: Null (`NUL`)
 *
 * Does nothing. The code of blank paper tape, and also used for padding to slow transmission.
 *
 * @example `0x00`
 * @example `@`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const NUL_CONTROL = new C0(0x00);
/**
 * String: Null (`NUL`)
 *
 * Does nothing. The code of blank paper tape, and also used for padding to slow transmission.*
 *
 * @example `@`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const NUL = NUL_CONTROL.toString();

/**
 * C0: Start of Heading (`SOH`)
 *
 * First character of the heading of a message.
 *
 * @example `0x01`
 * @example `A`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SOH_CONTROL = new C0(0x01);
/**
 * String: Start of Heading (`SOH`)
 *
 * First character of the heading of a message.*
 *
 * @example `A`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SOH = SOH_CONTROL.toString();

/**
 * C0: Start of Text (`STX`)
 *
 * Terminates the header and starts the message text.
 *
 * @example `0x02`
 * @example `B`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const STX_CONTROL = new C0(0x02);
/**
 * String: Start of Text (`STX`)
 *
 * Terminates the header and starts the message text.*
 *
 * @example `B`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const STX = STX_CONTROL.toString();

/**
 * C0: End of Text (`ETX`)
 *
 * Ends the message text, starts a footer (up to the next TC character).
 *
 * @example `0x03`
 * @example `C`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ETX_CONTROL = new C0(0x03);
/**
 * String: End of Text (`ETX`)
 *
 * Ends the message text, starts a footer (up to the next TC character).*
 *
 * @example `C`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ETX = ETX_CONTROL.toString();

/**
 * C0: End of Transmission (`EOT`)
 *
 * Ends the transmission of one or more messages. May place terminals on standby.
 *
 * @example `0x04`
 * @example `D`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const EOT_CONTROL = new C0(0x04);
/**
 * String: End of Transmission (`EOT`)
 *
 * Ends the transmission of one or more messages. May place terminals on standby.*
 *
 * @example `D`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const EOT = EOT_CONTROL.toString();

/**
 * C0: Enquiry (`ENQ`)
 *
 * Trigger a response at the receiving end, to see if it is still present.
 *
 * @example `0x05`
 * @example `E`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ENQ_CONTROL = new C0(0x05);
/**
 * String: Enquiry (`ENQ`)
 *
 * Trigger a response at the receiving end, to see if it is still present.*
 *
 * @example `E`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ENQ = ENQ_CONTROL.toString();

/**
 * C0: Acknowledge (`ACK`)
 *
 * Indication of successful receipt of a message.
 *
 * @example `0x06`
 * @example `F`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ACK_CONTROL = new C0(0x06);
/**
 * String: Acknowledge (`ACK`)
 *
 * Indication of successful receipt of a message.*
 *
 * @example `F`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ACK = ACK_CONTROL.toString();

/**
 * C0: Bell (`BEL`)
 *
 * Call for attention from an operator.
 *
 * @example `0x07`
 * @example `G`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const BEL_CONTROL = new C0(0x07);
/**
 * String: Bell (`BEL`)
 *
 * Call for attention from an operator.*
 *
 * @example `G`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const BEL = BEL_CONTROL.toString();

/**
 * C0: Backspace (`BS`)
 *
 * Move one position leftwards. Next character may overprint or replace the character that was there.
 *
 * @example `0x08`
 * @example `H`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const BS_CONTROL = new C0(0x08);
/**
 * String: Backspace (`BS`)
 *
 * Move one position leftwards. Next character may overprint or replace the character that was there.*
 *
 * @example `H`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const BS = BS_CONTROL.toString();

/**
 * C0: Horizontal Tab (`HT`)
 *
 * Move right to the next tab stop.
 *
 * @example `0x09`
 * @example `I`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const HT_CONTROL = new C0(0x09);
/**
 * String: Horizontal Tab (`HT`)
 *
 * Move right to the next tab stop.*
 *
 * @example `I`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const HT = HT_CONTROL.toString();

/**
 * C0: Line Feed (`LF`)
 *
 * Move down to the same position on the next line (some devices also moved to the left column).
 *
 * @example `0x0A`
 * @example `J`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const LF_CONTROL = new C0(0x0a);
/**
 * String: Line Feed (`LF`)
 *
 * Move down to the same position on the next line (some devices also moved to the left column).*
 *
 * @example `J`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const LF = LF_CONTROL.toString();

/**
 * C0: Vertical Tab (`VT`)
 *
 * Move down to the next vertical tab stop.
 *
 * @example `0x0B`
 * @example `K`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const VT_CONTROL = new C0(0x0b);
/**
 * String: Vertical Tab (`VT`)
 *
 * Move down to the next vertical tab stop.*
 *
 * @example `K`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const VT = VT_CONTROL.toString();

/**
 * C0: Form Feed (`FF`)
 *
 * Move down to the top of the next page.
 *
 * @example `0x0C`
 * @example `L`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const FF_CONTROL = new C0(0x0c);
/**
 * String: Form Feed (`FF`)
 *
 * Move down to the top of the next page.*
 *
 * @example `L`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const FF = FF_CONTROL.toString();

/**
 * C0: Carriage Return (`CR`)
 *
 * Move to column zero while staying on the same line.
 *
 * @example `0x0D`
 * @example `M`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const CR_CONTROL = new C0(0x0d);
/**
 * String: Carriage Return (`CR`)
 *
 * Move to column zero while staying on the same line.*
 *
 * @example `M`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const CR = CR_CONTROL.toString();

/**
 * C0: Shift Out (`SO`)
 *
 * Switch to an alternative character set.
 *
 * @example `0x0E`
 * @example `N`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SO_CONTROL = new C0(0x0e);
/**
 * String: Shift Out (`SO`)
 *
 * Switch to an alternative character set.*
 *
 * @example `N`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SO = SO_CONTROL.toString();

/**
 * C0: Shift In (`SI`)
 *
 * Return to regular character set after SO.
 *
 * @example `0x0F`
 * @example `O`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SI_CONTROL = new C0(0x0f);
/**
 * String: Shift In (`SI`)
 *
 * Return to regular character set after SO.*
 *
 * @example `O`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SI = SI_CONTROL.toString();

/**
 * C0: Data Link Escape (`DLE`)
 *
 * Causes a limited number of contiguously following characters to be interpreted in some different way.
 *
 * @example `0x10`
 * @example `P`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DLE_CONTROL = new C0(0x10);
/**
 * String: Data Link Escape (`DLE`)
 *
 * Causes a limited number of contiguously following characters to be interpreted in some different way.*
 *
 * @example `P`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DLE = DLE_CONTROL.toString();

/**
 * C0: Device Control 1 (XON) (`DC1`)
 *
 * Turn on devices. Used for software flow control and paper tape reader control.
 *
 * @example `0x11`
 * @example `Q`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DC1_CONTROL = new C0(0x11);
/**
 * String: Device Control 1 (XON) (`DC1`)
 *
 * Turn on devices. Used for software flow control and paper tape reader control.*
 *
 * @example `Q`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DC1 = DC1_CONTROL.toString();

/**
 * C0: Device Control 2 (`DC2`)
 *
 * Device control character. Teletype used this for paper tape operations.
 *
 * @example `0x12`
 * @example `R`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DC2_CONTROL = new C0(0x12);
/**
 * String: Device Control 2 (`DC2`)
 *
 * Device control character. Teletype used this for paper tape operations.*
 *
 * @example `R`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DC2 = DC2_CONTROL.toString();

/**
 * C0: Device Control 3 (XOFF) (`DC3`)
 *
 * Turn off devices. Used for software flow control and paper tape punch control.
 *
 * @example `0x13`
 * @example `S`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DC3_CONTROL = new C0(0x13);
/**
 * String: Device Control 3 (XOFF) (`DC3`)
 *
 * Turn off devices. Used for software flow control and paper tape punch control.*
 *
 * @example `S`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DC3 = DC3_CONTROL.toString();

/**
 * C0: Device Control 4 (`DC4`)
 *
 * Device control character. Teletype used this for paper tape operations.
 *
 * @example `0x14`
 * @example `T`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DC4_CONTROL = new C0(0x14);
/**
 * String: Device Control 4 (`DC4`)
 *
 * Device control character. Teletype used this for paper tape operations.*
 *
 * @example `T`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DC4 = DC4_CONTROL.toString();

/**
 * C0: Negative Acknowledge (`NAK`)
 *
 * Negative response to a sender, such as a detected error.
 *
 * @example `0x15`
 * @example `U`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const NAK_CONTROL = new C0(0x15);
/**
 * String: Negative Acknowledge (`NAK`)
 *
 * Negative response to a sender, such as a detected error.*
 *
 * @example `U`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const NAK = NAK_CONTROL.toString();

/**
 * C0: Synchronous Idle (`SYN`)
 *
 * Sent in synchronous transmission systems when no other character is being transmitted.
 *
 * @example `0x16`
 * @example `V`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SYN_CONTROL = new C0(0x16);
/**
 * String: Synchronous Idle (`SYN`)
 *
 * Sent in synchronous transmission systems when no other character is being transmitted.*
 *
 * @example `V`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SYN = SYN_CONTROL.toString();

/**
 * C0: End of Transmission Block (`ETB`)
 *
 * End of a transmission block of data when data are divided into such blocks for transmission purposes.
 *
 * @example `0x17`
 * @example `W`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ETB_CONTROL = new C0(0x17);
/**
 * String: End of Transmission Block (`ETB`)
 *
 * End of a transmission block of data when data are divided into such blocks for transmission purposes.*
 *
 * @example `W`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ETB = ETB_CONTROL.toString();

/**
 * C0: Cancel (`CAN`)
 *
 * Indicates that the data preceding it are in error or are to be disregarded.
 *
 * @example `0x18`
 * @example `X`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const CAN_CONTROL = new C0(0x18);
/**
 * String: Cancel (`CAN`)
 *
 * Indicates that the data preceding it are in error or are to be disregarded.*
 *
 * @example `X`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const CAN = CAN_CONTROL.toString();

/**
 * C0: End of Medium (`EM`)
 *
 * Indicates on paper or magnetic tapes that the end of the usable portion of the tape had been reached.
 *
 * @example `0x19`
 * @example `Y`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const EM_CONTROL = new C0(0x19);
/**
 * String: End of Medium (`EM`)
 *
 * Indicates on paper or magnetic tapes that the end of the usable portion of the tape had been reached.*
 *
 * @example `Y`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const EM = EM_CONTROL.toString();

/**
 * C0: Substitute (`SUB`)
 *
 * Replaces a character that was found to be invalid or in error. Should be ignored.
 *
 * @example `0x1A`
 * @example `Z`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SUB_CONTROL = new C0(0x1a);
/**
 * String: Substitute (`SUB`)
 *
 * Replaces a character that was found to be invalid or in error. Should be ignored.*
 *
 * @example `Z`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SUB = SUB_CONTROL.toString();

/**
 * C0: Escape (`ESC`)
 *
 * Alters the meaning of a limited number of following bytes. Nowadays this is almost always used to introduce an ANSI escape sequence.
 *
 * @example `0x1B`
 * @example `[`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ESC_CONTROL = new C0(0x1b);
/**
 * String: Escape (`ESC`)
 *
 * Alters the meaning of a limited number of following bytes. Nowadays this is almost always used to introduce an ANSI escape sequence.*
 *
 * @example `[`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ESC = ESC_CONTROL.toString();

/**
 * C0: File Separator (`FS`)
 *
 * Can be used as delimiters to mark fields of data structures. FS is a higher level separator than GS, RS, and US.
 *
 * @example `0x1C`
 * @example `\`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const FS_CONTROL = new C0(0x1c);
/**
 * String: File Separator (`FS`)
 *
 * Can be used as delimiters to mark fields of data structures. FS is a higher level separator than GS, RS, and US.*
 *
 * @example `\`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const FS = FS_CONTROL.toString();

/**
 * C0: Group Separator (`GS`)
 *
 * Can be used as delimiters to mark fields of data structures. GS is a mid-level separator between FS and RS.
 *
 * @example `0x1D`
 * @example `]`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const GS_CONTROL = new C0(0x1d);
/**
 * String: Group Separator (`GS`)
 *
 * Can be used as delimiters to mark fields of data structures. GS is a mid-level separator between FS and RS.*
 *
 * @example `]`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const GS = GS_CONTROL.toString();

/**
 * C0: Record Separator (`RS`)
 *
 * Can be used as delimiters to mark fields of data structures. RS is a lower level separator than GS but higher than US.
 *
 * @example `0x1E`
 * @example `^`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const RS_CONTROL = new C0(0x1e);
/**
 * String: Record Separator (`RS`)
 *
 * Can be used as delimiters to mark fields of data structures. RS is a lower level separator than GS but higher than US.*
 *
 * @example `^`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const RS = RS_CONTROL.toString();

/**
 * C0: Unit Separator (`US`)
 *
 * Can be used as delimiters to mark fields of data structures. US is the lowest level separator.
 *
 * @example `0x1F`
 * @example `_`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const US_CONTROL = new C0(0x1f);
/**
 * String: Unit Separator (`US`)
 *
 * Can be used as delimiters to mark fields of data structures. US is the lowest level separator.*
 *
 * @example `_`
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const US = US_CONTROL.toString();

// Aliases

/**
 * Tab
 * @see {@link HT}
 */
export const TAB = HT;
export const TAB_CONTROL = HT_CONTROL;
/**
 * Newline
 * @see {@link LF}
 */
export const NEWLINE = LF;
export const NEWLINE_CONTROL = LF_CONTROL;
/**
 * Return
 * @see {@link CR}
 */
export const RETURN = CR;
export const RETURN_CONTROL = CR_CONTROL;
/**
 * Escape
 * @see {@link ESC}
 */
export const ESCAPE = ESC;
export const ESCAPE_CONTROL = ESC_CONTROL;
/**
 * XON
 * @see {@link DC1}
 */
export const XON = DC1;
export const XON_CONTROL = DC1_CONTROL;
/**
 * XOFF
 * @see {@link DC3}
 */
export const XOFF = DC3;
export const XOFF_CONTROL = DC3_CONTROL;
/**
 * Bell
 * @see {@link BEL}
 */
export const BELL = BEL;
export const BELL_CONTROL = BEL_CONTROL;
