import { defOpV } from "@thi.ng/vectors/defopv";

export const int255 = (x: number) => {
  return ((x < 0 ? 0 : x > 1 ? 1 : x) * 255 + 0.5) | 0;
};
export const [srgb255, srgb2552, srgb2553, srgb2554] = defOpV((a) => int255(a));
