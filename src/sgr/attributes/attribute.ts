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
