import { type BasicColor, DefaultColor, rgb } from "../../color";
import type { GenericBitfield } from "../../utils/bitfield";
import { type Attribute, UnderlineStyle } from "./attribute";
import {
  BACKGROUND_BIT_TO_BASIC_COLOR,
  BASIC_COLOR_TO_BACKGROUND_BIT,
  BASIC_COLOR_TO_FOREGROUND_BIT,
  BIT_TO_ATTRIBUTE,
  Bit,
  type ColorBit,
  FOREGROUND_BIT_TO_BASIC_COLOR,
} from "./bit";
import { ATTRIBUTE_TO_PROP, type AttributesProps } from "./props";

/**
 * A bitset representation of SGR attributes.
 *
 * @example
 * ```ts
 * const attributes = new Attributes()
 *   .foregroundColor(BasicColor.Red)
 *   .underline()
 *   .bold()
 *   .italic();
 *
 *
 * attributes.has(Bit.Bold); // true
 * attributes.has(Bit.Italic); // true
 * attributes.has(Bit.Underline); // true
 * attributes.has(Bit.ForegroundColor); // true
 *
 *
 * attributes.and(new Attributes().backgroundColor(BasicColor.Blue));
 * attributes.or(new Attributes().backgroundColor(BasicColor.Blue));
 * attributes.xor(new Attributes().backgroundColor(BasicColor.Blue));
 *
 * new Style(attributes);
 * ```
 */
export class Attributes implements GenericBitfield<Attributes, Bit, Attribute> {
  protected readonly low: number;
  protected readonly high: number;
  readonly bg: ColorBit;
  readonly fg: ColorBit;
  readonly ul: ColorBit;
  readonly us: UnderlineStyle;
  constructor(
    low?: number,
    high?: number,
    bg?: ColorBit,
    fg?: ColorBit,
    ul?: ColorBit,
    us?: UnderlineStyle,
  ) {
    // Ensure we're working with 32-bit unsigned integers
    this.low = low ?? 0;
    this.high = high ?? 0;
    this.bg = bg ?? 0;
    this.fg = fg ?? 0;
    this.ul = ul ?? 0;
    this.us = us ?? 0;
  }

  protected with(
    low?: number,
    high?: number,
    bg?: ColorBit,
    fg?: ColorBit,
    ul?: ColorBit,
    us?: UnderlineStyle,
  ) {
    return new Attributes(
      low ?? this.low,
      high ?? this.high,
      bg ?? this.bg,
      fg ?? this.fg,
      ul ?? this.ul,
      us ?? this.us,
    );
  }

  reset() {
    return this.with(Bit.Reset);
  }

  bold() {
    return this.set(Bit.Bold);
  }

  normalIntensity() {
    return this.with(
      (this.low & ~((1 << Bit.Faint) | Bit.Bold)) | (1 << Bit.NormalIntensity),
      this.high,
    );
  }

  faint() {
    return this.with(
      (this.low & ~(1 << Bit.NormalIntensity)) | (1 << Bit.Faint),
      this.high,
    );
  }

  italic() {
    return this.with(
      (this.low & ~(1 << Bit.NoItalic)) | (1 << Bit.Italic),
      this.high,
    );
  }

  noItalic() {
    return this.with(
      (this.low & ~(1 << Bit.Italic)) | (1 << Bit.NoItalic),
      this.high,
    );
  }

  underline(style = UnderlineStyle.Single) {
    if (style === UnderlineStyle.None) {
      return this.noUnderline();
    }

    return this.with(
      this.low | (1 << Bit.Underline),
      this.high,
      this.bg,
      this.fg,
      this.ul,
      style,
    );
  }

  private static readonly CLEAR_UNDERLINE = {
    low: (1 << Bit.Underline) | (1 << Bit.NoUnderline),
    high:
      (1 << (Bit.DefaultUnderlineColor - 32)) |
      (1 << (Bit.ExtendedUnderlineColor - 32)),
  };

  noUnderline() {
    return this.with(
      (this.low & ~Attributes.CLEAR_UNDERLINE.low) | (1 << Bit.NoUnderline),
      this.high & ~Attributes.CLEAR_UNDERLINE.high,
      this.bg,
      this.fg,
      0,
      UnderlineStyle.None,
    );
  }

  blink() {
    return this.with(
      (this.low & ~(1 << Bit.NoBlink)) | (1 << Bit.Blink),
      this.high,
    );
  }

  noBlink() {
    return this.with(
      (this.low & ~(1 << Bit.Blink)) | (1 << Bit.NoBlink),
      this.high,
    );
  }

