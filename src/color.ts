import {
  type IParsedColor,
  luminance,
  type SRGB,
  srgb,
  type TypedColor,
} from "@thi.ng/color";
import type { Vec } from "@thi.ng/vectors";
import { ansiSrgb } from "./utils/ansi-srgb";
import { INDEXED_TO_BASIC } from "./utils/constants";
import { srgbIndexedColor } from "./utils/srgb-ansi";

/** Represents the default color. */
export const DefaultColor = -1 as const;
export type DefaultColor = typeof DefaultColor;

export enum MonoColor {
  Black = 0,
  White = 1,
}

export enum BasicColor {
  Black = 0,
  Red = 1,
  Green = 2,
  Yellow = 3,
  Blue = 4,
  Magenta = 5,
  Cyan = 6,
  White = 7,
  BrightBlack = 8,
  BrightRed = 9,
  BrightGreen = 10,
  BrightYellow = 11,
  BrightBlue = 12,
  BrightMagenta = 13,
  BrightCyan = 14,
  BrightWhite = 15,
}

export enum IndexedColor {
  Black = 0,
  Red = 1,
  Green = 2,
  Yellow = 3,
  Blue = 4,
  Magenta = 5,
  Cyan = 6,
  White = 7,
  BrightBlack = 8,
  BrightRed = 9,
  BrightGreen = 10,
  BrightYellow = 11,
  BrightBlue = 12,
  BrightMagenta = 13,
  BrightCyan = 14,
  BrightWhite = 15,
  Black256 = 16,
  FuzzyWuzzy = 17,
  DarkBlue = 18,
  CarnationPink = 19,
  MediumBlue = 20,
  LightBlue = 21,
  Camarone = 22,
  BangladeshGreen = 23,
  Orient = 24,
  Endeavour = 25,
  ScienceBlue = 26,
  BlueRibbon = 27,
  Ao = 28,
  DeepSea = 29,
  Teal = 30,
  DeepCerulean = 31,
  BlueCola = 32,
  Azure = 33,
  DarkLimeGreen = 34,
  GoGreen = 35,
  DarkCyan = 36,
  BondiBlue = 37,
  Cerulean = 38,
  BlueBolt = 39,
  StrongLimeGreen = 40,
  Malachite = 41,
  CaribbeanGreen042 = 42,
  CaribbeanGreen = 43,
  DarkTurquoise = 44,
  VividSkyBlue = 45,
  ElectricGreen = 46,
  SpringGreen047 = 47,
  GuppieGreen = 48,
  MediumSpringGreen = 49,
  BrightTurquoise = 50,
  Aqua = 51,
  BloodRed = 52,
  ImperialPurple = 53,
  MetallicViolet = 54,
  ChinesePurple = 55,
  ElectricViolet056 = 56,
  ElectricIndigo = 57,
  BronzeYellow = 58,
  Scorpion = 59,
  Comet = 60,
  DarkModerateBlue = 61,
  Indigo = 62,
  CornflowerBlue = 63,
  Avocado = 64,
  GladeGreen = 65,
  Juniper = 66,
  HippieBlue = 67,
  HavelockBlue = 68,
  Blueberry = 69,
  DarkGreen = 70,
  DarkModerateLimeGreen = 71,
  PolishedPine = 72,
  CrystalBlue = 73,
  AquaPearl = 74,
  BlueJeans = 75,
  AlienArmpit = 76,
  ModerateLimeGreen = 77,
  CaribbeanGreenPearl = 78,
  Downy = 79,
  MediumTurquoise = 80,
  MayaBlue = 81,
  BrightGreen256 = 82,
  LightLimeGreen = 83,
  VeryLightMalachiteGreen = 84,
  MediumAquamarine = 85,
  Aquamarine086 = 86,
  Aquamarine087 = 87,
  DeepRed = 88,
  FrenchPlum = 89,
  FreshEggplant = 90,
  Purple = 91,
  FrenchViolet = 92,
  ElectricViolet = 93,
  Brown = 94,
  CopperRose = 95,
  ChineseViolet = 96,
  DarkModerateViolet = 97,
  MediumPurple = 98,
  Blueberry099 = 99,
  DarkYellowOliveTone = 100,
  ClayCreek = 101,
  TaupeGray = 102,
  CoolGrey = 103,
  ChetwodeBlue = 104,
  VioletsAreBlue = 105,
  AppleGreen = 106,
  Asparagus = 107,
  BayLeaf = 108,
  DarkGrayishCyan = 109,
  LightCobaltBlue = 110,
  FrenchSkyBlue = 111,
  Pistachio = 112,
  Mantis = 113,
  PastelGreen = 114,
  PearlAqua = 115,
  Bermuda = 116,
  PaleCyan = 117,
  Chartreuse = 118,
  LightGreen = 119,
  VeryLightLimeGreen = 120,
  MintGreen121 = 121,
  Aquamarine = 122,
  Anakiwa = 123,
  BrightRed256 = 124,
  DarkPink = 125,
  DarkMagenta = 126,
  HeliotropeMagenta = 127,
  VividMulberry = 128,
  ElectricPurple = 129,
  DarkOrangeBrownTone = 130,
  DarkModerateRed = 131,
  DarkModeratePink = 132,
  DarkModerateMagenta = 133,
  RichLilac = 134,
  LavenderIndigo = 135,
  DarkGoldenrod = 136,
  Bronze = 137,
  DarkGrayishRed = 138,
  Bouquet = 139,
  Lavender = 140,
  BrightLavender = 141,
  BuddhaGold = 142,
  DarkModerateYellow = 143,
  DarkGrayishYellow = 144,
  SilverFoil = 145,
  GrayishBlue = 146,
  MaximumBluePurple = 147,
  RioGrande = 148,
  Conifer = 149,
  Feijoa = 150,
  GrayishLimeGreen = 151,
  Crystal = 152,
  FreshAir = 153,
  Lime = 154,
  GreenYellow = 155,
  MintGreen = 156,
  Menthol = 157,
  AeroBlue = 158,
  Celeste = 159,
  GuardsmanRed = 160,
  Razzmatazz = 161,
  MexicanPink = 162,
  HollywoodCerise163 = 163,
  DeepMagenta = 164,
  Phlox = 165,
  StrongOrange = 166,
  IndianRed = 167,
  Blush = 168,
  Hopbush = 169,
  ModerateMagenta = 170,
  Heliotrope = 171,
  Chocolate = 172,
  Copperfield = 173,
  MyPink = 174,
  CanCan = 175,
  DeepMauve = 176,
  BrightLilac = 177,
  Goldenrod = 178,
  EarthYellow = 179,
  SlightlyDesaturatedOrange = 180,
  ClamShell = 181,
  GrayishMagenta = 182,
  Mauve = 183,
  Citrine = 184,
  ChineseGreen = 185,
  Deco = 186,
  GrayishYellow = 187,
  LightSilver = 188,
  Fog = 189,
  ChartreuseYellow = 190,
  Canary = 191,
  Honeysuckle = 192,
  PaleGreen = 193,
  Beige = 194,
  LightCyan = 195,
  LightRed = 196,
  VividRaspberry = 197,
  BrightPink = 198,
  FashionFuchsia = 199,
  PureMagenta = 200,
  Fuchsia = 201,
  BlazeOrange = 202,
  Bittersweet = 203,
  Strawberry = 204,
  HotPink = 205,
  LightDeepPink = 206,
  PinkFlamingo = 207,
  AmericanOrange = 208,
  Coral = 209,
  Tulip = 210,
  PinkSalmon = 211,
  LavenderRose = 212,
  BlushPink = 213,
  ChineseYellow = 214,
  LightOrange = 215,
  HitPink = 216,
  Melon = 217,
  CottonCandy = 218,
  PaleMagenta = 219,
  Gold = 220,
  Dandelion = 221,
  Grandis = 222,
  Caramel = 223,
  Cosmos = 224,
  BubbleGum = 225,
  LightYellow011 = 226,
  LaserLemon = 227,
  Dolly = 228,
  Calamansi = 229,
  Cream = 230,
  LightWhite = 231,
  VampireBlack = 232,
  ChineseBlack = 233,
  EerieBlack = 234,
  RaisinBlack = 235,
  DarkCharcoal = 236,
  BlackOlive = 237,
  OuterSpace = 238,
  DarkLiver = 239,
  DavysGrey = 240,
  GraniteGray = 241,
  DimGray = 242,
  Boulder = 243,
  Gray = 244,
  PhilippineGray = 245,
  DustyGray = 246,
  SpanishGray = 247,
  DarkGray = 248,
  PhilippineSilver = 249,
  Silver = 250,
  SilverSand = 251,
  AmericanSilver = 252,
  Alto = 253,
  Mercury = 254,
  BrightGray = 255,
}

