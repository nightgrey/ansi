import { bench, describe } from "vitest";
import { BasicColor } from "../../color"; // Adjust import path as needed
import { Attributable } from "./attributable";
import { ColorAttribute } from "./bit";

class Attributes extends Attributable<Attributes> {
  protected with(
    attributes?: number,
    background?: ColorAttribute | null,
    foreground?: ColorAttribute | null,
    underline?: ColorAttribute | null,
  ) {
    return new Attributes(
      attributes ?? this.attributes,
      background === null ? null : background || this.bg,
      foreground === null ? null : foreground || this.fg,
      underline === null ? null : underline || this.ul,
    );
  }
}

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
