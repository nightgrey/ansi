export interface GenericBitfield<T, Key = number, Value = boolean> {
  set(bit: number): T;
  unset(bit: number): T;
  has(bit: number): boolean;
  toggle(bit: number): T;
  clear(): T;
  get length(): number;
  or(other: this): T;
  and(other: this): T;
  xor(other: this): T;
  not(): T;
  isEmpty(): boolean;
  isFull(): boolean;
  toString(radix?: number): string;
  valueOf(): number | bigint;

  /**
   * An iterator over the bitfield
   *
   * @see {@link this.keys} and {@link this.values}
   */
  [Symbol.iterator](): Generator<readonly [Key, Value]>;

  /**
   * An iterator of all keys (bit positions) in the bitfield
   */
  keys(): IterableIterator<Key>;

  /**
   * An iterator of all values in the bitfield
   */
  values(): IterableIterator<Value>;

  entries(): Generator<readonly [Key, Value]>;
}

/**
 * A 32-bit bitfield implementation
 *
 * @see {@link Bitfield64} or {@link Bitfield128} for larger bitfields
 * @see {@link BitfieldN} for a much slower, but variable size and possibly much larger {@link BigInt} based bitfield
 */
export class Bitfield extends Number implements GenericBitfield<Bitfield> {
  /**
   * Set a bit at the specified position
   * @param bit - The bit position (0-31)
   * @returns A new Bitfield instance with the bit set
   */
  set(bit: number) {
    Bitfield.assert(bit);

    return new Bitfield(this.valueOf() | (1 << bit));
  }

  /**
   * Unset a bit at the specified position
   * @param bit - The bit position (0-31)
   * @returns A new Bitfield instance with the bit unset
   */
  unset(bit: number): Bitfield {
    Bitfield.assert(bit);
    return new Bitfield(this.valueOf() & ~(1 << bit));
  }

  /**
   * Check if a bit is set at the specified position
   * @param bit - The bit position (0-31)
   * @returns true if the bit is set, false otherwise
   */
  has(bit: number): boolean {
    Bitfield.assert(bit);
    return (this.valueOf() & (1 << bit)) !== 0;
  }

  /**
   * Toggle a bit at the specified position
   * @param bit - The bit position (0-31)
   * @returns A new Bitfield instance with the bit toggled
   */
  toggle(bit: number) {
    Bitfield.assert(bit);
    return new Bitfield(this.valueOf() ^ (1 << bit));
  }

  /**
   * Clear all bits
   * @returns A new Bitfield instance with all bits cleared
   */
  clear(): Bitfield {
    return new Bitfield(0);
  }

  /**
   * String representation showing binary format
   */
  toString(radix?: number): string {
    if (radix === 2) {
      return this.valueOf().toString(2).padStart(32, "0");
    }
    return this.valueOf().toString(radix);
  }

  /**
   * Return the number of set bits
   */
  get length(): number {
    let count = 0;
    let value = this.valueOf();

    while (value > 0) {
      value &= value - 1;
      count++;
    }

    return count;
  }

  /**
   * Combine with another Bitfield instance using bitwise OR
   */
  or(other: Bitfield): Bitfield {
    return new Bitfield(this.valueOf() | other.valueOf());
  }

  static or(a: Bitfield, b: Bitfield): Bitfield {
    return new Bitfield(a.valueOf() | b.valueOf());
  }

  /**
   * Combine with another Bitfield instance using bitwise AND
   */
  and(other: Bitfield): Bitfield {
    return new Bitfield(this.valueOf() & other.valueOf());
  }

  static and(a: Bitfield, b: Bitfield): Bitfield {
    return new Bitfield(a.valueOf() & b.valueOf());
  }

  /**
   * Combine with another Bitfield instance using bitwise XOR
   */
  xor(other: Bitfield): Bitfield {
    return new Bitfield(this.valueOf() ^ other.valueOf());
  }

  static xor(a: Bitfield, b: Bitfield): Bitfield {
    return new Bitfield(a.valueOf() ^ b.valueOf());
  }

  /**
   * Combine with another Bitfield instance using bitwise NOT
   */
  not(): Bitfield {
    return new Bitfield(~this.valueOf() >>> 0);
  }

  static not(a: Bitfield): Bitfield {
    return new Bitfield(~a.valueOf() >>> 0);
  }

