// https://here-be-braces.com/fast-lookup-of-unicode-properties/
import { HashMap } from "@thi.ng/associative";

export type ContextProps<T> = {
    /** Generate the context value for a given codepoint. */
    value: (character: number) => T;
    /** Returns the computed key for a given value. Must be deterministic. */
    key?: (value: T) => string;
    /** Returns true if the two values are equal. */
    equals?: (a: T, b: T) => boolean;
}

export type Context<T> = Required<ContextProps<T>>;

/**
 * Creates a type that is able to generate a 3-level lookup table
 * from a Unicode codepoint to a mapping of type T. The lookup table
 * generally is expected to be codegen'd and then reloaded, although it
 * can in theory be generated at runtime.
 * 
 * https://here-be-braces.com/fast-lookup-of-unicode-properties/
 */
export class Generator<T> {
    readonly context: Readonly<Context<T>>;

    constructor(context: ContextProps<T>) {
        this.context = Object.freeze({
            key: context.key ?? ((value) => String(value)),
            equals: context.equals ?? ((a, b) => a === b),
            value: context.value,
        })
    }

    async generate() {
        // Maps block => stage2 index
        const BLOCKS = new HashMap<Uint16Array, number>([], {
            hash: block => Number(Bun.hash.wyhash(block)),
            equiv: (a, b) => Bun.deepEquals(a, b)
        });

        // Our stages
        const STAGE_1: number[] = [];
        const STAGE_2: number[] = [];
        const STAGE_3: T[] = [];
        const STAGE_3_INDEX = new Map<string, number>();

        let block = new Uint16Array(Generator.BLOCK_SIZE);
        let blockLen = 0;

        for (let codePoint = 0; codePoint <= Generator.MAX_U21; codePoint++) {
            const value = await this.context.value(codePoint);

            const key = this.context.key(value)
            let blockIdx = STAGE_3_INDEX.get(key);
            if (blockIdx === undefined) {
                blockIdx = STAGE_3.length;
                STAGE_3_INDEX.set(key, blockIdx);
                STAGE_3.push(value);
            }
            if (blockIdx > 0xFFFF) throw new Error("Block index too large");

            block[blockLen++] = blockIdx;

            const lastCp = codePoint === Generator.MAX_U21;
            const full = blockLen === Generator.BLOCK_SIZE;

            if (!full && !lastCp) continue;

            // If last block is partial, pad with zeros (maps to stage3[0])
            if (!full) {
                block.fill(0, blockLen);
            }

            // Lookup or insert this block into stage2
            let stage2Index = BLOCKS.get(block);
            if (stage2Index === undefined) {
                if (STAGE_2.length + Generator.BLOCK_SIZE > 0xFFFF)
                    throw new Error("Stage2 too large");
                stage2Index = STAGE_2.length;
                BLOCKS.set(block, stage2Index);

                // Append full block
                for (let i = 0; i < Generator.BLOCK_SIZE; i++) {
                    STAGE_2.push(block[i]);
                }
            }

            STAGE_1.push(stage2Index);

            // Prepare new block
            block = new Uint16Array(Generator.BLOCK_SIZE);
            blockLen = 0;
        }

        // All of our lengths must fit in a u16 for this to work
        if (STAGE_1.length > 0xFFFF || STAGE_2.length > 0xFFFF || STAGE_3.length > 0xFFFF) {
            throw new Error('Stage arrays too large');
        }

        return {
            STAGE_1: new Uint16Array(STAGE_1),
            STAGE_2: new Uint16Array(STAGE_2),
            STAGE_3: STAGE_3,
        } as TablesProps<T>;
    }

    static readonly BLOCK_SIZE = 256;
    static readonly MAX_U21 = 0x10_FFFF; // Maximum 21-bit Unicode codepoint
}

export type TablesProps<T> = {
    STAGE_1?: Uint16Array;
    STAGE_2?: Uint16Array;
    STAGE_3?: T[];
}

export class Tables<T> {
    STAGE_1: Uint16Array;
    STAGE_2: Uint16Array;
    STAGE_3: T[];

    constructor(tables: TablesProps<T>) {
        this.STAGE_1 = tables.STAGE_1 ?? new Uint16Array(0);
        this.STAGE_2 = tables.STAGE_2 ?? new Uint16Array(0);
        this.STAGE_3 = tables.STAGE_3 ?? [];
    }

    static async from<T>(generator: Generator<T>): Promise<Tables<T>> {
        return new Tables(await generator.generate());
    }
}

export class Lookup<T> {
    readonly tables: Tables<T>;
    constructor(tables: Tables<T>) {
        this.tables = tables
    }
    /**
     * Given a codepoint, returns the mapping for that codepoint.
     */
    get(character: number): T {
        const high = character >> 8;
        const low = character & 0xFF;
        const stage2Index = this.tables.STAGE_1[high];
        const stage3Index = this.tables.STAGE_2[stage2Index + low];
        return this.tables.STAGE_3[stage3Index];
    }

    static async from<T>(tables: Tables<T>): Promise<Lookup<T>>;
    static async from<T>(generator: Generator<T>): Promise<Lookup<T>>;
    static async from<T>(context: ContextProps<T>): Promise<Lookup<T>>;
    static async from<T>(arg: Tables<T> | Generator<T> | ContextProps<T>): Promise<Lookup<T>> {
        if (arg instanceof Tables) {
            return new Lookup(arg);
        } else if (arg instanceof Generator) {
            return new Lookup(await Tables.from(arg));
        } else {
            const generator = new Generator(arg);
            return new Lookup(await Tables.from(generator));
        }
    }

}
