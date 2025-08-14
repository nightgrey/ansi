import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "ansi",

    benchmark: {
      include: ["test/**/*.bench.ts"],
      outputJson: "test/benchmark.json",
    },
    setupFiles: ["./vitest.setup.ts"],
    include: ["test/**/*.test.ts"],
  },
});