  /**
   * Check if any bits are set
   */
  isEmpty(): boolean {
    return this.valueOf() === 0;
  }

  /**
   * Check if all bits are set
   */
  isFull(): boolean {
    return this.valueOf() === 0xffffffff;
  }

  /**
   * Create from an array of bit positions
   */
  static from(bits: number[]): Bitfield {
    let value = 0;
    for (const bit of bits) {
      if (bit >= 0 && bit <= 31) {
        value |= 1 << bit;
      }
    }
    return new Bitfield(value);
  }

  [Symbol.iterator]() {
    return this.keys();
  }

  *keys(): IterableIterator<number> {
    let temp = this.valueOf();
    let position = 0;

    while (temp !== 0) {
      while ((temp & 1) === 0) {
        temp >>= 1;
        position++;
      }

      if (temp === 0) {
        break;
      }

      yield position;
      // Clear the LSB
      temp &= temp - 1;
      position++;
    }
  }

  *values(): IterableIterator<boolean> {
    let temp = this.valueOf();

    while (temp !== 0) {
      while ((temp & 1) === 0) {
        yield false;
        temp >>= 1;
      }

      if (temp === 0) {
        break;
      }

      yield true;

      // Clear the LSB
      temp &= temp - 1;
    }
  }

  static assert(bit: number) {
    if (bit < 0 || bit > 31)
      throw new Error(`Number must be between 0 and 31, got ${bit}`);
  }
}

/**
 * A 64-bit bitfield implementation
 *
 * @remark It is using two 32-bit integers to represent the 64-bit value. This is, in most cases, transparent.
 * This implementation is faster than {@link BitfieldN} (using a BigInt) by a factor of ~10 in most cases.
 */
export class Bitfield64 implements GenericBitfield<Bitfield64> {
  protected low: number; // bits 0-31
  protected high: number; // bits 32-63

  constructor(low?: number, high?: number);
  constructor(low?: number, high?: number) {
    // Ensure we're working with 32-bit unsigned integers
    this.low = (low ?? 0) >>> 0;
    this.high = (high ?? 0) >>> 0;
  }

  /**
   * Set a bit at the specified position
   * @param bit - The bit position (0-63)
   * @returns A new Bitfield64 instance with the bit set
   */
  set(bit: number) {
    Bitfield64.assert(bit);

    if (bit < 32) {
      return new Bitfield64(this.low | (1 << bit), this.high);
    } else {
      return new Bitfield64(this.low, this.high | (1 << (bit - 32)));
    }
  }

  /**
   * Unset a bit at the specified position
   * @param bit - The bit position (0-63)
   * @returns A new Bitfield64 instance with the bit unset
   */
  unset(bit: number) {
    Bitfield64.assert(bit);

    if (bit < 32) {
      return new Bitfield64(this.low & ~(1 << bit), this.high);
    } else {
      return new Bitfield64(this.low, this.high & ~(1 << (bit - 32)));
    }
  }

  /**
   * Check if a bit is set at the specified position
   * @param bit - The bit position (0-63)
   * @returns true if the bit is set, false otherwise
   */
  has(bit: number): boolean {
    Bitfield64.assert(bit);

    if (bit < 32) {
      return (this.low & (1 << bit)) !== 0;
    } else {
      return (this.high & (1 << (bit - 32))) !== 0;
    }
  }

  /**
   * Toggle a bit at the specified position
   * @param bit - The bit position (0-63)
   * @returns A new Bitfield64 instance with the bit toggled
   */
  toggle(bit: number) {
    Bitfield64.assert(bit);

    if (bit < 32) {
      return new Bitfield64(this.low ^ (1 << bit), this.high);
    } else {
      return new Bitfield64(this.low, this.high ^ (1 << (bit - 32)));
    }
  }

  // ... rest of the methods remain the same ...

  clear() {
    return new Bitfield64(0, 0);
  }

  toString(radix?: number): string {
    return this.valueOf().toString(radix);
  }

  #valueOf?: bigint;

