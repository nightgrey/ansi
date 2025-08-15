import { BasicColor, DefaultColor, type MaybeColor } from "../color";
import type { GenericBitfield } from "../utils/bitfield";

/**
 * Defines the different underline styles.
 */
export enum UnderlineStyle {
  None,
  Single,
  Double,
  Curly,
  Dotted,
  Dashed,
}

/**
 * SGR attributes
 *
 * @example
 * ```ts
 * `${CSI}${Attribute.Bold};${Attribute.Underline};${Attribute.RedForegroundColor}Hello World${CSI}m`
 * ```
 *
 * @see https://vt100.net/docs/vt510-rm/SGR.html#T5-16
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
 */
export enum Attribute {
  Reset,
  Bold,
  Faint,
  Italic,
  Underline,
  Blink,
  RapidBlink,
  Reverse,
  Conceal,
  Strikethrough,

  NormalIntensity = 22,
  NoItalic,
  NoUnderline,
  NoBlink,

  NoReverse = 27,
  NoConceal,
  NoStrikethrough,

  // Foreground colors
  BlackForegroundColor,
  RedForegroundColor,
  GreenForegroundColor,
  YellowForegroundColor,
  BlueForegroundColor,
  MagentaForegroundColor,
  CyanForegroundColor,
  WhiteForegroundColor,
  ExtendedForegroundColor,
  DefaultForegroundColor,

  // Background colors
  BlackBackgroundColor,
  RedBackgroundColor,
  GreenBackgroundColor,
  YellowBackgroundColor,
  BlueBackgroundColor,
  MagentaBackgroundColor,
  CyanBackgroundColor,
  WhiteBackgroundColor,
  ExtendedBackgroundColor,
  DefaultBackgroundColor,

  // Underline colors
  ExtendedUnderlineColor = 58,
  DefaultUnderlineColor,

  // Bright foreground colors
  BrightBlackForegroundColor = 90,
  BrightRedForegroundColor,
  BrightGreenForegroundColor,
  BrightYellowForegroundColor,
  BrightBlueForegroundColor,
  BrightMagentaForegroundColor,
  BrightCyanForegroundColor,
  BrightWhiteForegroundColor,

  // Bright background colors
  BrightBlackBackgroundColor,
  BrightRedBackgroundColor,
  BrightGreenBackgroundColor,
  BrightYellowBackgroundColor,
  BrightBlueBackgroundColor,
  BrightMagentaBackgroundColor,
  BrightCyanBackgroundColor,
  BrightWhiteBackgroundColor,
}

/**
 * SGR introducer attributes
 *
 * @example
 * ```ts
 * `${CSI}${IntroducerAttribute.RGBColor};${IntroducerAttribute.ExtendedColor};${BasicColor.Red}Hello World${CSI}m`
 * ```
 */
export enum IntroducerAttribute {
  RGBColor = 2,
  ExtendedColor = 5,
}

/**
 * Attribute bits
 *
 * Represents position of the bit in the 64-bit value.
 *
 * @see {@link Attributes}
 * @see {@link BIT_TO_ATTRIBUTE}
 */
export enum Bit {
  Reset,
  Bold,
  Faint,
  Italic,
  Underline,
  Blink,
  RapidBlink,
  Reverse,
  Conceal,
  Strikethrough,
  NormalIntensity,
  NoItalic,
  NoUnderline,
  NoBlink,
  NoReverse,
  NoConceal,
  NoStrikethrough,
  BlackForegroundColor,
  RedForegroundColor,
  GreenForegroundColor,
  YellowForegroundColor,
  BlueForegroundColor,
  MagentaForegroundColor,
  CyanForegroundColor,
  WhiteForegroundColor,
  ExtendedForegroundColor,
  DefaultForegroundColor,
  BlackBackgroundColor,
  RedBackgroundColor,
  GreenBackgroundColor,
  YellowBackgroundColor,
  BlueBackgroundColor,
  MagentaBackgroundColor,
  CyanBackgroundColor,
  WhiteBackgroundColor,
  ExtendedBackgroundColor,
  DefaultBackgroundColor,
  ExtendedUnderlineColor,
  DefaultUnderlineColor,
  BrightBlackForegroundColor,
  BrightRedForegroundColor,
  BrightGreenForegroundColor,
  BrightYellowForegroundColor,
  BrightBlueForegroundColor,
  BrightMagentaForegroundColor,
  BrightCyanForegroundColor,
  BrightWhiteForegroundColor,
  BrightBlackBackgroundColor,
  BrightRedBackgroundColor,
  BrightGreenBackgroundColor,
  BrightYellowBackgroundColor,
  BrightBlueBackgroundColor,
  BrightMagentaBackgroundColor,
  BrightCyanBackgroundColor,
  BrightWhiteBackgroundColor,
}

