import { srgb } from "@thi.ng/color";
import { CSI } from "./c1";
import {
  type AnsiColor,
  BasicColor,
  DefaultColor,
  isBasicColor,
  isDefaultColor,
  isIndexedColor,
  type MaybeColor,
} from "./color";
import { srgb2553 } from "./color-utils/srgb-255";

/**
 * RESET_STYLE is a `SGR` (Select Graphic Rendition) style sequence that resets
 * all attributes.
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
 */
export const RESET_STYLE = `${CSI}m`;

/**
 * Attribute represents a numeric SGR attribute code.
 */
export type Attribute = number;

/**
 * UnderlineStyle defines the different underline styles available.
 */
export enum UnderlineStyle {
  NoUnderline = 24,
  SingleUnderline = 4,
  DoubleUnderline = "4:2",
  CurlyUnderline = "4:3",
  DottedUnderline = "4:4",
  DashedUnderline = "4:5",
}

/** Reset all attributes */
export const ResetAttr: Attribute = 0;
/** Bold or increased intensity */
export const BoldAttr: Attribute = 1;
/** Faint or decreased intensity */
export const FaintAttr: Attribute = 2;
/** Italic */
export const ItalicAttr: Attribute = 3;
/** Underline */
export const UnderlineAttr: Attribute = 4;
/** Slow blink */
export const SlowBlinkAttr: Attribute = 5;
/** Rapid blink */
export const RapidBlinkAttr: Attribute = 6;
/** Reverse video */
export const ReverseAttr: Attribute = 7;
/** Conceal */
export const ConcealAttr: Attribute = 8;
/** Strikethrough */
export const StrikethroughAttr: Attribute = 9;
/** Normal intensity */
export const NormalIntensityAttr: Attribute = 22;
/** Not italic */
export const NoItalicAttr: Attribute = 23;
/** Not underlined */
export const NoUnderlineAttr: Attribute = 24;
/** Not blinking */
export const NoBlinkAttr: Attribute = 25;
/** Not reversed */
export const NoReverseAttr: Attribute = 27;
/** Not concealed */
export const NoConcealAttr: Attribute = 28;
/** Not strikethrough */
export const NoStrikethroughAttr: Attribute = 29;
/** Black foreground color */
export const BlackForegroundColorAttr: Attribute = 30;
/** Red foreground color */
export const RedForegroundColorAttr: Attribute = 31;
/** Green foreground color */
export const GreenForegroundColorAttr: Attribute = 32;
/** Yellow foreground color */
export const YellowForegroundColorAttr: Attribute = 33;
/** Blue foreground color */
export const BlueForegroundColorAttr: Attribute = 34;
/** Magenta foreground color */
export const MagentaForegroundColorAttr: Attribute = 35;
/** Cyan foreground color */
export const CyanForegroundColorAttr: Attribute = 36;
/** White foreground color */
export const WhiteForegroundColorAttr: Attribute = 37;
/** Extended foreground color */
export const ExtendedForegroundColorAttr: Attribute = 38;
/** Default foreground color */
export const DefaultForegroundColorAttr: Attribute = 39;
/** Black background color */
export const BlackBackgroundColorAttr: Attribute = 40;
/** Red background color */
export const RedBackgroundColorAttr: Attribute = 41;
/** Green background color */
export const GreenBackgroundColorAttr: Attribute = 42;
/** Yellow background color */
export const YellowBackgroundColorAttr: Attribute = 43;
/** Blue background color */
export const BlueBackgroundColorAttr: Attribute = 44;
/** Magenta background color */
export const MagentaBackgroundColorAttr: Attribute = 45;
/** Cyan background color */
export const CyanBackgroundColorAttr: Attribute = 46;
/** White background color */
export const WhiteBackgroundColorAttr: Attribute = 47;
/** Extended background color */
export const ExtendedBackgroundColorAttr: Attribute = 48;
/** Default background color */
export const DefaultBackgroundColorAttr: Attribute = 49;
/** Extended underline color */
export const ExtendedUnderlineColorAttr: Attribute = 58;
/** Default underline color */
export const DefaultUnderlineColorAttr: Attribute = 59;
/** Bright black foreground color */
export const BrightBlackForegroundColorAttr: Attribute = 90;
/** Bright red foreground color */
export const BrightRedForegroundColorAttr: Attribute = 91;
/** Bright green foreground color */
export const BrightGreenForegroundColorAttr: Attribute = 92;
/** Bright yellow foreground color */
export const BrightYellowForegroundColorAttr: Attribute = 93;
/** Bright blue foreground color */
export const BrightBlueForegroundColorAttr: Attribute = 94;
/** Bright magenta foreground color */
export const BrightMagentaForegroundColorAttr: Attribute = 95;
/** Bright cyan foreground color */
export const BrightCyanForegroundColorAttr: Attribute = 96;
/** Bright white foreground color */
export const BrightWhiteForegroundColorAttr: Attribute = 97;
/** Bright black background color */
export const BrightBlackBackgroundColorAttr: Attribute = 100;
/** Bright red background color */
export const BrightRedBackgroundColorAttr: Attribute = 101;
/** Bright green background color */
export const BrightGreenBackgroundColorAttr: Attribute = 102;
/** Bright yellow background color */
export const BrightYellowBackgroundColorAttr: Attribute = 103;
/** Bright blue background color */
export const BrightBlueBackgroundColorAttr: Attribute = 104;
/** Bright magenta background color */
export const BrightMagentaBackgroundColorAttr: Attribute = 105;
/** Bright cyan background color */
export const BrightCyanBackgroundColorAttr: Attribute = 106;
/** Bright white background color */
export const BrightWhiteBackgroundColorAttr: Attribute = 107;

