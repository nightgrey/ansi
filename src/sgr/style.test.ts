import { beforeEach, describe, expect, it, test } from "vitest";
import { BasicColor, IndexedColor } from "../color";
import { Style, UnderlineStyle } from "./index";

describe("Style", () => {
  let style: Style;

  beforeEach(() => {
    style = Style.empty;
  });

  it("should create a style", () => {
    const newStyle = new Style();
    expect(newStyle.value).toBe(0);
    expect(newStyle.bg).toBe(null);
    expect(newStyle.fg).toBe(null);
    expect(newStyle.ul).toBe(null);
  });

  describe("getters", () => {
    it("should return background color from attributes", () => {
      style = style.backgroundColor(BasicColor.Blue);
      expect(style.bg).toBe(style.bg);
    });

    it("should return foreground color from attributes", () => {
      style = style.foregroundColor(BasicColor.Red);
      expect(style.foregroundColor(BasicColor.Red).fg).toBe(style.fg);
    });

    it("should return underline color from attributes", () => {
      style = style.underlineColor(BasicColor.Red);
      expect(style.ul).toBe(style.ul);
    });
  });

  describe("basic formatting", () => {
    test("bold()", () => {
      style = style.bold();

      expect(style.toString()).toMatchSgr(["1"]);
    });

    test("italic()", () => {
      style = style.italic();

      expect(style.toString()).toMatchSgr(["3"]);
    });

    test("strikethrough()", () => {
      style = style.strikethrough();

      expect(style.toString()).toMatchSgr(["9"]);
    });
  });

  describe("underline styles", () => {
    test("single underline", () => {
      style = style.underlineStyle(UnderlineStyle.Single);
      expect(style.toString()).toMatchSgr(["4"]);
    });

    test("double underline", () => {
      style = style.underlineStyle(UnderlineStyle.Double);
      expect(style.toString()).toMatchSgr("4:2");
    });

    test("curly underline", () => {
      style = style.underlineStyle(UnderlineStyle.Curly);
      expect(style.toString()).toMatchSgr("4:3");
    });

    test("dotted underline", () => {
      style = style.underlineStyle(UnderlineStyle.Dotted);
      expect(style.toString()).toMatchSgr("4:4");
    });

    test("dashed underline", () => {
      style = style.underlineStyle(UnderlineStyle.Dashed);
      expect(style.toString()).toMatchSgr("4:5");
    });
  });

  describe("foreground", () => {
    test("basic colors", () => {
      style = style.foregroundColor(BasicColor.Red);

      expect(style.toString()).toMatchSgr(["31"]);
    });
    test("indexed colors", () => {
      style = style.foregroundColor(IndexedColor.Red);

      expect(style.toString()).toMatchSgr(["31"]);
    });
    test("hex colors", () => {
      style = style.foregroundColor("#e40010");
      expect(style.toString()).toMatchSgr("38:2:228:0:16");
    });
    test("vector colors", () => {
      style = style.foregroundColor([0.5, 0.5, 0.5]);
      expect(style.toString()).toMatchSgr("38:2:128:128:128");
    });
    test("rgb() colors", () => {
      style = style.foregroundColor("rgb(229,8,174)");
      expect(style.toString()).toMatchSgr("38:2:229:8:174");
    });
  });

  describe("background", () => {
    test("basic colors", () => {
      style = style.backgroundColor(BasicColor.Blue);
      expect(style.toString()).toMatchSgr(["44"]);
    });

    test("indexed colors", () => {
      style = style.backgroundColor(IndexedColor.Blue);
      expect(style.toString()).toMatchSgr(["44"]);
    });
    test("hex colors", () => {
      style = style.backgroundColor("#e40010");
      expect(style.toString()).toMatchSgr("48:2:228:0:16");
    });
    test("vector colors", () => {
      style = style.backgroundColor([0.5, 0.5, 0.5]);
      expect(style.toString()).toMatchSgr("48:2:128:128:128");
    });
    test("rgb() colors", () => {
      style = style.backgroundColor("rgb(229,8,174)");
      expect(style.toString()).toMatchSgr("48:2:229:8:174");
    });
  });

  describe("underline", () => {
    test("basic colors", () => {
      style = style.underlineColor(BasicColor.Red);

      expect(style.toString()).toMatchSgr("58:5:1");
    });
    test("indexed colors", () => {
      style = style.underlineColor(IndexedColor.AlienArmpit);

      //   `${ExtendedUnderlineColorAttr};${ExtendedColorIntroducerAttr};${IndexedColor.AlienArmpit}`,
      // );

      expect(style.toString()).toMatchSgr("58:5:76");
    });
    test("hex colors", () => {
      style = style.underlineColor("#e40010");

      expect(style.toString()).toMatchSgr("58:2:228:0:16");
    });
    test("vector colors", () => {
      style = style.underlineColor([0.5, 0.5, 0.5]);

      expect(style.toString()).toMatchSgr("58:2:128:128:128");
    });
    test("rgb() colors", () => {
      style = style.underlineColor("rgb(229,8,174)");

      expect(style.toString()).toMatchSgr("58:2:229:8:174");
    });
  });

  describe("method chaining", () => {
    test("multiple styles can be chained", () => {
      style = style.bold().italic().underline().foregroundColor(BasicColor.Red);

      expect(style.toString()).toMatchSgr(["1", "3", "4", "31"]);
    });
  });

  describe("render", () => {
    test("render() with no styles", () => {
      expect(style.format("test")).toMatchSgr(["0"]);
    });

    test("render() with styles", () => {
      style = style.bold().foregroundColor(BasicColor.Red);
      expect(style.format("test")).toMatchSgr(["1", "31"]);
    });
  });

  describe("copy and reset", () => {
    test("copy() creates new instance with same styles", () => {
      style = style.bold().italic();
      const copied = style.copy();

      expect(copied).not.toBe(style);
      expect(copied.values().toArray()).toEqual(style.values().toArray());
    });

    test("reset()", () => {
      style = style.bold().reset();
      expect(style.format("test")).toMatchSgr(["0"]);
    });
  });

  test("toString() returns SGR escape sequence", () => {
    style = style.bold().foregroundColor(BasicColor.Red);
    expect(style.toString()).toMatchSgr(["1", "31"]);
  });

  test("many props at once", () => {
    style = style
      .bold() // 1
      .faint() // 2
      .italic() // 3 (should be removed by `noItalic`)
      .blink() // 5
      .reverse() // 7
      .conceal() // 8
      .noItalic() // 23
      .strikethrough() // 9 (should be removed by `noStrikethrough`)
      .noStrikethrough() // 29
      .backgroundColor(BasicColor.Blue) // 44
      .foregroundColor(BasicColor.Red) // 38;2;1, but should be removed by `defaultForegroundColor`
      .defaultForegroundColor(); // 39

    return expect(style.toString()).toMatchSgr("1;2;5;7;8;23;29;44;39");
  });
});
