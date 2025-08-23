/**
 * saveCursor (DECSC) is an escape sequence that saves the current cursor
 * position.
 *
 * ```ESC 7```
 *
 * @see https://vt100.net/docs/vt510-rm/DECSC.html
 */
export const saveCursor = "\x1b7";
export const DECSC = saveCursor;

/**
 * restoreCursor (DECRC) is an escape sequence that restores the cursor
 * position.
 *
 * ```ESC 8```
 *
 * @see https://vt100.net/docs/vt510-rm/DECRC.html
 */
export const restoreCursor = "\x1b8";
export const DECRC = restoreCursor;

/**
 * requestCursorPosition is an escape sequence that requests the current cursor
 * position.
 *
 * ```CSI 6 n```
 *
 * The terminal will report the cursor position as a CSI sequence in the
 * following format:
 *
 * ```CSI Pl ; Pc R```
 *
 * Where Pl is the line number and Pc is the column number.
 * @see https://vt100.net/docs/vt510-rm/CPR.html
 *
 * @deprecated use {@link REQUEST_CURSOR_POSITION_REPORT} instead.
 */
export const requestCursorPosition = "\x1b[6n";

/**
 * requestExtendedCursorPosition (DECXCPR) is a sequence for requesting the
 * cursor position report including the current page number.
 *
 * ```CSI ? 6 n```
 *
 * The terminal will report the cursor position as a CSI sequence in the
 * following format:
 *
 * ```CSI ? Pl ; Pc ; Pp R```
 *
 * Where Pl is the line number, Pc is the column number, and Pp is the page
 * number.
 * @see https://vt100.net/docs/vt510-rm/DECXCPR.html
 *
 * @deprecated use {@link REQUEST_EXTENDED_CURSOR_POSITION_REPORT} instead.
 */
export const requestExtendedCursorPosition = "\x1b[?6n";

/**
 * cursorUp (CUU) returns a sequence for moving the cursor up n cells.
 *
 * ```CSI n A```
 *
 * @see https://vt100.net/docs/vt510-rm/CUU.html
 */
export function cursorUp(n: number): string {
  return `\x1b[${n > 1 ? n : ""}A`;
}

/**
 * CUU is an alias for {@link cursorUp}.
 */
export function CUU(n: number): string {
  return cursorUp(n);
}

/** CUU1 is a sequence for moving the cursor up one cell. */
export const CUU1 = "\x1b[A";

/**
 * cursorDown (CUD) returns a sequence for moving the cursor down n cells.
 *
 * ```CSI n B```
 *
 * @see https://vt100.net/docs/vt510-rm/CUD.html
 */
export function cursorDown(n: number): string {
  return `\x1b[${n > 1 ? n : ""}B`;
}

/**
 * CUD is an alias for {@link cursorDown}.
 */
export function CUD(n: number): string {
  return cursorDown(n);
}

/** CUD1 is a sequence for moving the cursor down one cell. */
export const CUD1 = "\x1b[B";

/**
 * cursorForward (CUF) returns a sequence for moving the cursor right n cells.
 *
 * ```CSI n C```
 *
 * @see https://vt100.net/docs/vt510-rm/CUF.html
 */
export function cursorForward(n: number): string {
  return `\x1b[${n > 1 ? n : ""}C`;
}

/**
 * CUF is an alias for {@link cursorForward}.
 */
export function CUF(n: number): string {
  return cursorForward(n);
}

/** CUF1 is a sequence for moving the cursor right one cell. */
export const CUF1 = "\x1b[C";

/**
 * cursorBackward (CUB) returns a sequence for moving the cursor left n cells.
 *
 * ```CSI n D```
 *
 * @see https://vt100.net/docs/vt510-rm/CUB.html
 */
export function cursorBackward(n: number): string {
  return `\x1b[${n > 1 ? n : ""}D`;
}

/**
 * CUB is an alias for {@link cursorBackward}.
 */
export function CUB(n: number): string {
  return cursorBackward(n);
}

/** CUB1 is a sequence for moving the cursor left one cell. */
export const CUB1 = "\x1b[D";

/**
 * cursorNextLine (CNL) returns a sequence for moving the cursor to the
 * beginning of the next line n times.
 *
 * ```CSI n E```
 *
 * @see https://vt100.net/docs/vt510-rm/CNL.html
 */
export function cursorNextLine(n: number): string {
  return `\x1b[${n > 1 ? n : ""}E`;
}

/**
 * CNL is an alias for {@link cursorNextLine}.
 */
export function CNL(n: number): string {
  return cursorNextLine(n);
}

/**
 * cursorPreviousLine (CPL) returns a sequence for moving the cursor to the
 * beginning of the previous line n times.
 *
 * ```CSI n F```
 *
 * @see https://vt100.net/docs/vt510-rm/CPL.html
 */
