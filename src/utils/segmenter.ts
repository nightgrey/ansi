/**
 * A high-performance wrapper around Intl.Segmenter for efficient text segmentation.
 * This class resolves memory handling issues seen with large strings and can enhance performance by 50-500x.
 *
 * @see https://github.com/jonschlinkert/intl-segmenter
 */
export class Segmenter extends Intl.Segmenter {
  static MAX_CHUNK_LENGTH = 100;

  // @ts-ignore
  *segment(input: string) {
    let position = 0;

    while (position < input.length) {
      const remainingText = input.slice(position);
      const chunkSize = Math.min(
        Segmenter.MAX_CHUNK_LENGTH,
        remainingText.length,
      );
      const potentialChunk = remainingText.slice(0, chunkSize);

      // Find a safe position to break the string
      const breakPoint = this.findSafeBreakPoint(potentialChunk);
      const chunk = potentialChunk.slice(0, breakPoint);

      for (const segment of super.segment(chunk)) {
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

  segments(input: string): Intl.SegmentData[] {
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
}
