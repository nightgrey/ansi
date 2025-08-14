import { describe, expect, test } from "vitest";
import { BasicColor, IndexedColor } from "../color";
import { Attributes, Style, UnderlineStyle } from "./index";

describe("Style", () => {
  test("constructor creates empty style", () => {
    const style = new Style();
  });

  test("constructor with initial styles", () => {
    const style = new Style(new Attributes().bold().italic().underline());
  });

  describe("basic formatting", () => {
    test("bold()", () => {
      const style = new Style().bold();

      expect(style.format("Hello")).toMatchSgr(["1"]);
    });

    test("italic()", () => {
      const style = new Style().italic();

      expect(style.format("Hello")).toMatchSgr(["3"]);
    });

    test("strikethrough()", () => {
      const style = new Style().strikethrough();

      expect(style.format("Hello")).toMatchSgr(["9"]);
    });
  });

  test("underline styles", () => {
    const style = new Style();

    const single = style.underlineStyle(UnderlineStyle.Single);

    expect(single.format("Hello")).toMatchSgr(["4"]);

    const double = style.underlineStyle(UnderlineStyle.Double);

    expect(double.format("Hello")).toMatchSgr("4:2");

    const curly = style.underlineStyle(UnderlineStyle.Curly);

    expect(curly.format("Hello")).toMatchSgr("4:3");

    const dot = style.underlineStyle(UnderlineStyle.Dotted);

    expect(dot.format("Hello")).toMatchSgr("4:4");

    const dash = style.underlineStyle(UnderlineStyle.Dashed);

    expect(dash.format("Hello")).toMatchSgr("4:5");
  });

  describe("foreground", () => {
    test("basic colors", () => {
      const style = new Style().foregroundColor(BasicColor.Red);

      expect(style.format("Hello")).toMatchSgr(["31"]);
    });
    test("indexed colors", () => {
      const style = new Style().foregroundColor(IndexedColor.Red);

      expect(style.format("Hello")).toMatchSgr(["31"]);
    });
    test("hex colors", () => {
      const hex = new Style().foregroundColor("#e40010");
      expect(hex.format("Hello")).toMatchSgr("38:2:228:0:16");
    });
    test("vector colors", () => {
      const vec = new Style().foregroundColor([0.5, 0.5, 0.5]);
      expect(vec.format("Hello")).toMatchSgr("38:2:128:128:128");
    });
    test("rgb() colors", () => {
      const rgb = new Style().foregroundColor("rgb(229,8,174)");
      expect(rgb.format("Hello")).toMatchSgr("38:2:229:8:174");
    });
  });

  describe("background", () => {
    test("basic colors", () => {
      const style = new Style().backgroundColor(BasicColor.Blue);
      expect(style.format("Hello")).toMatchSgr(["44"]);
    });

    test("indexed colors", () => {
      const style = new Style().backgroundColor(IndexedColor.Blue);
      expect(style.format("Hello")).toMatchSgr(["44"]);
    });
    test("hex colors", () => {
      const hex = new Style().backgroundColor("#e40010");
      expect(hex.format("Hello")).toMatchSgr("48:2:228:0:16");
    });
    test("vector colors", () => {
      const vec = new Style().backgroundColor([0.5, 0.5, 0.5]);

      expect(vec.format("Hello")).toMatchSgr("48:2:128:128:128");
    });
    test("rgb() colors", () => {
      const rgb = new Style().backgroundColor("rgb(229,8,174)");

      expect(rgb.format("Hello")).toMatchSgr("48:2:229:8:174");
    });
  });

  describe("underline", () => {
    test("basic colors", () => {
      const style = new Style().underlineColor(BasicColor.Red);

      expect(style.format("Hello")).toMatchSgr("58:5:1");
    });
    test("indexed colors", () => {
      const style = new Style().underlineColor(IndexedColor.AlienArmpit);

      //   `${ExtendedUnderlineColorAttr};${ExtendedColorIntroducerAttr};${IndexedColor.AlienArmpit}`,
      // );

      expect(style.format("Hello")).toMatchSgr("58:5:76");
    });
    test("hex colors", () => {
      const hex = new Style().underlineColor("#e40010");

      expect(hex.format("Hello")).toMatchSgr("58:2:228:0:16");
    });
    test("vector colors", () => {
      const vec = new Style().underlineColor([0.5, 0.5, 0.5]);

      expect(vec.format("Hello")).toMatchSgr("58:2:128:128:128");
    });
    test("rgb() colors", () => {
      const rgb = new Style().underlineColor("rgb(229,8,174)");

      expect(rgb.format("Hello")).toMatchSgr("58:2:229:8:174");
    });
  });

  describe("method chaining", () => {
    test("multiple styles can be chained", () => {
      const style = new Style()
        .bold()
        .italic()
        .underline()
        .foregroundColor(BasicColor.Red);

      expect(style.format("Hello")).toMatchSgr(["1", "3", "4", "31"]);
    });
  });

  describe("render", () => {
    test("render() with no styles", () => {
      const style = new Style();
      expect(style.format("test")).toMatchSgr(["0"]);
    });

    test("render() with styles", () => {
      const style = new Style().bold().foregroundColor(BasicColor.Red);
      expect(style.format("test")).toMatchSgr(["1", "31"]);
    });
  });

  describe("copy and reset", () => {
    test("copy() creates new instance with same styles", () => {
      const original = new Style().bold().italic();
      const copied = original.copy();

      expect(copied).not.toBe(original);
    });

    test("reset()", () => {
      const style = new Style().bold().reset();
      expect(style.format("test")).toMatchSgr(["0"]);
    });
  });

  test("toString() returns SGR escape sequence", () => {
    const style = new Style().bold().foregroundColor(BasicColor.Red);
    expect(style.toString()).toMatchSgr(["1", "31"]);
  });

  test("many props at once", () => {
    return expect(
      new Style()
        .background(BasicColor.Blue)
        .foreground(BasicColor.Red)
        .underline(UnderlineStyle.Double)
        .underlineColor(BasicColor.Red)
        .bold()
        .faint()
        .italic()
        .blink()
        .reverse()
        .conceal()
        .strikethrough()
        .noStrikethrough()
        .noItalic()
        .defaultForegroundColor()
        .format("Hello"),
    ).toMatchSgr("1;2;4:2;5;7;8;23;29;39;44;58:5:1");
  });
});