  valueOf() {
    if (!this.#valueOf)
      this.#valueOf = BigInt(this.low >>> 0) + (BigInt(this.high >>> 0) << 32n);
    return this.#valueOf;
  }

  get length(): number {
    let count = 0;

    let lowValue = this.low;
    while (lowValue) {
      count += lowValue & 1;
      lowValue >>>= 1;
    }

    let highValue = this.high;
    while (highValue) {
      count += highValue & 1;
      highValue >>>= 1;
    }

    return count;
  }

  or(other: Bitfield64) {
    return new Bitfield64(this.low | other.low, this.high | other.high);
  }

  and(other: Bitfield64) {
    return new Bitfield64(this.low & other.low, this.high & other.high);
  }

  xor(other: Bitfield64) {
    return new Bitfield64(this.low ^ other.low, this.high ^ other.high);
  }

  not() {
    return new Bitfield64(~this.low >>> 0, ~this.high >>> 0);
  }

  isEmpty(): boolean {
    return this.low === 0 && this.high === 0;
  }

  isFull(): boolean {
    return this.low === 0xffffffff && this.high === 0xffffffff;
  }

  static from(bigInt: bigint): Bitfield64;
  static from(bits: number[]): Bitfield64;
  static from(bigIntOrBits: bigint | number[]) {
    if (typeof bigIntOrBits === "bigint") {
      return new Bitfield64(
        Number(bigIntOrBits & 0xffffffffn),
        Number((bigIntOrBits >> 32n) & 0xffffffffn),
      );
    }
    let low = 0;
    let high = 0;

    for (const bit of bigIntOrBits) {
      if (bit >= 0 && bit < 32) {
        low |= 1 << bit;
      } else if (bit >= 32 && bit <= 63) {
        high |= 1 << (bit - 32);
      }
    }

    return new Bitfield64(low, high);
  }

  static or(a: Bitfield64, b: Bitfield64) {
    return new Bitfield64(a.low | b.low, a.high | b.high);
  }

  static and(a: Bitfield64, b: Bitfield64) {
    return new Bitfield64(a.low & b.low, a.high & b.high);
  }

  static xor(a: Bitfield64, b: Bitfield64) {
    return new Bitfield64(a.low ^ b.low, a.high ^ b.high);
  }

  static not(a: Bitfield64) {
    return new Bitfield64(~a.low >>> 0, ~a.high >>> 0);
  }

  *[Symbol.iterator]() {
    yield* this.keys();
  }

  *keys(): IterableIterator<number> {
    let temp = this.valueOf();
    let position = 0;

    while (temp !== 0n) {
      while ((temp & 1n) === 0n) {
        temp >>= 1n;
        position++;
      }

      if (temp === 0n) break;

      yield position;

      // Clear the LSB
      temp &= temp - 1n;
      position++;
    }
  }

  *values(): IterableIterator<boolean> {
    let temp = this.valueOf();
    let position = 0;

    while (temp !== 0n) {
      while ((temp & 1n) === 0n) {
        temp >>= 1n;
        position++;
        yield false;
      }

      if (temp === 0n) {
        break;
      }

      yield true;

      // Clear the LSB
      temp &= temp - 1n;
      position++;
    }
  }

  static assert(bit: number) {
    if (bit < 0 || bit > 63)
      throw new Error(`Number must be between 0 and 63, got ${bit}`);
  }
}

/**
 * A 128-bit bitfield implementation
 *
 * @remark It is using four 32-bit integers to represent the 128-bit value. This is, in most cases, transparent.
 * This implementation is faster than using BigInt for most operations.
 */
export class Bitfield128 implements GenericBitfield<Bitfield128> {
  protected int0: number; // bits 0-31
  protected int1: number; // bits 32-63
  protected int2: number; // bits 64-95
  protected int3: number; // bits 96-127

  constructor(int0?: number, int1?: number, int2?: number, int3?: number) {
    // Ensure we're working with 32-bit unsigned integers
    this.int0 = (int0 ?? 0) >>> 0;
    this.int1 = (int1 ?? 0) >>> 0;
    this.int2 = (int2 ?? 0) >>> 0;
    this.int3 = (int3 ?? 0) >>> 0;
  }

  /**
   * Set a bit at the specified position
   * @param bit - The bit position (0-127)
   * @returns A new Bitfield128 instance with the bit set
   */
  set(bit: number) {
    Bitfield128.assert(bit);

    if (bit < 32) {
      return new Bitfield128(
        this.int0 | (1 << bit),
        this.int1,
        this.int2,
        this.int3,
      );
    } else if (bit < 64) {
      return new Bitfield128(
        this.int0,
        this.int1 | (1 << (bit - 32)),
        this.int2,
        this.int3,
      );
    } else if (bit < 96) {
      return new Bitfield128(
        this.int0,
        this.int1,
        this.int2 | (1 << (bit - 64)),
        this.int3,
      );
    } else {
      return new Bitfield128(
        this.int0,
        this.int1,
        this.int2,
        this.int3 | (1 << (bit - 96)),
      );
    }
  }