/**
 * A color vector.
 *
 * @example
 * ```ts
 * const color: ColorVec = [0.5, 0.5, 0.5];
 * ```
 */
export type ColorVec = Vec;

/**
 * ANSI colors
 *
 * @example
 * ```ts
 * const basic: AnsiColor = BasicColor.Red;
 * const indexed: AnsiColor = IndexedColor.Red;
 * ```
 */
export type AnsiColor = BasicColor | IndexedColor;
/**
 * RGB color
 *
 * @example
 * ```ts
 * const vec: RgbColor = [0.5, 0.5, 0.5];
 * const rgb: RgbColor = rgb("#ff0000");
 * ```
 */
export type RgbColor = SRGB | ColorVec;

/**
 * Color
 *
 * @see {@link DefaultColor}
 * @see {@link AnsiColor}
 * @see {@link RgbColor}
 */
export type Color = DefaultColor | AnsiColor | RgbColor;

/**
 * A value that might be able to be interpreted as a color.
 *
 * This includes:
 *
 * - strings (any notation `@this.ng/color` supports, so almost any CSS notation)
 * - {@link IndexedColor} or {@link BasicColor} values*
 * - arrays (vectors with values from 0 to 1)
 * - parsed or typed colors (`@thi.ng/color` instances)
 *
 * Note that native `@thi.ng/color` treat any numbers as packed integers.
 * Our functions treats numbers from 0 to 255 as ANSI colors.
 *
 * If you want to use functionality from `@thi.ng` with ANSI colors, convert
 * them first by using {@link rgb}. This converts them to vectors readable by the `@thi.ng` universe.
 *
 * @example
 * ```ts
 * const hex = `#333`;
 * const packed = 2;
 * const array = [0.3, 0.3, 0.3];
 * const thingInstances = rgb();
 * const indexed = IndexedColor.Red;
 * const basic = BasicColor.Black;
 * ```
 */
