/**
 * Clipboard names.
 */
export const SYSTEM_CLIPBOARD = "c".charCodeAt(0);
export const PRIMARY_CLIPBOARD = "p".charCodeAt(0);

/**
 * Set Clipboard returns a sequence for manipulating the clipboard.
 *
 * ```
 * OSC 52 ; Pc ; Pd ST
 * OSC 52 ; Pc ; Pd BEL
 * ```
 *
 * Where Pc is the clipboard name and Pd is the base64 encoded data.
 * Empty data or invalid base64 data will reset the clipboard.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export function setClipboard(c: number, d: string): string {
  let encodedData = "";
  if (d !== "") {
    // Use btoa for browser environments, or Buffer for Node.js
    if (typeof btoa !== "undefined") {
      encodedData = btoa(d);
    } else if (typeof Buffer !== "undefined") {
      encodedData = Buffer.from(d).toString("base64");
    } else {
      throw new Error("Base64 encoding not available");
    }
  }
  return "\x1b]52;" + String.fromCharCode(c) + ";" + encodedData + "\x07";
}

/**
 * Set System Clipboard returns a sequence for setting the system clipboard.
 *
 * This is equivalent to {@link setClipboard}(SYSTEM_CLIPBOARD, d).
 */
export function setSystemClipboard(d: string): string {
  return setClipboard(SYSTEM_CLIPBOARD, d);
}

/**
 * Set Primary Clipboard returns a sequence for setting the primary clipboard.
 *
 * This is equivalent to {@link setClipboard}(PRIMARY_CLIPBOARD, d).
 */
export function setPrimaryClipboard(d: string): string {
  return setClipboard(PRIMARY_CLIPBOARD, d);
}

/**
 * Reset Clipboard returns a sequence for resetting the clipboard.
 *
 * This is equivalent to {@link setClipboard}(c, "").
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export function resetClipboard(c: number): string {
  return setClipboard(c, "");
}

/**
 * Reset System Clipboard is a sequence for resetting the system clipboard.
 *
 * This is equivalent to {@link resetClipboard}(SYSTEM_CLIPBOARD).
 */
export const RESET_SYSTEM_CLIPBOARD = "\x1b]52;c;\x07";

/**
 * Reset Primary Clipboard is a sequence for resetting the primary clipboard.
 *
 * This is equivalent to {@link resetClipboard}(PRIMARY_CLIPBOARD).
 */
export const RESET_PRIMARY_CLIPBOARD = "\x1b]52;p;\x07";

/**
 * Request Clipboard returns a sequence for requesting the clipboard.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Operating-System-Commands
 */
export function requestClipboard(c: number): string {
  return "\x1b]52;" + String.fromCharCode(c) + ";?\x07";
}

/**
 * Request System Clipboard is a sequence for requesting the system clipboard.
 *
 * This is equivalent to {@link requestClipboard}(SYSTEM_CLIPBOARD).
 */
export const REQUEST_SYSTEM_CLIPBOARD = "\x1b]52;c;?\x07";

/**
 * Request Primary Clipboard is a sequence for requesting the primary clipboard.
 *
 * This is equivalent to {@link requestClipboard}(PRIMARY_CLIPBOARD).
 */
export const REQUEST_PRIMARY_CLIPBOARD = "\x1b]52;p;?\x07";