  /**
   * Unset a bit at the specified position
   * @param bit - The bit position (0-127)
   * @returns A new Bitfield128 instance with the bit unset
   */
  unset(bit: number) {
    Bitfield128.assert(bit);
    if (bit < 32) {
      return new Bitfield128(
        this.int0 & ~(1 << bit),
        this.int1,
        this.int2,
        this.int3,
      );
    } else if (bit < 64) {
      return new Bitfield128(
        this.int0,
        this.int1 & ~(1 << (bit - 32)),
        this.int2,
        this.int3,
      );
    } else if (bit < 96) {
      return new Bitfield128(
        this.int0,
        this.int1,
        this.int2 & ~(1 << (bit - 64)),
        this.int3,
      );
    } else {
      return new Bitfield128(
        this.int0,
        this.int1,
        this.int2,
        this.int3 & ~(1 << (bit - 96)),
      );
    }
  }

  /**
   * Check if a bit is set at the specified position
   * @param bit - The bit position (0-127)
   * @returns true if the bit is set, false otherwise
   */
  has(bit: number): boolean {
    Bitfield128.assert(bit);
    if (bit < 32) {
      return (this.int0 & (1 << bit)) !== 0;
    } else if (bit < 64) {
      return (this.int1 & (1 << (bit - 32))) !== 0;
    } else if (bit < 96) {
      return (this.int2 & (1 << (bit - 64))) !== 0;
    } else {
      return (this.int3 & (1 << (bit - 96))) !== 0;
    }
  }

  /**
   * Toggle a bit at the specified position
   * @param bit - The bit position (0-127)
   * @returns A new Bitfield128 instance with the bit toggled
   */
  toggle(bit: number) {
    Bitfield128.assert(bit);
    if (bit < 32) {
      return new Bitfield128(
        this.int0 ^ (1 << bit),
        this.int1,
        this.int2,
        this.int3,
      );
    } else if (bit < 64) {
      return new Bitfield128(
        this.int0,
        this.int1 ^ (1 << (bit - 32)),
        this.int2,
        this.int3,
      );
    } else if (bit < 96) {
      return new Bitfield128(
        this.int0,
        this.int1,
        this.int2 ^ (1 << (bit - 64)),
        this.int3,
      );
    } else {
      return new Bitfield128(
        this.int0,
        this.int1,
        this.int2,
        this.int3 ^ (1 << (bit - 96)),
      );
    }
  }

  clear() {
    return new Bitfield128(0, 0, 0, 0);
  }

  toString(radix?: number): string {
    return this.valueOf().toString(radix);
  }

