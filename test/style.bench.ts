import {BasicColor, IndexedColor} from "../src/color";
import {Style} from "../src/style";

import {bench, describe} from "vitest";

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
    .defaultUnderlineColor()

describe("Style", () => {
    bench("render styles", () => {

        ALL_STYLES.render("Heyo");
    })
    bench("apply styles", () => {
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
            .defaultUnderlineColor()

    });
});
