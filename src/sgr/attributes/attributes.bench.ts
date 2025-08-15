import { bench, describe } from "vitest";
import { BasicColor } from "../../color"; // Adjust import path as needed
import { Attributes } from "./attributes";

bench("Chaining", () => {
  new Attributes().bold().italic().underline().blink().reverse();
});

describe("Iteration", () => {
  const attrs = new Attributes()
    .bold()
    .italic()
    .underline()
    .blink()
    .reverse()
    .backgroundColor(BasicColor.BrightBlue)
    .curlyUnderline();

  bench("keys() iteration", () => {
    for (const key of attrs.keys()) {
      // Consume the iterator
    }
  });
  //
  bench("values() iteration", () => {
    for (const value of attrs.values()) {
      // Consume the iterator
    }
  });
  bench("entries() iteration", () => {
    for (const [key, value] of attrs.entries()) {
      // Consume the iterator
    }
  });
});
