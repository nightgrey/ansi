/**
 * setIconNameWindowTitle returns a sequence for setting the icon name and
 * window title.
 *
 * ```
 * OSC 0 ; title ST
 * OSC 0 ; title BEL
 * ```
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Operating-System-Commands
 */
export function setIconNameWindowTitle(s: string): string {
  return `\x1b]0;${s}\x07`;
}

/**
 * setIconName returns a sequence for setting the icon name.
 *
 * ```
 * OSC 1 ; title ST
 * OSC 1 ; title BEL
 * ```
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Operating-System-Commands
 */
export function setIconName(s: string): string {
  return `\x1b]1;${s}\x07`;
}

/**
 * setWindowTitle returns a sequence for setting the window title.
 *
 * ```
 * OSC 2 ; title ST
 * OSC 2 ; title BEL
 * ```
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Operating-System-Commands
 */
export function setWindowTitle(s: string): string {
  return `\x1b]2;${s}\x07`;
}

/**
 * decswt is a sequence for setting the window title.
 *
 * This is an alias for {@link setWindowTitle}("1;<name>").
 *
 * @see https://vt100.net/dec/ek-vt520-rm.pdf
 */
export function decswt(name: string): string {
  return setWindowTitle(`1;${name}`);
}

/**
 * decsin is a sequence for setting the icon name.
 *
 * This is an alias for {@link setWindowTitle}("L;<name>").
 *
 * @see https://vt100.net/dec/ek-vt520-rm.pdf
 */
export function decsin(name: string): string {
  return setWindowTitle(`L;${name}`);
}