  slowBlink() {
    return this.with(
      (this.low & ~(1 << Bit.NoBlink)) | (1 << Bit.Blink),
      this.high,
    );
  }

  rapidBlink() {
    return this.with(
      (this.low & ~(1 << Bit.NoBlink)) | (1 << Bit.RapidBlink),
      this.high,
    );
  }

  reverse() {
    return this.with(
      (this.low & ~(1 << Bit.NoReverse)) | (1 << Bit.Reverse),
      this.high,
    );
  }

  noReverse() {
    return this.with(
      (this.low & ~(1 << Bit.Reverse)) | (1 << Bit.NoReverse),
      this.high,
    );
  }
  conceal() {
    return this.with(
      (this.low & ~(1 << Bit.Conceal)) | (1 << Bit.Conceal),
      this.high,
    );
  }

  noConceal() {
    return this.with(
      (this.low & ~(1 << Bit.Conceal)) | (1 << Bit.NoConceal),
      this.high,
    );
  }
  strikethrough() {
    return this.with(
      (this.low & ~(1 << Bit.Strikethrough)) | (1 << Bit.Strikethrough),
      this.high,
    );
  }

  noStrikethrough() {
    return this.with(
      (this.low & ~(1 << Bit.Strikethrough)) | (1 << Bit.NoStrikethrough),
      this.high,
    );
  }

  /**
   * Sets foreground color.
   *
   * @param color - basic, indexed or (packed) RGB color
   */
  foregroundColor(color: ColorBit): Attributes {
    // Clear existing foreground color bits
    const clear = this.clearForegroundColor();

    if (color === DefaultColor) {
      return clear.defaultForegroundColor();
    }

    if (color < 16) {
      return clear.set(BASIC_COLOR_TO_FOREGROUND_BIT[color as BasicColor]);
    } else if (color < 256) {
      return clear.with(
        clear.low | (1 << Bit.ExtendedForegroundColor),
        clear.high,
        clear.bg,
        color,
      );
    }
    return this.with(this.low, this.high, this.bg, color);
  }

  private static readonly CLEAR_FOREGROUND_COLOR = {
    // Low bits
    low:
      (1 << Bit.BlackForegroundColor) |
      (1 << Bit.RedForegroundColor) |
      (1 << Bit.GreenForegroundColor) |
      (1 << Bit.YellowForegroundColor) |
      (1 << Bit.BlueForegroundColor) |
      (1 << Bit.MagentaForegroundColor) |
      (1 << Bit.CyanForegroundColor) |
      (1 << Bit.WhiteForegroundColor) |
      (1 << Bit.DefaultForegroundColor),

    // High bits
    high:
      (1 << (Bit.BrightBlackForegroundColor - 32)) |
      (1 << (Bit.BrightRedForegroundColor - 32)) |
      (1 << (Bit.BrightGreenForegroundColor - 32)) |
      (1 << (Bit.BrightYellowForegroundColor - 32)) |
      (1 << (Bit.BrightBlueForegroundColor - 32)) |
      (1 << (Bit.BrightMagentaForegroundColor - 32)) |
      (1 << (Bit.BrightCyanForegroundColor - 32)) |
      (1 << (Bit.BrightWhiteForegroundColor - 32)) |
      (1 << (Bit.DefaultForegroundColor - 32)) |
      (1 << (Bit.ExtendedBackgroundColor - 32)),
  } as const;

  private clearForegroundColor(): Attributes {
    return this.with(
      this.low & ~Attributes.CLEAR_FOREGROUND_COLOR.low,
      this.high & ~Attributes.CLEAR_FOREGROUND_COLOR.high,
      this.bg,
      0, // Clear fg color
    );
  }

  defaultForegroundColor() {
    return this.with(
      (this.low & ~Attributes.CLEAR_FOREGROUND_COLOR.low) |
        (1 << Bit.DefaultForegroundColor),
      this.high & ~Attributes.CLEAR_FOREGROUND_COLOR.high,
      this.bg,
      0,
    );
  }

  /**
   * Sets background color.

   * @param color - basic, indexed or (packed) RGB color
   */
  backgroundColor(color: ColorBit) {
    const clear = this.clearBackgroundColor();

    if (color === DefaultColor) {
      return this.with(
        this.low,
        this.high | (1 << (Bit.DefaultBackgroundColor - 32)),
      );
    }

    if (color < 16) {
      return clear.set(BASIC_COLOR_TO_BACKGROUND_BIT[color as BasicColor]);
    } else if (color < 256) {
      return clear.with(
        clear.low,
        clear.high | (1 << (Bit.ExtendedBackgroundColor - 32)),
        color,
      );
    }

    return this.with(this.low, this.high, color);
  }