export function cursorPreviousLine(n: number): string {
  return `\x1b[${n > 1 ? n : ""}F`;
}

/**
 * CPL is an alias for {@link cursorPreviousLine}.
 */
export function CPL(n: number): string {
  return cursorPreviousLine(n);
}

/**
 * cursorHorizontalAbsolute (CHA) returns a sequence for moving the cursor to
 * the given column.
 *
 * Default is 1.
 *
 * ```CSI n G```
 *
 * @see https://vt100.net/docs/vt510-rm/CHA.html
 */
export function cursorHorizontalAbsolute(col: number): string {
  return `\x1b[${col > 0 ? col : ""}G`;
}

/**
 * CHA is an alias for {@link cursorHorizontalAbsolute}.
 */
export function CHA(col: number): string {
  return cursorHorizontalAbsolute(col);
}

/**
 * cursorPosition (CUP) returns a sequence for setting the cursor to the
 * given row and column.
 *
 * Default is 1,1.
 *
 * ```CSI n ; m H```
 *
 * @see https://vt100.net/docs/vt510-rm/CUP.html
 */
export function cursorPosition(col: number, row: number): string {
  if (row <= 0 && col <= 0) {
    return cursorHomePosition;
  }

  const r = row > 0 ? row : "";
  const c = col > 0 ? col : "";
  return `\x1b[${r};${c}H`;
}

/**
 * CUP is an alias for {@link cursorPosition}.
 */
export function CUP(col: number, row: number): string {
  return cursorPosition(col, row);
}

/**
 * cursorHomePosition is a sequence for moving the cursor to the upper left
 * corner of the scrolling region. This is equivalent to `cursorPosition(1, 1)`.
 */
export const cursorHomePosition = "\x1b[H";

/**
 * cursorHorizontalForwardTab (CHT) returns a sequence for moving the cursor to
 * the next tab stop n times.
 *
 * Default is 1.
 *
 * ```CSI n I```
 *
 * @see https://vt100.net/docs/vt510-rm/CHT.html
 */
export function cursorHorizontalForwardTab(n: number): string {
  return `\x1b[${n > 1 ? n : ""}I`;
}

/**
 * CHT is an alias for {@link cursorHorizontalForwardTab}.
 */
export function CHT(n: number): string {
  return cursorHorizontalForwardTab(n);
}

/**
 * eraseCharacter (ECH) returns a sequence for erasing n characters from the
 * screen. This doesn't affect other cell attributes.
 *
 * Default is 1.
 *
 * ```CSI n X```
 *
 * @see https://vt100.net/docs/vt510-rm/ECH.html
 */
export function eraseCharacter(n: number): string {
  return `\x1b[${n > 1 ? n : ""}X`;
}

/**
 * ECH is an alias for {@link eraseCharacter}.
 */
export function ECH(n: number): string {
  return eraseCharacter(n);
}

/**
 * cursorBackwardTab (CBT) returns a sequence for moving the cursor to the
 * previous tab stop n times.
 *
 * Default is 1.
 *
 * ```CSI n Z```
 *
 * @see https://vt100.net/docs/vt510-rm/CBT.html
 */
export function cursorBackwardTab(n: number): string {
  return `\x1b[${n > 1 ? n : ""}Z`;
}

/**
 * CBT is an alias for {@link cursorBackwardTab}.
 */
export function CBT(n: number): string {
  return cursorBackwardTab(n);
}

/**
 * verticalPositionAbsolute (VPA) returns a sequence for moving the cursor to
 * the given row.
 *
 * Default is 1.
 *
 * ```CSI n d```
 *
 * @see https://vt100.net/docs/vt510-rm/VPA.html
 */
export function verticalPositionAbsolute(row: number): string {
  return `\x1b[${row > 0 ? row : ""}d`;
}

/**
 * VPA is an alias for {@link verticalPositionAbsolute}.
 */
export function VPA(row: number): string {
  return verticalPositionAbsolute(row);
}

/**
 * verticalPositionRelative (VPR) returns a sequence for moving the cursor down
 * n rows relative to the current position.
 *
 * Default is 1.
 *
 * ```CSI n e```
 *
 * @see https://vt100.net/docs/vt510-rm/VPR.html
 */
export function verticalPositionRelative(n: number): string {
  return `\x1b[${n > 1 ? n : ""}e`;
}

/**
 * VPR is an alias for {@link verticalPositionRelative}.
 */
export function VPR(n: number): string {
  return verticalPositionRelative(n);
}

/**
 * horizontalVerticalPosition (HVP) returns a sequence for moving the cursor to
 * the given row and column.
 *
 * Default is 1,1.
 *
 * ```CSI n ; m f```
 *
 * This has the same effect as {@link cursorPosition}.
 *
 * @see https://vt100.net/docs/vt510-rm/HVP.html
 */
