import { GraphemeCluster } from "../graphemes";
import { isAscii, isWhitespace } from "../unicode";
import { runeWidth } from "../width";

const REST_CACHE = new Map<string, string>();
const WIDTH_CACHE = new Map<string, number>();

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

            yield* super.segment(chunk)

            position += breakPoint;
        }
    }

    *grapheme(input: string) {
        if (!input) return;

        let position = 0;
        const length = input.length;

        while (position < length) {
            const remainingLength = length - position;
            const chunkSize = Math.min(Segmenter.MAX_CHUNK_LENGTH, remainingLength);

            const potentialChunk = input.slice(position, position + chunkSize);

            const breakPoint = this.findSafeBreakPoint(potentialChunk);
            const chunk = potentialChunk.slice(0, breakPoint);

            for (const segment of super.segment(chunk)) {
                yield segment.segment;
            }

            position += breakPoint;
        }
    }
    *graphemeCluster(input: string) {
        if (!input) return;

        let position = 0;
        const length = input.length;

        while (position < length) {
            const remainingLength = length - position;
            const chunkSize = Math.min(Segmenter.MAX_CHUNK_LENGTH, remainingLength);

            const potentialChunk = input.slice(position, position + chunkSize);

            const breakPoint = this.findSafeBreakPoint(potentialChunk);
            const chunk = potentialChunk.slice(0, breakPoint);

            for (const segment of super.segment(chunk)) {
                yield {
                    grapheme: segment.segment,
                    get rest() {
                        const key = segment.input + segment.index;
                        let rest = REST_CACHE.get(key);

                        if (rest === undefined) {
                            rest = segment.input.substring(segment.index);
                            REST_CACHE.set(key, rest);
                        }

                        return rest;
                    },
                    get width() {
                        const key = segment.input + segment.index;
                        let width = WIDTH_CACHE.get(key);

                        if (width === undefined) {
                            width = runeWidth(segment.segment.codePointAt(0) || 0);
                            WIDTH_CACHE.set(key, width);
                        }

                        return width;
                    },
                }
            }

            position += breakPoint;
        }
    }
    findSafeBreakPoint(input: string): number {
        // Work backwards from the end of the input
        for (let i = input.length - 1; i >= 0; i--) {
            if (isWhitespace(input[i]) || isAscii(input[i])) {
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

    graphemes(input: string) {
        const out: string[] = [];

        for (const grapheme of this.grapheme(input)) {
            out.push(grapheme);
        }

        return out;
    }

    static shared = new Segmenter();
}
