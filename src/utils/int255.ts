import { defOpV } from "@thi.ng/vectors/defopv";

/**
 * Vector operations for converting a [0, 1] range to [0, 255] range.
 */
export const [int255, int2552, int2553, int2554] = defOpV((x: number) => {
  return ((x < 0 ? 0 : x > 1 ? 1 : x) * 255 + 0.5) | 0;
});
