import { ST } from "../c1";
import { type BasicColor, DefaultColor, type MaybeColor } from "../color";
import {
  ATTRIBUTE_TO_BIT,
  type AttributeProps,
  BASIC_COLOR_TO_BACKGROUND_ATTRIBUTE,
  BASIC_COLOR_TO_FOREGROUND_ATTRIBUTE,
  type ColorAttribute,
  PROP_TO_ATTRIBUTE,
  type UnderlineStyle,
} from "./attributes";
import { Attributable } from "./attributes/attributable";
import { RESET_STYLE } from "./sgr";

/**
 * A class for styling terminal text.
 * 
 * - Immutable, all methods return a new instance
 * - Performance-optimized, uses bitsets for efficient attribute manipulation
 * - Chainable
 * - Extensible, see {@link Attributable} for the underlying abstraction
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
 * // Returns an object of attribute properties
 * style.toJSON(); // { foregroundColor: BasicColor.Red, underline: true, bold: true, italic: true }
 *
 * // Create a style from an object of attribute properties
 * Style.from({ foregroundColor: BasicColor.Green, underline: true, bold: true, italic: true });
 * ```
 */
export class Style extends Attributable<Style> {
  /** Cached string representation of the SGR escape sequence */
  #sgr?: string;

  protected with(
    attributes?: number,
    background?: ColorAttribute | null,
    foreground?: ColorAttribute | null,
    underline?: ColorAttribute | null,
  ) {
    return new Style(
      attributes ?? this.attributes,
      background === null ? null : (background || this.bg),
      foreground === null ? null : (foreground || this.fg),
      underline === null ? null : (underline || this.ul),
    );
  }

  /**
   * Formats a string with this style applied.
   */
  format(string: string) {
    return `${this.toString()}${string}\x1b[m`;
  }

  /**
   * Returns the string representation of this style as an SGR (Select Graphic Rendition) escape sequence.
   * 
   * @example 
   * ```ts
   * const style = new Style().foregroundColor(BasicColor.Red).underline().bold().italic();
   * style.toString() // "\x1b[31;4;1;3m"
   * ```
   * @see {@link https://en.wikipedia.org/wiki/ANSI_escape_code#CSI_sequences}
   * @returns SGR escape sequence
   */
  toString() {
    if (this.isEmpty()) {
      return RESET_STYLE;
    }

    let sgr: (string | number)[] | (string | undefined) = this.#sgr;

    if (!sgr) {
      const { bg, fg, ul } = this;

      sgr = [...this.values()];

      if (bg != null) {
        if (bg === DefaultColor) {
          sgr.push(49);
        } else if (bg < 16) {
          sgr.push(
            BASIC_COLOR_TO_BACKGROUND_ATTRIBUTE[bg as BasicColor],
          );
        } else if (bg < 255) {
          sgr.push(`48:5:${bg}`);
        } else {
          sgr.push(`48:2:${Style.attribute(bg)}`);
        }
      }

      if (fg != null) {
        if (fg === DefaultColor) {
          sgr.push(39);
        } else if (fg < 16) {
          sgr.push(
            BASIC_COLOR_TO_FOREGROUND_ATTRIBUTE[fg as BasicColor],
          );
        } else if (fg < 255) {
          sgr.push(`38:5:${fg}`);
        } else {
          sgr.push(`38:2:${Style.attribute(fg)}`);
        }
      }

      if (ul != null) {
        if (ul === DefaultColor) {
          sgr.push(59);
        } else if (ul < 255) {
          sgr.push(`58:5:${ul}`);
        } else {
          sgr.push(`58:2:${Style.attribute(ul)}`);
        }
      }

      this.#sgr = (sgr = sgr.join(";"));
    }

    return `\x1b[${this.#sgr}m`;
  }

  /**
   * Create a {@link Style} from an instance based on {@link Attributable}.
   * 
   * @example 
   * ```ts
   * class MyAttributable extends Attributable<MyAttributable> { ... }
   * Style.from(new MyAttributable().bold());
   * Style.from(new Style().bold());
   * ```
   * 
   * @returns A new {@link Style} instance
   */
  static from(attributable: Attributable): Style;
  /**
   * Create a {@link Style} from attribute properties.
   * 
   * @example 
   * ```ts
   * Style.from({ foregroundColor: BasicColor.Red, underline: true, bold: true, italic: true });
   * ```
   * @returns A new {@link Style} instance
   */
  static from(props: Partial<AttributeProps>): Style;
  /**
   * Create a {@link Style} from an attribute bitset.
   * 
   * @example 
   * ```ts
   * Style.from(1 << Bit.Bold | 1 << Bit.Italic);
   * ```
   * @returns A new {@link Style} instance
   */
  static from(attributes: number): Style;
  static from(x: Attributable | Partial<AttributeProps> | number) {
    let style = new Style();

    if (x instanceof Attributable) {
      return style.with(x.attributes, x.bg, x.fg, x.ul)
    } else if (typeof x === "number") {
      return style.with(x);
    }

    for (const k of Object.keys(x) as (keyof AttributeProps)[]) {
      switch (k) {
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
          style = style.backgroundColor(x[k] as MaybeColor);
          break;
        case "foregroundColor":
          style = style.foregroundColor(x[k] as MaybeColor);
          break;
        case "underlineColor":
          style = style.underlineColor(x[k] as MaybeColor);
          break;
        case "underlineStyle":
          style = style.underlineStyle(x[k] as UnderlineStyle);
          break;
        default: {
          style = style.set(ATTRIBUTE_TO_BIT[PROP_TO_ATTRIBUTE[k]]);
          break;
        }
      }
    }

    return style;
  }

  static readonly empty = Object.freeze(new Style());
}
