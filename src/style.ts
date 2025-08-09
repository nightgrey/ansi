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
import {
  type Attribute,
  AttributeKeys,
  BlackBackgroundColorAttr,
  BlackForegroundColorAttr,
  BlueBackgroundColorAttr,
  BlueForegroundColorAttr,
  BoldAttr,
  BrightBlackBackgroundColorAttr,
  BrightBlackForegroundColorAttr,
  BrightBlueBackgroundColorAttr,
  BrightBlueForegroundColorAttr,
  BrightCyanBackgroundColorAttr,
  BrightCyanForegroundColorAttr,
  BrightGreenBackgroundColorAttr,
  BrightGreenForegroundColorAttr,
  BrightMagentaBackgroundColorAttr,
  BrightMagentaForegroundColorAttr,
  BrightRedBackgroundColorAttr,
  BrightRedForegroundColorAttr,
  BrightWhiteBackgroundColorAttr,
  BrightWhiteForegroundColorAttr,
  BrightYellowBackgroundColorAttr,
  BrightYellowForegroundColorAttr,
  ConcealAttr,
  CyanBackgroundColorAttr,
  CyanForegroundColorAttr,
  DefaultBackgroundColorAttr,
  DefaultForegroundColorAttr,
  DefaultUnderlineColorAttr,
  ExtendedBackgroundColorAttr,
  ExtendedColorIntroducerAttr,
  ExtendedForegroundColorAttr,
  ExtendedUnderlineColorAttr,
  FaintAttr,
  GreenBackgroundColorAttr,
  GreenForegroundColorAttr,
  ItalicAttr,
  MagentaBackgroundColorAttr,
  MagentaForegroundColorAttr,
  NoBlinkAttr,
  NoConcealAttr,
  NoItalicAttr,
  NoReverseAttr,
  NormalIntensityAttr,
  NoStrikethroughAttr,
  NoUnderlineAttr,
  RapidBlinkAttr,
  RESET_STYLE,
  RedBackgroundColorAttr,
  RedForegroundColorAttr,
  ReverseAttr,
  RGBColorIntroducerAttr,
  SlowBlinkAttr,
  StrikethroughAttr,
  UnderlineAttr,
  UnderlineStyle,
  WhiteBackgroundColorAttr,
  WhiteForegroundColorAttr,
  YellowBackgroundColorAttr,
  YellowForegroundColorAttr,
} from "./sgr";
import { int2553 } from "./utils/int255";

/**
 * Attributes represents an array of style attributes.
 */
export type Attributes = (string | AnsiColor | Attribute)[];

/**
 * AttributeProps defines attributes in a property format.
 *
 * @see {@link Style.from}
 */
export type AttributeProps = {
  [K in keyof typeof AttributeKeys]: boolean;
} & {
  underlineStyle: UnderlineStyle;
  background: MaybeColor;
  backgroundColor: MaybeColor; // alias for background
  foreground: MaybeColor;
  foregroundColor: MaybeColor; // alias for foreground
  underlineColor: MaybeColor;
};

/**
 * Style represents a collection of ANSI style attributes that can be applied to text.
 */
export class Style {
  /** Style attributes */
  readonly attributes: Readonly<Attributes>;
  /** Cached string representation of attributes */
  #sgr;

  constructor(attributes?: Attributes) {
    this.attributes = Object.freeze(attributes) ?? Style.EMPTY_ATTRIBUTES;
    this.#sgr = "";
    Object.freeze(this);
  }

  /**
   * Add a reset attribute to the style.
   */
  reset() {
    return new Style([...this.attributes, RESET_STYLE]);
  }

  static reset() {
    return new Style().reset();
  }

  /**
   * Add a bold attribute to the style.
   */
  bold() {
    return new Style([...this.attributes, BoldAttr]);
  }

  static bold() {
    return new Style().bold();
  }

  /**
   * Add a faint attribute to the style.
   */
  faint() {
    return new Style([...this.attributes, FaintAttr]);
  }

  static faint() {
    return new Style().faint();
  }

  /**
   * Add an italic attribute to the style.
   */
  italic() {
    return new Style([...this.attributes, ItalicAttr]);
  }

  static italic() {
    return new Style().italic();
  }

  /**
   * Add an underline color attribute to the style.
   */
  underlineColor(color: MaybeColor) {
    return new Style([...this.attributes, Style.underlineColorString(color)]);
  }

  static underlineColor(color: MaybeColor) {
    return new Style().underlineColor(color);
  }

  /**
   * Add an underline to the style.
   *
   * @param color - The color to use for the underline
   * @param style - The style to use for the underline
   */
  underline(color?: MaybeColor, style?: UnderlineStyle) {
    if (color)
      return new Style([
        ...this.attributes,
        Style.underlineColorString(color),
        UnderlineAttr,
      ]);
    return new Style([
      ...this.attributes,
      style || UnderlineStyle.SingleUnderline,
    ]);
  }

  static underline(color: MaybeColor = DefaultColor, style?: UnderlineStyle) {
    return new Style().underline(color, style);
  }

  /**
   * Add a default underline color attribute to the style.
   */
  defaultUnderlineColor() {
    return this.underlineColor(DefaultColor);
  }

  static defaultUnderlineColor() {
    return new Style().defaultUnderlineColor();
  }

  /**
   * Add a specific underline style to the style.
   */
  underlineStyle(style: UnderlineStyle) {
    return new Style([...this.attributes, style]);
  }

  static underlineStyle(style: UnderlineStyle) {
    return new Style().underlineStyle(style);
  }

