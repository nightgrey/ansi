import { describe, expect, test } from "vitest";
import { BasicColor, IndexedColor } from "../src/color";
import { Style } from "../src/style";
import {
  BoldAttr,
  ExtendedColorIntroducerAttr,
  ExtendedUnderlineColorAttr,
  UnderlineAttr,
  UnderlineStyle,
} from "../src";
describe("Style", () => {
  test("constructor creates empty style", () => {
    const style = new Style();
    expect(style.attributes.length).toBe(0);
  });

  test("constructor with initial styles", () => {
    const style = new Style([1, 2, 3]);
    expect(style.attributes.length).toBe(3);
    expect(Array.from(style.attributes)).toEqual([1, 2, 3]);
  });

  describe("basic formatting", () => {
    test("bold()", () => {
      const style = new Style().bold();
      expect(style.attributes.includes(1)).toBe(true);
      expect(style.render("Hello")).toMatch("\x1b[1mHello\x1b[m");
    });

    test("italic()", () => {
      const style = new Style().italic();
      expect(style.attributes.includes(3)).toBe(true);
      expect(style.render("Hello")).toMatch("\x1b[3mHello\x1b[m");
    });

    test("strikethrough()", () => {
      const style = new Style().strikethrough();
      expect(style.attributes.includes(9)).toBe(true);
      expect(style.render("Hello")).toMatch("\x1b[9mHello\x1b[m");
    });
  });

  test("underline styles", () => {
    const style = new Style();

    const single = style.underlineStyle(UnderlineStyle.SingleUnderline);
    expect(single.attributes[0]).toBe(4);
    expect(single.render("Hello")).toMatch("\x1b[4mHello\x1b[m");

    const double = style.underlineStyle(UnderlineStyle.DoubleUnderline);
    expect(double.attributes[0]).toBe("4:2");
    expect(double.render("Hello")).toMatch("\x1b[4:2mHello\x1b[m");

    const curly = style.underlineStyle(UnderlineStyle.CurlyUnderline);
    expect(curly.attributes[0]).toBe("4:3");
    expect(curly.render("Hello")).toMatch("\x1b[4:3mHello\x1b[m");

    const dot = style.underlineStyle(UnderlineStyle.DottedUnderline);
    expect(dot.attributes[0]).toBe("4:4");
    expect(dot.render("Hello")).toMatch("\x1b[4:4mHello\x1b[m");

    const dash = style.underlineStyle(UnderlineStyle.DashedUnderline);
    expect(dash.attributes[0]).toBe("4:5");
    expect(dash.render("Hello")).toMatch("\x1b[4:5mHello\x1b[m");

    const none = style.underlineStyle(UnderlineStyle.NoUnderline);
    expect(none.attributes[0]).toBe(24);
    expect(none.render("Hello")).toMatch("\x1b[24mHello\x1b[m");
  });

  describe("foreground", () => {
    test("basic colors", () => {
      const style = new Style().foregroundColor(BasicColor.Red);
      expect(style.attributes.includes(31)).toBe(true);
      expect(style.render("Hello")).toMatch("\x1b[31mHello\x1b[m");
    });
    test("indexed colors", () => {
      const style = new Style().foregroundColor(IndexedColor.Red);
      expect(style.attributes.includes(31)).toBe(true);
      expect(style.render("Hello")).toMatch("\x1b[31mHello\x1b[m");
    });
    test("hex colors", () => {
      const hex = new Style().foregroundColor("#e40010");
      expect(hex.attributes[0]).toMatch("38;2;228;0;16");
      expect(hex.render("Hello")).toMatch("\x1b[38;2;228;0;16mHello\x1b[m");
    });
    test("vector colors", () => {
      const vec = new Style().foregroundColor([0.5, 0.5, 0.5]);
      expect(vec.attributes[0]).toMatch("38;2;128;128;128");
      expect(vec.render("Hello")).toMatch("\x1b[38;2;128;128;128mHello\x1b[m");
    });
    test("rgb() colors", () => {
      const rgb = new Style().foregroundColor("rgb(229,8,174)");
      expect(rgb.attributes[0]).toBe("38;2;229;8;174");
      expect(rgb.render("Hello")).toMatch("\x1b[38;2;229;8;174mHello\x1b[m");
    });
  });

  describe("background", () => {
    test("basic colors", () => {
      const style = new Style().backgroundColor(BasicColor.Blue);
      expect(style.attributes.includes(44)).toBe(true);
      expect(style.render("Hello")).toMatch("\x1b[44mHello\x1b[m");
    });

    test("indexed colors", () => {
      const style = new Style().backgroundColor(IndexedColor.Blue);
      expect(style.attributes.includes(44)).toBe(true);
      expect(style.render("Hello")).toMatch("\x1b[44mHello\x1b[m");
    });
    test("hex colors", () => {
      const hex = new Style().backgroundColor("#e40010");
      expect(hex.attributes[0]).toMatch("48;2;228;0;16");
      expect(hex.render("Hello")).toMatch("\x1b[48;2;228;0;16mHello\x1b[m");
    });
    test("vector colors", () => {
      const vec = new Style().backgroundColor([0.5, 0.5, 0.5]);
      expect(vec.attributes[0]).toMatch("48;2;128;128;128");
      expect(vec.render("Hello")).toMatch("\x1b[48;2;128;128;128mHello\x1b[m");
    });
    test("rgb() colors", () => {
      const rgb = new Style().backgroundColor("rgb(229,8,174)");
      expect(rgb.attributes[0]).toBe("48;2;229;8;174");
      expect(rgb.render("Hello")).toMatch("\x1b[48;2;229;8;174mHello\x1b[m");
    });
  });

  describe("underline", () => {
    test("basic colors", () => {
      const style = new Style().underline(BasicColor.Red);
      expect(style.attributes[0]).toMatch(
        `${ExtendedUnderlineColorAttr};${ExtendedColorIntroducerAttr};${BasicColor.Red}`,
      );
      expect(style.attributes[1]).toBe(UnderlineAttr);
      expect(style.render("Hello")).toMatch("\x1b[58;5;1;4mHello\x1b[m");
    });
    test("indexed colors", () => {
      const style = new Style().underline(IndexedColor.AlienArmpit);
      expect(style.attributes[0]).toMatch(
        `${ExtendedUnderlineColorAttr};${ExtendedColorIntroducerAttr};${IndexedColor.AlienArmpit}`,
      );
      expect(style.attributes[1]).toBe(UnderlineAttr);

      expect(style.render("Hello")).toMatch("\x1b[58;5;76;4mHello\x1b[m");
    });
    test("hex colors", () => {
      const hex = new Style().underline("#e40010");
      expect(hex.attributes[0]).toMatch("58;2;228;0;16");
      expect(hex.attributes[1]).toBe(UnderlineAttr);

      expect(hex.render("Hello")).toMatch("\x1b[58;2;228;0;16;4mHello\x1b[m");
    });
    test("vector colors", () => {
      const vec = new Style().underline([0.5, 0.5, 0.5]);
      expect(vec.attributes[0]).toMatch("58;2;128;128;128");
      expect(vec.attributes[1]).toBe(UnderlineAttr);
      expect(vec.render("Hello")).toMatch(
        "\x1b[58;2;128;128;128;4mHello\x1b[m",
      );
    });
    test("rgb() colors", () => {
      const rgb = new Style().underline("rgb(229,8,174)");
      expect(rgb.attributes[0]).toBe("58;2;229;8;174");
      expect(rgb.attributes[1]).toBe(UnderlineAttr);
      expect(rgb.render("Hello")).toMatch("\x1b[58;2;229;8;174;4mHello\x1b[m");
    });
  });

  describe("method chaining", () => {
    test("multiple styles can be chained", () => {
      const style = new Style()
        .bold()
        .italic()
        .underline()
        .foregroundColor(BasicColor.Red);

      expect(style.attributes.length).toBe(4);
      expect(style.attributes.includes(1)).toBe(true); // bold
      expect(style.attributes.includes(3)).toBe(true); // italic
      expect(style.attributes.includes(4)).toBe(true); // underline
      expect(style.attributes.includes(31)).toBe(true); // red

      expect(style.render("Hello")).toMatch("\x1b[1;3;4;31mHello\x1b[m");
    });
  });

  describe("render", () => {
    test("render() with no styles", () => {
      const style = new Style();
      expect(style.render("test")).toMatch("test");
    });

    test("render() with styles", () => {
      const style = new Style().bold().foregroundColor(BasicColor.Red);
      expect(style.render("test")).toMatch("\x1b[1;31mtest\x1b[m");
    });
  });

  describe("copy and reset", () => {
    test("copy() creates new instance with same styles", () => {
      const original = new Style().bold().italic();
      const copied = original.copy();

      expect(copied).not.toBe(original);
      expect(Array.from(copied.attributes)).toEqual(
        Array.from(original.attributes),
      );
    });

    test("reset() adds reset attribute", () => {
      const style = new Style().bold().reset();

      expect(style.attributes.length).toBe(2);
      expect(style.attributes[0]).toBe(BoldAttr);
      expect(style.attributes[1]).toMatch("\x1b[m");
    });
  });

  test("toString() returns SGR escape sequence", () => {
    const style = new Style().bold().foregroundColor(BasicColor.Red);
    expect(style.toString()).toMatch("\x1b[1;31m");
  });

  test("all props at once", () => {
    const style = new Style()
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

    return expect(style.toString()).toMatchInlineSnapshot(
      `"[[m;1;2;3;58;5;158;4;40;38;2;255;0;0;4:2;4:3;4:4;4:5;5;6;7;8;9;22;23;24;25;27;28;29;39;49;59m"`,
    );
  });
});
