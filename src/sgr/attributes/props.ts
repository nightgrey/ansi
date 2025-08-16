import type { MaybeColor } from "../../color";
import { Attribute, type UnderlineStyle } from "./attribute";

/**
 * Property (human-readable property name) <-> Attribute
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

  // // Foreground colors
  // blackForegroundColor: Attribute.BlackForegroundColor,
  // redForegroundColor: Attribute.RedForegroundColor,
  // greenForegroundColor: Attribute.GreenForegroundColor,
  // yellowForegroundColor: Attribute.YellowForegroundColor,
  // blueForegroundColor: Attribute.BlueForegroundColor,
  // magentaForegroundColor: Attribute.MagentaForegroundColor,
  // cyanForegroundColor: Attribute.CyanForegroundColor,
  // whiteForegroundColor: Attribute.WhiteForegroundColor,
  // extendedForegroundColor: Attribute.ExtendedForegroundColor,
  // defaultForegroundColor: Attribute.DefaultForegroundColor,
  //
  // // Background colors
  // blackBackgroundColor: Attribute.BlackBackgroundColor,
  // redBackgroundColor: Attribute.RedBackgroundColor,
  // greenBackgroundColor: Attribute.GreenBackgroundColor,
  // yellowBackgroundColor: Attribute.YellowBackgroundColor,
  // blueBackgroundColor: Attribute.BlueBackgroundColor,
  // magentaBackgroundColor: Attribute.MagentaBackgroundColor,
  // cyanBackgroundColor: Attribute.CyanBackgroundColor,
  // whiteBackgroundColor: Attribute.WhiteBackgroundColor,
  // extendedBackgroundColor: Attribute.ExtendedBackgroundColor,
  // defaultBackgroundColor: Attribute.DefaultBackgroundColor,
  //
  // extendedUnderlineColor: Attribute.ExtendedUnderlineColor,
  // defaultUnderlineColor: Attribute.DefaultUnderlineColor,
  //
  // // Bright foreground colors
  // brightBlackForegroundColor: Attribute.BrightBlackForegroundColor,
  // brightRedForegroundColor: Attribute.BrightRedForegroundColor,
  // brightGreenForegroundColor: Attribute.BrightGreenForegroundColor,
  // brightYellowForegroundColor: Attribute.BrightYellowForegroundColor,
  // brightBlueForegroundColor: Attribute.BrightBlueForegroundColor,
  // brightMagentaForegroundColor: Attribute.BrightMagentaForegroundColor,
  // brightCyanForegroundColor: Attribute.BrightCyanForegroundColor,
  // brightWhiteForegroundColor: Attribute.BrightWhiteForegroundColor,
  //
  // // Bright background colors
  // brightBlackBackgroundColor: Attribute.BrightBlackBackgroundColor,
  // brightRedBackgroundColor: Attribute.BrightRedBackgroundColor,
  // brightGreenBackgroundColor: Attribute.BrightGreenBackgroundColor,
  // brightYellowBackgroundColor: Attribute.BrightYellowBackgroundColor,
  // brightBlueBackgroundColor: Attribute.BrightBlueBackgroundColor,
  // brightMagentaBackgroundColor: Attribute.BrightMagentaBackgroundColor,
  // brightCyanBackgroundColor: Attribute.BrightCyanBackgroundColor,
  // brightWhiteBackgroundColor: Attribute.BrightWhiteBackgroundColor,
} as const);

/** Attribute <-> Property (human-readable property name) */
export type PropToAttribute<T extends keyof typeof PROP_TO_ATTRIBUTE> =
  (typeof PROP_TO_ATTRIBUTE)[T];

