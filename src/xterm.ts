/**
 * Key Modifier Options (XTMODKEYS) sets/resets xterm key modifier options.
 *
 * Default is 0.
 *
 * ```
 * CSI > Pp m
 * CSI > Pp ; Pv m
 * ```
 *
 * If `Pv` is omitted, the resource is reset to its initial value.
 *
 * @param p - The parameter value
 * @param vs - Optional value parameters
 * @returns The key modifier options escape sequence
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Functions-using-CSI-_-ordered-by-the-final-character_s_
 */
export function keyModifierOptions(p: number, ...vs: number[]): string {
  let pp = "";
  if (p > 0) {
    pp = p.toString();
  }

  if (vs.length === 0) {
    return "\x1b[>" + p.toString() + "m";
  }

  const v = vs[0];
  if (v > 0) {
    const pv = v.toString();
    return "\x1b[>" + pp + ";" + pv + "m";
  }

  return "\x1b[>" + pp + "m";
}

/**
 * xtmodkeys is an alias for {@link keyModifierOptions}.
 */
export function xtmodkeys(p: number, ...vs: number[]): string {
  return keyModifierOptions(p, ...vs);
}

/**
 * Sets xterm key modifier options.
 * This is an alias for {@link keyModifierOptions}.
 */
export function setKeyModifierOptions(pp: number, pv: number): string {
  return keyModifierOptions(pp, pv);
}

/**
 * Resets xterm key modifier options.
 * This is an alias for {@link keyModifierOptions}.
 */
export function resetKeyModifierOptions(pp: number): string {
  return keyModifierOptions(pp);
}

/**
 * Query Key Modifier Options (XTQMODKEYS) requests xterm key modifier options.
 *
 * Default is 0.
 *
 * ```
 * CSI ? Pp m
 * ```
 *
 * @param pp - The parameter value
 * @returns The query key modifier options escape sequence
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Functions-using-CSI-_-ordered-by-the-final-character_s_
 */
export function queryKeyModifierOptions(pp: number): string {
  let p = "";
  if (pp > 0) {
    p = pp.toString();
  }
  return "\x1b[?" + p + "m";
}

/**
 * xtqmodkeys is an alias for {@link queryKeyModifierOptions}.
 */
export function xtqmodkeys(pp: number): string {
  return queryKeyModifierOptions(pp);
}

/**
 * Modify Other Keys (modifyOtherKeys) is an xterm feature that allows the
 * terminal to modify the behavior of certain keys to send different escape
 * sequences when pressed.
 *
 * @see https://invisible-island.net/xterm/manpage/xterm.html#VT100-Widget-Resources:modifyOtherKeys
 */
export const SET_MODIFY_OTHER_KEYS_1 = "\x1b[>4;1m";
export const SET_MODIFY_OTHER_KEYS_2 = "\x1b[>4;2m";
export const RESET_MODIFY_OTHER_KEYS = "\x1b[>4m";
export const QUERY_MODIFY_OTHER_KEYS = "\x1b[?4m";

/**
 * Returns a sequence that sets XTerm modifyOtherKeys mode.
 * The mode argument specifies the mode to set.
 *
 * - 0: Disable modifyOtherKeys mode.
 * - 1: Enable modifyOtherKeys mode 1.
 * - 2: Enable modifyOtherKeys mode 2.
 *
 * ```
 * CSI > 4 ; mode m
 * ```
 *
 * @param mode - The mode to set (0, 1, or 2)
 * @returns The modify other keys escape sequence
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Functions-using-CSI-_-ordered-by-the-final-character_s_
 * @see https://invisible-island.net/xterm/manpage/xterm.html#VT100-Widget-Resources:modifyOtherKeys
 * @deprecated Use {@link SET_MODIFY_OTHER_KEYS_1} or {@link SET_MODIFY_OTHER_KEYS_2} instead.
 */
export function modifyOtherKeys(mode: number): string {
  return "\x1b[>4;" + mode.toString() + "m";
}

/**
 * Disables the modifyOtherKeys mode.
 *
 * ```
 * CSI > 4 ; 0 m
 * ```
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Functions-using-CSI-_-ordered-by-the-final-character_s_
 * @see https://invisible-island.net/xterm/manpage/xterm.html#VT100-Widget-Resources:modifyOtherKeys
 * @deprecated Use {@link RESET_MODIFY_OTHER_KEYS} instead.
 */
export const DISABLE_MODIFY_OTHER_KEYS = "\x1b[>4;0m";

/**
 * Enables the modifyOtherKeys mode 1.
 *
 * ```
 * CSI > 4 ; 1 m
 * ```
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Functions-using-CSI-_-ordered-by-the-final-character_s_
 * @see https://invisible-island.net/xterm/manpage/xterm.html#VT100-Widget-Resources:modifyOtherKeys
 * @deprecated Use {@link SET_MODIFY_OTHER_KEYS_1} instead.
 */
export const ENABLE_MODIFY_OTHER_KEYS_1 = "\x1b[>4;1m";

/**
 * Enables the modifyOtherKeys mode 2.
 *
 * ```
 * CSI > 4 ; 2 m
 * ```
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Functions-using-CSI-_-ordered-by-the-final-character_s_
 * @see https://invisible-island.net/xterm/manpage/xterm.html#VT100-Widget-Resources:modifyOtherKeys
 * @deprecated Use {@link SET_MODIFY_OTHER_KEYS_2} instead.
 */
export const ENABLE_MODIFY_OTHER_KEYS_2 = "\x1b[>4;2m";

/**
 * Requests the modifyOtherKeys mode.
 *
 * ```
 * CSI ? 4 m
 * ```
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Functions-using-CSI-_-ordered-by-the-final-character_s_
 * @see https://invisible-island.net/xterm/manpage/xterm.html#VT100-Widget-Resources:modifyOtherKeys
 * @deprecated Use {@link QUERY_MODIFY_OTHER_KEYS} instead.
 */
export const REQUEST_MODIFY_OTHER_KEYS = "\x1b[?4m";