export type MaybeColor =
  // @thi.ng/color's `MaybeColor`
  | (TypedColor<any> | IParsedColor)
  // CSS strings
  | string
  // Packed RGB (r << 16 | g << 8 | b)
  | number
  // Vectors
  | ColorVec
  // RGB color
  | RgbColor
  // 0-255
  | AnsiColor
  // Default color
  | DefaultColor;

const TEMP: number[] = [];

/**
 * Creates a {@link MonoColor} based on a {@link MaybeColor}.
 *
 * Does convert if necessary.
 */
export function mono(src: MaybeColor): MonoColor {
  return luminance(isIndexedColor(src) ? ansiSrgb([], src) : src) > 0.5
    ? MonoColor.White
    : MonoColor.Black;
}

/**
 * Creates an {@link BasicColor}
 *
 * Converts from any format supported by {@link MaybeColor}.
 */
export const basic = (src: MaybeColor): BasicColor => {
  if (isBasicColor(src)) return src;
  if (isIndexedColor(src)) return INDEXED_TO_BASIC[src];
  return INDEXED_TO_BASIC[srgbIndexedColor(srgb(src, TEMP))];
};

/**
 * Creates an {@link IndexedColor}
 *
 * Converts from any format supported by {@link MaybeColor}.
 */
export const indexed = (src: MaybeColor): IndexedColor => {
  if (isIndexedColor(src)) return src;
  return srgbIndexedColor(srgb(src, TEMP));
};

/**
 * Creates an {@link RgbColor}
 *
 * Converts from any format supported by {@link MaybeColor}.
 */
export const rgb = (src: MaybeColor): RgbColor => {
  if (isIndexedColor(src)) return srgb(ansiSrgb([], src));
  return srgb(src);
};

/**
 * Returns true if the given color is the default color.
 */
export function isDefaultColor(src: unknown): src is DefaultColor {
  return src === DefaultColor;
}

/**
 * Returns true if the given color is an indexed color.
 */
export function isIndexedColor(src: unknown): src is IndexedColor {
  return typeof src === "number" && src >= 0 && src <= 255;
}

/**
 * Returns true if the given color is a basic color.
 */
export function isBasicColor(src: unknown): src is BasicColor {
  return typeof src === "number" && src >= 0 && src <= 15;
}

/**
 * Returns true if the given color is a RGB color.
 */
export function isRgbColor(src: unknown): src is RgbColor {
  return src instanceof srgb.class;
}

/**
 * Returns true if the given value is a value that can probably be interpreted as a color.
 *
 * @param src - The color to check
 */
export function isMaybeColor(src: unknown): src is MaybeColor {
  return (
    isBasicColor(src) ||
    isIndexedColor(src) ||
    isDefaultColor(src) ||
    isRgbColor(src) ||
    Array.isArray(src) ||
    typeof src === "string"
  );
}

/**
 * Returns true if the given value is a color.
 * @param src - The color to check
 */
export function isColor(src: unknown): src is Color {
  return (
    isBasicColor(src) ||
    isIndexedColor(src) ||
    isDefaultColor(src) ||
    isRgbColor(src)
  );
}
