import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "ansi",

    benchmark: {
      include: ["./src/**/*.bench.ts"],
      outputJson: "benchmark.json",
    },
    setupFiles: ["./vitest.setup.ts"],
    include: ["./src/**/*.test.ts"],
  },
});
