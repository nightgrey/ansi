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
 */
export function execute(
  stream: Writable,
  chunk: Uint8Array | string,
): Promise<void> {
  return new Promise((resolve) => {
    if (!stream.write(chunk)) {
      stream.once("drain", resolve);
    } else {
      process.nextTick(resolve);
    }
  });
}

/**
 * An abstract class for control characters.
 * @private
 */
export abstract class ControlCharacter extends String {
  /**
   * Hexadecimal representation of the control character
   * @example `0x1B`
   */
  abstract readonly hex: number;
  /**
   * Literal representation of the control character, i.e
   * @example `"\\x1B"`
   */
  abstract readonly literal: string;

    /**
     * String representation of the control character.
     * @example `"\x1B"`
     */
  get string() {
    return this.valueOf();
  }

  [Symbol.toPrimitive](hint: string) {
    if (hint === "number") return this.hex;
    return this.toString();
  }

  [Symbol.toStringTag] = "ControlCode";

  /**
   * Returns the literal representation of the control character.
   * @example `"\\x1B"`
   */
  toLiteral() {
    return this.literal;
  }

  /**
   * Returns the hexadecimal representation of the control character
   * @example `0x1B`
   */
  toHex() {
    return this.hex;
  }
}

/**
 * Represents a C0 control character.
 *
 * Used in a string or template literal, it will be a control character.
 * Additionally, it gives you convenient access to the most useful representations.
 *
 * @example
 * ```ts
 * const BEL = new C0(0x07);
 *
 * // As a control character
 * console.log(`${BEL}`); // "\x07"
 * console.log(BEL.toString()); // "\x07"
 * console.log(BEL.valueOf()); // "\x07"
 *
 * // As a hexadecimal
 * console.log(BEL.toHex()); // 7 (0x07)
 * console.log(BEL.hex); // 7 (0x07)
 *
 * // As a literal
 * console.log(BEL.toLiteral()); // "\\x07"
 * console.log(BEL.literal); // "\\x07"
 *
 * // As a character
 * console.log(BEL.toCharacter()); // "G"
 * console.log(BEL.character); // "G"
 *
 * // As a caret
 * console.log(BEL.toCaret()); // "^G"
 * console.log(BEL.caret); // "^G"
 * ```
 *
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes#C0_controls
 */
export class C0 extends ControlCharacter {
  /**
   * Literal representation of the C0 control character
   * @example `"\\x07"`
   */
  literal: string;
  /**
   * Hexadecimal representation of the C0 control character
   * @example `0x07` (7)
   */
  hex: number;
  /**
   * Character representation of the C0 control character
   * @example `"["`
   */
  character: string;
  /**
   * Caret representation of the C0 control character
   * @example `"^["`
   */
  caret: string;

  constructor(code: number) {
    const controlChar = String.fromCharCode(code);
    super(controlChar);
    this.hex = code;
    this.literal = `\\x${code.toString(16).padStart(2, "0").toUpperCase()}`;
    this.character = String.fromCharCode(code + 64);
    this.caret = `^${this.character}`;
  }

  /**
   * Returns the C0 control character.
   * @example `\x07`
   */
  declare toString: () => string;
  /**
   * Returns the C0 control character.
   * @example `\x07`
   */
  declare valueOf: () => string;

  /**
   * Returns the caret representation of the C0 control character.
   * @example `^G`
   */
  toCaret() {
    return this.caret;
  }

  /**
   * Returns the character representation of the C0 control character.
   * @example `[`
   */
  toCharacter() {
    return this.character;
  }

  [Symbol.toStringTag] = "C0";
}

/**
 * Represents a C1 control character.
 *
 * Used in a string or template literal, it will be the escaped control sequence / 7-bit escape code.
 * Additionally, it gives you convenient access to the most useful representations.
 *
 * Different from {@link C0}, the default `.toString()` and `.valueOf()` returns the escaped control sequence.
 * To get the raw control character, use {@link C1.toRaw} or {@link C1.raw}.
 *
 * @example
 * ```ts
 * const CSI = new Control(0x9B);
 *
 * // As an escape sequence
 * console.log(`${CSI}`); // "\x1B["
 * console.log(CSI.toString()); // "\x1B["
 * console.log(CSI.valueOf()); // "\x1B["
 *
 * // As a literal escape sequence
 * console.log(CSI.toLiteral()); // "\\x1b["
 * console.log(CSI.literal); // "\\x1b["
 *  *
 * // As a hexadecimal
 * console.log(CSI.toHex()); // 155 (0x9b)
 * console.log(CSI.hex); // 155 (0x9b)
 *
 * // As a raw control character
 * console.log(CSI.toRaw()); // "["
 * console.log(CSI.raw); // "["
 *
 * // As a literal raw control character
 * console.log(CSI.toLiteralRaw()); // "\\x9b"
 * console.log(CSI.literalRaw); // "\\x9b"
 *
 * // As a character
 * console.log(CSI.toCharacter()); // "["
 * console.log(CSI.character); // "["
 * ```
 *
 * @see https://en.wikipedia.org/wiki/C0_and_C1_control_codes#C1_controls
 */
export class C1 extends ControlCharacter {
  /**
   * Literal representation of the C1 control character
   * @example `\\x1b[`
   */
  literal: string;
  /**
   * Hexadecimal representation of the C1 control character
   * @example `0x9b` (155)
   */
  hex: number;
  /**
   * Character representation of the C1 control character
   * @example `"["`
   */
  character: string;
  /**
   * 8-bit representation of the C1 control character
   * @example `\x9b`
   */
  raw: string;
  /**
   * Literal 8-bit representation of the C1 control character
   * @example `\\x9b`
   */
  literalRaw: string;

  constructor(code: number) {
    // C1 controls are typically represented as ESC + (code - 64)
    const character = String.fromCharCode(code - 64);
    const escapeSequence = `\x1B${character}`;
    super(escapeSequence);
    this.hex = code;
    this.character = character;

    this.raw = String.fromCharCode(code);
    this.literal = `\\x1B${character}`;
    this.literalRaw = `\\x${code.toString(16).padStart(2, "0").toUpperCase()}`;
  }

  /**
   * Returns the 8-bit representation of the C1 control character.
   * @example `\x9b`
   */
  toRaw() {
    return this.raw;
  }

  /**
   * Returns the literal escape sequence of the C1 control character.
   * @example `\\x9b`
   */
  toLiteralRaw() {
    return this.literalRaw;
  }

  /**
   * Returns C1 control character.
   * @example `\x1b[`
   */
  declare toString: () => string;
  /**
   * Returns ESC + C1 control character.
   * @example `\x1b[`
   */
  declare valueOf: () => string;

  /**
   * Returns literal ESC + C1 control character.
   * @example `\\x1b[`
   */
  declare toLiteral: () => string;

  [Symbol.toStringTag] = "C1";
}