/**
 * Attribute <-> Property (human-readable property name)
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

  // // Foreground colors
  // [Attribute.BlackForegroundColor]: "blackForegroundColor",
  // [Attribute.RedForegroundColor]: "redForegroundColor",
  // [Attribute.GreenForegroundColor]: "greenForegroundColor",
  // [Attribute.YellowForegroundColor]: "yellowForegroundColor",
  // [Attribute.BlueForegroundColor]: "blueForegroundColor",
  // [Attribute.MagentaForegroundColor]: "magentaForegroundColor",
  // [Attribute.CyanForegroundColor]: "cyanForegroundColor",
  // [Attribute.WhiteForegroundColor]: "whiteForegroundColor",
  // [Attribute.ExtendedForegroundColor]: "extendedForegroundColor",
  // [Attribute.DefaultForegroundColor]: "defaultForegroundColor",
  //
  // // Background colors
  // [Attribute.BlackBackgroundColor]: "blackBackgroundColor",
  // [Attribute.RedBackgroundColor]: "redBackgroundColor",
  // [Attribute.GreenBackgroundColor]: "greenBackgroundColor",
  // [Attribute.YellowBackgroundColor]: "yellowBackgroundColor",
  // [Attribute.BlueBackgroundColor]: "blueBackgroundColor",
  // [Attribute.MagentaBackgroundColor]: "magentaBackgroundColor",
  // [Attribute.CyanBackgroundColor]: "cyanBackgroundColor",
  // [Attribute.WhiteBackgroundColor]: "whiteBackgroundColor",
  // [Attribute.ExtendedBackgroundColor]: "extendedBackgroundColor",
  // [Attribute.DefaultBackgroundColor]: "defaultBackgroundColor",
  //
  // // Underline colors
  // [Attribute.ExtendedUnderlineColor]: "extendedUnderlineColor",
  // [Attribute.DefaultUnderlineColor]: "defaultUnderlineColor",
  //
  // // Bright foreground colors
  // [Attribute.BrightBlackForegroundColor]: "brightBlackForegroundColor",
  // [Attribute.BrightRedForegroundColor]: "brightRedForegroundColor",
  // [Attribute.BrightGreenForegroundColor]: "brightGreenForegroundColor",
  // [Attribute.BrightYellowForegroundColor]: "brightYellowForegroundColor",
  // [Attribute.BrightBlueForegroundColor]: "brightBlueForegroundColor",
  // [Attribute.BrightMagentaForegroundColor]: "brightMagentaForegroundColor",
  // [Attribute.BrightCyanForegroundColor]: "brightCyanForegroundColor",
  // [Attribute.BrightWhiteForegroundColor]: "brightWhiteForegroundColor",
  //
  // // Bright background colors
  // [Attribute.BrightBlackBackgroundColor]: "brightBlackBackgroundColor",
  // [Attribute.BrightRedBackgroundColor]: "brightRedBackgroundColor",
  // [Attribute.BrightGreenBackgroundColor]: "brightGreenBackgroundColor",
  // [Attribute.BrightYellowBackgroundColor]: "brightYellowBackgroundColor",
  // [Attribute.BrightBlueBackgroundColor]: "brightBlueBackgroundColor",
  // [Attribute.BrightMagentaBackgroundColor]: "brightMagentaBackgroundColor",
  // [Attribute.BrightCyanBackgroundColor]: "brightCyanBackgroundColor",
  // [Attribute.BrightWhiteBackgroundColor]: "brightWhiteBackgroundColor",
} as const satisfies {
  [K in (typeof PROP_TO_ATTRIBUTE)[keyof typeof PROP_TO_ATTRIBUTE]]: keyof typeof PROP_TO_ATTRIBUTE;
});

/** Attribute <-> Property */
export type AttributeToProp<T extends Attribute | UnderlineStyle> =
  T extends keyof typeof ATTRIBUTE_TO_PROP
    ? (typeof ATTRIBUTE_TO_PROP)[T]
    : never;

/**
 * SGR attribute props
 *
 * @example
 * ```ts
 * const attributes: AttributesProps = {
 *   backgroundColor: BasicColor.Red,
 *   foregroundColor: BasicColor.Green,
 *   underlineColor: BasicColor.Blue,
 *   underlineStyle: UnderlineStyle.Double,
 *   bold: true,
 *   italic: true,
 * };
 *
 * const style = Style.from(attributes);
 * ```
 *
 * @remark Excludes some attributes, like basic background and foreground. They are supposed to be handled by the ingesting function via `backgroundColor` and `foregroundColor` properties.
 * @see {@link Style.from}
 */
export type AttributeProps = {
  -readonly [K in keyof typeof PROP_TO_ATTRIBUTE]: boolean;
} & {
  backgroundColor: MaybeColor;
  foregroundColor: MaybeColor;
  underlineColor: MaybeColor;
  underlineStyle: UnderlineStyle;
};
