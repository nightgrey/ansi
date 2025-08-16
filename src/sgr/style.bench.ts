import { bench, describe } from "vitest";
import { BasicColor, IndexedColor } from "../color";
import { Style } from "./index";

const ALL_STYLES = new Style()
  .reset()
  .bold()
  .faint()
  .italic()
  .underline()
  .underlineColor(IndexedColor.AeroBlue)
  .backgroundColor(BasicColor.Black)
  .foregroundColor("#ff0000")
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
  });

  describe("Applying", () => {
    bench("Bitfield", () => {
      new Style()
        .reset()
        .bold()
        .faint()
        .italic()
        .underline()
        .underlineColor(IndexedColor.AeroBlue)
        .backgroundColor(BasicColor.Black)
        .foregroundColor("#ff0000")
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