/** RGB color introducer attribute */
export const RGBColorIntroducerAttr: Attribute = 2;
/** Extended color introducer attribute */
export const ExtendedColorIntroducerAttr: Attribute = 5;

/**
 * Attributes represents an array of style attributes.
 */
export type Attributes = (string | AnsiColor | Attribute)[];

/**
 * AttributeProps defines attributes in a property format.
 *
 * @see {@link Style.from}
 */
export type AttributeProps = Partial<{
  reset: boolean;
  bold: boolean;
  faint: boolean;
  italic: boolean;
  underline: boolean;
  underlineStyle: UnderlineStyle;
  blink: boolean;
  slowBlink: boolean;
  rapidBlink: boolean;
  reverse: boolean;
  conceal: boolean;
  strikethrough: boolean;
  normalIntensity: boolean;
  noItalic: boolean;
  noUnderline: boolean;
  noBlink: boolean;
  noReverse: boolean;
  noConceal: boolean;
  noStrikethrough: boolean;
  defaultForegroundColor: boolean;
  defaultBackgroundColor: boolean;
  defaultUnderlineColor: boolean;
  background: MaybeColor;
  backgroundColor: MaybeColor; // alias for background
  foreground: MaybeColor;
  foregroundColor: MaybeColor; // alias for foreground
  underlineColor: MaybeColor;
}>;

/**
 * Style represents a collection of ANSI style attributes that can be applied to text.
 */
export class Style {
  readonly attributes: Readonly<Attributes>;

  constructor(attributes: Attributes = []) {
    this.attributes = Object.freeze(attributes);
  }

  /**
   * Add a reset attribute to the style.
   */
  reset() {
    return new Style([...this.attributes, RESET_STYLE]);
  }

  /**
   * Add a bold attribute to the style.
   */
  bold() {
    // if (this.attributes.indexOf(BoldAttr) !== -1) return this;
    return new Style([...this.attributes, BoldAttr]);
  }

