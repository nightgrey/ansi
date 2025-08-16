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
  protected mutate(
    value?: number,
    bg?: ColorAttribute | null,
    fg?: ColorAttribute | null,
    ul?: ColorAttribute | null,
  ) {
    return new Attributes(
      value ?? this.value,
      bg === null ? null : bg || this.bg,
      fg === null ? null : fg || this.fg,
      ul === null ? null : ul || this.ul,
    );
  }
}
