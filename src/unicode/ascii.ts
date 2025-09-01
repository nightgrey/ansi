export const ASCII_REGEX = /\p{ASCII}/gu;

export function isAscii(string: string): boolean {
    return ASCII_REGEX.test(string);
}