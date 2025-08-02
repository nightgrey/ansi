export namespace Parser {
  export interface BaseToken {
    /** Token type */
    type: string;
    /** Raw text */
    raw: string;
    /** Position in the input */
    pos: number;
  }

  /**
   * Raw, un-parsed token
   *
   * Resulting token from processing through the {@link tokenizer}.
   */
  export interface Raw extends Parser.BaseToken {
    type: "TEXT" | "INTRODUCER" | "DATA" | "FINAL";
    // AFAIK, this is only for escaped parser & tokenizer (?)
    // code?: string;
    // intermediate?: string;
  }

  /**
   * ANSI escape sequence token
   *
   * Represents an ANSI escape sequence. Contains the command and parameters.
   */
  export interface Sequence extends Parser.BaseToken {
    type: "CSI" | "DCS" | "DEC" | "ESC" | "OSC" | "PRIVATE" | "SGR" | "STRING";
    /**
     * Command of the sequence
     * @example
     * `m`
     */
    command: string;
    /**
     * Parameters of the sequence

     * @example
     * `[1m`
     */
    params: string[];
  }

  /**
   * Text token
   *
   * Represents text that is not part of an ANSI escape sequence.
   */
  export interface Text extends Parser.BaseToken {
    type: "TEXT";
  }

  /**
   * ANSI sequence token
   *
   * Resulting token from processing through the {@link parser}.
   */
  export type AnsiToken = Sequence | Text;
}
