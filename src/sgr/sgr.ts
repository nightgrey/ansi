import { CSI } from "../c1";
import type { Attributes } from "./attributes";
import { Style } from "./style";

/**
 * RESET_STYLE is a `SGR` (Select Graphic Rendition) style sequence that resets
 * all attributes.
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
 */
export const RESET_STYLE = `${CSI}0m`;

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
  if (attributes.isEmpty()) return RESET_STYLE;

  return Style.from(attributes).toString();
}

/** `SGR` is an alias for {@link selectGraphicRendition} */
export const SGR = selectGraphicRendition;
