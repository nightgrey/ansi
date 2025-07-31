import { describe, expect, it } from "vitest";
import { strip } from "../src/strip";
import {CASES} from "./data";

describe("strip", () => {
    it.each(CASES)("strips $name", (test) => {
        expect(strip(test.raw)).toBe(test.stripped);
    });
});
