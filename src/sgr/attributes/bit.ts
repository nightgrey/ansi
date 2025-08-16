import type { BasicColor, DefaultColor, IndexedColor } from "../../color";
import { Attribute, UnderlineStyle } from "./attribute";

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

  // Underline styles
  UnderlineNone,
  UnderlineSingle,
  UnderlineDouble,
  UnderlineCurly,
  UnderlineDotted,
  UnderlineDashed,
}

export type UnderlineStyleBit =
  | Bit.UnderlineNone
  | Bit.UnderlineSingle
  | Bit.UnderlineDouble
  | Bit.UnderlineCurly
  | Bit.UnderlineDotted
  | Bit.UnderlineDashed;

/**
 * A packed RGB value
 *
 * It is a 32-bit unsigned integer that can be used to represent a color.
 * @example
 * ```ts
 * (r << 16) | (g << 8) | b
 * ```
 *
 */
export type PackedRGB = number;

/**
 * {@link Attributes} color type
 *
 * A color type that can be any of the following:
 * - {@link BasicColor}
 * - {@link IndexedColor}
 * - {@link PackedRGB}
 * - {@link DefaultColor}
 *
 * It is different from the regular ANSI color type.
 */
export type ColorAttribute =
  | BasicColor
  | IndexedColor
  | PackedRGB
  | DefaultColor;

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

  [Bit.UnderlineNone]: UnderlineStyle.None,
  [Bit.UnderlineSingle]: UnderlineStyle.Single,
  [Bit.UnderlineDouble]: UnderlineStyle.Double,
  [Bit.UnderlineCurly]: UnderlineStyle.Curly,
  [Bit.UnderlineDotted]: UnderlineStyle.Dotted,
  [Bit.UnderlineDashed]: UnderlineStyle.Dashed,
} as const);

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
  [Attribute.NoUnderline]: Bit.Underline,
  [Attribute.NoBlink]: Bit.NoBlink,
  [Attribute.NoReverse]: Bit.NoReverse,
  [Attribute.NoConceal]: Bit.NoConceal,
  [Attribute.NoStrikethrough]: Bit.NoStrikethrough,

  [UnderlineStyle.None]: Bit.UnderlineNone,
  [UnderlineStyle.Single]: Bit.UnderlineSingle,
  [UnderlineStyle.Double]: Bit.UnderlineDouble,
  [UnderlineStyle.Curly]: Bit.UnderlineCurly,
  [UnderlineStyle.Dotted]: Bit.UnderlineDotted,
  [UnderlineStyle.Dashed]: Bit.UnderlineDashed,
} as const);
