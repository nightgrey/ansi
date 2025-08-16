import { DefaultColor, rgb } from "../../color";
import { UnderlineStyle } from "./attribute";
import {
  BIT_TO_ATTRIBUTE,
  Bit,
  type ColorAttribute,
  type UnderlineStyleBit,
} from "./bit";
import { ATTRIBUTE_TO_PROP, type AttributeProps } from "./props";

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
export class Attributes {
  readonly value: number;

  readonly bg: ColorAttribute | null;
  readonly fg: ColorAttribute | null;
  readonly ul: ColorAttribute | null;

  private static masks = Object.freeze({
    [Bit.NormalIntensity]:
      (1 << Bit.Faint) | (1 << Bit.Bold) | (1 << Bit.NormalIntensity),
    [Bit.Italic]: (1 << Bit.Italic) | (1 << Bit.NoItalic),
    [Bit.Blink]: (1 << Bit.Blink) | (1 << Bit.RapidBlink) | (1 << Bit.NoBlink),
    [Bit.Underline]:
      (1 << Bit.UnderlineNone) |
      (1 << Bit.UnderlineSingle) |
      (1 << Bit.UnderlineDouble) |
      (1 << Bit.UnderlineCurly) |
      (1 << Bit.UnderlineDotted) |
      (1 << Bit.UnderlineDashed) |
      (1 << Bit.Underline) |
      (1 << Bit.NoUnderline),
  } as const satisfies Partial<Record<Bit, number>>);

  constructor(
    value?: number,
    bg?: ColorAttribute | null,
    fg?: ColorAttribute | null,
    ul?: ColorAttribute | null,
  ) {
    this.value = value ?? 0;
    this.bg = bg ?? null;
    this.fg = fg ?? null;
    this.ul = ul ?? null;
  }

  protected with(
    value?: number,
    bg?: ColorAttribute | null,
    fg?: ColorAttribute | null,
    ul?: ColorAttribute | null,
  ) {
    return new Attributes(
      value ?? this.value,
      bg ?? this.bg,
      fg ?? this.fg,
      ul ?? this.ul,
    );
  }

  reset() {
    return this.with(1 << Bit.Reset);
  }

  bold() {
    return this.set(Bit.Bold);
  }

  normalIntensity() {
    return this.with(
      (this.value & ~Attributes.masks[Bit.NormalIntensity]) |
        (1 << Bit.NormalIntensity),
    );
  }

  faint() {
    return this.with(
      (this.value & ~(1 << Bit.NormalIntensity)) | (1 << Bit.Faint),
    );
  }

  italic() {
    return this.with((this.value & ~(1 << Bit.NoItalic)) | (1 << Bit.Italic));
  }

  noItalic() {
    return this.with((this.value & ~(1 << Bit.Italic)) | (1 << Bit.NoItalic));
  }

  underline(style: UnderlineStyleBit = Bit.UnderlineSingle) {
    if (style === Bit.UnderlineNone) {
      return this.noUnderline();
    }

    if (style === Bit.UnderlineSingle) {
      return this.with(
        (this.value & ~Attributes.masks[Bit.Underline]) | (1 << Bit.Underline),
      );
    }

    return this.with(
      (this.value & ~Attributes.masks[Bit.Underline]) | (1 << style),
    );
  }

  noUnderline() {
    return this.with(
      (this.value & ~Attributes.masks[Bit.Underline]) | (1 << Bit.NoUnderline),
      this.bg,
      this.fg,
      0,
    );
  }

  blink() {
    return this.with((this.value & ~(1 << Bit.NoBlink)) | (1 << Bit.Blink));
  }

  noBlink() {
    return this.with((this.value & ~(1 << Bit.Blink)) | (1 << Bit.NoBlink));
  }

  slowBlink() {
    return this.with((this.value & ~(1 << Bit.NoBlink)) | (1 << Bit.Blink));
  }

  rapidBlink() {
    return this.with(
      (this.value & ~(1 << Bit.NoBlink)) | (1 << Bit.RapidBlink),
    );
  }

  reverse() {
    return this.with((this.value & ~(1 << Bit.NoReverse)) | (1 << Bit.Reverse));
  }

  noReverse() {
    return this.with((this.value & ~(1 << Bit.Reverse)) | (1 << Bit.NoReverse));
  }
  conceal() {
    return this.with((this.value & ~(1 << Bit.Conceal)) | (1 << Bit.Conceal));
  }

