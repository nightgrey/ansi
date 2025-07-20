/**
 * eraseDisplay (ED) clears the display or parts of the display. A screen is
 * the shown part of the terminal display excluding the scrollback buffer.
 * Possible values:
 *
 * Default is 0.
 *
 *	 0: Clear from cursor to end of screen.
 *	 1: Clear from cursor to beginning of the screen.
 *	 2: Clear entire screen (and moves cursor to upper left on DOS).
 *	 3: Clear entire display which delete all lines saved in the scrollback buffer (xterm).
 *
 *	```
 *	CSI <n> J
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/ED.html
 */
export function eraseDisplay(n: number): string {
  return `\x1b[${n > 0 ? n : ""}J`;
}

/** ED is an alias for {@link eraseDisplay}. */
export const ED = eraseDisplay;

/**
 * eraseDisplay constants.
 * These are the possible values for the {@link eraseDisplay} function.
 */
export const eraseScreenBelow = "\x1b[J";
export const eraseScreenAbove = "\x1b[1J";
export const eraseEntireScreen = "\x1b[2J";
export const eraseEntireDisplay = "\x1b[3J";

/**
 * eraseLine (EL) clears the current line or parts of the line. Possible values:
 *
 *	0: Clear from cursor to end of line.
 *	1: Clear from cursor to beginning of the line.
 *	2: Clear entire line.
 *
 * The cursor position is not affected.
 *
 *	```
 *	CSI <n> K
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/EL.html
 */
export function eraseLine(n: number): string {
  return `\x1b[${n > 0 ? n : ""}K`;
}

/** EL is an alias for {@link eraseLine}. */
export const EL = eraseLine;

/**
 * eraseLine constants.
 * These are the possible values for the {@link eraseLine} function.
 */
export const eraseLineRight = "\x1b[K";
export const eraseLineLeft = "\x1b[1K";
export const eraseEntireLine = "\x1b[2K";

/**
 * scrollUp (SU) scrolls the screen up n lines. New lines are added at the
 * bottom of the screen.
 *
 *	```
 *	CSI Pn S
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/SU.html
 */
export function scrollUp(n: number): string {
  return `\x1b[${n > 1 ? n : ""}S`;
}

/** PanDown is an alias for {@link scrollUp}. */
export const panDown = scrollUp;

/** SU is an alias for {@link scrollUp}. */
export const SU = scrollUp;

/**
 * scrollDown (SD) scrolls the screen down n lines. New lines are added at the
 * top of the screen.
 *
 *	```
 *	CSI Pn T
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/SD.html
 */
export function scrollDown(n: number): string {
  return `\x1b[${n > 1 ? n : ""}T`;
}

/** panUp is an alias for {@link scrollDown}. */
export const panUp = scrollDown;

/** SD is an alias for {@link scrollDown}. */
export const SD = scrollDown;

/**
 * insertLine (IL) inserts n blank lines at the current cursor position.
 * Existing lines are moved down.
 *
 *	```
 *	CSI Pn L
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/IL.html
 */
export function insertLine(n: number): string {
  return `\x1b[${n > 1 ? n : ""}L`;
}

/** IL is an alias for {@link insertLine}. */
export const IL = insertLine;

/**
 * deleteLine (DL) deletes n lines at the current cursor position. Existing
 * lines are moved up.
 *
 *	```
 *	CSI Pn M
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/DL.html
 */
export function deleteLine(n: number): string {
  return `\x1b[${n > 1 ? n : ""}M`;
}

/** DL is an alias for {@link deleteLine}. */
export const DL = deleteLine;

/**
 * setTopBottomMargins (DECSTBM) sets the top and bottom margins for the scrolling
 * region. The default is the entire screen.
 *
 * Default is 1 and the bottom of the screen.
 *
 *	```
 *	CSI Pt ; Pb r
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/DECSTBM.html
 */
export function setTopBottomMargins(top: number, bot: number): string {
  const t = top > 0 ? top : "";
  const b = bot > 0 ? bot : "";
  return `\x1b[${t};${b}r`;
}

/** DECSTBM is an alias for {@link setTopBottomMargins}. */
export const DECSTBM = setTopBottomMargins;

/**
 * SetLeftRightMargins (DECSLRM) sets the left and right margins for the scrolling
 * region.
 *
 * Default is 1 and the right of the screen.
 *
 *	```
 *	CSI Pl ; Pr s
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/DECSLRM.html
 */
export function setLeftRightMargins(left: number, right: number): string {
  const l = left > 0 ? left : "";
  const r = right > 0 ? right : "";
  return `\x1b[${l};${r}s`;
}

/** DECSLRM is an alias for {@link setLeftRightMargins}. */
export const DECSLRM = setLeftRightMargins;

/**
 * SetScrollingRegion (DECSTBM) sets the top and bottom margins for the scrolling
 * region. The default is the entire screen.
 *
 *	```
 *	CSI <top> ; <bottom> r
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/DECSTBM.html
 * @deprecated use {@link setTopBottomMargins} instead.
 */