  /**
   * Add a faint attribute to the style.
   */
  faint() {
    // if (this.attributes.indexOf(FaintAttr) !== -1) return this;
    return new Style([...this.attributes, FaintAttr]);
  }

  /**
   * Add an italic attribute to the style.
   */
  italic() {
    // if (this.attributes.indexOf(ItalicAttr) !== -1) return this;
    return new Style([...this.attributes, ItalicAttr]);
  }

  /**
   * Add an underline attribute to the style.
   */
  underline(style?: UnderlineStyle) {
    // if (this.attributes.indexOf(UnderlineAttr) !== -1) return this;
    return new Style([...this.attributes, UnderlineAttr]);
  }

  /**
   * Add a specific underline style to the style.
   */
  underlineStyle(style: UnderlineStyle) {
    // if (this.attributes.indexOf(style) !== -1) return this;
    return new Style([...this.attributes, style]);
  }

  /**
   * Add a double underline attribute to the style.
   */
  doubleUnderline() {
    // if (this.attributes.indexOf(UnderlineStyle.DoubleUnderline) !== -1) return this;
    return new Style([...this.attributes, UnderlineStyle.DoubleUnderline]);
  }

  /**
   * Add a curly underline attribute to the style.
   */
  curlyUnderline() {
    // if (this.attributes.indexOf(UnderlineStyle.CurlyUnderline) !== -1) return this;
    return new Style([...this.attributes, UnderlineStyle.CurlyUnderline]);
  }

  /**
   * Add a dotted underline attribute to the style.
   */
  dottedUnderline() {
    // if (this.attributes.indexOf(UnderlineStyle.DottedUnderline) !== -1) return this;
    return new Style([...this.attributes, UnderlineStyle.DottedUnderline]);
  }

  /**
   * Add a dashed underline attribute to the style.
   */
  dashedUnderline() {
    // if (this.attributes.indexOf(UnderlineStyle.DashedUnderline) !== -1) return this;
    return new Style([...this.attributes, UnderlineStyle.DashedUnderline]);
  }

  /**
   * Add a blink attribute to the style (alias for slowBlink).
   */
  blink() {
    // if (this.attributes.indexOf(SlowBlinkAttr) !== -1) return this;
    return this.slowBlink();
  }

  /**
   * Add a slow blink attribute to the style.
   */
  slowBlink() {
    // if (this.attributes.indexOf(SlowBlinkAttr) !== -1) return this;
    return new Style([...this.attributes, SlowBlinkAttr]);
  }

  /**
   * Add a rapid blink attribute to the style.
   */
  rapidBlink() {
    // if (this.attributes.indexOf(RapidBlinkAttr) !== -1) return this;
    return new Style([...this.attributes, RapidBlinkAttr]);
  }

  /**
   * Add a reverse video attribute to the style.
   */
  reverse() {
    // if (this.attributes.indexOf(ReverseAttr) !== -1) return this;
    return new Style([...this.attributes, ReverseAttr]);
  }

  /**
   * Add a conceal attribute to the style.
   */
  conceal() {
    // if (this.attributes.indexOf(ConcealAttr) !== -1) return this;
    return new Style([...this.attributes, ConcealAttr]);
  }

  /**
   * Add a strikethrough attribute to the style.
   */
  strikethrough() {
    // if (this.attributes.indexOf(StrikethroughAttr) !== -1) return this;
    return new Style([...this.attributes, StrikethroughAttr]);
  }

  /**
   * Add a normal intensity attribute to the style.
   */
  normalIntensity() {
    // if (this.attributes.indexOf(NormalIntensityAttr) !== -1) return this;
    return new Style([...this.attributes, NormalIntensityAttr]);
  }

  /**
   * Add a no italic attribute to the style.
   */
  noItalic() {
    // if (this.attributes.indexOf(NoItalicAttr) !== -1) return this;
    return new Style([...this.attributes, NoItalicAttr]);
  }