  noConceal() {
    return this.with((this.value & ~(1 << Bit.Conceal)) | (1 << Bit.NoConceal));
  }
  strikethrough() {
    return this.with(
      (this.value & ~(1 << Bit.Strikethrough)) | (1 << Bit.Strikethrough),
    );
  }

  noStrikethrough() {
    return this.with(
      (this.value & ~(1 << Bit.Strikethrough)) | (1 << Bit.NoStrikethrough),
    );
  }

  /**
   * Sets foreground color.
   *
   * @param color - basic, indexed or (packed) RGB color
   */
  foregroundColor(color: ColorAttribute): Attributes {
    return this.with(this.value, this.bg, color);
  }

  defaultForegroundColor() {
    return this.with(this.value, this.bg, DefaultColor);
  }

  /**
   * Sets background color.

   * @param color - basic, indexed or (packed) RGB color
   */
  backgroundColor(color: ColorAttribute) {
    return this.with(this.value, color);
  }

  defaultBackgroundColor() {
    return this.backgroundColor(DefaultColor);
  }

  /**
   * Sets underline color.
   *
   * @param color - basic, indexed or (packed) RGB color
   */
  underlineColor(color: ColorAttribute) {
    return this.with(this.value, this.bg, this.fg, color);
  }

  defaultUnderlineColor() {
    return this.underlineColor(DefaultColor);
  }

  underlineStyle(style: UnderlineStyleBit) {
    return this.underline(style);
  }

  singleUnderline() {
    return this.underlineStyle(Bit.UnderlineSingle);
  }

  doubleUnderline() {
    return this.underlineStyle(Bit.UnderlineDouble);
  }

  curlyUnderline() {
    return this.underlineStyle(Bit.UnderlineCurly);
  }

  dottedUnderline() {
    return this.underlineStyle(Bit.UnderlineDotted);
  }

  dashedUnderline() {
    return this.underlineStyle(Bit.UnderlineDashed);
  }

  /**
   * Set a bit at the specified position
   * @param bit - The bit position (0-63)
   * @param fg - foreground color
   * @param bg - background color
   * @param ul - underline color
   * @returns A new Attributes instance with the bit set
   */
  set(bit: Bit, bg?: ColorAttribute, fg?: ColorAttribute, ul?: ColorAttribute) {
    return this.with(this.value | (1 << bit), bg, fg, ul);
  }

  /**
   * Unset a bit at the specified position
   * @param bit - The bit position (0-63)
   * @param fg - foreground color
   * @param bg - background color
   * @param ul - underline color
   * @returns A new Attributes instance with the bit unset
   */
  unset(
    bit: Bit,
    bg?: ColorAttribute,
    fg?: ColorAttribute,
    ul?: ColorAttribute,
  ) {
    return this.with(this.value & ~(1 << bit), bg, fg, ul);
  }

  /**
   * Check if a bit is set at the specified position
   * @param bit - The bit position (0-63)
   * @returns true if the bit is set, false otherwise
   */
  has(bit: Bit): boolean {
    return (this.value & (1 << bit)) !== 0;
  }

  /**
   * Toggle a bit at the specified position
   * @param bit - The bit position (0-63)
   * @returns A new Attributes instance with the bit toggled
   */
  toggle(bit: Bit) {
    return this.with(this.value ^ (1 << bit));
  }

  clear() {
    return Attributes.empty;
  }

  toString(radix?: number): string {
    return this.valueOf().toString(radix);
  }

  valueOf() {
    return this.value;
  }

  get length(): number {
    let count = 0;
    let value = this.valueOf();

    while (value > 0) {
      value &= value - 1;
      count++;
    }

    return count;
  }

  equals(other: Attributes) {
    return (
      this.value === other.value &&
      this.bg === other.bg &&
      this.fg === other.fg &&
      this.ul === other.ul
    );
  }

  or(other: Attributes) {
    return this.with(
      this.value | other.value,
      other.bg !== null ? other.bg : this.bg,
      other.fg !== null ? other.fg : this.fg,
      other.ul !== null ? other.ul : this.ul,
    );
  }

  merge = this.or;

  and(other: Attributes) {
    return this.with(this.value & other.value, this.bg, this.fg, this.ul);
  }

