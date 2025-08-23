import type { Writable } from "node:stream";

/**
 * Execute is a function that "execute" the given escape sequence by writing it
 * to the provided output writer.
 *
 * This is syntactic sugar over {@link Writable.write}, with the addition of waiting
 * for the output to be actually written.
 *
 * @param stream - The writable stream
 * @param chunk - The chunk to write
 * @param encoding - Encoding
 */
export function execute(
  stream: Writable,
  chunk: Uint8Array | string,
  encoding: BufferEncoding = "utf8",
): Promise<void> {
  return new Promise((resolve) => {
    if (!stream.write(chunk, encoding)) {
      stream.once("drain", resolve);
    } else {
      process.nextTick(resolve);
    }
  });
}

/**
 * An abstract class for control characters
 */
export abstract class ControlCharacter extends String {
  /**
   * Control character representation
   * @example C0 "\x07"
   * @example C1 "\x9B"
   */
  abstract readonly control: string;

  /**
   * Character representation
   * @example C0
   * ```
   * G
   * ```
   * @example C0
   * ```
   * [
   * ```
   */
  abstract readonly character: string;

  /**
   * Hexadecimal representation
   * @example C0
   * ```
   * 0x07
   * ```
   * @example C0
   * ```
   * 0x9B
   * ```
   */
  abstract readonly hex: number;
  /**
   * Literal representation
   * @example C0
   * ```
   * "\\x07"
   * ```
   * @example C0
   * ```
   * \\x1B[
   * ```
   */
  abstract readonly literal: string;

  /**
   * Returns the control character representation
   * @example C0 "\x07"
   * @example C1 "\x9B"
   */
  toControl() {
    return this.control;
  }

  /**
   * Returns the character representation
   * @example C0
   * ```
   * G
   * ```
   * @example C0
   * ```
   * [
   * ```
   */
  toCharacter() {
    return this.character;
  }

  /**
   * Returns the hexadecimal representation
   * @example C0
   * ```
   * 0x07
   * ```
   * @example C0
   * ```
   * 0x9B
   * ```
   */
  toHex() {
    return this.hex;
  }

  /**
   * Returns the literal representation
   * @example C0
   * ```
   * "\\x07"
   * ```
   * @example C0
   * ```
   * \\x1B[
   * ```
   */
  toLiteral() {
    return this.literal;
  }

  /**
   * Returns the default string representation
   * @example C0
   * ```
   * \x07
   * ```
   * @example C0
   * ```
   * \x1B[
   * ```
   */
  declare valueOf: () => string;

  /**
   * Returns the default string representation
   * @example C0
   * ```
   * \x07
   * ```
   * @example C0
   * ```
   * \x1B[
   * ```
   */
  declare toString: () => string;

  [Symbol.toPrimitive](hint: string) {
    switch (hint) {
      case "number":
        return this.toHex();
      case "string":
      default:
        return this.toString();
    }
  }

  abstract [Symbol.toStringTag]: string;
}

/**
 * A C0 control character string with additional properties for accessing
 * different representations.
 *
 * @example
 * ```ts
 * const BEL = c0(0x07);
 *
 * // Default string representation
 * console.log(BEL.toString()); // "\x07"
 *
 * // Hexadecimal
 * console.log(BEL.hex); // 7 (0x07)
 * console.log(+BEL); // 7 (via Symbol.toPrimitive)
 *
 * // Character
 * console.log(BEL.character); // "G"
 *
 * // Control character
 * console.log(BEL.control); // "\x07"
 *
 * // Caret
 * console.log(BEL.caret); // "^G"
 * ```
 *
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes#C0_controls
 * @remarks `String` is intentional. They are not string primitives, but string objects. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_primitives_and_string_objects
 */
export class C0 extends ControlCharacter {
  /**
   * Control character representation
   * @example
   * ```
   * \x07
   * ```
   * @see {@link C0.toString}
   */
  readonly control: string;
  readonly character: string;
  readonly hex: number;
  readonly literal: string;
  /**
   * Caret representation
   * @example "^G"
   */
  readonly caret: string;

  /**
   * Returns the caret representation
   * @example "^G"
   */
  toCaret() {
    return this.caret;
  }

  constructor(hex: number) {
    const control = String.fromCharCode(hex);
    const str = control;
    super(str);
    this.control = control;
    this.character = String.fromCharCode(hex + 64);
    this.hex = hex;
    this.literal = `\\x${hex.toString(16).padStart(2, "0").toUpperCase()}`;
    this.caret = `^${this.character}`;
  }

  [Symbol.toStringTag] = "C0";

  /**
   * Returns the control character representation
   * @example
   * ```
   * \x07
   * ```
   * @see {@link C0.toString}
   */
  declare toControl: () => string;

  /**
   * Returns the default string representation (control character)
   * @example
   * ```
   * \x07
   * ```
   * @see {@link C0.control}
   */
  declare valueOf: () => string;

  /**
   * Returns default string representation (control character)
   * @example
   * ```
   * \x07
   * ```
   * @see {@link C0.toControl}
   */
  declare toString: () => string;
}

/**
 * A C1 control character string with additional properties for accessing
 * different representations.
 *
 * @example
 * ```ts
 * const CSI = c1(0x9B);
 *
 * // Default string representation
 * console.log(CSI); // "\x1B["
 *
 * // Hexadecimal
 * console.log(CSI.hex); // 155 (0x9B)
 * console.log(+CSI); // 155 (via Symbol.toPrimitive)
 *
 * // Character
 * console.log(CSI.character); // "["
 *
 * // Control character
 * console.log(CSI.control); // "\x9B"
 * ```
 *
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes#C1_controls
 * @remarks `typeof String` is intentional. They are not string primitives, but string objects. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_primitives_and_string_objects
 */
export class C1 extends ControlCharacter {
  readonly control: string;
  /**
   * Character representation (8-bit C1)
   * @example
   * ```
   * [
   * ```
   */
  readonly character: string;

  readonly hex: number;
  readonly literal: string;
  /**
   * Escape sequence representation (7-bit C1)
   * @example
   * ```
   * \x1B[
   * ```
   * @see {@link C1.toString}
   */
  readonly sequence: string;

  /**
   * Returns the escape sequence representation (7-bit C1)
   * @example
   * ```
   * \x1B[
   * ```
   * @see {@link C1.toString}
   */
  toSequence() {
    return this.sequence;
  }

  constructor(hex: number) {
    const control = String.fromCharCode(hex);
    const character = String.fromCharCode(hex - 64);
    const sequence = `\x1B${character}`;

    super(sequence);
    this.hex = hex;
    this.character = character;
    this.control = control;
    this.sequence = sequence;
    this.literal = `\\x1B${character}`;
  }

  [Symbol.toStringTag] = "C1";

  /**
   * Returns the character representation (8-bit C1)
   * @example
   * ```
   * [
   * ```
   */
  declare toCharacter: () => string;

  /**
   * Returns the default string representation (escape sequence)
   * @example
   * ```
   * \x1B[
   * ```
   * @see {@link C1.sequence}
   */
  declare valueOf: () => string;

  /**
   * Returns default string representation (escape sequence)
   * @example
   * ```
   * \x1B[
   * ```
   * @see {@link C1.toSequence}
   */
  declare toString: () => string;
}
