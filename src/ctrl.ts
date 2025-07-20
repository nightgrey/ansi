/**
 * Request Name Version (XTVERSION) is a control sequence that requests the
 * terminal's name and version. It responds with a DSR sequence identifying the
 * terminal.
 *
 * ```
 * CSI > 0 q
 * DCS > | text ST
 * ```
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-PC-Style-Function-Keys
 */
export const REQUEST_NAME_VERSION = "\x1b[>q";
export const XTVERSION = REQUEST_NAME_VERSION;

/**
 * Request XT Version is a control sequence that requests the terminal's XTVERSION. It responds with a DSR sequence identifying the version.
 *
 * ```
 * CSI > Ps q
 * DCS > | text ST
 * ```
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-PC-Style-Function-Keys
 *
 * @deprecated use {@link REQUEST_NAME_VERSION} instead.
 */
export const REQUEST_XT_VERSION = REQUEST_NAME_VERSION;

/**
 * Primary Device Attributes (DA1) is a control sequence that reports the
 * terminal's primary device attributes.
 *
 * ```
 * CSI c
 * CSI 0 c
 * CSI ? Ps ; ... c
 * ```
 *
 * If no attributes are given, or if the attribute is 0, this function returns
 * the request sequence. Otherwise, it returns the response sequence.
 *
 * Common attributes include:
 * - 1	132 columns
 * - 2	Printer port
 * - 4	Sixel
 * - 6	Selective erase
 * - 7	Soft character set (DRCS)
 * - 8	User-defined keys (UDKs)
 * - 9	National replacement character sets (NRCS) (International terminal only)
 * - 12	Yugoslavian (SCS)
 * - 15	Technical character set
 * - 18	Windowing capability
 * - 21	Horizontal scrolling
 * - 23	Greek
 * - 24	Turkish
 * - 42	ISO Latin-2 character set
 * - 44	PCTerm
 * - 45	Soft key map
 * - 46	ASCII emulation
 *
 * @see https://vt100.net/docs/vt510-rm/DA1.html
 */
export function primaryDeviceAttributes(...attrs: number[]): string {
  if (attrs.length === 0) {
    return REQUEST_PRIMARY_DEVICE_ATTRIBUTES;
  } else if (attrs.length === 1 && attrs[0] === 0) {
    return "\x1b[0c";
  }

  const as = attrs.map((a) => a.toString());
  return "\x1b[?" + as.join(";") + "c";
}

/**
 * DA1 is an alias for {@link primaryDeviceAttributes}
 */
export const da1 = primaryDeviceAttributes;

/**
 * Request Primary Device Attributes is a control sequence that requests the
 * terminal's primary device attributes (DA1).
 *
 * ```
 * CSI c
 * ```
 *
 * @see https://vt100.net/docs/vt510-rm/DA1.html
 */
export const REQUEST_PRIMARY_DEVICE_ATTRIBUTES = "\x1b[c";

/**
 * Secondary Device Attributes (DA2) is a control sequence that reports the
 * terminal's secondary device attributes.
 *
 * ```
 * CSI > c
 * CSI > 0 c
 * CSI > Ps ; ... c
 * ```
 *
 * @see https://vt100.net/docs/vt510-rm/DA2.html
 */
export function secondaryDeviceAttributes(...attrs: number[]): string {
  if (attrs.length === 0) {
    return REQUEST_SECONDARY_DEVICE_ATTRIBUTES;
  }

  const as = attrs.map((a) => a.toString());
  return "\x1b[>" + as.join(";") + "c";
}

/**
 * DA2 is an alias for {@link secondaryDeviceAttributes}
 */
export const da2 = secondaryDeviceAttributes;

/**
 * Request Secondary Device Attributes is a control sequence that requests the
 * terminal's secondary device attributes (DA2).
 *
 * ```
 * CSI > c
 * ```
 *
 * @see https://vt100.net/docs/vt510-rm/DA2.html
 */
export const REQUEST_SECONDARY_DEVICE_ATTRIBUTES = "\x1b[>c";

/**
 * Tertiary Device Attributes (DA3) is a control sequence that reports the
 * terminal's tertiary device attributes.
 *
 * ```
 * CSI = c
 * CSI = 0 c
 * DCS ! | Text ST
 * ```
 *
 * Where Text is the unit ID for the terminal.
 *
 * If no unit ID is given, or if the unit ID is 0, this function returns the
 * request sequence. Otherwise, it returns the response sequence.
 *
 * @see https://vt100.net/docs/vt510-rm/DA3.html
 */
export function tertiaryDeviceAttributes(unitID: string): string {
  switch (unitID) {
    case "":
      return REQUEST_TERTIARY_DEVICE_ATTRIBUTES;
    case "0":
      return "\x1b[=0c";
  }

  return "\x1bP!|" + unitID + "\x1b\\";
}

/**
 * DA3 is an alias for {@link tertiaryDeviceAttributes}
 */
export const da3 = tertiaryDeviceAttributes;

/**
 * Request Tertiary Device Attributes is a control sequence that requests the
 * terminal's tertiary device attributes (DA3).
 *
 * ```
 * CSI = c
 * ```
 *
 * @see https://vt100.net/docs/vt510-rm/DA3.html
 */
export const REQUEST_TERTIARY_DEVICE_ATTRIBUTES = "\x1b[=c";
