import { CSI } from "./c1";
import {type Attributes, Style} from "./style";

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
 * Select Graphic Rendition (`SGR`) is a command that sets display attributes.
 *
 * Default is 0.
 *
 * ```
 * CSI Ps ; Ps ... m
 * ```
 *
 * @see https://vt100.net/docs/vt510-rm/SGR.html
 */
export function selectGraphicRendition(attributes: Attributes) {
  if (attributes.length === 0) return RESET_STYLE;

  return new Style(attributes).toString();
}

/** `SGR` is an alias for {@link selectGraphicRendition} */
export const SGR = selectGraphicRendition;
