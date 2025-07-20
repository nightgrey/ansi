import { RESET_STYLE, Style, type Attributes } from "./style";

/**
 * Select Graphic Rendition (`SGR`) is a command that sets display attributes.
 *
 * Default is 0.
 *
 * ```
 * CSI Ps ; Ps ... m
 * ```
 *
 * @see https://vt100.net/docs/vt510-rm/SGR.html
 */
export function selectGraphicRendition(attributes: Attributes) {
  if (attributes.length === 0) return RESET_STYLE;

  return new Style(attributes).toString();
}

/** `SGR` is an alias for {@link selectGraphicRendition} */
export const SGR = selectGraphicRendition;
