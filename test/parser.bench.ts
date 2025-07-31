import {bench} from "vitest";
import { parser, tokenizer } from "../src/parser";

bench(`parser + tokenizer`, () => {
    parser(tokenizer(`\x9d8;id=1;https://example.com/\x9c打豆豆\x9d8;id=1;\x07`));
});

bench(`tokenizer`, () => {
    tokenizer(`\x9d8;id=1;https://example.com/\x9c打豆豆\x9d8;id=1;\x07`);
});