  /**
   * Add a no underline attribute to the style.
   */
  noUnderline() {
    // if (this.attributes.indexOf(NoUnderlineAttr) !== -1) return this;
    return new Style([...this.attributes, NoUnderlineAttr]);
  }

  /**
   * Add a no blink attribute to the style.
   */
  noBlink() {
    // if (this.attributes.indexOf(NoBlinkAttr) !== -1) return this;
    return new Style([...this.attributes, NoBlinkAttr]);
  }

  /**
   * Add a no reverse attribute to the style.
   */
  noReverse() {
    // if (this.attributes.indexOf(NoReverseAttr) !== -1) return this;
    return new Style([...this.attributes, NoReverseAttr]);
  }

  /**
   * Add a no conceal attribute to the style.
   */
  noConceal() {
    // if (this.attributes.indexOf(NoConcealAttr) !== -1) return this;
    return new Style([...this.attributes, NoConcealAttr]);
  }

  /**
   * Add a no strikethrough attribute to the style.
   */
  noStrikethrough() {
    // if (this.attributes.indexOf(NoStrikethroughAttr) !== -1) return this;
    return new Style([...this.attributes, NoStrikethroughAttr]);
  }

  /**
   * Add a default foreground color attribute to the style.
   */
  defaultForegroundColor() {
    // if (this.attributes.indexOf(DefaultForegroundColorAttr) !== -1) return this;
    return new Style([...this.attributes, DefaultForegroundColorAttr]);
  }

  /**
   * Add a default background color attribute to the style.
   */
  defaultBackgroundColor() {
    // if (this.attributes.indexOf(DefaultBackgroundColorAttr) !== -1) return this;
    return new Style([...this.attributes, DefaultBackgroundColorAttr]);
  }

  /**
   * Add a default underline color attribute to the style.
   */
  defaultUnderlineColor() {
    // if (this.attributes.indexOf(DefaultUnderlineColorAttr) !== -1) return this;
    return new Style([...this.attributes, DefaultUnderlineColorAttr]);
  }

  /**
   * Add a background color attribute to the style.
   */
  background(color: MaybeColor) {
    const attr = Style.backgroundColorString(color);
    // if (this.attributes.indexOf(attr) !== -1) return this;
    return new Style([...this.attributes, attr]);
  }

  /** Alias for background */
  backgroundColor = this.background;

  /**
   * Add a foreground color attribute to the style.
   */
  foreground(color: MaybeColor) {
    const attr = Style.foregroundColorString(color);
    // if (this.attributes.indexOf(attr) !== -1) return this;
    return new Style([...this.attributes, attr]);
  }

  /** Alias for foreground */
  foregroundColor = this.foreground;

  /**
   * Add an underline color attribute to the style.
   */
  underlineColor(color: MaybeColor) {
    const attr = Style.underlineColorString(color);

    // if (this.attributes.indexOf(attr) !== -1) return this;
    return new Style([...this.attributes, attr]);
  }

  /**
   * Render a string with this style applied.
   */
  render(string: string) {
    if (this.attributes.length === 0) return string;

    return `${this.toString()}${string}${CSI}m`;
  }

  /**
   * Returns the ANSI `SGR` (Select Graphic Rendition) string representation of the
   * style.
   */
  toString() {
    if (this.attributes.length === 0) return RESET_STYLE;

    return `${CSI}${this.attributes.join(";")}m`;
  }

  /**
   * Copy this style.
   */
  copy() {
    return new Style([...this.attributes]);
  }

  /**
   * Returns the style `SGR` attribute for the given underline color.
   *
   * @see https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
   */
  static underlineColorString(src: MaybeColor): string | AnsiColor | Attribute {
    if (isDefaultColor(src)) return DefaultUnderlineColorAttr;
    // NOTE: we can't use 3-bit and 4-bit ANSI color codes with underline
    // color, use 256-color instead.
    if (isIndexedColor(src)) {
      // 256-color ANSI underline color
      // "58;5;<n>"
      return `${ExtendedUnderlineColorAttr};${ExtendedColorIntroducerAttr};${src}`;
    } else {
      try {
        return `${ExtendedUnderlineColorAttr};${RGBColorIntroducerAttr};${Style.rgbColorString(src)}`;
      } catch {
        return DefaultBackgroundColorAttr;
      }
    }
  }