  #valueOf?: bigint;
  valueOf() {
    if (!this.#valueOf)
      this.#valueOf =
        BigInt(this.int0 >>> 0) +
        (BigInt(this.int1 >>> 0) << 32n) +
        (BigInt(this.int2 >>> 0) << 64n) +
        (BigInt(this.int3 >>> 0) << 96n);
    return this.#valueOf;
  }

  get length(): number {
    let count = 0;

    const parts = [this.int0, this.int1, this.int2, this.int3];

    for (let partValue of parts) {
      while (partValue) {
        count += partValue & 1;
        partValue >>>= 1;
      }
    }

    return count;
  }

  or(other: Bitfield128) {
    return new Bitfield128(
      this.int0 | other.int0,
      this.int1 | other.int1,
      this.int2 | other.int2,
      this.int3 | other.int3,
    );
  }

  and(other: Bitfield128) {
    return new Bitfield128(
      this.int0 & other.int0,
      this.int1 & other.int1,
      this.int2 & other.int2,
      this.int3 & other.int3,
    );
  }

  xor(other: Bitfield128) {
    return new Bitfield128(
      this.int0 ^ other.int0,
      this.int1 ^ other.int1,
      this.int2 ^ other.int2,
      this.int3 ^ other.int3,
    );
  }

  not() {
    return new Bitfield128(
      ~this.int0 >>> 0,
      ~this.int1 >>> 0,
      ~this.int2 >>> 0,
      ~this.int3 >>> 0,
    );
  }

  isEmpty(): boolean {
    return (
      this.int0 === 0 && this.int1 === 0 && this.int2 === 0 && this.int3 === 0
    );
  }

  isFull(): boolean {
    return (
      this.int0 === 0xffffffff &&
      this.int1 === 0xffffffff &&
      this.int2 === 0xffffffff &&
      this.int3 === 0xffffffff
    );
  }

  static from(bigInt: bigint): Bitfield128;
  static from(bits: number[]): Bitfield128;
  static from(bigIntOrBits: bigint | number[]) {
    if (typeof bigIntOrBits === "bigint") {
      return new Bitfield128(
        Number(bigIntOrBits & 0xffffffffn),
        Number((bigIntOrBits >> 32n) & 0xffffffffn),
        Number((bigIntOrBits >> 64n) & 0xffffffffn),
        Number((bigIntOrBits >> 96n) & 0xffffffffn),
      );
    }

    let part0 = 0;
    let part1 = 0;
    let part2 = 0;
    let part3 = 0;

    for (const bit of bigIntOrBits) {
      if (bit >= 0 && bit < 32) {
        part0 |= 1 << bit;
      } else if (bit >= 32 && bit < 64) {
        part1 |= 1 << (bit - 32);
      } else if (bit >= 64 && bit < 96) {
        part2 |= 1 << (bit - 64);
      } else if (bit >= 96 && bit <= 127) {
        part3 |= 1 << (bit - 96);
      }
    }

    return new Bitfield128(part0, part1, part2, part3);
  }

  static or(a: Bitfield128, b: Bitfield128) {
    return new Bitfield128(
      a.int0 | b.int0,
      a.int1 | b.int1,
      a.int2 | b.int2,
      a.int3 | b.int3,
    );
  }

  static and(a: Bitfield128, b: Bitfield128) {
    return new Bitfield128(
      a.int0 & b.int0,
      a.int1 & b.int1,
      a.int2 & b.int2,
      a.int3 & b.int3,
    );
  }

  static xor(a: Bitfield128, b: Bitfield128) {
    return new Bitfield128(
      a.int0 ^ b.int0,
      a.int1 ^ b.int1,
      a.int2 ^ b.int2,
      a.int3 ^ b.int3,
    );
  }

  static not(a: Bitfield128) {
    return new Bitfield128(
      ~a.int0 >>> 0,
      ~a.int1 >>> 0,
      ~a.int2 >>> 0,
      ~a.int3 >>> 0,
    );
  }

  *[Symbol.iterator]() {
    yield* this.keys();
  }

  *keys(): IterableIterator<number> {
    let temp = this.valueOf();
    let position = 0;

    while (temp !== 0n) {
      while ((temp & 1n) === 0n) {
        temp >>= 1n;
        position++;
      }

      if (temp === 0n) break;

      yield position;

      // Clear the LSB
      temp &= temp - 1n;
      position++;
    }
  }

  *values(): IterableIterator<boolean> {
    let temp = this.valueOf();
    let position = 0;

    while (temp !== 0n) {
      while ((temp & 1n) === 0n) {
        temp >>= 1n;
        position++;
        yield false;
      }

      if (temp === 0n) {
        break;
      }

      yield true;

      // Clear the LSB
      temp &= temp - 1n;
      position++;
    }
  }

  static assert(bit: number) {
    if (bit < 0 || bit > 127)
      throw new Error(`Number must be between 0 and 127, got ${bit}`);
  }
}

/**
 * A {@link BigInt} bitfield implementation with variable maximum size (64 bit default).
 *
 * @remark
 * This implementation is slower than {@link Bitfield64} by a factor of ~10 in most cases.
 * Sadly, this is just down to the `BigInt` implementation of Node or the browser. It is marginally faster is when
 * constructing and calling OR, AND or XOR though.
 */
export class BitfieldN implements GenericBitfield<BitfieldN> {
  protected value: bigint;
  readonly max: number;

  constructor(value: bigint | number = 0n, max = 64) {
    this.value = BigInt(value) & 0xffffffffffffffffn;
    this.max = max - 1;
  }

  /**
   * Set a bit at the specified position
   * @param bit - The bit position (0-63)
   * @returns A new Bitfield64N instance with the bit set
   */
  set(bit: number): BitfieldN {
    this.assert(bit);
    return new BitfieldN(this.value | (1n << BigInt(bit)));
  }

