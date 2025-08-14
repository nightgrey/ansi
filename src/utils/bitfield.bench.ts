import { bench, describe } from "vitest";
import { Bitfield64, BitfieldN } from "./bitfield"; // Adjust import path as needed

// Test data setup
const RANDOM_BITS = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 64),
);
const RANDOM_BIT_ARRAYS = Array.from({ length: 50 }, () =>
  Array.from({ length: 20 }, () => Math.floor(Math.random() * 64)),
);

describe("Bitfield64", () => {
  describe("Constructor Performance", () => {
    bench("Bitfield64 - constructor (empty)", () => {
      new Bitfield64();
    });

    bench("BitfieldN - constructor (empty)", () => {
      new BitfieldN();
    });

    bench("Bitfield64 - constructor (with values)", () => {
      new Bitfield64(0x12345678, 0x9abcdef0);
    });

    bench("BitfieldN - constructor (with values)", () => {
      new BitfieldN(0x123456789abcdef0n);
    });
  });

  describe("Single Bit Operations", () => {
    const bf64 = new Bitfield64();
    const bf64n = new BitfieldN();

    bench("Bitfield64 - set bit", () => {
      let result = bf64;
      for (const bit of RANDOM_BITS) {
        result = result.set(bit);
      }
    });

    bench("BitfieldN - set bit", () => {
      let result = bf64n;
      for (const bit of RANDOM_BITS) {
        result = result.set(bit);
      }
    });

    bench("Bitfield64 - unset bit", () => {
      let result = Bitfield64.from([
        0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
      ]);
      for (const bit of RANDOM_BITS) {
        result = result.unset(bit);
      }
    });

    bench("BitfieldN - unset bit", () => {
      let result = BitfieldN.from([
        0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
      ]);
      for (const bit of RANDOM_BITS) {
        result = result.unset(bit);
      }
    });

    bench("Bitfield64 - has bit", () => {
      const testField = Bitfield64.from(RANDOM_BITS);
      for (const bit of RANDOM_BITS) {
        testField.has(bit);
      }
    });

    bench("BitfieldN - has bit", () => {
      const testField = BitfieldN.from(RANDOM_BITS);
      for (const bit of RANDOM_BITS) {
        testField.has(bit);
      }
    });

    bench("Bitfield64 - toggle bit", () => {
      let result = bf64;
      for (const bit of RANDOM_BITS) {
        result = result.toggle(bit);
      }
    });

    bench("BitfieldN - toggle bit", () => {
      let result = bf64n;
      for (const bit of RANDOM_BITS) {
        result = result.toggle(bit);
      }
    });
  });

  describe("Bulk Operations", () => {
    bench("Bitfield64 - from array", () => {
      for (const bitArray of RANDOM_BIT_ARRAYS) {
        Bitfield64.from(bitArray);
      }
    });

    bench("BitfieldN - from array", () => {
      for (const bitArray of RANDOM_BIT_ARRAYS) {
        BitfieldN.from(bitArray);
      }
    });

    bench("Bitfield64 - clear", () => {
      const testField = Bitfield64.from(RANDOM_BITS);
      testField.clear();
    });

    bench("BitfieldN - clear", () => {
      const testField = BitfieldN.from(RANDOM_BITS);
      testField.clear();
    });
  });

  describe("Bitwise Operations", () => {
    const bf64_a = Bitfield64.from([0, 2, 4, 6, 8, 32, 34, 36, 38, 40]);
    const bf64_b = Bitfield64.from([1, 3, 5, 7, 9, 33, 35, 37, 39, 41]);
    const bf64n_a = BitfieldN.from([0, 2, 4, 6, 8, 32, 34, 36, 38, 40]);
    const bf64n_b = BitfieldN.from([1, 3, 5, 7, 9, 33, 35, 37, 39, 41]);

    bench("Bitfield64 - OR operation", () => {
      bf64_a.or(bf64_b);
    });

    bench("BitfieldN - OR operation", () => {
      bf64n_a.or(bf64n_b);
    });

    bench("Bitfield64 - AND operation", () => {
      bf64_a.and(bf64_b);
    });

    bench("BitfieldN - AND operation", () => {
      bf64n_a.and(bf64n_b);
    });

    bench("Bitfield64 - XOR operation", () => {
      bf64_a.xor(bf64_b);
    });

    bench("BitfieldN - XOR operation", () => {
      bf64n_a.xor(bf64n_b);
    });

    bench("Bitfield64 - NOT operation", () => {
      bf64_a.not();
    });

    bench("BitfieldN - NOT operation", () => {
      bf64n_a.not();
    });
  });

  describe("Query Operations", () => {
    const sparseBf64 = Bitfield64.from([0, 10, 20, 30, 40, 50, 60]);
    const sparseBf64n = BitfieldN.from([0, 10, 20, 30, 40, 50, 60]);
    const denseBf64 = Bitfield64.from(Array.from({ length: 32 }, (_, i) => i));
    const denseBf64n = BitfieldN.from(Array.from({ length: 32 }, (_, i) => i));

    bench("Bitfield64 - length (sparse)", () => {
      sparseBf64.length;
    });

    bench("BitfieldN - length (sparse)", () => {
      sparseBf64n.length;
    });

    bench("Bitfield64 - length (dense)", () => {
      denseBf64.length;
    });

    bench("BitfieldN - length (dense)", () => {
      denseBf64n.length;
    });

    bench("Bitfield64 - isEmpty", () => {
      const emptyBf = new Bitfield64();
      emptyBf.isEmpty();
      sparseBf64.isEmpty();
    });

    bench("BitfieldN - isEmpty", () => {
      const emptyBf = new BitfieldN();
      emptyBf.isEmpty();
      sparseBf64n.isEmpty();
    });

    bench("Bitfield64 - isFull", () => {
      denseBf64.isFull();
      sparseBf64.isFull();
    });

    bench("BitfieldN - isFull", () => {
      denseBf64n.isFull();
      sparseBf64n.isFull();
    });
  });

  describe("Iterator Operations", () => {
    const sparseBf64 = Bitfield64.from([0, 10, 20, 30, 40, 50, 60]);
    const sparseBf64n = BitfieldN.from([0, 10, 20, 30, 40, 50, 60]);
    const denseBf64 = Bitfield64.from(Array.from({ length: 32 }, (_, i) => i));
    const denseBf64n = BitfieldN.from(Array.from({ length: 32 }, (_, i) => i));

    bench("Bitfield64 - iterate bits (sparse)", () => {
      const bits = Array.from(sparseBf64.values());
    });

    bench("BitfieldN - iterate bits (sparse)", () => {
      const bits = Array.from(sparseBf64n.values());
    });

    bench("Bitfield64 - iterate bits (dense)", () => {
      const bits = Array.from(denseBf64.values());
    });

    bench("BitfieldN - iterate bits (dense)", () => {
      const bits = Array.from(denseBf64n.values());
    });
  });

  describe("String Operations", () => {
    const testBf64 = Bitfield64.from([0, 1, 8, 16, 32, 33, 40, 48, 56, 63]);
    const testBf64n = BitfieldN.from([0, 1, 8, 16, 32, 33, 40, 48, 56, 63]);

    bench("Bitfield64 - toString binary", () => {
      testBf64.toString(2);
    });

    bench("BitfieldN - toString binary", () => {
      testBf64n.toString(2);
    });

    bench("Bitfield64 - toString hex", () => {
      testBf64.toString(16);
    });

    bench("BitfieldN - toString hex", () => {
      testBf64n.toString(16);
    });
  });

  describe("Conversion Operations", () => {
    const hexStrings = [
      "0x0000000000000001",
      "0x123456789abcdef0",
      "0xffffffffffffffff",
      "0x8000000000000000",
      "0x0f0f0f0f0f0f0f0f",
    ];
  });

  describe("Advanced BigInt Operations", () => {
    const testBf64n = BitfieldN.from([0, 1, 8, 16, 32, 33, 40, 48, 56, 63]);
    const sparseBf64n = BitfieldN.from([0, 10, 20, 30, 40, 50, 60]);
    const emptyBf64n = new BitfieldN();

    bench("BitfieldN - lsb (least significant bit)", () => {
      testBf64n.leastSignificantBit();
      sparseBf64n.leastSignificantBit();
      emptyBf64n.leastSignificantBit();
    });

    bench("BitfieldN - msb (most significant bit)", () => {
      testBf64n.mostSignificantBit();
      sparseBf64n.mostSignificantBit();
      emptyBf64n.mostSignificantBit();
    });
  });

  describe("Complex Workflow Scenarios", () => {
    bench("Bitfield64 - complex workflow", () => {
      let bf = new Bitfield64();

      // Set some bits
      bf = bf.set(0).set(15).set(31).set(32).set(47).set(63);

      // Perform operations
      const other = Bitfield64.from([1, 16, 30, 33, 48, 62]);
      bf = bf.or(other);
      bf = bf.and(other.not());

      // Query operations
      bf.length;
      bf.isEmpty();
      Array.from(bf.values()).length;
    });

    bench("BitfieldN - complex workflow", () => {
      let bf = new BitfieldN();

      // Set some bits
      bf = bf.set(0).set(15).set(31).set(32).set(47).set(63);

      // Perform operations
      const other = BitfieldN.from([1, 16, 30, 33, 48, 62]);
      bf = bf.or(other);
      bf = bf.and(other.not());

      // Query operations
      bf.length;
      bf.isEmpty();
      Array.from(bf.values()).length;
    });
  });
});
