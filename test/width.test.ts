import { describe, expect, it } from "vitest";
import { stringWidth } from "../src/width";
import { CASES } from "./data";

describe("stringWidth", () => {
  it.each(CASES)("measures $name to be $width", (test) => {
    expect(stringWidth(test.raw)).toBe(test.width);
  });
});
