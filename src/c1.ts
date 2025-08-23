import { C1 } from "./ansi";
import { XOFF } from "./c0";

/**
 * C0 control characters.
 *
 * These range from (0x80-0x9F) as defined in ISO 6429 (ECMA-48).
 *
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */

/**
 * C1: Padding Character (`PAD`)
 *
 * Proposed as a "padding" or "high byte" for single-byte characters to make them two bytes long for easier interoperability with multiple byte characters.Extended Unix Code(EUC) occasionally uses this.
 *
 * @example
 * ```
 * 0x80
 * ```
 * @example
 * ```
 * @
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PAD_CONTROL = new C1(0x80);
/**
 * String: `ESC` + Padding Character (`PAD`)
 * Proposed as a "padding" or "high byte" for single-byte characters to make them two bytes long for easier interoperability with multiple byte characters.Extended Unix Code(EUC) occasionally uses this. *
 *
 * @example
 * ```
 * ESC + "@"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PAD = PAD_CONTROL.toString();

/**
 * C1: High Octet Preset (`HOP`)
 *
 * Proposed to set the high byte of a sequence of multiple byte characters so they only need one byte each, as a simple form of data compression.
 *
 * @example
 * ```
 * 0x81
 * ```
 * @example
 * ```
 * A
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const HOP_CONTROL = new C1(0x81);
/**
 * String: `ESC` + High Octet Preset (`HOP`)
 * Proposed to set the high byte of a sequence of multiple byte characters so they only need one byte each, as a simple form of data compression. *
 *
 * @example
 * ```
 * ESC + "A"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const HOP = HOP_CONTROL.toString();

/**
 * C1: Break Permitted Here (`BPH`)
 *
 * Follows a graphic character where a line break is permitted. Roughly equivalent to a soft hyphen or zero-width space except it does not define what is printed at the line break.
 *
 * @example
 * ```
 * 0x82
 * ```
 * @example
 * ```
 * B
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const BPH_CONTROL = new C1(0x82);
/**
 * String: `ESC` + Break Permitted Here (`BPH`)
 * Follows a graphic character where a line break is permitted. Roughly equivalent to a soft hyphen or zero-width space except it does not define what is printed at the line break. *
 *
 * @example
 * ```
 * ESC + "B"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const BPH = BPH_CONTROL.toString();

/**
 * C1: No Break Here (`NBH`)
 *
 * Follows the graphic character that is not to be broken. See also word joiner.
 *
 * @example
 * ```
 * 0x83
 * ```
 * @example
 * ```
 * C
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const NBH_CONTROL = new C1(0x83);
/**
 * String: `ESC` + No Break Here (`NBH`)
 * Follows the graphic character that is not to be broken. See also word joiner. *
 *
 * @example
 * ```
 * ESC + "C"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const NBH = NBH_CONTROL.toString();

/**
 * C1: Index (`IND`)
 *
 * Move down one line without moving horizontally, to eliminate ambiguity about the meaning of LF.
 *
 * @example
 * ```
 * 0x84
 * ```
 * @example
 * ```
 * D
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const IND_CONTROL = new C1(0x84);
/**
 * String: `ESC` + Index (`IND`)
 * Move down one line without moving horizontally, to eliminate ambiguity about the meaning of LF. *
 *
 * @example
 * ```
 * ESC + "D"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const IND = IND_CONTROL.toString();

/**
 * C1: Next Line (`NEL`)
 *
 * Equivalent to CR+LF, to match the EBCDIC control character.
 *
 * @example
 * ```
 * 0x85
 * ```
 * @example
 * ```
 * E
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const NEL_CONTROL = new C1(0x85);
/**
 * String: `ESC` + Next Line (`NEL`)
 * Equivalent to CR+LF, to match the EBCDIC control character. *
 *
 * @example
 * ```
 * ESC + "E"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const NEL = NEL_CONTROL.toString();

/**
 * C1: Start of Selected Area (`SSA`)
 *
 * Used by block-oriented terminals. In xterm ESC F moves to the lower-left corner of the screen, since certain software assumes this behaviour.
 *
 * @example
 * ```
 * 0x86
 * ```
 * @example
 * ```
 * F
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SSA_CONTROL = new C1(0x86);
/**
 * String: `ESC` + Start of Selected Area (`SSA`)
 * Used by block-oriented terminals. In xterm ESC F moves to the lower-left corner of the screen, since certain software assumes this behaviour. *
 *
 * @example
 * ```
 * ESC + "F"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SSA = SSA_CONTROL.toString();

/**
 * C1: End of Selected Area (`ESA`)
 *
 * Used by block-oriented terminals.
 *
 * @example
 * ```
 * 0x87
 * ```
 * @example
 * ```
 * G
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ESA_CONTROL = new C1(0x87);
/**
 * String: `ESC` + End of Selected Area (`ESA`)
 * Used by block-oriented terminals. *
 *
 * @example
 * ```
 * ESC + "G"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ESA = ESA_CONTROL.toString();

/**
 * C1: Character Tabulation Set / Horizontal Tabulation Set (`HTS`)
 *
 * Set a tab stop at the current position.
 *
 * @example
 * ```
 * 0x88
 * ```
 * @example
 * ```
 * H
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const HTS_CONTROL = new C1(0x88);
/**
 * String: `ESC` + Character Tabulation Set / Horizontal Tabulation Set (`HTS`)
 * Set a tab stop at the current position. *
 *
 * @example
 * ```
 * ESC + "H"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const HTS = HTS_CONTROL.toString();

/**
 * C1: Character Tabulation With Justification / Horizontal Tabulation With Justification (`HTJ`)
 *
 * Right-justify the text since the last tab against the next tab stop.
 *
 * @example
 * ```
 * 0x89
 * ```
 * @example
 * ```
 * I
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const HTJ_CONTROL = new C1(0x89);
/**
 * String: `ESC` + Character Tabulation With Justification / Horizontal Tabulation With Justification (`HTJ`)
 * Right-justify the text since the last tab against the next tab stop. *
 *
 * @example
 * ```
 * ESC + "I"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const HTJ = HTJ_CONTROL.toString();

/**
 * C1: Line Tabulation Set / Vertical Tabulation Set (`VTS`)
 *
 * Set a vertical tab stop.
 *
 * @example
 * ```
 * 0x8A
 * ```
 * @example
 * ```
 * J
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const VTS_CONTROL = new C1(0x8a);
/**
 * String: `ESC` + Line Tabulation Set / Vertical Tabulation Set (`VTS`)
 * Set a vertical tab stop. *
 *
 * @example
 * ```
 * ESC + "J"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const VTS = VTS_CONTROL.toString();

/**
 * C1: Partial Line Forward / Partial Line Down (`PLD`)
 *
 * To produce subscripts and superscripts in ISO/IEC 6429. Subscripts use PLD text PLU while superscripts use PLU text PLD.
 *
 * @example
 * ```
 * 0x8B
 * ```
 * @example
 * ```
 * K
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PLD_CONTROL = new C1(0x8b);
/**
 * String: `ESC` + Partial Line Forward / Partial Line Down (`PLD`)
 * To produce subscripts and superscripts in ISO/IEC 6429. Subscripts use PLD text PLU while superscripts use PLU text PLD. *
 *
 * @example
 * ```
 * ESC + "K"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PLD = PLD_CONTROL.toString();

/**
 * C1: Partial Line Backward / Partial Line Up (`PLU`)
 *
 * To produce subscripts and superscripts in ISO/IEC 6429. Subscripts use PLD text PLU while superscripts use PLU text PLD.
 *
 * @example
 * ```
 * 0x8C
 * ```
 * @example
 * ```
 * L
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PLU_CONTROL = new C1(0x8c);
/**
 * String: `ESC` + Partial Line Backward / Partial Line Up (`PLU`)
 * To produce subscripts and superscripts in ISO/IEC 6429. Subscripts use PLD text PLU while superscripts use PLU text PLD. *
 *
 * @example
 * ```
 * ESC + "L"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PLU = PLU_CONTROL.toString();

/**
 * C1: Reverse Line Feed / Reverse Index (`RI`)
 *
 * Move up one line.
 *
 * @example
 * ```
 * 0x8D
 * ```
 * @example
 * ```
 * M
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const RI_CONTROL = new C1(0x8d);
/**
 * String: `ESC` + Reverse Line Feed / Reverse Index (`RI`)
 * Move up one line. *
 *
 * @example
 * ```
 * ESC + "M"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const RI = RI_CONTROL.toString();

/**
 * C1: Single-Shift 2 (`SS2`)
 *
 * Next character is from the G2 set.
 *
 * @example
 * ```
 * 0x8E
 * ```
 * @example
 * ```
 * N
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SS2_CONTROL = new C1(0x8e);
/**
 * String: `ESC` + Single-Shift 2 (`SS2`)
 * Next character is from the G2 set. *
 *
 * @example
 * ```
 * ESC + "N"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SS2 = SS2_CONTROL.toString();

/**
 * C1: Single-Shift 3 (`SS3`)
 *
 * Next character is from the G3 set.
 *
 * @example
 * ```
 * 0x8F
 * ```
 * @example
 * ```
 * O
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SS3_CONTROL = new C1(0x8f);
/**
 * String: `ESC` + Single-Shift 3 (`SS3`)
 * Next character is from the G3 set. *
 *
 * @example
 * ```
 * ESC + "O"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SS3 = SS3_CONTROL.toString();

/**
 * C1: Device Control String (`DCS`)
 *
 * Followed by a string of printable characters (0x20 through 0x7E) and format effectors (0x08 through 0x0D), terminated by ST(0x9C).Xterm defined a number of these.
 *
 * @example
 * ```
 * 0x90
 * ```
 * @example
 * ```
 * P
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DCS_CONTROL = new C1(0x90);
/**
 * String: `ESC` + Device Control String (`DCS`)
 * Followed by a string of printable characters (0x20 through 0x7E) and format effectors (0x08 through 0x0D), terminated by ST(0x9C).Xterm defined a number of these. *
 *
 * @example
 * ```
 * ESC + "P"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const DCS = DCS_CONTROL.toString();

/**
 * C1: Private Use 1 (`PU1`)
 *
 * Reserved for private function agreed on between the sender and the recipient of the data.
 *
 * @example
 * ```
 * 0x91
 * ```
 * @example
 * ```
 * Q
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PU1_CONTROL = new C1(0x91);
/**
 * String: `ESC` + Private Use 1 (`PU1`)
 * Reserved for private function agreed on between the sender and the recipient of the data. *
 *
 * @example
 * ```
 * ESC + "Q"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PU1 = PU1_CONTROL.toString();

/**
 * C1: Private Use 2 (`PU2`)
 *
 * Reserved for private function agreed on between the sender and the recipient of the data.
 *
 * @example
 * ```
 * 0x92
 * ```
 * @example
 * ```
 * R
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PU2_CONTROL = new C1(0x92);
/**
 * String: `ESC` + Private Use 2 (`PU2`)
 * Reserved for private function agreed on between the sender and the recipient of the data. *
 *
 * @example
 * ```
 * ESC + "R"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PU2 = PU2_CONTROL.toString();

/**
 * C1: Set Transmit State (`STS`)
 *
 * Set transmit state.
 *
 * @example
 * ```
 * 0x93
 * ```
 * @example
 * ```
 * S
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const STS_CONTROL = new C1(0x93);
/**
 * String: `ESC` + Set Transmit State (`STS`)
 * Set transmit state. *
 *
 * @example
 * ```
 * ESC + "S"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const STS = STS_CONTROL.toString();

/**
 * C1: Cancel Character (`CCH`)
 *
 * Destructive backspace, to eliminate ambiguity about meaning of BS.
 *
 * @example
 * ```
 * 0x94
 * ```
 * @example
 * ```
 * T
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const CCH_CONTROL = new C1(0x94);
/**
 * String: `ESC` + Cancel Character (`CCH`)
 * Destructive backspace, to eliminate ambiguity about meaning of BS. *
 *
 * @example
 * ```
 * ESC + "T"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const CCH = CCH_CONTROL.toString();
/**
 * C1: Message Waiting (`MW`)
 *
 * Message waiting indicator.
 *
 * @example
 * ```
 * 0x95
 * ```
 * @example
 * ```
 * U
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const MW_CONTROL = new C1(0x95);
/**
 * String: `ESC` + Message Waiting (`MW`)
 * Message waiting indicator. *
 *
 * @example
 * ```
 * ESC + "U"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const MW = MW_CONTROL.toString();

/**
 * C1: Start of Protected Area (`SPA`)
 *
 * Used by block-oriented terminals.
 *
 * @example
 * ```
 * 0x96
 * ```
 * @example
 * ```
 * V
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SPA_CONTROL = new C1(0x96);
/**
 * String: `ESC` + Start of Protected Area (`SPA`)
 * Used by block-oriented terminals. *
 *
 * @example
 * ```
 * ESC + "V"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SPA = SPA_CONTROL.toString();

/**
 * C1: End of Protected Area (`EPA`)
 *
 * Used by block-oriented terminals.
 *
 * @example
 * ```
 * 0x97
 * ```
 * @example
 * ```
 * W
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const EPA_CONTROL = new C1(0x97);
/**
 * String: `ESC` + End of Protected Area (`EPA`)
 * Used by block-oriented terminals. *
 *
 * @example
 * ```
 * ESC + "W"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const EPA = EPA_CONTROL.toString();

/**
 * C1: Start of String (`SOS`)
 *
 * Followed by a control string terminated by ST (0x9C) which (unlike DCS, OSC, PM or APC) may contain any character except SOS or ST.
 *
 * @example
 * ```
 * 0x98
 * ```
 * @example
 * ```
 * X
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SOS_CONTROL = new C1(0x98);
/**
 * String: `ESC` + Start of String (`SOS`)
 * Followed by a control string terminated by ST (0x9C) which (unlike DCS, OSC, PM or APC) may contain any character except SOS or ST. *
 *
 * @example
 * ```
 * ESC + "X"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SOS = SOS_CONTROL.toString();

/**
 * C1: Single Graphic Character Introducer (`SGC`)
 *
 * Intended to allow an arbitrary Unicode character to be printed; it would be followed by that character, most likely encoded in UTF-1.
 *
 * @example
 * ```
 * 0x99
 * ```
 * @example
 * ```
 * Y
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SGC_CONTROL = new C1(0x99);
/**
 * String: `ESC` + Single Graphic Character Introducer (`SGC`)
 * Intended to allow an arbitrary Unicode character to be printed; it would be followed by that character, most likely encoded in UTF-1. *
 *
 * @example
 * ```
 * ESC + "Y"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SGC = SGC_CONTROL.toString();

/**
 * C1: Single Character Introducer (`SCI`)
 *
 * To be followed by a single printable character (0x20 through 0x7E) or format effector (0x08 through 0x0D), and to print it as ASCII no matter what graphic or control sets were in use.
 *
 * @example
 * ```
 * 0x9A
 * ```
 * @example
 * ```
 * Z
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SCI_CONTROL = new C1(0x9a);
/**
 * String: `ESC` + Single Character Introducer (`SCI`)
 * To be followed by a single printable character (0x20 through 0x7E) or format effector (0x08 through 0x0D), and to print it as ASCII no matter what graphic or control sets were in use. *
 *
 * @example
 * ```
 * ESC + "Z"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const SCI = SCI_CONTROL.toString();

/**
 * C1: Control Sequence Introducer (`CSI`)
 *
 * Used to introduce control sequences that take parameters. Used for ANSI escape sequences.
 *
 * @example
 * ```
 * 0x9B
 * ```
 * @example
 * ```
 * [
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const CSI_CONTROL = new C1(0x9b);
/**
 * String: `ESC` + Control Sequence Introducer (`CSI`)
 * Used to introduce control sequences that take parameters. Used for ANSI escape sequences. *
 *
 * @example
 * ```
 * ESC + "["
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const CSI = CSI_CONTROL.toString();

/**
 * C1: String Terminator (`ST`)
 *
 * Terminates a string started by DCS, SOS, OSC, PM or APC.
 *
 * @example
 * ```
 * 0x9C
 * ```
 * @example
 * ```
 * \\
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ST_CONTROL = new C1(0x9c);
/**
 * String: `ESC` + String Terminator (`ST`)
 * Terminates a string started by DCS, SOS, OSC, PM or APC. *
 *
 * @example
 * ```
 * ESC + `"\"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const ST = ST_CONTROL.toString();

/**
 * C1: Operating System Command (`OSC`)
 *
 * Followed by a string of printable characters (0x20 through 0x7E) and format effectors (0x08 through 0x0D), terminated by ST (0x9C), intended for use to allow in-band signaling of protocol information, but rarely used for that purpose. Some terminal emulators, including xterm, use OSC sequences for setting the window title and changing the colour palette.
 *
 * @example
 * ```
 * 0x9D
 * ```
 * @example
 * ```
 * ]
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const OSC_CONTROL = new C1(0x9d);
/**
 * String: `ESC` + Operating System Command (`OSC`)
 * Followed by a string of printable characters (0x20 through 0x7E) and format effectors (0x08 through 0x0D), terminated by ST (0x9C), intended for use to allow in-band signaling of protocol information, but rarely used for that purpose. Some terminal emulators, including xterm, use OSC sequences for setting the window title and changing the colour palette. *
 *
 * @example
 * ```
 * ESC + "]"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const OSC = OSC_CONTROL.toString();

/**
 * C1: Privacy Message (`PM`)
 *
 * Privacy message for private communication.
 *
 * @example
 * ```
 * 0x9E
 * ```
 * @example
 * ```
 * ^
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PM_CONTROL = new C1(0x9e);
/**
 * String: `ESC` + Privacy Message (`PM`)
 * Privacy message for private communication. *
 *
 * @example
 * ```
 * ESC + "^"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const PM = PM_CONTROL.toString();

/**
 * C1: Application Program Command (`APC`)
 *
 * Application program command. Kermit used APC to transmit commands.
 *
 * @example
 * ```
 * 0x9F
 * ```
 * @example
 * ```
 * _
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const APC_CONTROL = new C1(0x9f);
/**
 * String: `ESC` + Application Program Command (`APC`)
 * Application program command. Kermit used APC to transmit commands. *
 *
 * @example
 * ```
 * ESC + "_"
 * ```
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
export const APC = APC_CONTROL.toString();
