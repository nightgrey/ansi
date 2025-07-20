import { ESC } from "./c0";

/**
 * Wraps the given ANSI sequence in a `DCS` passthrough sequence to be sent to the outer terminal.
 * This is used to send raw escape sequences to the outer terminal when running inside GNU Screen.
 *
 * ```
 * DCS <data> ST
 * ```
 *
 * Note: Screen limits the length of string sequences to 768 bytes (since 2014).
 * Use zero to indicate no limit, otherwise, this will chunk the returned
 * string into limit sized chunks.
 *
 * @param seq - The ANSI sequence to wrap
 * @param limit - Maximum chunk size (0 for no limit)
 * @returns The wrapped sequence for GNU Screen passthrough
 * @see https://www.gnu.org/software/screen/manual/screen.html#String-Escapes
 * @see https://git.savannah.gnu.org/cgit/screen.git/tree/src/screen.h?id=c184c6ec27683ff1a860c45be5cf520d896fd2ef#n44
 */
export function screenPassthrough(seq: string, limit: number): string {
  let result = "\x1bP";

  if (limit > 0) {
    for (let i = 0; i < seq.length; i += limit) {
      const end = Math.min(i + limit, seq.length);
      result += seq.slice(i, end);
      if (end < seq.length) {
        result += "\x1b\\\x1bP";
      }
    }
  } else {
    result += seq;
  }

  result += "\x1b\\";
  return result;
}

/**
 * Wraps the given ANSI sequence in a special `DCS` passthrough sequence to be sent to the outer terminal.
 * This is used to send raw escape sequences to the outer terminal when running inside Tmux.
 *
 * ```
 * DCS tmux ; <escaped-data> ST
 * ```
 *
 * Where <escaped-data> is the given sequence in which all occurrences of {@link ESC}
 * (0x1b) are doubled i.e. replaced with {@link ESC} {@link ESC} (0x1b 0x1b).
 *
 * Note: this needs the `allow-passthrough` option to be set to `on`.
 *
 * @param seq - The ANSI sequence to wrap
 * @returns The wrapped sequence for Tmux passthrough
 * @see https://github.com/tmux/tmux/wiki/FAQ#what-is-the-passthrough-escape-sequence-and-how-do-i-use-it
 */
export function tmuxPassthrough(seq: string): string {
  let result = "\x1bPtmux;";

  for (let i = 0; i < seq.length; i++) {
    if (seq[i] === ESC.toString()) {
      result += ESC.toString()
    }
    result += seq[i];
  }

  result += "\x1b\\";
  return result;
}