export type ColorBit = number;

/**
 * SGR Attributes
 */
export class Attributes
  implements
    GenericBitfield<Attributes, number, Attribute | IntroducerAttribute>
{
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
    bit: number,
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
    bit: number,
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
  has(bit: number): boolean {
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
  toggle(bit: number) {
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

  *[Symbol.iterator]() {
    yield* this.values();
  }

  *keys() {
    // Use Brian Kernighan's algorithm for faster bit counting
    let low = this.low;
    let position = 0;

    while (low !== 0) {
      const bit = low & -low; // Isolate rightmost set bit
      const bitPosition = Math.clz32(bit) ^ 31; // Fast bit position
      yield (position + bitPosition) as Bit;
      low &= low - 1; // Clear rightmost set bit
    }

    let high = this.high;
    position = 32;

    while (high !== 0) {
      const bit = high & -high;
      const bitPosition = Math.clz32(bit) ^ 31;
      yield (position + bitPosition) as Bit;
      high &= high - 1;
    }
  }

  *values() {
    for (const bit of this.keys()) {
      yield BIT_TO_ATTRIBUTE[bit as Bit];
    }
  }

  *entries() {
    for (const bit of this.keys()) {
      yield [bit, BIT_TO_ATTRIBUTE[bit as Bit]] as const;
    }
  }

  toJSON() {
    return [this.valueOf()];
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
export const BASIC_COLOR_TO_FOREGROUND_BIT: Record<BasicColor, Bit> = {
  [BasicColor.Black]: Bit.BlackForegroundColor,
  [BasicColor.Red]: Bit.RedForegroundColor,
  [BasicColor.Green]: Bit.GreenForegroundColor,
  [BasicColor.Yellow]: Bit.YellowForegroundColor,
  [BasicColor.Blue]: Bit.BlueForegroundColor,
  [BasicColor.Magenta]: Bit.MagentaForegroundColor,
  [BasicColor.Cyan]: Bit.CyanForegroundColor,
  [BasicColor.White]: Bit.WhiteForegroundColor,
  [BasicColor.BrightBlack]: Bit.BrightBlackForegroundColor,
  [BasicColor.BrightRed]: Bit.BrightRedForegroundColor,
  [BasicColor.BrightGreen]: Bit.BrightGreenForegroundColor,
  [BasicColor.BrightYellow]: Bit.BrightYellowForegroundColor,
  [BasicColor.BrightBlue]: Bit.BrightBlueForegroundColor,
  [BasicColor.BrightMagenta]: Bit.BrightMagentaForegroundColor,
  [BasicColor.BrightCyan]: Bit.BrightCyanForegroundColor,
  [BasicColor.BrightWhite]: Bit.BrightWhiteForegroundColor,
};

export const BASIC_COLOR_TO_BACKGROUND_BIT: Record<BasicColor, Bit> = {
  [BasicColor.Black]: Bit.BlackBackgroundColor,
  [BasicColor.Red]: Bit.RedBackgroundColor,
  [BasicColor.Green]: Bit.GreenBackgroundColor,
  [BasicColor.Yellow]: Bit.YellowBackgroundColor,
  [BasicColor.Blue]: Bit.BlueBackgroundColor,
  [BasicColor.Magenta]: Bit.MagentaBackgroundColor,
  [BasicColor.Cyan]: Bit.CyanBackgroundColor,
  [BasicColor.White]: Bit.WhiteBackgroundColor,
  [BasicColor.BrightBlack]: Bit.BrightBlackBackgroundColor,
  [BasicColor.BrightRed]: Bit.BrightRedBackgroundColor,
  [BasicColor.BrightGreen]: Bit.BrightGreenBackgroundColor,
  [BasicColor.BrightYellow]: Bit.BrightYellowBackgroundColor,
  [BasicColor.BrightBlue]: Bit.BrightBlueBackgroundColor,
  [BasicColor.BrightMagenta]: Bit.BrightMagentaBackgroundColor,
  [BasicColor.BrightCyan]: Bit.BrightCyanBackgroundColor,
  [BasicColor.BrightWhite]: Bit.BrightWhiteBackgroundColor,
};
export const COLOR_TO_BIT: Record<BasicColor, Bit> = {
  [BasicColor.Black]: Bit.BlackForegroundColor,
  [BasicColor.Red]: Bit.RedForegroundColor,
  [BasicColor.Green]: Bit.GreenForegroundColor,
  [BasicColor.Yellow]: Bit.YellowForegroundColor,
  [BasicColor.Blue]: Bit.BlueForegroundColor,
  [BasicColor.Magenta]: Bit.MagentaForegroundColor,
  [BasicColor.Cyan]: Bit.CyanForegroundColor,
  [BasicColor.White]: Bit.WhiteForegroundColor,
  [BasicColor.BrightBlack]: Bit.BrightBlackForegroundColor,
  [BasicColor.BrightRed]: Bit.BrightRedForegroundColor,
  [BasicColor.BrightGreen]: Bit.BrightGreenForegroundColor,
  [BasicColor.BrightYellow]: Bit.BrightYellowForegroundColor,
  [BasicColor.BrightBlue]: Bit.BrightBlueForegroundColor,
  [BasicColor.BrightMagenta]: Bit.BrightMagentaForegroundColor,
  [BasicColor.BrightCyan]: Bit.BrightCyanForegroundColor,
  [BasicColor.BrightWhite]: Bit.BrightWhiteForegroundColor,
};

/** Bit <-> Attribute */
export const BIT_TO_ATTRIBUTE = Object.freeze({
  [Bit.Reset]: Attribute.Reset,
  [Bit.Bold]: Attribute.Bold,
  [Bit.Faint]: Attribute.Faint,
  [Bit.Italic]: Attribute.Italic,
  [Bit.Underline]: Attribute.Underline,
  [Bit.Blink]: Attribute.Blink,
  [Bit.RapidBlink]: Attribute.RapidBlink,
  [Bit.Reverse]: Attribute.Reverse,
  [Bit.Conceal]: Attribute.Conceal,
  [Bit.Strikethrough]: Attribute.Strikethrough,
  [Bit.NormalIntensity]: Attribute.NormalIntensity,
  [Bit.NoItalic]: Attribute.NoItalic,
  [Bit.NoUnderline]: Attribute.NoUnderline,
  [Bit.NoBlink]: Attribute.NoBlink,
  [Bit.NoReverse]: Attribute.NoReverse,
  [Bit.NoConceal]: Attribute.NoConceal,
  [Bit.NoStrikethrough]: Attribute.NoStrikethrough,
  [Bit.BlackForegroundColor]: Attribute.BlackForegroundColor,
  [Bit.RedForegroundColor]: Attribute.RedForegroundColor,
  [Bit.GreenForegroundColor]: Attribute.GreenForegroundColor,
  [Bit.YellowForegroundColor]: Attribute.YellowForegroundColor,
  [Bit.BlueForegroundColor]: Attribute.BlueForegroundColor,
  [Bit.MagentaForegroundColor]: Attribute.MagentaForegroundColor,
  [Bit.CyanForegroundColor]: Attribute.CyanForegroundColor,
  [Bit.WhiteForegroundColor]: Attribute.WhiteForegroundColor,
  [Bit.ExtendedForegroundColor]: Attribute.ExtendedForegroundColor,
  [Bit.DefaultForegroundColor]: Attribute.DefaultForegroundColor,
  [Bit.BlackBackgroundColor]: Attribute.BlackBackgroundColor,
  [Bit.RedBackgroundColor]: Attribute.RedBackgroundColor,
  [Bit.GreenBackgroundColor]: Attribute.GreenBackgroundColor,
  [Bit.YellowBackgroundColor]: Attribute.YellowBackgroundColor,
  [Bit.BlueBackgroundColor]: Attribute.BlueBackgroundColor,
  [Bit.MagentaBackgroundColor]: Attribute.MagentaBackgroundColor,
  [Bit.CyanBackgroundColor]: Attribute.CyanBackgroundColor,
  [Bit.WhiteBackgroundColor]: Attribute.WhiteBackgroundColor,
  [Bit.ExtendedBackgroundColor]: Attribute.ExtendedBackgroundColor,
  [Bit.DefaultBackgroundColor]: Attribute.DefaultBackgroundColor,
  [Bit.ExtendedUnderlineColor]: Attribute.ExtendedUnderlineColor,
  [Bit.DefaultUnderlineColor]: Attribute.DefaultUnderlineColor,
  [Bit.BrightBlackForegroundColor]: Attribute.BrightBlackForegroundColor,
  [Bit.BrightRedForegroundColor]: Attribute.BrightRedForegroundColor,
  [Bit.BrightGreenForegroundColor]: Attribute.BrightGreenForegroundColor,
  [Bit.BrightYellowForegroundColor]: Attribute.BrightYellowForegroundColor,
  [Bit.BrightBlueForegroundColor]: Attribute.BrightBlueForegroundColor,
  [Bit.BrightMagentaForegroundColor]: Attribute.BrightMagentaForegroundColor,
  [Bit.BrightCyanForegroundColor]: Attribute.BrightCyanForegroundColor,
  [Bit.BrightWhiteForegroundColor]: Attribute.BrightWhiteForegroundColor,
  [Bit.BrightBlackBackgroundColor]: Attribute.BrightBlackBackgroundColor,
  [Bit.BrightRedBackgroundColor]: Attribute.BrightRedBackgroundColor,
  [Bit.BrightGreenBackgroundColor]: Attribute.BrightGreenBackgroundColor,
  [Bit.BrightYellowBackgroundColor]: Attribute.BrightYellowBackgroundColor,
  [Bit.BrightBlueBackgroundColor]: Attribute.BrightBlueBackgroundColor,
  [Bit.BrightMagentaBackgroundColor]: Attribute.BrightMagentaBackgroundColor,
  [Bit.BrightCyanBackgroundColor]: Attribute.BrightCyanBackgroundColor,
  [Bit.BrightWhiteBackgroundColor]: Attribute.BrightWhiteBackgroundColor,
});
/** Attribute <-> Bit */
export const ATTRIBUTE_TO_BIT = Object.freeze({
  [Attribute.Reset]: Bit.Reset,
  [Attribute.Bold]: Bit.Bold,
  [Attribute.Faint]: Bit.Faint,
  [Attribute.Italic]: Bit.Italic,
  [Attribute.Underline]: Bit.Underline,
  [Attribute.Blink]: Bit.Blink,
  [Attribute.RapidBlink]: Bit.RapidBlink,
  [Attribute.Reverse]: Bit.Reverse,
  [Attribute.Conceal]: Bit.Conceal,
  [Attribute.Strikethrough]: Bit.Strikethrough,
  [Attribute.NormalIntensity]: Bit.NormalIntensity,
  [Attribute.NoItalic]: Bit.NoItalic,
  [Attribute.NoUnderline]: Bit.NoUnderline,
  [Attribute.NoBlink]: Bit.NoBlink,
  [Attribute.NoReverse]: Bit.NoReverse,
  [Attribute.NoConceal]: Bit.NoConceal,
  [Attribute.NoStrikethrough]: Bit.NoStrikethrough,
  [Attribute.BlackForegroundColor]: Bit.BlackForegroundColor,
  [Attribute.RedForegroundColor]: Bit.RedForegroundColor,
  [Attribute.GreenForegroundColor]: Bit.GreenForegroundColor,
  [Attribute.YellowForegroundColor]: Bit.YellowForegroundColor,
  [Attribute.BlueForegroundColor]: Bit.BlueForegroundColor,
  [Attribute.MagentaForegroundColor]: Bit.MagentaForegroundColor,
  [Attribute.CyanForegroundColor]: Bit.CyanForegroundColor,
  [Attribute.WhiteForegroundColor]: Bit.WhiteForegroundColor,
  [Attribute.ExtendedForegroundColor]: Bit.ExtendedForegroundColor,
  [Attribute.DefaultForegroundColor]: Bit.DefaultForegroundColor,
  [Attribute.BlackBackgroundColor]: Bit.BlackBackgroundColor,
  [Attribute.RedBackgroundColor]: Bit.RedBackgroundColor,
  [Attribute.GreenBackgroundColor]: Bit.GreenBackgroundColor,
  [Attribute.YellowBackgroundColor]: Bit.YellowBackgroundColor,
  [Attribute.BlueBackgroundColor]: Bit.BlueBackgroundColor,
  [Attribute.MagentaBackgroundColor]: Bit.MagentaBackgroundColor,
  [Attribute.CyanBackgroundColor]: Bit.CyanBackgroundColor,
  [Attribute.WhiteBackgroundColor]: Bit.WhiteBackgroundColor,
  [Attribute.ExtendedBackgroundColor]: Bit.ExtendedBackgroundColor,
  [Attribute.DefaultBackgroundColor]: Bit.DefaultBackgroundColor,
  [Attribute.ExtendedUnderlineColor]: Bit.ExtendedUnderlineColor,
  [Attribute.DefaultUnderlineColor]: Bit.DefaultUnderlineColor,
  [Attribute.BrightBlackForegroundColor]: Bit.BrightBlackForegroundColor,
  [Attribute.BrightRedForegroundColor]: Bit.BrightRedForegroundColor,
  [Attribute.BrightGreenForegroundColor]: Bit.BrightGreenForegroundColor,
  [Attribute.BrightYellowForegroundColor]: Bit.BrightYellowForegroundColor,
  [Attribute.BrightBlueForegroundColor]: Bit.BrightBlueForegroundColor,
  [Attribute.BrightMagentaForegroundColor]: Bit.BrightMagentaForegroundColor,
  [Attribute.BrightCyanForegroundColor]: Bit.BrightCyanForegroundColor,
  [Attribute.BrightWhiteForegroundColor]: Bit.BrightWhiteForegroundColor,
  [Attribute.BrightBlackBackgroundColor]: Bit.BrightBlackBackgroundColor,
  [Attribute.BrightRedBackgroundColor]: Bit.BrightRedBackgroundColor,
  [Attribute.BrightGreenBackgroundColor]: Bit.BrightGreenBackgroundColor,
  [Attribute.BrightYellowBackgroundColor]: Bit.BrightYellowBackgroundColor,
  [Attribute.BrightBlueBackgroundColor]: Bit.BrightBlueBackgroundColor,
  [Attribute.BrightMagentaBackgroundColor]: Bit.BrightMagentaBackgroundColor,
  [Attribute.BrightCyanBackgroundColor]: Bit.BrightCyanBackgroundColor,
  [Attribute.BrightWhiteBackgroundColor]: Bit.BrightWhiteBackgroundColor,
});

/**
 * Attribute <-> Property
 *
 * @remarks There is no direct background, foreground and underline attribute, so there is no direct mapping either.
 */
export const ATTRIBUTE_TO_PROP = Object.freeze({
  [Attribute.Reset]: "reset",
  [Attribute.Bold]: "bold",
  [Attribute.Faint]: "faint",
  [Attribute.Italic]: "italic",
  [Attribute.Underline]: "underline",
  [Attribute.Blink]: "blink",
  [Attribute.RapidBlink]: "rapidBlink",
  [Attribute.Reverse]: "reverse",
  [Attribute.Conceal]: "conceal",
  [Attribute.Strikethrough]: "strikethrough",
  [Attribute.NormalIntensity]: "normalIntensity",
  [Attribute.NoItalic]: "noItalic",
  [Attribute.NoUnderline]: "noUnderline",
  [Attribute.NoBlink]: "noBlink",
  [Attribute.NoReverse]: "noReverse",
  [Attribute.NoConceal]: "noConceal",
  [Attribute.NoStrikethrough]: "noStrikethrough",
  [Attribute.DefaultForegroundColor]: "defaultForegroundColor",
  [Attribute.DefaultBackgroundColor]: "defaultBackgroundColor",
  [Attribute.DefaultUnderlineColor]: "defaultUnderlineColor",
});
/**
 * Property <-> Attribute
 *
 * @remarks There is no direct background, foreground and underline attribute, so there is no direct mapping either.
 */
export const PROP_TO_ATTRIBUTE = Object.freeze({
  reset: Attribute.Reset,
  bold: Attribute.Bold,
  faint: Attribute.Faint,
  italic: Attribute.Italic,
  underline: Attribute.Underline,
  blink: Attribute.Blink,
  rapidBlink: Attribute.RapidBlink,
  reverse: Attribute.Reverse,
  conceal: Attribute.Conceal,
  strikethrough: Attribute.Strikethrough,
  normalIntensity: Attribute.NormalIntensity,
  noItalic: Attribute.NoItalic,
  noUnderline: Attribute.NoUnderline,
  noBlink: Attribute.NoBlink,
  noReverse: Attribute.NoReverse,
  noConceal: Attribute.NoConceal,
  noStrikethrough: Attribute.NoStrikethrough,
  defaultForegroundColor: Attribute.DefaultForegroundColor,
  defaultBackgroundColor: Attribute.DefaultBackgroundColor,
  defaultUnderlineColor: Attribute.DefaultUnderlineColor,
});

/**
 * AttributeProps defines attributes in a property format.
 */
export type AttributesProps = {
  [K in keyof typeof PROP_TO_ATTRIBUTE]: boolean;
} & {
  backgroundColor: MaybeColor;
  foregroundColor: MaybeColor;
  underlineColor: MaybeColor;
  underlineStyle: UnderlineStyle;
};