  /**
   * Unset a bit at the specified position
   * @param bit - The bit position (0-63)
   * @returns A new Bitfield64N instance with the bit unset
   */
  unset(bit: number): BitfieldN {
    this.assert(bit);
    return new BitfieldN(this.value & ~(1n << BigInt(bit)));
  }

  /**
   * Check if a bit is set at the specified position
   * @param bit - The bit position (0-63)
   * @returns true if the bit is set, false otherwise
   */
  has(bit: number): boolean {
    this.assert(bit);
    return (this.value & (1n << BigInt(bit))) !== 0n;
  }

  /**
   * Toggle a bit at the specified position
   * @param bit - The bit position (0-63)
   * @returns A new Bitfield64N instance with the bit toggled
   */
  toggle(bit: number) {
    this.assert(bit);
    return new BitfieldN(this.value ^ (1n << BigInt(bit)));
  }

  clear(): BitfieldN {
    return new BitfieldN(0n);
  }

  toString(radix?: number): string {
    if (radix === 2) {
      return this.value.toString(2).padStart(64, "0");
    }

    if (radix === 16) {
      return this.value.toString(16).padStart(16, "0");
    }

    return this.value.toString(radix);
  }

  valueOf(): bigint {
    return this.value;
  }

  get length(): number {
    let count = 0;
    let value = this.value;

    while (value !== 0n) {
      value &= value - 1n;
      count++;
    }

    return count;
  }

  or(other: BitfieldN): BitfieldN {
    return new BitfieldN(this.value | other.value);
  }

  and(other: BitfieldN): BitfieldN {
    return new BitfieldN(this.value & other.value);
  }

  xor(other: BitfieldN): BitfieldN {
    return new BitfieldN(this.value ^ other.value);
  }

  not(): BitfieldN {
    return new BitfieldN(~this.value & 0xffffffffffffffffn);
  }

  isEmpty(): boolean {
    return this.value === 0n;
  }

  isFull(): boolean {
    return this.value === 0xffffffffffffffffn;
  }

  static from(bits: number[]): BitfieldN {
    let value = 0n;

    for (const bit of bits) {
      if (bit >= 0 && bit <= 63) {
        value |= 1n << BigInt(bit);
      }
    }
    return new BitfieldN(value);
  }

  static or(a: BitfieldN, b: BitfieldN): BitfieldN {
    return new BitfieldN(a.value | b.value);
  }

  static and(a: BitfieldN, b: BitfieldN): BitfieldN {
    return new BitfieldN(a.value & b.value);
  }

  static xor(a: BitfieldN, b: BitfieldN): BitfieldN {
    return new BitfieldN(a.value ^ b.value);
  }

  static not(a: BitfieldN): BitfieldN {
    return new BitfieldN(~a.value & 0xffffffffffffffffn);
  }

  leastSignificantBit(): number {
    if (this.value === 0n) return -1;

    let pos = 0;
    let value = this.value;

    while ((value & 1n) === 0n) {
      value >>= 1n;
      pos++;
    }

    return pos;
  }

  mostSignificantBit(): number {
    if (this.value === 0n) return -1;

    let pos = 0;
    let value = this.value;

    while (value > 1n) {
      value >>= 1n;
      pos++;
    }

    return pos;
  }

  *[Symbol.iterator]() {
    yield* this.keys();
  }

  *keys(): IterableIterator<number> {
    let temp = this.value;
    let position = 0;

    while (temp !== 0n) {
      while ((temp & 1n) === 0n) {
        temp >>= 1n;
        position++;
      }

      if (temp === 0n) break;

      yield position;

      // Clear the LSB
      temp &= temp - 1n;
      position++;
    }
  }

  *values(): IterableIterator<boolean> {
    let temp = this.value;
    let position = 0;

    while (temp !== 0n) {
      while ((temp & 1n) === 0n) {
        temp >>= 1n;
        position++;
        yield false;
      }

      if (temp === 0n) {
        break;
      }

      yield true;

      // Clear the LSB
      temp &= temp - 1n;
      position++;
    }
  }

  assert(n: number) {
    if (n > this.max)
      throw new Error(
        `BitfieldN can only support up to ${this.max + 1} bits, got ${n}`,
      );
  }
}
