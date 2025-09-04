import { bench } from "vitest";
import { stringWidth } from "./width";
import stringLength from "string-length"
import stringWidth2 from "string-width";
import fastStringWidth from "fast-string-width";

bench(`my implementation`, () => {
  stringWidth("\x1B[38;2;249;38;114mfoo\x1b[0m");
});

bench(`string-length package`, () => {
  stringLength("\x1B[38;2;249;38;114mfoo\x1b[0m");
});

bench(`string-width package`, () => {
  stringWidth2("\x1B[38;2;249;38;114mfoo\x1b[0m");
});

bench(`fast-string-width package`, () => {
  fastStringWidth("\x1B[38;2;249;38;114mfoo\x1b[0m");
});
