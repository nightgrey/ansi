import { bench } from "vitest";
import { strip } from "./index";

bench(`strip`, () => {
  strip("\x1B[38;2;249;38;114mfoo\x1b[0m");
});
