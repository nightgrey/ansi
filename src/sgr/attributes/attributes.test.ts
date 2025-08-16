import { beforeEach, describe, expect, it } from "vitest";
import { BasicColor, DefaultColor, rgb } from "../../color";
import { UnderlineStyle } from "./attribute";
import { Attributes } from "./attributes";
import { Bit } from "./bit";

describe("Attributes", () => {
  let attributes: Attributes;

  beforeEach(() => {
    attributes = new Attributes();
  });

  describe("constructor", () => {
    it("should create empty attributes by default", () => {
      expect(attributes.value).toBe(0);
      expect(attributes.bg).toBe(null);
      expect(attributes.fg).toBe(null);
      expect(attributes.ul).toBe(null);
    });

    it("should create attributes with provided values", () => {
      const attr = new Attributes(123, 255, 128, 64);
      expect(attr.value).toBe(123);
      expect(attr.bg).toBe(255);
      expect(attr.fg).toBe(128);
      expect(attr.ul).toBe(64);
    });
  });

  describe("basic attributes", () => {
    it("should set bold", () => {
      const bold = attributes.bold();
      expect(bold.has(Bit.Bold)).toBe(true);
      expect(bold).not.toBe(attributes); // immutable
    });

    it("should set italic", () => {
      const italic = attributes.italic();
      expect(italic.has(Bit.Italic)).toBe(true);
    });

    it("should set and unset italic", () => {
      const italic = attributes.italic();
      const noItalic = italic.noItalic();
      expect(italic.has(Bit.Italic)).toBe(true);
      expect(noItalic.has(Bit.NoItalic)).toBe(true);
      expect(noItalic.has(Bit.Italic)).toBe(false);
    });

    it("should handle intensity correctly", () => {
      const faint = attributes.faint();
      const normal = faint.normalIntensity();

      expect(faint.has(Bit.Faint)).toBe(true);
      expect(normal.has(Bit.NormalIntensity)).toBe(true);
      expect(normal.has(Bit.Faint)).toBe(false);
    });

    it("should set reset", () => {
      const reset = attributes.bold().reset();
      expect(reset.isEmpty()).toBe(true);
    });
  });

  describe("underline styles", () => {
    it("should set single underline by default", () => {
      const underlined = attributes.underline();
      expect(underlined.has(Bit.Underline)).toBe(true);
    });

    it("should set specific underline styles", () => {
      const single = attributes.singleUnderline();
      const double = attributes.doubleUnderline();
      const curly = attributes.curlyUnderline();
      const dotted = attributes.dottedUnderline();
      const dashed = attributes.dashedUnderline();

      expect(single.has(Bit.Underline)).toBe(true);
      expect(double.has(Bit.UnderlineDouble)).toBe(true);
      expect(curly.has(Bit.UnderlineCurly)).toBe(true);
      expect(dotted.has(Bit.UnderlineDotted)).toBe(true);
      expect(dashed.has(Bit.UnderlineDashed)).toBe(true);
    });

    it("should remove underline", () => {
      const underlined = attributes.underline();
      const noUnderline = underlined.noUnderline();

      expect(underlined.has(Bit.Underline)).toBe(true);
      expect(noUnderline.has(Bit.Underline)).toBe(false);
    });

    it("should handle underline none", () => {
      const underlined = attributes.underline();
      const none = underlined.underline(UnderlineStyle.None);

      expect(none.has(Bit.Underline)).toBe(false);
      expect(none.has(Bit.NoUnderline)).toBe(true);
    });
  });

  describe("blink attributes", () => {
    it("should set and unset blink", () => {
      const blink = attributes.blink();
      const noBlink = blink.noBlink();

      expect(blink.has(Bit.Blink)).toBe(true);
      expect(noBlink.has(Bit.NoBlink)).toBe(true);
      expect(noBlink.has(Bit.Blink)).toBe(false);
    });

    it("should set slow blink", () => {
      const slowBlink = attributes.slowBlink();
      expect(slowBlink.has(Bit.Blink)).toBe(true);
    });

    it("should set rapid blink", () => {
      const rapidBlink = attributes.rapidBlink();
      expect(rapidBlink.has(Bit.RapidBlink)).toBe(true);
    });
  });

  describe("reverse attributes", () => {
    it("should set and unset reverse", () => {
      const reverse = attributes.reverse();
      const noReverse = reverse.noReverse();

      expect(reverse.has(Bit.Reverse)).toBe(true);
      expect(noReverse.has(Bit.NoReverse)).toBe(true);
      expect(noReverse.has(Bit.Reverse)).toBe(false);
    });
  });

  describe("conceal attributes", () => {
    it("should set and unset conceal", () => {
      const conceal = attributes.conceal();
      const noConceal = conceal.noConceal();

      expect(conceal.has(Bit.Conceal)).toBe(true);
      expect(noConceal.has(Bit.NoConceal)).toBe(true);
    });
  });

  describe("strikethrough attributes", () => {
    it("should set and unset strikethrough", () => {
      const strike = attributes.strikethrough();
      const noStrike = strike.noStrikethrough();

      expect(strike.has(Bit.Strikethrough)).toBe(true);
      expect(noStrike.has(Bit.NoStrikethrough)).toBe(true);
      expect(noStrike.has(Bit.Strikethrough)).toBe(false);
    });
  });

  describe("colors", () => {
    it("should set foreground color", () => {
      const colored = attributes.foregroundColor(BasicColor.Red);
      expect(colored.fg).toBe(BasicColor.Red);
    });

    it("should set background color", () => {
      const colored = attributes.backgroundColor(BasicColor.Blue);
      expect(colored.bg).toBe(BasicColor.Blue);
    });

    it("should set underline color", () => {
      const colored = attributes.underlineColor(BasicColor.Green);
      expect(colored.ul).toBe(BasicColor.Green);
    });

    it("should set default colors", () => {
      const defaultFg = attributes.defaultForegroundColor();
      const defaultBg = attributes.defaultBackgroundColor();
      const defaultUl = attributes.defaultUnderlineColor();

      expect(defaultFg.fg).toBe(DefaultColor);
      expect(defaultBg.bg).toBe(DefaultColor);
      expect(defaultUl.ul).toBe(DefaultColor);
    });

    it("should handle RGB colors", () => {
      const colored = attributes.foregroundColor(rgb("rgb(255, 128, 64)"));
      expect(colored.fg).toBe(Attributes.pack(rgb("rgb(255, 128, 64)")));
    });
  });

  describe("bit operations", () => {
    it("should set and check bits", () => {
      const withBit = attributes.set(Bit.Bold);
      expect(withBit.has(Bit.Bold)).toBe(true);
    });

    it("should unset bits", () => {
      const withBit = attributes.set(Bit.Bold);
      const withoutBit = withBit.unset(Bit.Bold);
      expect(withoutBit.has(Bit.Bold)).toBe(false);
    });

    it("should toggle bits", () => {
      const toggled1 = attributes.toggle(Bit.Bold);
      const toggled2 = toggled1.toggle(Bit.Bold);

      expect(toggled1.value).toBe(1 << Bit.Bold);
      expect(toggled2.value).toBe(0);
    });

    it("should clear all attributes", () => {
      const complex = attributes
        .bold()
        .italic()
        .foregroundColor(BasicColor.Red);
      const cleared = complex.clear();

      expect(cleared.isEmpty()).toBe(true);
    });
  });

  describe("logical operations", () => {
    let attr1: Attributes;
    let attr2: Attributes;

    beforeEach(() => {
      attr1 = new Attributes().bold().foregroundColor(BasicColor.Red);
      attr2 = new Attributes()
        .italic()
        .foregroundColor(BasicColor.Blue)
        .backgroundColor(BasicColor.Blue);
    });

    it("should perform OR operation", () => {
      const result = attr1.or(attr2);

      expect(result.has(Bit.Bold)).toBe(true);
      expect(result.has(Bit.Italic)).toBe(true);
      expect(result.fg).toBe(BasicColor.Blue);
      expect(result.bg).toBe(BasicColor.Blue);
    });

    it("should perform AND operation", () => {
      const both = attr1.bold().italic();
      const result = both.and(attr1);
      expect(result.has(Bit.Bold)).toBe(true);
      expect(result.has(Bit.Italic)).toBe(false);
    });

    it("should perform XOR operation", () => {
      const same = attr1.bold();
      const result = attr1.xor(same);
      expect(result.value).toBe(0);
    });

    it("should perform NOT operation", () => {
      const result = attr1.not();
      expect(result.has(Bit.Bold)).toBe(false);
    });
  });

  describe("utility methods", () => {
    it("should check if empty", () => {
      expect(attributes.isEmpty()).toBe(true);
      expect(attributes.bold().isEmpty()).toBe(false);
    });

    it("should convert to string", () => {
      const attr = new Attributes(15);
      expect(attr.toString()).toBe("15");
      expect(attr.toString(16)).toBe("f");
    });

    it("should return numeric value", () => {
      const attr = new Attributes(42);
      expect(attr.valueOf()).toBe(42);
    });

    it("should count set bits", () => {
      const attr = new Attributes(0b1011); // 3 bits set
      expect(attr.length).toBe(3);
    });

    it("should copy attributes", () => {
      const original = attributes.bold().foregroundColor(BasicColor.Red);
      const copy = original.copy();

      expect(copy).not.toBe(original);
      expect(copy.value).toBe(original.value);
      expect(copy.fg).toBe(original.fg);
    });
  });

  describe("iterators", () => {
    let complexAttr: Attributes;

    beforeEach(() => {
      complexAttr = new Attributes().bold().italic().set(Bit.Underline);
    });

    it("should iterate over keys", () => {
      const keys = Array.from(complexAttr.keys());
      expect(keys).toContain(Bit.Bold);
      expect(keys).toContain(Bit.Italic);
      expect(keys).toContain(Bit.Underline);
    });

    it("should iterate over values", () => {
      const values = Array.from(complexAttr.values());
      expect(values.length).toBeGreaterThan(0);
    });

    it("should iterate over entries", () => {
      const entries = Array.from(complexAttr.entries());
      expect(entries.length).toBeGreaterThan(0);
      expect(entries[0]).toHaveLength(2); // [bit, attribute] pairs
    });

    it("should be iterable with for...of", () => {
      const entries = [];
      for (const entry of complexAttr) {
        entries.push(entry);
      }
      expect(entries.length).toBeGreaterThan(0);
    });
  });

  describe("JSON serialization", () => {
    it("should serialize empty attributes", () => {
      const json = attributes.toJSON();
      expect(json).toEqual({ reset: true });
    });

    it("should serialize basic attributes", () => {
      const attr = attributes.bold().italic();
      const json = attr.toJSON();
      expect(json.bold).toBe(true);
      expect(json.italic).toBe(true);
    });

    it("should serialize colors", () => {
      const attr = attributes
        .foregroundColor(BasicColor.Red)
        .backgroundColor(255) // indexed color
        .underlineColor("rgb(255, 128, 64)"); // RGB color

      const json = attr.toJSON();
      expect(json.foregroundColor).toBe(BasicColor.Red);
      expect(json.backgroundColor).toBe(255);

      expect(json.underlineColor).toEqual(rgb("rgb(255, 128, 64)"));
    });

    it("should serialize underline styles", () => {
      const attr = attributes.doubleUnderline();
      const json = attr.toJSON();
      expect(json.underlineStyle).toBe(UnderlineStyle.Double);
    });
  });

  describe("static utility methods", () => {
    it("should pack and unpack RGB values", () => {
      const color = rgb("rgb(255, 128, 64)");
      const packed = Attributes.pack(color);

      expect([...Attributes.unpack(packed)]).toEqual([...color]);
    });

    it("should unpack as SGR attribute string", () => {
      const color = rgb("rgb(255, 128, 64)");
      const packed = Attributes.pack(color);

      expect(Attributes.unpackAttribute(packed)).toBe("255:128:64");
    });
  });

  describe("chaining example from documentation", () => {
    it("should work as shown in the example", () => {
      const attr = new Attributes()
        .foregroundColor(BasicColor.Red)
        .underline()
        .bold()
        .italic();

      expect(attr.has(Bit.Bold)).toBe(true);
      expect(attr.has(Bit.Italic)).toBe(true);
      expect(attr.has(Bit.Underline)).toBe(true);
      expect(attr.fg).toBe(BasicColor.Red);
    });
  });

  describe("edge cases", () => {
    it("should handle multiple underline style changes", () => {
      const attr = attributes
        .singleUnderline()
        .doubleUnderline()
        .curlyUnderline();

      // Should only have the last style set
      expect(attr.has(Bit.UnderlineCurly)).toBe(true);
      expect(attr.has(Bit.UnderlineSingle)).toBe(false);
      expect(attr.has(Bit.UnderlineDouble)).toBe(false);
    });

    it("should handle conflicting intensity settings", () => {
      const attr = attributes.bold().faint().normalIntensity();
      expect(attr.has(Bit.Faint)).toBe(false);
      expect(attr.has(Bit.Bold)).toBe(false);
    });

    it("should handle large RGB values in JSON", () => {
      const largeRgb = (255 << 16) | (255 << 8) | 255; // 0xFFFFFF
      const attr = attributes.foregroundColor(largeRgb);
      const json = attr.toJSON();

      expect(json.foregroundColor).toEqual(rgb(largeRgb));
    });
  });
});
