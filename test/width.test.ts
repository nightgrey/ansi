import { describe, expect, it } from "vitest";
import { strip } from "../src/strip";
import { stringWidth } from "../src/width";

const TESTS = [
  { name: "empty", input: "", stripped: "", width: 0, wcwidth: 0 },
  { name: "ascii", input: "hello", stripped: "hello", width: 5, wcwidth: 5 },
  { name: "emoji", input: "👋", stripped: "👋", width: 2, wcwidth: 2 },
  { name: "wideemoji", input: "🫧", stripped: "🫧", width: 2, wcwidth: 2 },
  { name: "combining", input: "a\u0300", stripped: "à", width: 1, wcwidth: 1 },
  {
    name: "control",
    input: "\x1b[31mhello\x1b[0m",
    stripped: "hello",
    width: 5,
    wcwidth: 5,
  },
  {
    name: "csi8",
    input: "\x9b38;5;1mhello\x9b[0m",
    stripped: "hello",
    width: 5,
    wcwidth: 5,
  },
  {
    name: "osc",
    input: "\x9d2;charmbracelet: ~/\x9c",
    stripped: "",
    width: 0,
    wcwidth: 0,
  },
  {
    name: "controlemoji",
    input: "\x1b[31m👋\x1b[0m",
    stripped: "👋",
    width: 2,
    wcwidth: 2,
  },
  {
    name: "oscwideemoji",
    input: "\x1b]2;title👨‍👩‍👦\x07hello",
    stripped: "hello",
    width: 5,
    wcwidth: 5,
  },
  {
    name: "multiemojicsi",
    input: "\x1b[31m👨‍👩‍👦\x1b[0m",
    stripped: "👨\u200d👩\u200d👦",
    width: 2,
    wcwidth: 2,
  },
  {
    name: "osc8",
    input: "\x9d8;id=1;https://example.com/\x9chello\x9d8;id=1;\x07",
    stripped: "hello",
    width: 5,
    wcwidth: 5,
  },
  {
    name: "eastasianlink",
    input: "\x9d8;id=1;https://example.com/\x9c打豆豆\x9d8;id=1;\x07",
    stripped: "打豆豆",
    width: 6,
    wcwidth: 6,
  },
  {
    name: "dcs",
    input: "\x1bP?123$p\x1b\\hello",
    stripped: "hello",
    width: 5,
    wcwidth: 5,
  },
  {
    name: "arabic",
    input: "سلام اهلا",
    stripped: "سلام اهلا",
    width: 8,
    wcwidth: 8,
  },
  {
    name: "newline",
    input: "hello\nworld",
    stripped: "hello\nworld",
    width: 10,
    wcwidth: 10,
  },
  {
    name: "tab",
    input: "hello\tworld",
    stripped: "hello\tworld",
    width: 10,
    wcwidth: 10,
  },
  {
    name: "controlnewline",
    input: "\x1b[31mhello\x1b[0m\nworld",
    stripped: "hello\nworld",
    width: 10,
    wcwidth: 10,
  },
  {
    name: "style",
    input: "\x1B[38;2;249;38;114mfoo\x1b[0m",
    stripped: "foo",
    width: 3,
    wcwidth: 3,
  },
  {
    name: "unicode",
    input: `\x1b[35m"box"\x1b[0m`,
    stripped: `"box"`,
    width: 5,
    wcwidth: 5,
  },
  {
    name: "just_unicode",
    input: "Claire's Boutique",
    stripped: "Claire's Boutique",
    width: 17,
    wcwidth: 17,
  },
  {
    name: "unclosed_ansi",
    input: "Hey, \x1b[7m\n猴",
    stripped: "Hey, \n猴",
    width: 7,
    wcwidth: 7,
  },
  {
    name: "double_asian_runes",
    input: " 你\x1b[8m好.",
    stripped: " 你好.",
    width: 6,
    wcwidth: 6,
  },
  { name: "flag", input: "🇸🇦", stripped: "🇸🇦", width: 2, wcwidth: 1 },
];

describe.skip("strip", () => {
  it.each(TESTS)("$name", (data) => {
    expect(strip(data.input)).toBe(data.stripped);
  });
});

describe.skip("width", () => {
  it.each(TESTS)("$name", (data) => {
    expect(stringWidth(data.input)).toBe(data.width);
  });
});
