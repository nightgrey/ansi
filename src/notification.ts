/**
 * Sends a desktop notification using iTerm's `OSC 9`.
 *
 * ```
 * OSC 9 ; Mc ST
 * OSC 9 ; Mc BEL
 * ```
 *
 * Where Mc is the notification body.
 *
 * @param s - The notification body text
 * @returns The ANSI escape sequence for desktop notification
 * @see https://iterm2.com/documentation-escape-codes.html
 */
export function notify(s: string): string {
  return "\x1b]9;" + s + "\x07";
}