  private static readonly CLEAR_BACKGROUND_COLOR = {
    low:
      (1 << Bit.BlackBackgroundColor) |
      (1 << Bit.RedBackgroundColor) |
      (1 << Bit.GreenBackgroundColor) |
      (1 << Bit.YellowBackgroundColor) |
      (1 << Bit.BlueBackgroundColor),

    high:
      (1 << (Bit.MagentaBackgroundColor - 32)) |
      (1 << (Bit.CyanBackgroundColor - 32)) |
      (1 << (Bit.WhiteBackgroundColor - 32)) |
      (1 << (Bit.BrightBlackBackgroundColor - 32)) |
      (1 << (Bit.BrightRedBackgroundColor - 32)) |
      (1 << (Bit.BrightGreenBackgroundColor - 32)) |
      (1 << (Bit.BrightYellowBackgroundColor - 32)) |
      (1 << (Bit.BrightBlueBackgroundColor - 32)) |
      (1 << (Bit.BrightMagentaBackgroundColor - 32)) |
      (1 << (Bit.BrightCyanBackgroundColor - 32)) |
      (1 << (Bit.BrightWhiteBackgroundColor - 32)) |
      (1 << (Bit.DefaultBackgroundColor - 32)) |
      (1 << (Bit.ExtendedBackgroundColor - 32)),
  } as const;

  private clearBackgroundColor(): Attributes {
    return this.with(
      this.low & ~Attributes.CLEAR_BACKGROUND_COLOR.low,
      this.high & ~Attributes.CLEAR_BACKGROUND_COLOR.high,
      this.bg,
      this.fg,
      0,
    );
  }

  defaultBackgroundColor() {
    return this.backgroundColor(DefaultColor);
  }

  /**
   * Sets underline color.
   *
   * @param color - basic, indexed or (packed) RGB color
   */
  underlineColor(color: ColorBit) {
    const cleared = this.clearUnderlineColor();

    if (color === DefaultColor) {
      return cleared.defaultUnderlineColor();
    }

    if (color < 256) {
      return cleared.with(
        this.low,
        this.high | (1 << (Bit.ExtendedUnderlineColor - 32)), // Add - 32
        this.bg,
        this.fg,
        color,
      );
    }

    return this.with(this.low, this.high, this.bg, this.fg, color);
  }

  private static readonly CLEAR_UNDERLINE_COLOR = {
    high:
      (1 << (Bit.DefaultUnderlineColor - 32)) |
      (1 << (Bit.ExtendedUnderlineColor - 32)),
  } as const;

