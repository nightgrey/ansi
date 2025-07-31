import { TextEncoder } from "node:util";

const encoder = new TextEncoder();

/**
 * Converts a string to uppercase hexadecimal representation.
 * @param str - The string to encode
 * @returns The uppercase hex-encoded string
 */
function stringToHex(str: string): string {
  const out: string[] = [];

  for (const byte of encoder.encode(str)) {
    out.push(byte.toString(16).padStart(2, "0"));
  }

  return out.join("").toUpperCase();
}

/**
 * Request Termcap (XTGETTCAP) requests Termcap/Terminfo strings.
 *
 * ```
 * DCS + q <Pt> ST
 * ```
 *
 * Where `<Pt>` is a list of Termcap/Terminfo capabilities, encoded in 2-digit
 * hexadecimals, separated by semicolons.
 *
 * @param caps - The Termcap/Terminfo capabilities to request
 * @returns The XTGETTCAP escape sequence
 * @see https://man7.org/linux/man-pages/man5/terminfo.5.html
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export function xtgettcap(...caps: string[]): string {
  if (caps.length === 0) {
    return "";
  }

  let s = "\x1bP+q";
  for (let i = 0; i < caps.length; i++) {
    if (i > 0) {
      s += ";";
    }
    s += stringToHex(caps[i]);
  }

  return s + "\x1b\\";
}

/**
 * requestTermcap is an alias for {@link xtgettcap}.
 */
export function requestTermcap(...caps: string[]): string {
  return xtgettcap(...caps);
}

/**
 * requestTerminfo is an alias for {@link xtgettcap}.
 */
export function requestTerminfo(...caps: string[]): string {
  return xtgettcap(...caps);
}
