import { intArgb32Srgb, srgbIntArgb32 } from "@thi.ng/color";
import { clamp01 } from "@thi.ng/math";
import {
  type ColorVec,
  DefaultColor,
  isDefaultColor,
  isIndexedColor,
  type MaybeColor,
  type RgbColor,
  rgb,
} from "../../color";
import { UnderlineStyle } from "./attribute";
import {
  ATTRIBUTE_TO_BIT,
  BIT_TO_ATTRIBUTE,
  Bit,
  type ColorAttribute,
  type PackedRGB,
} from "./bit";
import { ATTRIBUTE_TO_PROP, type AttributeProps } from "./props";

/**
 * Attributable
 *
 * An abstract class to easily implement your own performant bitset representation to handle SGR attributes.
 *
 * @example
 * ```ts
 * class Attributes extends Attributable {
 *   protected mutate(
 *     value?: number,
 *     bg?: ColorAttribute | null,
 *     fg?: ColorAttribute | null,
 *     ul?: ColorAttribute | null,
 *   ) {
 *     return new Attributes(
 *       value ?? this.value,
 *       bg ?? this.bg,
 *       fg ?? this.fg,
 *       ul ?? this.ul,
 *     );
 *   }
 * }
 *
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
 * ```
 *
 * @see {@link Attributes} for a concrete implementation
 */
export abstract class Attributable<T> {
  /** Bitset value */
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

  protected abstract mutate(
    value?: number,
    bg?: ColorAttribute | null,
    fg?: ColorAttribute | null,
    ul?: ColorAttribute | null,
  ): T;

  reset() {
    return this.mutate(0);
  }

  bold() {
    return this.set(Bit.Bold);
  }

  normalIntensity() {
    return this.mutate(
      (this.value & ~Attributable.masks[Bit.NormalIntensity]) |
        (1 << Bit.NormalIntensity),
    );
  }

  faint() {
    return this.mutate(
      (this.value & ~(1 << Bit.NormalIntensity)) | (1 << Bit.Faint),
    );
  }

  italic() {
    return this.mutate((this.value & ~(1 << Bit.NoItalic)) | (1 << Bit.Italic));
  }

  noItalic() {
    return this.mutate((this.value & ~(1 << Bit.Italic)) | (1 << Bit.NoItalic));
  }

  underline(style: UnderlineStyle = UnderlineStyle.Single) {
    if (style === UnderlineStyle.None) {
      return this.noUnderline();
    }

    if (style === UnderlineStyle.Single) {
      return this.mutate(
        (this.value & ~Attributable.masks[Bit.Underline]) |
          (1 << Bit.Underline),
      );
    }

    return this.mutate(
      (this.value & ~Attributable.masks[Bit.Underline]) |
        (1 << ATTRIBUTE_TO_BIT[style]),
    );
  }

  noUnderline() {
    return this.mutate(
      (this.value & ~Attributable.masks[Bit.Underline]) |
        (1 << Bit.NoUnderline),
      this.bg,
      this.fg,
      0,
    );
  }

  blink() {
    return this.mutate((this.value & ~(1 << Bit.NoBlink)) | (1 << Bit.Blink));
  }

  noBlink() {
    return this.mutate((this.value & ~(1 << Bit.Blink)) | (1 << Bit.NoBlink));
  }

  slowBlink() {
    return this.mutate((this.value & ~(1 << Bit.NoBlink)) | (1 << Bit.Blink));
  }

  rapidBlink() {
    return this.mutate(
      (this.value & ~(1 << Bit.NoBlink)) | (1 << Bit.RapidBlink),
    );
  }

  reverse() {
    return this.mutate(
      (this.value & ~(1 << Bit.NoReverse)) | (1 << Bit.Reverse),
    );
  }

  noReverse() {
    return this.mutate(
      (this.value & ~(1 << Bit.Reverse)) | (1 << Bit.NoReverse),
    );
  }
  conceal() {
    return this.mutate((this.value & ~(1 << Bit.Conceal)) | (1 << Bit.Conceal));
  }

  noConceal() {
    return this.mutate(
      (this.value & ~(1 << Bit.Conceal)) | (1 << Bit.NoConceal),
    );
  }
  strikethrough() {
    return this.mutate(
      (this.value & ~(1 << Bit.Strikethrough)) | (1 << Bit.Strikethrough),
    );
  }

  noStrikethrough() {
    return this.mutate(
      (this.value & ~(1 << Bit.Strikethrough)) | (1 << Bit.NoStrikethrough),
    );
  }

  /**
   * Sets foreground color.
   *
   * @param color - basic, indexed or (packed) RGB color
   */
  foregroundColor(color: MaybeColor) {
    if (isDefaultColor(color)) {
      return this.defaultForegroundColor();
    } else if (isIndexedColor(color)) {
      return this.mutate(this.value, this.bg, color);
    } else {
      return this.mutate(this.value, this.bg, Attributable.pack(rgb(color)));
    }
  }

  defaultForegroundColor() {
    return this.mutate(this.value, this.bg, DefaultColor);
  }

  /**
     * Sets background color.

     * @param color - basic, indexed or (packed) RGB color
     */
  backgroundColor(color: MaybeColor) {
    if (isDefaultColor(color)) {
      return this.defaultBackgroundColor();
    } else if (isIndexedColor(color)) {
      return this.mutate(this.value, color);
    } else {
      return this.mutate(this.value, Attributable.pack(rgb(color)));
    }
  }

  defaultBackgroundColor() {
    return this.mutate(this.value, DefaultColor);
  }

