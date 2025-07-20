import { BEL, ESC } from "./c0";
import { ST } from "./c1";
import { type RgbColor, rgb } from "./color";

/**
 * Returns a sequence that sets the default terminal foreground color.
 *
 * ```
 * OSC 10 ; color ST
 *
 * OSC 10 ; color BEL
 * ```
 *
 * Where color is the encoded color number. Most terminals support hex,
 * XParseColor rgb: and rgba: strings.
 *
 * @param s The color value
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export function setForegroundColor(s: string): string {
  return `\x1b]10;${s}\x07`;
}

/**
 * A sequence that requests the current default terminal foreground color.
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export const requestForegroundColor = "\x1b]10;?\x07";

/**
 * A sequence that resets the default terminal foreground color.
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export const resetForegroundColor = "\x1b]110\x07";

/**
 * Returns a sequence that sets the default terminal background color.
 *
 * ```
 * OSC 11 ; color ST
 * OSC 11 ; color BEL
 * ```
 *
 * Where color is the encoded color number. Most terminals support hex,
 * XParseColor rgb: and rgba: strings.
 *
 * @param s The color value
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export function setBackgroundColor(s: string): string {
  return `\x1b]11;${s}\x07`;
}

/**
 * A sequence that requests the current default terminal background color.
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export const requestBackgroundColor = "\x1b]11;?\x07";

/**
 * A sequence that resets the default terminal background color.
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export const resetBackgroundColor = "\x1b]111\x07";

/**
 * Returns a sequence that sets the terminal cursor color.
 *
 * ```
 * OSC 12 ; color ST
 *
 * OSC 12 ; color BEL
 * ```
 *
 * Where color is the encoded color number. Most terminals support hex,
 * XParseColor rgb: and rgba: strings.
 *
 * @param s The color value
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export function setCursorColor(s: string): string {
  return `\x1b]12;${s}\x07`;
}

/**
 * A sequence that requests the current terminal cursor color.
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export const requestCursorColor = "\x1b]12;?\x07";

/**
 * A sequence that resets the terminal cursor color.
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export const resetCursorColor = "\x1b]112\x07";

/**
 * Parses a terminal color sequence.
 *
 * @param string - the string to parse
 * @returns the parsed color
 */
export function parseTerminalColorSequence(string: string): RgbColor {
  if (string.length < 24 || string.length > 25) {
    throw new TypeError("String must have a length of < 24 or > 25");
  }

  let trimmed = string;
  if (string.endsWith(BEL.toString())) {
    trimmed = string.slice(0, -BEL.length);
  } else if (string.endsWith(ESC.toString())) {
    trimmed = string.slice(0, -ESC.length);
  } else if (string.endsWith(ST.toString())) {
    trimmed = string.slice(0, -ST.length);
  } else {
    throw new TypeError("String did not end with BEL, ESC or ST");
  }

  trimmed = trimmed.slice(4);

  const prefix = ";rgb:";
  if (!trimmed.startsWith(prefix)) {
    throw new TypeError("String did not start with ';rgb:'");
  }
  trimmed = trimmed.slice(prefix.length);

  const parts = trimmed.split("/");
  if (parts.length !== 3) {
    throw new TypeError("String could not be split in three parts");
  }

  return rgb(
    "#" + parts[0]?.slice(0, 2) + parts[1]?.slice(0, 2) + parts[2]?.slice(0, 2),
  );
}
