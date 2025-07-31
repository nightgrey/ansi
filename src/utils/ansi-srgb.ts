import type { Color } from "@thi.ng/color/api";
import { srgbCss } from "@thi.ng/color/srgb/srgb-css";
import { set4 } from "@thi.ng/vectors/set";
import type { AnsiColor } from "../color";
import { INDEXED_TO_SRGB } from "./constants";

export const ansiSrgb = (out: Color | null, index: AnsiColor) => {
  return set4(out, INDEXED_TO_SRGB[index < 0 || index > 255 ? 0 : index]);
};

export const ansiCss = (index: AnsiColor) => {
  return srgbCss(INDEXED_TO_SRGB[index < 0 || index > 255 ? 0 : index]);
};
