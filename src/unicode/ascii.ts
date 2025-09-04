export const ASCII_REGEX = /\p{ASCII}/u;

export function isAsciiOnly(str: string): boolean {
    return /^\p{ASCII}*$/u.test(str);
}