  /**
   * Sets underline color.
   *
   * @param color - basic, indexed or (packed) RGB color
   */
  underlineColor(color: MaybeColor) {
    if (isDefaultColor(color)) {
      return this.defaultUnderlineColor();
    } else if (isIndexedColor(color)) {
      return this.mutate(this.value, this.bg, this.fg, color);
    } else {
      return this.mutate(
        this.value,
        this.bg,
        this.fg,
        Attributable.pack(rgb(color)),
      );
    }
  }

  defaultUnderlineColor() {
    return this.mutate(this.value, this.bg, this.fg, DefaultColor);
  }

  underlineStyle(style: UnderlineStyle) {
    return this.underline(style);
  }

  singleUnderline() {
    return this.underlineStyle(UnderlineStyle.Single);
  }

  doubleUnderline() {
    return this.underlineStyle(UnderlineStyle.Double);
  }

  curlyUnderline() {
    return this.underlineStyle(UnderlineStyle.Curly);
  }

  dottedUnderline() {
    return this.underlineStyle(UnderlineStyle.Dotted);
  }

  dashedUnderline() {
    return this.underlineStyle(UnderlineStyle.Dashed);
  }

  /**
   * Set a bit at the specified position
   * @param bit - The bit position (0-63)
   * @param fg - foreground color
   * @param bg - background color
   * @param ul - underline color
   * @returns A new Attributable instance with the bit set
   */
  set(bit: Bit, bg?: ColorAttribute, fg?: ColorAttribute, ul?: ColorAttribute) {
    return this.mutate(this.value | (1 << bit), bg, fg, ul);
  }

  /**
   * Unset a bit at the specified position
   * @param bit - The bit position (0-63)
   * @param fg - foreground color
   * @param bg - background color
   * @param ul - underline color
   * @returns A new Attributable instance with the bit unset
   */
  unset(
    bit: Bit,
    bg?: ColorAttribute,
    fg?: ColorAttribute,
    ul?: ColorAttribute,
  ) {
    return this.mutate(this.value & ~(1 << bit), bg, fg, ul);
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
   * @returns A new Attributable instance with the bit toggled
   */
  toggle(bit: Bit) {
    return this.mutate(this.value ^ (1 << bit));
  }

  clear() {
    return this.mutate(0, null, null, null);
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

  equals(other: this) {
    return (
      this.value === other.value &&
      this.bg === other.bg &&
      this.fg === other.fg &&
      this.ul === other.ul
    );
  }

  or(other: this) {
    return this.mutate(
      this.value | other.value,
      other.bg !== null ? other.bg : this.bg,
      other.fg !== null ? other.fg : this.fg,
      other.ul !== null ? other.ul : this.ul,
    );
  }

  merge = this.or;

  and(other: this) {
    return this.mutate(this.value & other.value, this.bg, this.fg, this.ul);
  }

  xor(other: this) {
    return this.mutate(
      this.value ^ other.value,
      this.bg === other.bg ? null : other.bg,
      this.fg === other.fg ? null : other.fg,
      this.ul === other.ul ? null : other.ul,
    );
  }

  not() {
    return this.mutate(~this.value, undefined, undefined, undefined);
  }

  isEmpty(): boolean {
    return (
      this.value === 0 &&
      this.bg === null &&
      this.fg === null &&
      this.ul === null
    );
  }

  copy() {
    return this.mutate();
  }

  [Symbol.iterator] = this.entries;
  private static readonly BIT_POSITIONS = new Uint8Array(64);
  static {
    for (let i = 0; i < 64; i++) {
      Attributable.BIT_POSITIONS[i] = i;
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
    return Attributable.UnderlineStyles.has(value as any);
  }

  toJSON(): Partial<AttributeProps> {
    if (this.isEmpty())
      return {
        reset: true,
      };

    const props: Partial<AttributeProps> = {};
    for (const attr of this.values()) {
      if (Attributable.isUnderlineStyle(attr)) {
        props.underlineStyle = attr;
      } else {
        const prop = ATTRIBUTE_TO_PROP[attr];
        if (prop) props[prop] = true;
      }
    }

    if (this.fg)
      props.foregroundColor =
        this.fg < 256 ? this.fg : rgb(Attributable.unpack(this.fg));
    if (this.bg)
      props.backgroundColor =
        this.bg < 256 ? this.bg : rgb(Attributable.unpack(this.bg));
    if (this.ul)
      props.underlineColor =
        this.ul < 256 ? this.ul : rgb(Attributable.unpack(this.ul));

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

  [Symbol.toStringTag] = "Attributable";

  /**
   * Packs an RGB color into a packed RGB value.
   *
   * @param color - Color vector [0-1]
   *
   */
  static pack(color: ColorVec): PackedRGB {
    return srgbIntArgb32(color);
  }

  /**
   * Unpacks a packed RGB value into an RGB color.
   *
   * @param color - packed RGB value
   * @returns Color vector [0-1]
   */
  static unpack(color: PackedRGB) {
    return intArgb32Srgb([], color) as ColorVec;
  }

  /**
   * Converts a color to an SGR attribute string.
   *
   * @param color - Color vector [0-1]
   * @returns SGR attribute string, e.g., `255:128:64`
   */
  static attribute(color: PackedRGB | ColorVec) {
    if (typeof color === "number") {
      return `${(color >>> 16) & 255}:${(color >>> 8) & 255}:${color & 255}`;
    } else {
      return `${clamp01(color[0]) * 255}:${
        clamp01(color[1]) * 255
      }:${clamp01(color[2]) * 255}`;
    }
  }
}
