/**
 * A window operation that resizes the terminal window.
 */
export const RESIZE_WINDOW_WINOP = 4;

/**
 * A window operation that requests a report of the size of the terminal window in pixels.
 * The response is in the form:
 *
 * ```
 * CSI 4 ; height ; width t
 * ```
 */
export const REQUEST_WINDOW_SIZE_WINOP = 14;

/**
 * A window operation that requests a report of the size of the terminal cell size in pixels.
 * The response is in the form:
 *
 * ```
 * CSI 6 ; height ; width t
 * ```
 */
export const REQUEST_CELL_SIZE_WINOP = 16;

/**
 * Window Operation (XTWINOPS) is a sequence that manipulates the terminal window.
 *
 * ```
 * CSI Ps ; Ps ; Ps t
 * ```
 *
 * `Ps` is a semicolon-separated list of parameters.
 *
 * @param p - The primary parameter
 * @param ps - Additional parameters (non-negative values only)
 * @returns The window operation escape sequence
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h4-Functions-using-CSI-_-ordered-by-the-final-character-lparen-s-rparen:CSI-Ps;Ps;Ps-t.1EB0
 */
export function windowOp(p: number, ...ps: number[]): string {
  if (p <= 0) {
    return "";
  }

  if (ps.length === 0) {
    return "\x1b[" + p.toString() + "t";
  }

  const params: string[] = [p.toString()];
  for (const param of ps) {
    if (param >= 0) {
      params.push(param.toString());
    }
  }

  return "\x1b[" + params.join(";") + "t";
}

/**
 * xtwinops is an alias for {@link windowOp}.
 */
export function xtwinops(p: number, ...ps: number[]): string {
  return windowOp(p, ...ps);
}