  xor(other: Attributes) {
    return this.with(
      this.value ^ other.value,
      this.bg === other.bg ? null : other.bg,
      this.fg === other.fg ? null : other.fg,
      this.ul === other.ul ? null : other.ul,
    );
  }

  not() {
    return this.with(~this.value, undefined, undefined, undefined);
  }

  isEmpty(): boolean {
    return (
      this.value === 0 &&
      this.bg === null &&
      this.fg === null &&
      this.ul === null
    );
  }

  static or(a: Attributes, b: Attributes) {
    return new Attributes(
      a.value | b.value,
      a.bg ?? b.bg,
      a.fg ?? b.fg,
      a.ul ?? b.ul,
    );
  }

  static and(a: Attributes, b: Attributes) {
    return new Attributes(
      a.value & b.value,
      a.bg ?? b.bg,
      a.fg ?? b.fg,
      a.ul ?? b.ul,
    );
  }

  static xor(a: Attributes, b: Attributes) {
    return new Attributes(
      a.value ^ b.value,
      a.bg ?? b.bg,
      a.fg ?? b.fg,
      a.ul ?? b.ul,
    );
  }

  static not(a: Attributes) {
    return new Attributes(~a.value >>> 0, a.bg, a.fg, a.ul);
  }

  copy() {
    return new Attributes(this.value, this.bg, this.fg, this.ul);
  }

  [Symbol.iterator] = this.entries;
  private static readonly BIT_POSITIONS = new Uint8Array(64);
  static {
    for (let i = 0; i < 64; i++) {
      Attributes.BIT_POSITIONS[i] = i;
    }
  }
  *keys() {
    let n = this.value;
    while (n !== 0) {
      const pos = (Math.clz32(n & -n) ^ 31) as Bit;
      yield pos;
      n &= n - 1;
    }
  }

  *values() {
    let n = this.value;
    while (n !== 0) {
      const pos = (Math.clz32(n & -n) ^ 31) as Bit;
      yield BIT_TO_ATTRIBUTE[pos];
      n &= n - 1;
    }
  }

  *entries() {
    let n = this.value;
    while (n !== 0) {
      const pos = (Math.clz32(n & -n) ^ 31) as Bit;
      yield [pos, BIT_TO_ATTRIBUTE[pos]] as const;
      n &= n - 1;
    }
  }

  toArray() {
    return [...this.values()];
  }

  private static UnderlineStyles = new Set([
    UnderlineStyle.None,
    UnderlineStyle.Single,
    UnderlineStyle.Double,
    UnderlineStyle.Curly,
    UnderlineStyle.Dotted,
    UnderlineStyle.Dashed,
  ]);
  private static isUnderlineStyle(value: any): value is UnderlineStyle {
    return Attributes.UnderlineStyles.has(value as any);
  }

  toJSON(): Partial<AttributeProps> {
    if (this.isEmpty())
      return {
        reset: true,
      };

    const props: Partial<AttributeProps> = {};
    for (const attr of this.values()) {
      if (Attributes.isUnderlineStyle(attr)) {
        props.underlineStyle = attr;
      } else {
        const prop = ATTRIBUTE_TO_PROP[attr];
        if (prop) props[prop] = true;
      }
    }

    if (this.fg) props.foregroundColor = this.fg < 256 ? this.fg : rgb(this.fg);
    if (this.bg) props.backgroundColor = this.bg < 256 ? this.bg : rgb(this.bg);
    if (this.ul) props.underlineColor = this.ul < 256 ? this.ul : rgb(this.ul);

    return props;
  }

  /**
   * Returns a hash of the attributes.
   * This is useful for comparing attributes.
   */
  toNumber() {
    let hash = this.value;
    if (this.bg) hash ^= this.bg << 1;
    if (this.fg) hash ^= this.fg << 2;
    if (this.ul) hash ^= this.ul << 3;
    return hash >>> 0; // Ensure unsigned 32-bit
  }

  [Symbol.toStringTag] = "Attributes";

  static pack(r: number, g: number, b: number) {
    return (r << 16) | (g << 8) | b;
  }

  static unpack(rgb: number) {
    return [rgb >> 16, (rgb >> 8) & 0xff, rgb & 0xff];
  }

  static readonly empty = new Attributes();
}
