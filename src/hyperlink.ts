/**
 * Returns a sequence for starting a hyperlink.
 *
 * OSC 8 ; Params ; Uri ST
 * OSC 8 ; Params ; Uri BEL
 *
 * To reset the hyperlink, omit the URI.
 *
 * @see https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda
 */
export function setHyperlink(uri: string, ...params: string[]): string {
  return `\x1b]8;${params.join(":")};${uri}\x07`;
}

/**
 * Returns a sequence for resetting the hyperlink.
 *
 * This is equivalent to {@link setHyperlink}("", ...params).
 *
 * @see https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda
 */
export function resetHyperlink(...params: string[]): string {
  return setHyperlink("", ...params);
}
