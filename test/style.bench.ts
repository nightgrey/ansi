import { BasicColor } from "../src/color";
import { Style } from "../src/style";
import { bench, describe } from "vitest";

const ALL_STYLES = new Style()
  .reset()
  .bold()
  .faint()
  .italic()
  .underline()
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
  .defaultUnderlineColor()
  .background(BasicColor.Black)
  .foreground(BasicColor.White);

describe("Style", () => {
  bench("apply all styles", () => {
    new Style()
      .reset()
      .bold()
      .faint()
      .italic()
      .underline()
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
      .defaultUnderlineColor()
      .background(BasicColor.Black)
      .foreground("#ff0000");
  });

  bench("render with all styles", () => {
    ALL_STYLES.render("Heyo");
  });
});