export function setScrollingRegion(t: number, b: number): string {
  if (t < 0) {
    t = 0;
  }
  if (b < 0) {
    b = 0;
  }
  return `\x1b[${t};${b}r`;
}

/**
 * InsertCharacter (ICH) inserts n blank characters at the current cursor
 * position. Existing characters move to the right. Characters moved past the
 * right margin are lost. ICH has no effect outside the scrolling margins.
 *
 * Default is 1.
 *
 *	```
 *	CSI Pn @
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/ICH.html
 */
export function insertCharacter(n: number): string {
  return `\x1b[${n > 1 ? n : ""}@`;
}

/** ICH is an alias for {@link insertCharacter}. */
export const ICH = insertCharacter;

/**
 * DeleteCharacter (DCH) deletes n characters at the current cursor position.
 * As the characters are deleted, the remaining characters move to the left and
 * the cursor remains at the same position.
 *
 * Default is 1.
 *
 *	```
 *	CSI Pn P
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/DCH.html
 */
export function deleteCharacter(n: number): string {
  return `\x1b[${n > 1 ? n : ""}P`;
}

/** DCH is an alias for {@link deleteCharacter}. */
export const DCH = deleteCharacter;

/**
 * setTabEvery8Columns (DECST8C) sets the tab stops at every 8 columns.
 *
 *	```
 *	CSI ? 5 W
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/DECST8C.html
 */
export const setTabEvery8Columns = "\x1b[?5W";
export const DECST8C = setTabEvery8Columns;

/**
 * horizontalTabSet (HTS) sets a horizontal tab stop at the current cursor
 * column.
 *
 * This is equivalent to HTS.
 *
 *	```
 *	ESC H
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/HTS.html
 */
export const horizontalTabSet = "\x1bH";

/**
 * TabClear (TBC) clears tab stops.
 *
 * Default is 0.
 *
 * Possible values:
 * 0: Clear tab stop at the current column. (default)
 * 3: Clear all tab stops.
 *
 *	```
 *	CSI Pn g
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/TBC.html
 */
export function tabClear(n: number): string {
  return `\x1b[${n > 0 ? n : ""}g`;
}

/** TBC is an alias for {@link tabClear}. */
export const TBC = tabClear;

/**
 * RequestPresentationStateReport (DECRQPSR) requests the terminal to send a
 * report of the presentation state. This includes the cursor information [DECCIR],
 * and tab stop [DECTABSR] reports.
 *
 * Default is 0.
 *
 * Possible values:
 * 0: Error, request ignored.
 * 1: Cursor information report [DECCIR].
 * 2: Tab stop report [DECTABSR].
 *
 *	```
 *	CSI Ps $ w
 *	```
 *
 * @see https://vt100.net/docs/vt510-rm/DECRQPSR.html
 */
export function requestPresentationStateReport(n: number): string {
  return `\x1b[${n > 0 ? n : ""}$w`;
}

/** DECRQPSR is an alias for {@link requestPresentationStateReport}. */
export const DECRQPSR = requestPresentationStateReport;

/**
 * TabStopReport (DECTABSR) is the response to a tab stop report request.
 * It reports the tab stops set in the terminal.
 *
 * The response is a list of tab stops separated by a slash (/) character.
 *
 *	```
 *	DCS 2 $ u D ... D ST
 *	```
 *
 * Where D is a decimal number representing a tab stop.
 *
 * @see https://vt100.net/docs/vt510-rm/DECTABSR.html
 */
export function tabStopReport(...stops: number[]): string {
  return `\x1bP2$u${stops.join("/")}\x1b\\`;
}

/** DECTABSR is an alias for {@link tabStopReport}. */
export const DECTABSR = tabStopReport;

/**
 * CursorInformationReport (DECCIR) is the response to a cursor information
 * report request. It reports the cursor position, visual attributes, and
 * character protection attributes. It also reports the status of origin mode
 * [DECOM] and the current active character set.
 *
 * The response is a list of values separated by a semicolon (;) character.
 *
 *	```
 *	DCS 1 $ u D ... D ST
 *	```
 *
 * Where D is a decimal number representing a value.
 *
 * @see https://vt100.net/docs/vt510-rm/DECCIR.html
 */
export function cursorInformationReport(...values: number[]): string {
  return `\x1bP1$u${values.join(";")}\x1b\\`;
}

/** DECCIR is an alias for {@link cursorInformationReport}. */
export const DECCIR = cursorInformationReport;

/**
 * RepeatPreviousCharacter (REP) repeats the previous character n times.
 * This is identical to typing the same character n times.
 *
 * Default is 1.
 *
 *	```
 *	CSI Pn b
 *	```
 *
 * @see ECMA-48 § 8.3.103
 */
export function repeatPreviousCharacter(n: number): string {
  return `\x1b[${n > 1 ? n : ""}b`;
}

/** REP is an alias for {@link repeatPreviousCharacter}. */
export const REP = repeatPreviousCharacter;