export function horizontalVerticalPosition(col: number, row: number): string {
  const r = row > 0 ? row : "";
  const c = col > 0 ? col : "";
  return `\x1b[${r};${c}f`;
}

/**
 * HVP is an alias for {@link horizontalVerticalPosition}.
 */
export function HVP(col: number, row: number): string {
  return horizontalVerticalPosition(col, row);
}

/**
 * horizontalVerticalHomePosition is a sequence for moving the cursor to the
 * upper left corner of the scrolling region. This is equivalent to
 * `horizontalVerticalPosition(1, 1)`.
 */
export const horizontalVerticalHomePosition = "\x1b[f";

/**
 * saveCurrentCursorPosition (SCOSC) is a sequence for saving the current cursor
 * position for SCO console mode.
 *
 * ```CSI s```
 *
 * This acts like {@link DECSC}, except the page number where the cursor is located
 * is not saved.
 *
 * @see https://vt100.net/docs/vt510-rm/SCOSC.html
 */
export const saveCurrentCursorPosition = "\x1b[s";
export const SCOSC = saveCurrentCursorPosition;

/**
 * restoreCurrentCursorPosition (SCORC) is a sequence for restoring the current
 * cursor position for SCO console mode.
 *
 * ```CSI u```
 *
 * This acts like {@link DECRC}, except the page number where the cursor was saved is
 * not restored.
 *
 * @see https://vt100.net/docs/vt510-rm/SCORC.html
 */
export const restoreCurrentCursorPosition = "\x1b[u";
export const SCORC = restoreCurrentCursorPosition;

/**
 * setCursorStyle (DECSCUSR) returns a sequence for changing the cursor style.
 *
 * Default is 1.
 *
 * ```CSI Ps SP q```
 *
 * Where Ps is the cursor style:
 *
 * 0: Blinking block
 * 1: Blinking block (default)
 * 2: Steady block
 * 3: Blinking underline
 * 4: Steady underline
 * 5: Blinking bar (xterm)
 * 6: Steady bar (xterm)
 *
 * @see https://vt100.net/docs/vt510-rm/DECSCUSR.html
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h4-Functions-using-CSI-_-ordered-by-the-final-character-lparen-s-rparen:CSI-Ps-SP-q.1D81
 */
export function setCursorStyle(style: number): string {
  if (style < 0) {
    style = 0;
  }
  return `\x1b[${style} q`;
}

/**
 * DECSCUSR is an alias for {@link setCursorStyle}.
 */
export function DECSCUSR(style: number): string {
  return setCursorStyle(style);
}

/**
 * setPointerShape returns a sequence for changing the mouse pointer cursor
 * shape. Use "default" for the default pointer shape.
 *
 * ```OSC 22 ; Pt ST```
 * ```OSC 22 ; Pt BEL```
 *
 * Where Pt is the pointer shape name. The name can be anything that the
 * operating system can understand. Some common names are:
 *
 *   - copy
 *   - crosshair
 *   - default
 *   - ew-resize
 *   - n-resize
 *   - text
 *   - wait
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Operating-System-Commands
 */
export function setPointerShape(shape: string): string {
  return `\x1b]22;${shape}\x07`;
}

/**
 * reverseIndex (RI) is an escape sequence for moving the cursor up one line in
 * the same column. If the cursor is at the top margin, the screen scrolls
 * down.
 *
 * This has the same effect as {@link RI}.
 */
export const reverseIndex = "\x1bM";

/**
 * horizontalPositionAbsolute (HPA) returns a sequence for moving the cursor to
 * the given column. This has the same effect as {@link CUP}.
 *
 * Default is 1.
 *
 * ```CSI n ````
 *
 * @see https://vt100.net/docs/vt510-rm/HPA.html
 */
export function horizontalPositionAbsolute(col: number): string {
  return `\x1b[${col > 0 ? col : ""}\``;
}

/**
 * HPA is an alias for {@link horizontalPositionAbsolute}.
 */
export function HPA(col: number): string {
  return horizontalPositionAbsolute(col);
}

/**
 * horizontalPositionRelative (HPR) returns a sequence for moving the cursor
 * right n columns relative to the current position. This has the same effect
 * as {@link CUP}.
 *
 * Default is 1.
 *
 * ```CSI n a```
 *
 * @see https://vt100.net/docs/vt510-rm/HPR.html
 */
export function horizontalPositionRelative(n: number): string {
  return `\x1b[${n > 0 ? n : ""}a`;
}

/**
 * HPR is an alias for {@link horizontalPositionRelative}.
 */
export function HPR(n: number): string {
  return horizontalPositionRelative(n);
}

/**
 * index (IND) is an escape sequence for moving the cursor down one line in the
 * same column. If the cursor is at the bottom margin, the screen scrolls up.
 * This has the same effect as {@link IND}.
 */
export const index = "\x1bD";
