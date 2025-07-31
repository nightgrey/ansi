/**
 * Keypad Application Mode (DECKPAM) is a mode that determines whether the
 * keypad sends application sequences or ANSI sequences.
 *
 * This works like enabling DECNKM.
 * Use numericKeypadMode to set the numeric keypad mode.
 *
 * ```
 * ESC =
 * ```
 *
 * @see https://vt100.net/docs/vt510-rm/DECKPAM.html
 */
export const KEYPAD_APPLICATION_MODE = "\x1b=";
export const DECKPAM = KEYPAD_APPLICATION_MODE;

/**
 * Keypad Numeric Mode (DECKPNM) is a mode that determines whether the keypad
 * sends application sequences or ANSI sequences.
 *
 * This works the same as disabling DECNKM.
 *
 * ```
 * ESC >
 * ```
 *
 * @see https://vt100.net/docs/vt510-rm/DECKPNM.html
 */
export const KEYPAD_NUMERIC_MODE = "\x1b>";
export const DECKPNM = KEYPAD_NUMERIC_MODE;