  private static rgbColorString(color: MaybeColor) {
    const [r, g, b] = srgb2553(null, srgb(color));
    return `${r};${g};${b}`;
  }

  /**
   * Returns the style `SGR` attribute for the given foreground color.
   *
   * @see https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
   */
  static foregroundColorString(src: MaybeColor) {
    if (isDefaultColor(src)) return DefaultForegroundColorAttr;

    if (isBasicColor(src)) {
      // 3-bit or 4-bit ANSI foreground
      // "3<n>" or "9<n>" where n is the color number from 0 to 7
      switch (src) {
        case BasicColor.Black:
          return BlackForegroundColorAttr;
        case BasicColor.Red:
          return RedForegroundColorAttr;
        case BasicColor.Green:
          return GreenForegroundColorAttr;
        case BasicColor.Yellow:
          return YellowForegroundColorAttr;
        case BasicColor.Blue:
          return BlueForegroundColorAttr;
        case BasicColor.Magenta:
          return MagentaForegroundColorAttr;
        case BasicColor.Cyan:
          return CyanForegroundColorAttr;
        case BasicColor.White:
          return WhiteForegroundColorAttr;
        case BasicColor.BrightBlack:
          return BrightBlackForegroundColorAttr;
        case BasicColor.BrightRed:
          return BrightRedForegroundColorAttr;
        case BasicColor.BrightGreen:
          return BrightGreenForegroundColorAttr;
        case BasicColor.BrightYellow:
          return BrightYellowForegroundColorAttr;
        case BasicColor.BrightBlue:
          return BrightBlueForegroundColorAttr;
        case BasicColor.BrightMagenta:
          return BrightMagentaForegroundColorAttr;
        case BasicColor.BrightCyan:
          return BrightCyanForegroundColorAttr;
        case BasicColor.BrightWhite:
          return BrightWhiteForegroundColorAttr;
      }
    } else if (isIndexedColor(src)) {
      return `${ExtendedForegroundColorAttr};${ExtendedColorIntroducerAttr};${src}`;
    } else {
      try {
        return `${ExtendedForegroundColorAttr};${RGBColorIntroducerAttr};${Style.rgbColorString(src)}`;
      } catch {
        return DefaultBackgroundColorAttr;
      }
    }
  }

  /**
   * backgroundColor returns the style `SGR` attribute for the given
   * background color.
   *
   * @see https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
   */
  static backgroundColorString(src: MaybeColor) {
    if (isDefaultColor(src)) return DefaultBackgroundColorAttr;

    if (isBasicColor(src)) {
      // 3-bit or 4-bit ANSI background
      // "4<n>" or "10<n>" where n is the color number from 0 to 7
      switch (src) {
        case BasicColor.Black:
          return BlackBackgroundColorAttr;
        case BasicColor.Red:
          return RedBackgroundColorAttr;
        case BasicColor.Green:
          return GreenBackgroundColorAttr;
        case BasicColor.Yellow:
          return YellowBackgroundColorAttr;
        case BasicColor.Blue:
          return BlueBackgroundColorAttr;
        case BasicColor.Magenta:
          return MagentaBackgroundColorAttr;
        case BasicColor.Cyan:
          return CyanBackgroundColorAttr;
        case BasicColor.White:
          return WhiteBackgroundColorAttr;
        case BasicColor.BrightBlack:
          return BrightBlackBackgroundColorAttr;
        case BasicColor.BrightRed:
          return BrightRedBackgroundColorAttr;
        case BasicColor.BrightGreen:
          return BrightGreenBackgroundColorAttr;
        case BasicColor.BrightYellow:
          return BrightYellowBackgroundColorAttr;
        case BasicColor.BrightBlue:
          return BrightBlueBackgroundColorAttr;
        case BasicColor.BrightMagenta:
          return BrightMagentaBackgroundColorAttr;
        case BasicColor.BrightCyan:
          return BrightCyanBackgroundColorAttr;
        case BasicColor.BrightWhite:
          return BrightWhiteBackgroundColorAttr;
      }
    } else if (isIndexedColor(src)) {
      // 256-color ANSI background
      // "48;5;<n>"
      return `${ExtendedBackgroundColorAttr};${ExtendedColorIntroducerAttr};${src}`;
    } else {
      try {
        return `${ExtendedBackgroundColorAttr};${RGBColorIntroducerAttr};${Style.rgbColorString(src)}`;
      } catch {
        return DefaultBackgroundColorAttr;
      }
    }
  }

