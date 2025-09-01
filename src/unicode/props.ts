
export const WHITESPACE_REGEX = /\p{White_Space}/gu;
export function isWhitespace(string: string): boolean {
    return WHITESPACE_REGEX.test(string);
}
