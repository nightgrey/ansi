import { stringWidth } from "./width";

type SegmenterOptions = Intl.SegmenterOptions & { maxChunkLength?: number };

// https://github.com/jonschlinkert/intl-segmenter
class Segmenter extends Intl.Segmenter {
  #locales;
  #options;

  constructor(locales?: Intl.LocalesArgument, options: SegmenterOptions = {}) {
    super(locales, options);
    this.#locales = locales;
    this.#options = options;
  }

  // @ts-expect-error
  *segment(input: string): Intl.Segments {
    const { maxChunkLength = 100, ...options } = this.#options;
    let position = 0;

    while (position < input.length) {
      const remainingText = input.slice(position);
      const chunkSize = Math.min(maxChunkLength, remainingText.length);
      const potentialChunk = remainingText.slice(0, chunkSize);

      // Find a safe position to break the string
      const breakPoint = this.findSafeBreakPoint(potentialChunk);
      const chunk = potentialChunk.slice(0, breakPoint);

      // Process the chunk with Intl.Segmenter. Using this approach instead
      // of super.segment() to avoid any potential side effects.
      const segmenter = new Intl.Segmenter(this.#locales, { ...options });
      const segments = segmenter.segment(chunk);

      for (const segment of segments) {
        yield segment;
      }

      position += breakPoint;
    }
  }

  findSafeBreakPoint(input: string): number {
    // Work backwards from the end of the input
    for (let i = input.length - 1; i >= 0; i--) {
      // Check for whitespace or simple ASCII characters
      if (/\s/.test(input[i]) || /^[\x20-\x7E]$/.test(input[i])) {
        return i + 1;
      }
    }

    // If no safe break points were found, return the full length
    return input.length;
  }

  getSegments(input: string): Intl.SegmentData[] {
    const array = [];

    // A for loop is much faster than Array.from, it doesn't cause a
    // maximum call stack error for large strings. Also, optimizations
    // in v8 make using `push` much faster than pre-allocating an array,
    // like `Array(input.length)` and setting the values at each index.
    for (const segment of this.segment(input)) {
      array.push(segment);
    }

    return array;
  }

  static getSegments(
    input: string,
    locales?: Intl.LocalesArgument,
    options?: SegmenterOptions,
  ): Intl.SegmentData[] {
    const segmenter = new Segmenter(locales, options);
    return segmenter.getSegments(input);
  }
}

/**
 * Generator function that yields grapheme clusters (runes) from a string.
 * Uses the Intl.Segmenter API to properly handle Unicode grapheme boundaries.
 */
export function* runes(string: string) {
  const segmenter = new Segmenter();

  for (const { segment } of segmenter.segment(string)) {
    yield segment;
  }

  return;
}

export const graphemes = runes;

/**
 * Splits a string into an array of grapheme clusters (runes).
 */
export const splitByRunes = (string: string) => {
  return Array.from(runes(string));
};

export const splitByGraphemes = splitByRunes;

/**
 * Returns the maximum display width of any grapheme cluster in the string.
 */
export function maxRuneWidth(string: string): number {
  let maxWidth = 0;

  for (const rune of runes(string)) {
    const w = stringWidth(rune);
    if (w > maxWidth) {
      maxWidth = w;
    }
  }

  return maxWidth;
}

export const maxGraphemeWidth = maxRuneWidth;

/**
 * Returns the first grapheme cluster (rune) from a string, or empty string if none.
 */
export function firstRune(string: string): string {
  return runes(string).next().value ?? "";
}

export const firstGrapheme = firstRune;
