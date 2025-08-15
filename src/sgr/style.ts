import { CSI } from "../c1";
import { isDefaultColor, isIndexedColor, type MaybeColor, rgb } from "../color";
import { int2553 } from "../utils/int255";
import {
  Attribute,
  Attributes,
  type AttributesProps,
  IntroducerAttribute,
  UnderlineStyle,
} from "./attributes";
import { RESET_STYLE } from "./sgr";
import type { Styled } from "./styled";
import {ATTRIBUTE_TO_BIT, PROP_TO_ATTRIBUTE} from "./constants";

export class Style implements Styled {
  /** Bitfield for style attributes */
  readonly attributes;

  get bg() {
    return this.attributes.bg;
  }

  get fg() {
    return this.attributes.fg;
  }

  get ul() {
    return this.attributes.ul;
  }

  get us() {
    return this.attributes.us;
  }

  /** Cached string representation of attributes */
  #sgr?: string;

  constructor(attributes?: Attributes) {
    this.attributes = attributes ?? new Attributes();
  }

  /**
   * Add a reset attribute to the style.
   */
  reset() {
    return new Style(this.attributes.reset());
  }

  static reset() {
    return new Style().reset();
  }

  /**
   * Add a bold attribute to the style.
   */
  bold() {
    return new Style(this.attributes.bold());
  }

  static bold() {
    return new Style().bold();
  }

  /**
   * Add a faint attribute to the style.
   */
  faint() {
    return new Style(this.attributes.faint());
  }

  static faint() {
    return new Style().faint();
  }

  /**
   * Add an italic attribute to the style.
   */
  italic() {
    return new Style(this.attributes.italic());
  }

  static italic() {
    return new Style().italic();
  }

  /**
   * Add an underline to the style.
   */
  underline(style = UnderlineStyle.Single) {
    return new Style(this.attributes.underline(style));
  }

  static underline() {
    return new Style().underline();
  }

  /**
   * Add an underline color attribute to the style.
   */
  underlineColor(color: MaybeColor) {
    if (isIndexedColor(color) || isDefaultColor(color)) {
      return new Style(this.attributes.underlineColor(color));
    } else {
      const [r, g, b] = int2553(null, rgb(color));

      return new Style(
        this.attributes.underlineColor(Attributes.pack(r, g, b)),
      );
    }
  }

  static underlineColor(color: MaybeColor) {
    return new Style().underlineColor(color);
  }

  /**
   * Add a default underline color attribute to the style.
   */
  defaultUnderlineColor() {
    return new Style(this.attributes.defaultUnderlineColor());
  }

  static defaultUnderlineColor() {
    return new Style().defaultUnderlineColor();
  }

  /**
   * Add a specific underline style to the style.
   */
  underlineStyle(style: UnderlineStyle) {
    return this.underline(style);
  }

  static underlineStyle(style: UnderlineStyle) {
    return new Style().underlineStyle(style);
  }

  /**
   * Add a double underline attribute to the style.
   */
  doubleUnderline() {
    return new Style(this.attributes.doubleUnderline());
  }

  static doubleUnderline() {
    return new Style().doubleUnderline();
  }

  /**
   * Add a curly underline attribute to the style.
   */
  curlyUnderline() {
    return new Style(this.attributes.curlyUnderline());
  }

  static curlyUnderline() {
    return new Style().curlyUnderline();
  }

  /**
   * Add a dotted underline attribute to the style.
   */
  dottedUnderline() {
    return new Style(this.attributes);
  }

  static dottedUnderline() {
    return new Style().dottedUnderline();
  }

  /**
   * Add a dashed underline attribute to the style.
   */
  dashedUnderline() {
    return new Style(this.attributes.dashedUnderline());
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
    return new Style(this.attributes.slowBlink());
  }

  static slowBlink() {
    return new Style().slowBlink();
  }

  /**
   * Add a rapid blink attribute to the style.
   */
  rapidBlink() {
    return new Style(this.attributes.rapidBlink());
  }

  static rapidBlink() {
    return new Style().rapidBlink();
  }

  /**
   * Add a reverse video attribute to the style.
   */
  reverse() {
    return new Style(this.attributes.reverse());
  }

  static reverse() {
    return new Style().reverse();
  }

  /**
   * Add a conceal attribute to the style.
   */
  conceal() {
    return new Style(this.attributes.conceal());
  }

  static conceal() {
    return new Style().conceal();
  }

  /**
   * Add a strikethrough attribute to the style.
   */
  strikethrough() {
    return new Style(this.attributes.strikethrough());
  }

  static strikethrough() {
    return new Style().strikethrough();
  }

