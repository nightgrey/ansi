/**
 * Represents a terminal status report.
 */
export abstract class StatusReport {}

/**
 * Represents an ANSI terminal status report.
 */
export class ANSIStatusReport extends Number implements StatusReport {}

/**
 * Represents a DEC terminal status report.
 */
export class DECStatusReport extends Number implements StatusReport {}

/**
 * Device Status Report (`DSR`) is a control sequence that reports the terminal's status.
 * The terminal responds with a `DSR` sequence.
 *
 * ```
 * CSI Ps n
 * ```
 * ```
 * CSI ? Ps n
 * ```
 *
 * If one of the statuses is a DECStatusReport, the sequence will use the DEC format.
 *
 * @param statuses - The status reports to include
 * @returns The `DSR` escape sequence
 * @see https://vt100.net/docs/vt510-rm/DSR.html
 */
export function deviceStatusReport(...statuses: StatusReport[]): string {
  let dec = false;
  const list: string[] = [];
  let seq = "\x1b[";

  for (const status of statuses) {
    list.push(status.toString());
    if (status instanceof DECStatusReport) {
      dec = true;
    }
  }

  if (dec) {
    seq += "?";
  }

  return seq + list.join(";") + "n";
}

/**
 * `DSR` is an alias for {@link deviceStatusReport}.
 */
export function DSR(status: StatusReport): string {
  return deviceStatusReport(status);
}

/**
 * An escape sequence that requests the current cursor position.
 *
 * ```
 * CSI 6 n
 * ```
 *
 * The terminal will report the cursor position as a `CSI` sequence in the
 * following format:
 *
 * ```
 * CSI Pl ; Pc R
 * ```
 *
 * Where Pl is the line number and Pc is the column number.
 * @see https://vt100.net/docs/vt510-rm/CPR.html
 */
export const REQUEST_CURSOR_POSITION_REPORT = "\x1b[6n";

/**
 * Request Extended Cursor Position Report (`DECXCPR`) is a sequence for requesting
 * the cursor position report including the current page number.
 *
 * ```
 * CSI ? 6 n
 * ```
 *
 * The terminal will report the cursor position as a `CSI` sequence in the
 * following format:
 *
 * ```
 * CSI ? Pl ; Pc ; Pp R
 * ```
 *
 * Where Pl is the line number, Pc is the column number, and Pp is the page number.
 * @see https://vt100.net/docs/vt510-rm/DECXCPR.html
 */
export const REQUEST_EXTENDED_CURSOR_POSITION_REPORT = "\x1b[?6n";

/**
 * A control sequence that requests the terminal to report its operating system
 * light/dark color preference. Supported terminals should respond with a
 * {@link lightDarkReport} sequence as follows:
 *
 * ```
 * CSI ? 997 ; 1 n
 * ```
 *
 * for dark mode
 *
 * ```
 * CSI ? 997 ; 2 n
 * ```
 *
 * for light mode
 *
 * @see https://contour-terminal.org/vt-extensions/color-palette-update-notifications/
 */
export const REQUEST_LIGHT_DARK_REPORT = "\x1b[?996n";

/**
 * Cursor Position Report (`CPR`) is a control sequence that reports the cursor's position.
 *
 * ```
 * CSI Pl ; Pc R
 * ```
 *
 * Where Pl is the line number and Pc is the column number.
 *
 * @param line - The line number (minimum 1)
 * @param column - The column number (minimum 1)
 * @returns The `CPR` escape sequence
 * @see https://vt100.net/docs/vt510-rm/CPR.html
 */
export function cursorPositionReport(line: number, column: number): string {
  if (line < 1) {
    line = 1;
  }
  if (column < 1) {
    column = 1;
  }
  return "\x1b[" + line.toString() + ";" + column.toString() + "R";
}

/**
 * `CPR` is an alias for {@link cursorPositionReport}.
 */
export function CPR(line: number, column: number): string {
  return cursorPositionReport(line, column);
}

/**
 * Extended Cursor Position Report (`DECXCPR`) is a control sequence that reports the
 * cursor's position along with the page number (optional).
 *
 * ```
 * CSI ? Pl ; Pc R
 * ```
 * ```
 * CSI ? Pl ; Pc ; Pv R
 * ```
 *
 * Where Pl is the line number, Pc is the column number, and Pv is the page number.
 *
 * If the page number is zero or negative, the returned sequence won't include
 * the page number.
 *
 * @param line - The line number (minimum 1)
 * @param column - The column number (minimum 1)
 * @param page - The page number (optional if < 1)
 * @returns The `DECXCPR` escape sequence
 * @see https://vt100.net/docs/vt510-rm/DECXCPR.html
 */
export function extendedCursorPositionReport(
  line: number,
  column: number,
  page: number,
): string {
  if (line < 1) {
    line = 1;
  }
  if (column < 1) {
    column = 1;
  }
  if (page < 1) {
    return "\x1b[?" + line.toString() + ";" + column.toString() + "R";
  }
  return (
    "\x1b[?" +
    line.toString() +
    ";" +
    column.toString() +
    ";" +
    page.toString() +
    "R"
  );
}

/**
 * `DECXCPR` is an alias for {@link extendedCursorPositionReport}.
 */
export function DECXCPR(line: number, column: number, page: number): string {
  return extendedCursorPositionReport(line, column, page);
}

/**
 * Light Dark Report is a control sequence that reports the terminal's operating
 * system light/dark color preference.
 *
 * ```
 * CSI ? 997 ; 1 n
 * ```
 * for dark mode
 *
 * ```
 * CSI ? 997 ; 2 n
 * ```
 * for light mode
 *
 * @param dark - Whether dark mode is enabled
 * @returns The light/dark report escape sequence
 * @see https://contour-terminal.org/vt-extensions/color-palette-update-notifications/
 */
export function lightDarkReport(dark: boolean): string {
  if (dark) {
    return "\x1b[?997;1n";
  }
  return "\x1b[?997;2n";
}
