import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "ansi",

    benchmark: {
      include: ["test/**/*.bench.ts"],
      outputJson: "test/benchmark.json",
    },
    include: ["test/**/*.test.ts"],
  },
});