  /**
   * Add a normal intensity attribute to the style.
   */
  normalIntensity() {
    return new Style(this.attributes.normalIntensity());
  }

  static normalIntensity() {
    return new Style().normalIntensity();
  }

  /**
   * Add a no italic attribute to the style.
   */
  noItalic() {
    return new Style(this.attributes.noItalic());
  }

  static noItalic() {
    return new Style().noItalic();
  }

  /**
   * Add a no underline attribute to the style.
   */
  noUnderline() {
    return new Style(this.attributes.noUnderline());
  }

  static noUnderline() {
    return new Style().noUnderline();
  }

  /**
   * Add a no blink attribute to the style.
   */
  noBlink() {
    return new Style(this.attributes.noBlink());
  }

  static noBlink() {
    return new Style().noBlink();
  }

  /**
   * Add a no reverse attribute to the style.
   */
  noReverse() {
    return new Style(this.attributes.noReverse());
  }

  static noReverse() {
    return new Style().noReverse();
  }

  /**
   * Add a no conceal attribute to the style.
   */
  noConceal() {
    return new Style(this.attributes.noConceal());
  }

  static noConceal() {
    return new Style().noConceal();
  }

  /**
   * Add a no strikethrough attribute to the style.
   */
  noStrikethrough() {
    return new Style(this.attributes.noStrikethrough());
  }

  static noStrikethrough() {
    return new Style().noStrikethrough();
  }

  /**
   * Add a background color attribute to the style.
   */
  backgroundColor(color: MaybeColor) {
    if (isDefaultColor(color)) {
      return new Style(this.attributes.defaultBackgroundColor());
    }

    if (isIndexedColor(color)) {
      return new Style(this.attributes.backgroundColor(color));
    }

    const [r, g, b] = int2553(null, rgb(color));
    return new Style(this.attributes.backgroundColor(Attributes.pack(r, g, b)));
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
    return new Style(this.attributes.defaultBackgroundColor());
  }

  static defaultBackgroundColor() {
    return new Style().defaultBackgroundColor();
  }

  /**
   * Add a foreground color attribute to the style.
   */
  foregroundColor(color: MaybeColor) {
    if (isDefaultColor(color)) {
      return new Style(this.attributes.defaultForegroundColor());
    }

    if (isIndexedColor(color)) {
      return new Style(this.attributes.foregroundColor(color));
    }

    const [r, g, b] = int2553(null, rgb(color));
    return new Style(this.attributes.foregroundColor(Attributes.pack(r, g, b)));
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
    return new Style(this.attributes.defaultForegroundColor());
  }

  static defaultForegroundColor() {
    return new Style().defaultForegroundColor();
  }

  /**
   * Formats a string with this style applied.
   */
  format(string: string) {
    return `${this.toString()}${string}${CSI}m`;
  }

