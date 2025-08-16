import { type BasicColor, DefaultColor, type MaybeColor } from "../color";
import {
  ATTRIBUTE_TO_BIT,
  type AttributeProps,
  Attributes,
  BASIC_COLOR_TO_BACKGROUND_ATTRIBUTE,
  BASIC_COLOR_TO_FOREGROUND_ATTRIBUTE,
  type ColorAttribute,
  PROP_TO_ATTRIBUTE,
  type UnderlineStyle,
} from "./attributes";
import { Attributable } from "./attributes/attributable";
import { RESET_STYLE } from "./sgr";

/**
 * An immutable class for styling text.
 *
 * @example
 * ```ts
 * const style = new Style()
 *   .foregroundColor(BasicColor.Red)
 *   .underline()
 *   .bold()
 *   .italic();
 *
 * // Renders "Hello World!" with the style attributes
 * style.format("Hello World!"); // "\x1b[31;4;1;3mHello World!\x1b[m"
 *
 * // Renders the SGR escape sequence
 * style.toString(); // "\x1b[31;4;1;3m"
 *
 * // Renders the JSON representation of the style
 * style.toJSON(); // { foregroundColor: BasicColor.Red, underline: true, bold: true, italic: true }
 *
 * // Create a style from an object of attributes properties
 * Style.from({ foregroundColor: BasicColor.Green, underline: true, bold: true, italic: true });
 * ```
 */
export class Style extends Attributable<Style> {
  /** Cached string representation of the SGR escape sequence */
  #string = "";

  protected mutate(
    value?: number,
    bg?: ColorAttribute | null,
    fg?: ColorAttribute | null,
    ul?: ColorAttribute | null,
  ) {
    return new Style(
      value ?? this.value,
      bg === null ? null : bg || this.bg,
      fg === null ? null : fg || this.fg,
      ul === null ? null : ul || this.ul,
    );
  }

  /**
   * Formats a string with this style applied.
   */
  format(string: string) {
    return `${this.toString()}${string}\x1b[m`;
  }

  /**
   * Returns the ANSI `SGR` (Select Graphic Rendition) string representation of the
   * style.
   */
  toString() {
    if (this.isEmpty()) {
      return RESET_STYLE;
    }

    if (!this.#string) {
      const backgroundColor = this.bg;
      const foregroundColor = this.fg;
      const underlineColor = this.ul;

      const sgr: (string | number)[] = [...this.values()];

      if (backgroundColor) {
        if (backgroundColor === DefaultColor) {
          sgr.push("49");
        } else if (backgroundColor < 16) {
          sgr.push(
            BASIC_COLOR_TO_BACKGROUND_ATTRIBUTE[backgroundColor as BasicColor],
          );
        } else if (backgroundColor < 255) {
          sgr.push(`48:5:${backgroundColor}`);
        } else {
          sgr.push(`48:2:${Style.attribute(backgroundColor)}`);
        }
      }

      if (foregroundColor) {
        if (foregroundColor === DefaultColor) {
          sgr.push("39");
        } else if (foregroundColor < 16) {
          sgr.push(
            BASIC_COLOR_TO_FOREGROUND_ATTRIBUTE[foregroundColor as BasicColor],
          );
        } else if (foregroundColor < 255) {
          sgr.push(`38:5:${foregroundColor}`);
        } else {
          sgr.push(`38:2:${Style.attribute(foregroundColor)}`);
        }
      }

      if (underlineColor) {
        if (underlineColor === DefaultColor) {
          sgr.push("59");
        } else if (underlineColor < 255) {
          sgr.push(`58:5:${underlineColor}`);
        } else {
          sgr.push(`58:2:${Style.attribute(underlineColor)}`);
        }
      }

      this.#string = sgr.join(";");
    }

    return `\x1b[${this.#string}m`;
  }

  /**
   * Create a {@link Style} from an instance of {@link Attributes} or an object of attributes properties.
   */
  static from(props: Partial<AttributeProps> | Attributes) {
    if (props instanceof Attributes) {
      return new Style(props.value, props.bg, props.fg, props.ul);
    }

    let style = new Style();

    for (const [key, value] of Object.entries(props) as [
      keyof AttributeProps,
      AttributeProps[keyof AttributeProps],
    ][]) {
      switch (key) {
        case "bold":
          style = style.bold();
          break;
        case "faint":
          style = style.faint();
          break;
        case "italic":
          style = style.italic();
          break;
        case "underline":
          style = style.underline();
          break;
        case "blink":
          style = style.blink();
          break;
        case "rapidBlink":
          style = style.rapidBlink();
          break;
        case "reverse":
          style = style.reverse();
          break;
        case "conceal":
          style = style.conceal();
          break;
        case "strikethrough":
          style = style.strikethrough();
          break;
        case "normalIntensity":
          style = style.normalIntensity();
          break;
        case "noItalic":
          style = style.noItalic();
          break;
        case "noUnderline":
          style = style.noUnderline();
          break;
        case "noBlink":
          style = style.noBlink();
          break;
        case "noReverse":
          style = style.noReverse();
          break;
        case "noConceal":
          style = style.noConceal();
          break;
        case "noStrikethrough":
          style = style.noStrikethrough();
          break;
        case "backgroundColor":
          style = style.backgroundColor(value as MaybeColor);
          break;
        case "foregroundColor":
          style = style.foregroundColor(value as MaybeColor);
          break;
        case "underlineColor":
          style = style.underlineColor(value as MaybeColor);
          break;
        case "underlineStyle":
          style = style.underlineStyle(value as UnderlineStyle);
          break;
        default: {
          style = style.set(ATTRIBUTE_TO_BIT[PROP_TO_ATTRIBUTE[key]]);
          break;
        }
      }
    }

    return style;
  }

  static readonly empty = new Style();
}
