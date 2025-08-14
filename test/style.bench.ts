import { bench, describe } from "vitest";
import { BasicColor, IndexedColor } from "../src/color";
import { Style } from "../src/sgr";
import { LegacyStyle } from "../src/sgr/style-legacy";

const ALL_STYLES = new Style()
  .reset()
  .bold()
  .faint()
  .italic()
  .underline(IndexedColor.AeroBlue)
  .background(BasicColor.Black)
  .foreground("#ff0000")
  .doubleUnderline()
  .curlyUnderline()
  .dottedUnderline()
  .dashedUnderline()
  .slowBlink()
  .rapidBlink()
  .reverse()
  .conceal()
  .strikethrough()
  .normalIntensity()
  .noItalic()
  .noUnderline()
  .noBlink()
  .noReverse()
  .noConceal()
  .noStrikethrough()
  .defaultForegroundColor()
  .defaultBackgroundColor()
  .defaultUnderlineColor();

const ALL_STYLES_LEGACY = new LegacyStyle()
  .reset()
  .bold()
  .faint()
  .italic()
  .underline(IndexedColor.AeroBlue)
  .background(BasicColor.Black)
  .foreground("#ff0000")
  .doubleUnderline()
  .curlyUnderline()
  .dottedUnderline()
  .dashedUnderline()
  .slowBlink()
  .rapidBlink()
  .reverse()
  .conceal()
  .strikethrough()
  .normalIntensity()
  .noItalic()
  .noUnderline()
  .noBlink()
  .noReverse()
  .noConceal()
  .noStrikethrough()
  .defaultForegroundColor()
  .defaultBackgroundColor()
  .defaultUnderlineColor();

describe("Style", () => {
  describe("Rendering", () => {
    bench("Bitfield", () => {
      ALL_STYLES.format("Heyo");
    });
    bench("Legacy", () => {
      ALL_STYLES_LEGACY.format("Heyo");
    });
  });

  describe("Applying", () => {
    bench("Bitfield", () => {
      new Style()
        .reset()
        .bold()
        .faint()
        .italic()
        .underline(IndexedColor.AeroBlue)
        .background(BasicColor.Black)
        .foreground("#ff0000")
        .doubleUnderline()
        .curlyUnderline()
        .dottedUnderline()
        .dashedUnderline()
        .slowBlink()
        .rapidBlink()
        .reverse()
        .conceal()
        .strikethrough()
        .normalIntensity()
        .noItalic()
        .noUnderline()
        .noBlink()
        .noReverse()
        .noConceal()
        .noStrikethrough()
        .defaultForegroundColor()
        .defaultBackgroundColor()
        .defaultUnderlineColor();
    });
    bench("Legacy", () => {
      new LegacyStyle()
        .reset()
        .bold()
        .faint()
        .italic()
        .underline(IndexedColor.AeroBlue)
        .background(BasicColor.Black)
        .foreground("#ff0000")
        .doubleUnderline()
        .curlyUnderline()
        .dottedUnderline()
        .dashedUnderline()
        .slowBlink()
        .rapidBlink()
        .reverse()
        .conceal()
        .strikethrough()
        .normalIntensity()
        .noItalic()
        .noUnderline()
        .noBlink()
        .noReverse()
        .noConceal()
        .noStrikethrough()
        .defaultForegroundColor()
        .defaultBackgroundColor()
        .defaultUnderlineColor();
    });
  });
});