  /**
   * Returns the ANSI `SGR` (Select Graphic Rendition) string representation of the
   * style.
   */
  toString() {
    if (this.isEmpty()) {
      return RESET_STYLE;
    }

    if (!this.#sgr) {
      const {
        bg: backgroundColor,
        fg: foregroundColor,
        ul: underlineColor,
        us: underlineStyle,
        attributes,
      } = this;

      const sgr: (string | number)[] = [];

      let extendedBackgroundColor = false;
      let extendedForegroundColor = false;
      let extendedUnderlineColor = false;
      let noUnderline = false;

      // Add attribute bits

      for (const attr of attributes) {
        switch (attr) {
          case Attribute.ExtendedBackgroundColor:
            extendedBackgroundColor = true;
            break;
          case Attribute.ExtendedForegroundColor:
            extendedForegroundColor = true;
            break;
          case Attribute.ExtendedUnderlineColor:
            extendedUnderlineColor = true;
            break;

          case Attribute.Underline:
            // @TODO: Query for support before setting this?  Older terminals do not support the styles, only Attribute.Underline & Attribute.NoUnderline.
            // https://sw.kovidgoyal.net/kitty/underlines/
            switch (underlineStyle) {
              case UnderlineStyle.Double:
                sgr.push(Attribute.Underline + ":" + UnderlineStyle.Double);
                break;
              case UnderlineStyle.Curly:
                sgr.push(Attribute.Underline + ":" + UnderlineStyle.Curly);
                break;
              case UnderlineStyle.Dotted:
                sgr.push(Attribute.Underline + ":" + UnderlineStyle.Dotted);
                break;
              case UnderlineStyle.Dashed:
                sgr.push(Attribute.Underline + ":" + UnderlineStyle.Dashed);
                break;
              case UnderlineStyle.None:
                if (!noUnderline) {
                  // This is done for legacy support. Only newer terminals support ${Underline}:${UnderlineStyle}
                  sgr.push(Attribute.NoUnderline);
                  noUnderline = true;
                }
                break;

              // Set underline even if no style is set explicitly - this is the expected behavior.
              case UnderlineStyle.Single:
              default:
                // This is done for legacy support. Only newer terminals support ${Underline}:${UnderlineStyle}
                sgr.push(Attribute.Underline);
              // sgr.push(Attribute.Underline + ":" + UnderlineStyle.Single);
            }
            break;
          case Attribute.NoUnderline:
            if (!noUnderline) {
              // This is done for legacy support. Only newer terminals support ${Underline}:${UnderlineStyle}
              sgr.push(Attribute.NoUnderline);
              // sgr.push(Attribute.Underline + ":" + UnderlineStyle.None);
              noUnderline = true;
            }
            break;
          default:
            sgr.push(attr);
        }
      }

      if (backgroundColor) {
        if (extendedBackgroundColor) {
          sgr.push(
            Attribute.ExtendedBackgroundColor +
              ":" +
              IntroducerAttribute.ExtendedColor +
              ":" +
              backgroundColor,
          );
        } else {
          sgr.push(
            Attribute.ExtendedBackgroundColor +
              ":" +
              IntroducerAttribute.RGBColor +
              ":" +
              Attributes.unpack(backgroundColor).join(":"),
          );
        }
      }

      if (foregroundColor) {
        if (extendedForegroundColor) {
          sgr.push(
            Attribute.ExtendedForegroundColor +
              ":" +
              IntroducerAttribute.ExtendedColor +
              ":" +
              foregroundColor,
          );
        } else {
          sgr.push(
            Attribute.ExtendedForegroundColor +
              ":" +
              IntroducerAttribute.RGBColor +
              ":" +
              Attributes.unpack(foregroundColor).join(":"),
          );
        }
      }

      if (underlineColor) {
        if (extendedUnderlineColor) {
          sgr.push(
            Attribute.ExtendedUnderlineColor +
              ":" +
              IntroducerAttribute.ExtendedColor +
              ":" +
              underlineColor,
          );
        } else {
          sgr.push(
            Attribute.ExtendedUnderlineColor +
              ":" +
              IntroducerAttribute.RGBColor +
              ":" +
              Attributes.unpack(underlineColor).join(":"),
          );
        }
      }

      this.#sgr = sgr.join(";");
    }

    return `${CSI}${this.#sgr}m`;
  }

  /**
   * Copy this style.
   */
  copy() {
    return new Style(this.attributes.copy());
  }

  static copy(style: Style) {
    return style.copy();
  }

  isEmpty() {
    return this.attributes.isEmpty();
  }

  static isEmpty(style: Style) {
    return style.isEmpty();
  }

  /**
   * Create a {@link Style} from an object of attributes properties.
   */
  static from(props: AttributesProps): Style {
    let attributes = new Attributes();

    for (const [key, value] of Object.entries(props) as [
      keyof AttributesProps,
      AttributesProps[keyof AttributesProps],
    ][]) {
      switch (key) {
        case "backgroundColor":
          if (isIndexedColor(value) || isDefaultColor(value)) {
            attributes = attributes.backgroundColor(value);
          } else {
            const [r, g, b] = int2553(null, rgb(value as MaybeColor));
            attributes = attributes.foregroundColor(Attributes.pack(r, g, b));
          }
          break;
        case "foregroundColor":
          if (isIndexedColor(value) || isDefaultColor(value)) {
            attributes = attributes.foregroundColor(value);
          } else {
            const [r, g, b] = int2553(null, rgb(value as MaybeColor));
            attributes = attributes.foregroundColor(Attributes.pack(r, g, b));
          }
          break;
        case "underlineColor":
          if (isIndexedColor(value) || isDefaultColor(value)) {
            attributes = attributes.underlineColor(value);
          } else {
            const [r, g, b] = int2553(null, rgb(value as MaybeColor));
            attributes = attributes.underlineColor(Attributes.pack(r, g, b));
          }
          break;
        case "underlineStyle":
          attributes = attributes.underlineStyle(value as UnderlineStyle);
          break;
        default: {
          if (value && key in PROP_TO_ATTRIBUTE) {
            const bit = ATTRIBUTE_TO_BIT[PROP_TO_ATTRIBUTE[key]];
            attributes = attributes.set(bit);
          }
          break;
        }
      }
    }

    return new Style(attributes);
  }

  /**
   * Empty {@link Style}
   */
  static readonly empty = new Style();
}