  private clearUnderlineColor(): Attributes {
    return this.with(
      this.low,
      this.high & ~Attributes.CLEAR_UNDERLINE_COLOR.high,
      this.bg,
      this.fg,
      0,
    );
  }
  defaultUnderlineColor() {
    return this.with(
      this.low,
      this.high | (1 << (Bit.DefaultUnderlineColor - 32)),
      this.bg,
      this.fg,
      0,
    );
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
   * @param us - underline style
   * @returns A new Attributes instance with the bit set
   */
  set(
    bit: Bit,
    bg?: ColorBit,
    fg?: ColorBit,
    ul?: ColorBit,
    us?: UnderlineStyle,
  ) {
    Attributes.assert(bit);

    if (bit < 32) {
      return this.with(this.low | (1 << bit), this.high, bg, fg, ul, us);
    } else {
      return this.with(this.low, this.high | (1 << (bit - 32)), bg, fg, ul, us);
    }
  }

  /**
   * Unset a bit at the specified position
   * @param bit - The bit position (0-63)
   * @param fg - foreground color
   * @param bg - background color
   * @param ul - underline color
   * @param us - underline style
   * @returns A new Attributes instance with the bit unset
   */
  unset(
    bit: Bit,
    bg?: ColorBit,
    fg?: ColorBit,
    ul?: ColorBit,
    us?: UnderlineStyle,
  ) {
    Attributes.assert(bit);

    if (bit < 32) {
      return this.with(this.low & ~(1 << bit), this.high, bg, fg, ul, us);
    } else {
      return this.with(
        this.low,
        this.high & ~(1 << (bit - 32)),
        bg,
        fg,
        ul,
        us,
      );
    }
  }

  /**
   * Check if a bit is set at the specified position
   * @param bit - The bit position (0-63)
   * @returns true if the bit is set, false otherwise
   */
  has(bit: Bit): boolean {
    Attributes.assert(bit);

    if (bit < 32) {
      return (this.low & (1 << bit)) !== 0;
    } else {
      return (this.high & (1 << (bit - 32))) !== 0;
    }
  }

  /**
   * Toggle a bit at the specified position
   * @param bit - The bit position (0-63)
   * @returns A new Attributes instance with the bit toggled
   */
  toggle(bit: Bit) {
    Attributes.assert(bit);

    if (bit < 32) {
      return this.with(this.low ^ (1 << bit), this.high);
    } else {
      return this.with(this.low, this.high ^ (1 << (bit - 32)));
    }
  }

  // ... rest of the methods remain the same ...

  clear() {
    return this.with(0, 0);
  }

  toString(radix?: number): string {
    return this.valueOf().toString(radix);
  }

  #valueOf?: bigint;
  valueOf() {
    if (!this.#valueOf)
      this.#valueOf = BigInt(this.low >>> 0) + (BigInt(this.high >>> 0) << 32n);
    return this.#valueOf;
  }

  get length(): number {
    let count = 0;
    let value = this.valueOf();

    while (value > 0) {
      value &= value - 1n;
      count++;
    }

    return count;
  }

  or(other: Attributes) {
    return this.with(
      this.low | other.low,
      this.high | other.high,
      this.bg | other.bg,
      this.fg | other.fg,
      this.ul | other.ul,
      this.us | other.us,
    );
  }

  and(other: Attributes) {
    return this.with(
      this.low & other.low,
      this.high & other.high,
      this.bg & other.bg,
      this.fg & other.fg,
      this.ul & other.ul,
      this.us & other.us,
    );
  }

  xor(other: Attributes) {
    return this.with(
      this.low ^ other.low,
      this.high ^ other.high,
      this.bg ^ other.bg,
      this.fg ^ other.fg,
      this.ul ^ other.ul,
      this.us ^ other.us,
    );
  }

  not() {
    return this.with(~this.low, ~this.high, this.bg, this.fg, this.ul, this.us);
  }

  isEmpty(): boolean {
    return (
      this.low === 0 &&
      this.high === 0 &&
      this.bg === 0 &&
      this.fg === 0 &&
      this.ul === 0 &&
      this.us === 0
    );
  }

  isFull(): boolean {
    return this.low === 0xffffffff && this.high === 0xffffffff;
  }

  static from(
    bigInt: bigint,
    bg?: number,
    fg?: number,
    ul?: number,
    us?: number,
  ): Attributes;
  static from(
    bits: number[],
    bg?: number,
    fg?: number,
    ul?: number,
    us?: UnderlineStyle,
  ): Attributes;
  static from(
    bigIntOrBits: bigint | number[],
    bg?: number,
    fg?: number,
    ul?: number,
    us?: number,
  ) {
    if (typeof bigIntOrBits === "bigint") {
      return new Attributes(
        Number(bigIntOrBits & 0xffffffffn),
        Number((bigIntOrBits >> 32n) & 0xffffffffn),
        bg,
        fg,
        ul,
        us,
      );
    }
    let low = 0;
    let high = 0;

    for (const bit of bigIntOrBits) {
      if (bit >= 0 && bit < 32) {
        low |= 1 << bit;
      } else if (bit >= 32 && bit <= 63) {
        high |= 1 << (bit - 32);
      }
    }

    return new Attributes(low, high, bg, fg, ul, us);
  }

  static or(a: Attributes, b: Attributes) {
    return new Attributes(
      a.low | b.low,
      a.high | b.high,
      a.bg ?? b.bg,
      a.fg ?? b.fg,
      a.ul ?? b.ul,
      a.us ?? b.us,
    );
  }

  static and(a: Attributes, b: Attributes) {
    return new Attributes(
      a.low & b.low,
      a.high & b.high,
      a.bg ?? b.bg,
      a.fg ?? b.fg,
      a.ul ?? b.ul,
      a.us ?? b.us,
    );
  }

  static xor(a: Attributes, b: Attributes) {
    return new Attributes(
      a.low ^ b.low,
      a.high ^ b.high,
      a.bg ?? b.bg,
      a.fg ?? b.fg,
      a.ul ?? b.ul,
      a.us ?? b.us,
    );
  }

  static not(a: Attributes) {
    return new Attributes(~a.low >>> 0, ~a.high >>> 0, a.bg, a.fg, a.ul, a.us);
  }

  toHex(): string {
    return "0x" + this.valueOf().toString(16).padStart(16, "0");
  }

  copy() {
    return new Attributes(
      this.low,
      this.high,
      this.bg,
      this.fg,
      this.ul,
      this.us,
    );
  }

  [Symbol.iterator] = this.entries;

  *keys() {
    // Use Brian Kernighan's algorithm for faster bit counting
    let x = this.low;
    let position = 0;

    let bit = 0;
    let bitPosition = 0;

    while (x !== 0) {
      bit = x & -x; // Isolate rightmost set bit
      bitPosition = Math.clz32(bit) ^ 31; // Fast bit position
      yield (position + bitPosition) as Bit;
      x &= x - 1; // Clear rightmost set bit
    }

    // ... again, for high register
    x = this.high;
    position = 32;

    while (x !== 0) {
      bit = x & -x; // Isolate rightmost set bit
      bitPosition = Math.clz32(bit) ^ 31; // Fast bit position
      yield (position + bitPosition) as Bit;
      x &= x - 1;
    }
  }

  *values() {
    for (let i = 0; i < 64; i++) {
      if (this.has(i)) yield BIT_TO_ATTRIBUTE[i as Bit];
    }
  }

  *entries() {
    for (const bit of this.keys()) {
      if (this.has(bit)) yield [bit, BIT_TO_ATTRIBUTE[bit as Bit]] as const;
    }
  }
  toJSON(): Partial<AttributesProps> {
    if (this.isEmpty())
      return {
        reset: true,
      };

    const props: Partial<AttributesProps> = {};
    for (const [key, value] of this.entries()) {
      if (key === Bit.DefaultBackgroundColor) {
        props.backgroundColor = DefaultColor;
      } else if (key === Bit.DefaultForegroundColor) {
        props.foregroundColor = DefaultColor;
      } else if (key === Bit.DefaultUnderlineColor) {
        props.underlineColor = DefaultColor;
      } else if (
        key === Bit.ExtendedBackgroundColor ||
        key === Bit.ExtendedForegroundColor ||
        key === Bit.ExtendedUnderlineColor
      ) {
      } else if (
        key === Bit.BlackBackgroundColor ||
        key === Bit.RedBackgroundColor ||
        key === Bit.GreenBackgroundColor ||
        key === Bit.YellowBackgroundColor ||
        key === Bit.BlueBackgroundColor ||
        key === Bit.MagentaBackgroundColor ||
        key === Bit.CyanBackgroundColor ||
        key === Bit.WhiteBackgroundColor ||
        key === Bit.BrightBlackBackgroundColor ||
        key === Bit.BrightRedBackgroundColor ||
        key === Bit.BrightGreenBackgroundColor ||
        key === Bit.BrightYellowBackgroundColor ||
        key === Bit.BrightBlueBackgroundColor ||
        key === Bit.BrightMagentaBackgroundColor ||
        key === Bit.BrightCyanBackgroundColor ||
        key === Bit.BrightWhiteBackgroundColor
      ) {
        props.foregroundColor = BACKGROUND_BIT_TO_BASIC_COLOR[key];
      } else if (
        key === Bit.BlackForegroundColor ||
        key === Bit.RedForegroundColor ||
        key === Bit.GreenForegroundColor ||
        key === Bit.YellowForegroundColor ||
        key === Bit.BlueForegroundColor ||
        key === Bit.MagentaForegroundColor ||
        key === Bit.CyanForegroundColor ||
        key === Bit.WhiteForegroundColor ||
        key === Bit.BrightBlackForegroundColor ||
        key === Bit.BrightRedForegroundColor ||
        key === Bit.BrightGreenForegroundColor ||
        key === Bit.BrightYellowForegroundColor ||
        key === Bit.BrightBlueForegroundColor ||
        key === Bit.BrightMagentaForegroundColor ||
        key === Bit.BrightCyanForegroundColor ||
        key === Bit.BrightWhiteForegroundColor
      ) {
        props.foregroundColor =
          FOREGROUND_BIT_TO_BASIC_COLOR[key as Bit.BlackForegroundColor];
      } else {
        // @ts-expect-error - Not sure why it doesn't realize that the only possible key outcome can not possibly be `Bit.BlackBackgroundColor` (or any other color)
        props[ATTRIBUTE_TO_PROP[value] as keyof AttributesProps] = true;
      }
    }

    if (this.fg) {
      props.foregroundColor = rgb(this.fg);
    }

    if (this.bg) {
      props.backgroundColor = rgb(this.bg);
    }

    if (this.ul) {
      props.underlineColor = rgb(this.ul);
    }

    if (this.us) {
      props.underlineStyle = this.us;
    }

    return props;
  }

  static assert(bit: number) {
    if (bit < 0 || bit > 63)
      throw new Error(`Number must be between 0 and 63, got ${bit}`);
  }

  static pack(r: number, g: number, b: number) {
    return (r << 16) | (g << 8) | b;
  }

  static unpack(rgb: number) {
    return [rgb >> 16, (rgb >> 8) & 0xff, rgb & 0xff];
  }
}
