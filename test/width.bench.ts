import { bench } from "vitest";
import { stringWidth } from "../src/width";

bench(`stringWidth`, () => {
  stringWidth("\x1B[38;2;249;38;114mfoo\x1b[0m");
});
