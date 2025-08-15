import { beforeEach, describe, expect, it } from "vitest";
import { BasicColor, DefaultColor } from "../../color";
import { Attribute, UnderlineStyle } from "./attribute";
import { Attributes } from "./attributes";
import { ATTRIBUTE_TO_BIT, BIT_TO_ATTRIBUTE, Bit } from "./bit";

describe("Attributes", () => {
  let attrs: Attributes;

  beforeEach(() => {
    attrs = new Attributes();
  });

  describe("Basic bit operations", () => {
    it("should set bits correctly in low register (0-31)", () => {
      const result = attrs.set(Bit.Bold);
      expect(result.has(Bit.Bold)).toBe(true);
      expect(result["low"]).toBe(1 << Bit.Bold);
      expect(result["high"]).toBe(0);
    });

    it("should set bits correctly in high register (32-63)", () => {
      const result = attrs.set(Bit.BrightBlackForegroundColor);
      expect(result.has(Bit.BrightBlackForegroundColor)).toBe(true);
      expect(result["low"]).toBe(0);
      expect(result["high"]).toBe(1 << (Bit.BrightBlackForegroundColor - 32));
    });

    it("should unset bits correctly", () => {
      const withBold = attrs.set(Bit.Bold);
      const withoutBold = withBold.unset(Bit.Bold);

      expect(withBold.has(Bit.Bold)).toBe(true);
      expect(withoutBold.has(Bit.Bold)).toBe(false);
    });

    it("should toggle bits correctly", () => {
      const toggled = attrs.toggle(Bit.Italic);
      const toggledBack = toggled.toggle(Bit.Italic);

      expect(toggled.has(Bit.Italic)).toBe(true);
      expect(toggledBack.has(Bit.Italic)).toBe(false);
    });

    it("should handle multiple bits correctly", () => {
      const result = attrs
        .set(Bit.Bold)
        .set(Bit.Italic)
        .set(Bit.BrightRedForegroundColor);

      expect(result.has(Bit.Bold)).toBe(true);
      expect(result.has(Bit.Italic)).toBe(true);
      expect(result.has(Bit.BrightRedForegroundColor)).toBe(true);
      expect(result.has(Bit.Underline)).toBe(false);
    });
  });

  describe("Bit boundary tests", () => {
    it("should handle bit 31 (last bit in low register)", () => {
      const result = attrs.set(31);
      expect(result.has(31)).toBe(true);
      expect(result["low"]).toBe(1 << 31);
      expect(result["high"]).toBe(0);
    });

    it("should handle bit 32 (first bit in high register)", () => {
      const result = attrs.set(32);
      expect(result.has(32)).toBe(true);
      expect(result["low"]).toBe(0);
      expect(result["high"]).toBe(1);
    });

    it("should handle bit 63 (last valid bit)", () => {
      const result = attrs.set(63);
      expect(result.has(63)).toBe(true);
      expect(result["high"]).toBe(1 << 31);
    });

    it("should throw error for invalid bit positions", () => {
      expect(() => attrs.set(-1)).toThrow("Number must be between 0 and 63");
      expect(() => attrs.set(64)).toThrow("Number must be between 0 and 63");
    });
  });

  describe("Style methods bit operations", () => {
    it("should set bold bit correctly", () => {
      const result = attrs.bold();
      expect(result.has(Bit.Bold)).toBe(true);
      expect(result["low"] & (1 << Bit.Bold)).toBeTruthy();
    });

    it("should handle intensity operations correctly", () => {
      const faint = attrs.faint();
      const normal = faint.normalIntensity();

      expect(faint.has(Bit.Faint)).toBe(true);
      expect(faint.has(Bit.Bold)).toBe(false);
      expect(normal.has(Bit.NormalIntensity)).toBe(true);
      expect(normal.has(Bit.Faint)).toBe(false);
      expect(normal.has(Bit.Bold)).toBe(false);
    });

    it("should handle italic/no-italic toggle correctly", () => {
      const italic = attrs.italic();
      const noItalic = italic.noItalic();

      expect(italic.has(Bit.Italic)).toBe(true);
      expect(italic.has(Bit.NoItalic)).toBe(false);
      expect(noItalic.has(Bit.Italic)).toBe(false);
      expect(noItalic.has(Bit.NoItalic)).toBe(true);
    });

    it("should handle underline operations correctly", () => {
      const underlined = attrs.underline();
      const noUnderline = underlined.noUnderline();

      expect(underlined.has(Bit.Underline)).toBe(true);
      expect(underlined.us).toBe(UnderlineStyle.Single);
      expect(noUnderline.has(Bit.NoUnderline)).toBe(true);
      expect(noUnderline.has(Bit.Underline)).toBe(false);
      expect(noUnderline.us).toBe(UnderlineStyle.None);
    });

    it("should handle blink operations correctly", () => {
      const slow = attrs.slowBlink();
      const rapid = attrs.rapidBlink();
      const noBlink = slow.noBlink();

      expect(slow.has(Bit.Blink)).toBe(true);
      expect(rapid.has(Bit.RapidBlink)).toBe(true);
      expect(noBlink.has(Bit.NoBlink)).toBe(true);
      expect(noBlink.has(Bit.Blink)).toBe(false);
    });
  });

  describe("Color operations bit shifting", () => {
    it("should set basic foreground colors correctly", () => {
      const red = attrs.foregroundColor(BasicColor.Red);
      const brightBlue = attrs.foregroundColor(BasicColor.BrightBlue);

      expect(red.has(Bit.RedForegroundColor)).toBe(true);
      expect(brightBlue.has(Bit.BrightBlueForegroundColor)).toBe(true);
    });

    it("should set basic background colors correctly", () => {
      const green = attrs.backgroundColor(BasicColor.Green);
      const brightMagenta = attrs.backgroundColor(BasicColor.BrightMagenta);

      expect(green.has(Bit.GreenBackgroundColor)).toBe(true);
      expect(brightMagenta.has(Bit.BrightMagentaBackgroundColor)).toBe(true);
    });

    it("should handle extended colors correctly", () => {
      const extendedFg = attrs.foregroundColor(200); // 256-color palette
      const extendedBg = attrs.backgroundColor(150);

      expect(extendedFg.has(Bit.ExtendedForegroundColor)).toBe(true);
      expect(extendedFg.fg).toBe(200);
      expect(extendedBg.has(Bit.ExtendedBackgroundColor)).toBe(true);
      expect(extendedBg.bg).toBe(150);
    });

    it("should clear color bits when setting new colors", () => {
      const redThenBlue = attrs
        .foregroundColor(BasicColor.Red)
        .foregroundColor(BasicColor.Blue);

      expect(redThenBlue.has(Bit.RedForegroundColor)).toBe(false);
      expect(redThenBlue.has(Bit.BlueForegroundColor)).toBe(true);
    });

    it("should handle default colors correctly", () => {
      const defaultFg = attrs.foregroundColor(DefaultColor);
      const defaultBg = attrs.backgroundColor(DefaultColor);

      expect(defaultFg.has(Bit.DefaultForegroundColor)).toBe(true);
      expect(defaultBg.has(Bit.DefaultBackgroundColor)).toBe(true);
    });
  });

  describe("Bitwise operations", () => {
    it("should perform OR operations correctly", () => {
      const a = attrs.set(Bit.Bold).set(Bit.Italic);
      const b = attrs.set(Bit.Underline).set(Bit.Reverse);
      const result = a.or(b);

      expect(result.has(Bit.Bold)).toBe(true);
      expect(result.has(Bit.Italic)).toBe(true);
      expect(result.has(Bit.Underline)).toBe(true);
      expect(result.has(Bit.Reverse)).toBe(true);
    });

    it("should perform AND operations correctly", () => {
      const a = attrs.set(Bit.Bold).set(Bit.Italic).set(Bit.Underline);
      const b = attrs.set(Bit.Bold).set(Bit.Reverse).set(Bit.Underline);
      const result = a.and(b);

      expect(result.has(Bit.Bold)).toBe(true);
      expect(result.has(Bit.Underline)).toBe(true);
      expect(result.has(Bit.Italic)).toBe(false);
      expect(result.has(Bit.Reverse)).toBe(false);
    });

    it("should perform XOR operations correctly", () => {
      const a = attrs.set(Bit.Bold).set(Bit.Italic);
      const b = attrs.set(Bit.Bold).set(Bit.Underline);
      const result = a.xor(b);

      expect(result.has(Bit.Bold)).toBe(false); // Same in both
      expect(result.has(Bit.Italic)).toBe(true); // Only in a
      expect(result.has(Bit.Underline)).toBe(true); // Only in b
    });

    it("should perform NOT operations correctly", () => {
      const original = attrs.set(Bit.Bold);
      const inverted = original.not();

      expect(inverted.has(Bit.Bold)).toBe(false);
      // Check that other bits are set (since we're inverting all bits)
      expect(inverted.has(Bit.Italic)).toBe(true);
    });
  });

  describe("valueOf and BigInt operations", () => {
    it("should convert to BigInt correctly", () => {
      const result = attrs.set(Bit.Bold).set(Bit.BrightRedForegroundColor);
      const bigIntValue = result.valueOf();

      expect(typeof bigIntValue).toBe("bigint");

      // Verify the bit pattern
      const expectedLow = 1 << Bit.Bold;
      const expectedHigh = 1 << (Bit.BrightRedForegroundColor - 32);
      const expected = BigInt(expectedLow) + (BigInt(expectedHigh) << 32n);

      expect(bigIntValue).toBe(expected);
    });

    it("should create from BigInt correctly", () => {
      const bigIntValue = BigInt(0b1010101010101010n);
      const result = Attributes.from(bigIntValue);

      expect(result.valueOf()).toBe(bigIntValue);
    });

    it("should create from bit array correctly", () => {
      const bits = [Bit.Bold, Bit.Italic, Bit.BrightRedForegroundColor];
      const result = Attributes.from(bits);

      expect(result.has(Bit.Bold)).toBe(true);
      expect(result.has(Bit.Italic)).toBe(true);
      expect(result.has(Bit.BrightRedForegroundColor)).toBe(true);
      expect(result.has(Bit.Underline)).toBe(false);
    });
  });

  describe("Iterator and enumeration", () => {
    it("should iterate over set bits correctly", () => {
      const result = attrs
        .set(Bit.Bold)
        .set(Bit.Italic)
        .set(Bit.BrightRedForegroundColor);
      const setBits = Array.from(result.keys());

      expect(setBits).toContain(Bit.Bold);
      expect(setBits).toContain(Bit.Italic);
      expect(setBits).toContain(Bit.BrightRedForegroundColor);
      expect(setBits).toHaveLength(3);
    });

    it("should iterate over attribute values correctly", () => {
      const result = attrs.set(Bit.Bold).set(Bit.Italic);
      const attributes = Array.from(result.values());

      expect(attributes).toContain(Attribute.Bold);
      expect(attributes).toContain(Attribute.Italic);
    });

    it("should count set bits correctly", () => {
      const result = attrs.set(Bit.Bold).set(Bit.Italic).set(Bit.Underline);
      expect(result.length).toBe(3);
    });
  });

  describe("Edge cases and error conditions", () => {
    it("should handle empty attributes correctly", () => {
      expect(attrs.isEmpty()).toBe(true);
      expect(attrs.length).toBe(0);
      expect(attrs.valueOf()).toBe(0n);
    });

    it("should handle clearing attributes", () => {
      const withAttributes = attrs.set(Bit.Bold).set(Bit.Italic);
      const cleared = withAttributes.clear();

      expect(cleared.isEmpty()).toBe(true);
      expect(cleared.has(Bit.Bold)).toBe(false);
      expect(cleared.has(Bit.Italic)).toBe(false);
    });

    it("should handle 32-bit unsigned integer overflow correctly", () => {
      // Test that we handle the >>> 0 operation correctly for 32-bit values
      const attrs1 = new Attributes(0xffffffff, 0xffffffff);
      expect(attrs1["low"]).toBe(0xffffffff);
      expect(attrs1["high"]).toBe(0xffffffff);
    });

    it("should maintain immutability", () => {
      const original = attrs.set(Bit.Bold);
      const modified = original.set(Bit.Italic);

      expect(original.has(Bit.Italic)).toBe(false);
      expect(modified.has(Bit.Bold)).toBe(true);
      expect(modified.has(Bit.Italic)).toBe(true);
    });
  });

  describe("BIT_TO_ATTRIBUTE and ATTRIBUTE_TO_BIT mappings", () => {
    it("should have consistent mappings", () => {
      // Test that every bit maps to an attribute and back
      for (const [bitStr, attribute] of Object.entries(BIT_TO_ATTRIBUTE)) {
        const bit = parseInt(bitStr);
        expect(ATTRIBUTE_TO_BIT[attribute]).toBe(bit);
      }
    });

    it("should cover all defined bits", () => {
      const definedBits = Object.values(Bit).filter(
        (v) => typeof v === "number",
      ) as number[];
      const mappedBits = Object.keys(BIT_TO_ATTRIBUTE).map(Number);

      for (const bit of definedBits) {
        expect(mappedBits).toContain(bit);
      }
    });
  });
});