  /**
   * Create a {@link Style} from an array of attributes.
   *
   * This is technically the same as `new Style(attributes)`, but added for the sake of the `.from()` API's completeness.
   *
   * @param attributes - The attributes to create the style from.
   * @returns A {@link Style} instance.
   */
  static from(attributes: Attributes): Style;
  /**
   * Create a {@link Style} from an object of properties.
   *
   * An alternative way to create a {@link Style} instance.
   *
   * @param props - The properties to create the style from.
   * @returns A {@link Style} instance.
   */
  static from(props: AttributeProps): Style;
  static from(attributesOrProps: Attributes | AttributeProps) {
    if (Array.isArray(attributesOrProps)) return new Style(attributesOrProps);

    const attributes = [] as Attributes;

    for (const [key, value] of Object.entries(attributesOrProps) as [
      keyof AttributeProps,
      AttributeProps[keyof AttributeProps],
    ][]) {
      switch (key) {
        case "background":
        case "backgroundColor":
          attributes.push(Style.backgroundColorString(value as MaybeColor));
          break;
        case "foreground":
        case "foregroundColor":
          attributes.push(Style.foregroundColorString(value as MaybeColor));
          break;
        case "underlineColor":
          attributes.push(Style.underlineColorString(value as MaybeColor));
          break;
        case "underline":
          attributes.push(value as UnderlineStyle);
          break;
        default:
          if (value === true)
            attributes.push(Style.KEY_TO_ATTRIBUTE[key] as Attribute);
          break;
      }
    }

    return new Style(attributes);
  }

  private static readonly EMPTY_ATTRIBUTES = Object.freeze(
    [],
  ) as Readonly<Attributes>;

  /**
   * Empty {@link Style}
   *
   * Useful for default arguments.
   */
  static readonly empty = new Style(Style.EMPTY_ATTRIBUTES as Attributes);

  private static readonly KEY_TO_ATTRIBUTE: {
    [key in keyof AttributeProps]: Attribute | UnderlineStyle;
  } = {
    reset: ResetAttr,
    bold: BoldAttr,
    faint: FaintAttr,
    italic: ItalicAttr,
    underline: UnderlineAttr,
    slowBlink: SlowBlinkAttr,
    rapidBlink: RapidBlinkAttr,
    reverse: ReverseAttr,
    conceal: ConcealAttr,
    strikethrough: StrikethroughAttr,
    normalIntensity: NormalIntensityAttr,
    noItalic: NoItalicAttr,
    noUnderline: NoUnderlineAttr,
    noBlink: NoBlinkAttr,
    noReverse: NoReverseAttr,
    noConceal: NoConcealAttr,
    noStrikethrough: NoStrikethroughAttr,
    defaultForegroundColor: DefaultForegroundColorAttr,
    defaultBackgroundColor: DefaultBackgroundColorAttr,
    defaultUnderlineColor: DefaultUnderlineColorAttr,
  } as const;
}
