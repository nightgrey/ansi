import { describe, expect, it } from "vitest";
import { strip } from "./strip";

const CASES = [
  { name: "empty", raw: "", stripped: "", width: 0, wcwidth: 0 },
  { name: "ascii", raw: "hello", stripped: "hello", width: 5, wcwidth: 5 },
  { name: "emoji", raw: "👋", stripped: "👋", width: 2, wcwidth: 2 },
  { name: "wideemoji", raw: "🫧", stripped: "🫧", width: 2, wcwidth: 2 },
  { name: "combining", raw: "a\u0300", stripped: "à", width: 1, wcwidth: 1 },
  {
    name: "control",
    raw: "\x1b[31mhello\x1b[0m",
    stripped: "hello",
    width: 5,
    wcwidth: 5,
  },
  {
    name: "csi8",
    raw: "\x9b38;5;1mhello\x9bm",
    stripped: "hello",
    width: 5,
    wcwidth: 5,
  },
  {
    name: "osc",
    raw: "\x9d2;charmbracelet: ~/Source/bubbletea\x9c",
    stripped: "",
    width: 0,
    wcwidth: 0,
  },
  {
    name: "controlemoji",
    raw: "\x1b[31m👋\x1b[0m",
    stripped: "👋",
    width: 2,
    wcwidth: 2,
  },
  {
    name: "oscwideemoji",
    raw: "\x1b]2;title👨‍👩‍👦\x07",
    stripped: "",
    width: 0,
    wcwidth: 0,
  },
  {
    name: "oscwideemoji",
    raw: "\x1b[31m👨‍👩‍👦\x1b[m",
    stripped: "👨\u200d👩\u200d👦",
    width: 2,
    wcwidth: 2,
  },
  {
    name: "multiemojicsi",
    raw: "👨‍👩‍👦\x9b38;5;1mhello\x9bm",
    stripped: "👨‍👩‍👦hello",
    width: 7,
    wcwidth: 7,
  },
  {
    name: "osc8eastasianlink",
    raw: "\x9d8;id=1;https://example.com/\x9c打豆豆\x9d8;id=1;\x07",
    stripped: "打豆豆",
    width: 6,
    wcwidth: 6,
  },
  // {name: "dcsarabic", raw: "\x1bP?123$pسلام\x1b\\اهلا", "اهلا", width: 4, wcwidth:4},
  {
    name: "newline",
    raw: "hello\nworld",
    stripped: "hello\nworld",
    width: 10,
    wcwidth: 10,
  },
  {
    name: "tab",
    raw: "hello\tworld",
    stripped: "hello\tworld",
    width: 10,
    wcwidth: 10,
  },
  {
    name: "controlnewline",
    raw: "\x1b[31mhello\x1b[0m\nworld",
    stripped: "hello\nworld",
    width: 10,
    wcwidth: 10,
  },
  {
    name: "style",
    raw: "\x1B[38;2;249;38;114mfoo",
    stripped: "foo",
    width: 3,
    wcwidth: 3,
  },
  {
    name: "unicode",
    raw: "\x1b[35m“box”\x1b[0m",
    stripped: "“box”",
    width: 5,
    wcwidth: 5,
  },
  {
    name: "just_unicode",
    raw: "Claire’s Boutique",
    stripped: "Claire’s Boutique",
    width: 17,
    wcwidth: 17,
  },
  {
    name: "unclosed_ansi",
    raw: "Hey, \x1b[7m\n猴",
    stripped: "Hey, \n猴",
    width: 7,
    wcwidth: 7,
  },
  {
    name: "double_asian_runes",
    raw: " 你\x1b[8m好.",
    stripped: " 你好.",
    width: 6,
    wcwidth: 6,
  },
  { name: "flag", raw: "🇸🇦", stripped: "🇸🇦", width: 2, wcwidth: 1 },
];

describe("strip", () => {
  it.each(CASES)("strips $name", (test) => {
    expect(strip(test.raw)).toBe(test.stripped);
  });
});
