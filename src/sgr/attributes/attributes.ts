import { Attributable } from "./attributable";
import type { ColorAttribute } from "./bit";

/**
 * Attributes
 *
 * A performant bitset representation to handle SGR attributes.
 *
 * @example
 * ```ts
 * const attributes = new Attributes()
 *   .foregroundColor(BasicColor.Red)
 *   .underline()
 *   .bold()
 *   .italic();
 *
 * attributes.has(1 << Bit.Bold); // true
 * attributes.has(1 << Bit.Italic); // true
 * attributes.has(1 << Bit.Underline); // true
 * attributes.has(1 << Bit.ForegroundColor); // true
 *
 *
 * attributes.and(new Attributes().backgroundColor(BasicColor.Blue));
 * attributes.or(new Attributes().backgroundColor(BasicColor.Blue));
 * attributes.xor(new Attributes().backgroundColor(BasicColor.Blue));
 *
 * new Style(attributes);
 * ```
 */
export class Attributes extends Attributable<Attributes> {
  protected with(
    attributes?: number,
    background?: ColorAttribute | null,
    foreground?: ColorAttribute | null,
    underline?: ColorAttribute | null,
  ) {
    return new Attributes(
      attributes ?? this.value,
      background === null ? null : background || this.bg,
      foreground === null ? null : foreground || this.fg,
      underline === null ? null : underline || this.ul,
    );
  }
}