  /**
   * Add a double underline attribute to the style.
   */
  doubleUnderline() {
    return new Style([...this.attributes, UnderlineStyle.DoubleUnderline]);
  }

  static doubleUnderline() {
    return new Style().doubleUnderline();
  }

  /**
   * Add a curly underline attribute to the style.
   */
  curlyUnderline() {
    return new Style([...this.attributes, UnderlineStyle.CurlyUnderline]);
  }

  static curlyUnderline() {
    return new Style().curlyUnderline();
  }

  /**
   * Add a dotted underline attribute to the style.
   */
  dottedUnderline() {
    return new Style([...this.attributes, UnderlineStyle.DottedUnderline]);
  }

  static dottedUnderline() {
    return new Style().dottedUnderline();
  }

  /**
   * Add a dashed underline attribute to the style.
   */
  dashedUnderline() {
    return new Style([...this.attributes, UnderlineStyle.DashedUnderline]);
  }

  static dashedUnderline() {
    return new Style().dashedUnderline();
  }

  /**
   * Add a blink attribute to the style (alias for slowBlink).
   */
  blink() {
    return this.slowBlink();
  }

  static blink() {
    return new Style().blink();
  }

  /**
   * Add a slow blink attribute to the style.
   */
  slowBlink() {
    return new Style([...this.attributes, SlowBlinkAttr]);
  }

  static slowBlink() {
    return new Style().slowBlink();
  }

  /**
   * Add a rapid blink attribute to the style.
   */
  rapidBlink() {
    return new Style([...this.attributes, RapidBlinkAttr]);
  }

  static rapidBlink() {
    return new Style().rapidBlink();
  }

  /**
   * Add a reverse video attribute to the style.
   */
  reverse() {
    return new Style([...this.attributes, ReverseAttr]);
  }

  static reverse() {
    return new Style().reverse();
  }

  /**
   * Add a conceal attribute to the style.
   */
  conceal() {
    return new Style([...this.attributes, ConcealAttr]);
  }

  static conceal() {
    return new Style().conceal();
  }

  /**
   * Add a strikethrough attribute to the style.
   */
  strikethrough() {
    return new Style([...this.attributes, StrikethroughAttr]);
  }

  static strikethrough() {
    return new Style().strikethrough();
  }

  /**
   * Add a normal intensity attribute to the style.
   */
  normalIntensity() {
    return new Style([...this.attributes, NormalIntensityAttr]);
  }

  static normalIntensity() {
    return new Style().normalIntensity();
  }

  /**
   * Add a no italic attribute to the style.
   */
  noItalic() {
    return new Style([...this.attributes, NoItalicAttr]);
  }

  static noItalic() {
    return new Style().noItalic();
  }

  /**
   * Add a no underline attribute to the style.
   */
  noUnderline() {
    return new Style([...this.attributes, NoUnderlineAttr]);
  }

  static noUnderline() {
    return new Style().noUnderline();
  }

  /**
   * Add a no blink attribute to the style.
   */
  noBlink() {
    return new Style([...this.attributes, NoBlinkAttr]);
  }

  static noBlink() {
    return new Style().noBlink();
  }

  /**
   * Add a no reverse attribute to the style.
   */
  noReverse() {
    return new Style([...this.attributes, NoReverseAttr]);
  }

  static noReverse() {
    return new Style().noReverse();
  }

  /**
   * Add a no conceal attribute to the style.
   */
  noConceal() {
    return new Style([...this.attributes, NoConcealAttr]);
  }

  static noConceal() {
    return new Style().noConceal();
  }

  /**
   * Add a no strikethrough attribute to the style.
   */
  noStrikethrough() {
    return new Style([...this.attributes, NoStrikethroughAttr]);
  }

  static noStrikethrough() {
    return new Style().noStrikethrough();
  }

  /**
   * Add a background color attribute to the style.
   */
  backgroundColor(color: MaybeColor) {
    return new Style([...this.attributes, Style.backgroundColorString(color)]);
  }

  static backgroundColor(color: MaybeColor) {
    return new Style().backgroundColor(color);
  }

  // Alias for backgroundColor
  background = this.backgroundColor;

  static background = this.backgroundColor;
  /**
   * Add a default background color attribute to the style.
   */
  defaultBackgroundColor() {
    return this.backgroundColor(DefaultColor);
  }

  static defaultBackgroundColor() {
    return new Style().defaultBackgroundColor();
  }

  /**
   * Add a foreground color attribute to the style.
   */
  foregroundColor(color: MaybeColor) {
    return new Style([...this.attributes, Style.foregroundColorString(color)]);
  }

  static foregroundColor(color: MaybeColor) {
    return new Style().foregroundColor(color);
  }

  // Alias for foregroundColor
  foreground = this.foregroundColor;
  static foreground = this.foregroundColor;

  /**
   * Add a default foreground color attribute to the style.
   */
  defaultForegroundColor() {
    return this.foregroundColor(DefaultColor);
  }

  static defaultForegroundColor() {
    return new Style().defaultForegroundColor();
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

    if (this.#sgr.length === 0) this.#sgr = this.attributes.join(";");

    return `${CSI}${this.#sgr}m`;
  }

  /**
   * Copy this style.
   */
  copy() {
    return new Style([...this.attributes]);
  }

  static copy(style: Style) {
    return style.copy();
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
    const [r, g, b] = int2553(null, srgb(color));
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
        default: {
          attributes.push(AttributeKeys[key as keyof typeof AttributeKeys]);
          break;
        }
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
}
