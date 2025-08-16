import { BasicColor } from "../../color";

/**
 * Defines the different underline style attributes.
 *
 * They are only supported by more modern terminals, and not in the standard list of attributes.
 */
export enum UnderlineStyle {
  None = "4:0",
  Single = "4:1",
  Double = "4:2",
  Curly = "4:3",
  Dotted = "4:4",
  Dashed = "4:5",
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

export const BASIC_COLOR_TO_BACKGROUND_ATTRIBUTE = Object.freeze({
  [BasicColor.Black]: Attribute.BlackBackgroundColor,
  [BasicColor.Red]: Attribute.RedBackgroundColor,
  [BasicColor.Green]: Attribute.GreenBackgroundColor,
  [BasicColor.Yellow]: Attribute.YellowBackgroundColor,
  [BasicColor.Blue]: Attribute.BlueBackgroundColor,
  [BasicColor.Magenta]: Attribute.MagentaBackgroundColor,
  [BasicColor.Cyan]: Attribute.CyanBackgroundColor,
  [BasicColor.White]: Attribute.WhiteBackgroundColor,
  [BasicColor.BrightBlack]: Attribute.BrightBlackBackgroundColor,
  [BasicColor.BrightRed]: Attribute.BrightRedBackgroundColor,
  [BasicColor.BrightGreen]: Attribute.BrightGreenBackgroundColor,
  [BasicColor.BrightYellow]: Attribute.BrightYellowBackgroundColor,
  [BasicColor.BrightBlue]: Attribute.BrightBlueBackgroundColor,
  [BasicColor.BrightMagenta]: Attribute.BrightMagentaBackgroundColor,
  [BasicColor.BrightCyan]: Attribute.BrightCyanBackgroundColor,
  [BasicColor.BrightWhite]: Attribute.BrightWhiteBackgroundColor,
} as const);

export const BASIC_COLOR_TO_FOREGROUND_ATTRIBUTE = Object.freeze({
  [BasicColor.Black]: Attribute.BlackForegroundColor,
  [BasicColor.Red]: Attribute.RedForegroundColor,
  [BasicColor.Green]: Attribute.GreenForegroundColor,
  [BasicColor.Yellow]: Attribute.YellowForegroundColor,
  [BasicColor.Blue]: Attribute.BlueForegroundColor,
  [BasicColor.Magenta]: Attribute.MagentaForegroundColor,
  [BasicColor.Cyan]: Attribute.CyanForegroundColor,
  [BasicColor.White]: Attribute.WhiteForegroundColor,
  [BasicColor.BrightBlack]: Attribute.BrightBlackForegroundColor,
  [BasicColor.BrightRed]: Attribute.BrightRedForegroundColor,
  [BasicColor.BrightGreen]: Attribute.BrightGreenForegroundColor,
  [BasicColor.BrightYellow]: Attribute.BrightYellowForegroundColor,
  [BasicColor.BrightBlue]: Attribute.BrightBlueForegroundColor,
  [BasicColor.BrightMagenta]: Attribute.BrightMagentaForegroundColor,
  [BasicColor.BrightCyan]: Attribute.BrightCyanForegroundColor,
  [BasicColor.BrightWhite]: Attribute.BrightWhiteForegroundColor,
} as const);
