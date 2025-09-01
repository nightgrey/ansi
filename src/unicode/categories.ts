// https://unicode.org/reports/tr18/#RL1.2

export const CONTROL_REGEX = /\p{General_Category=Other}/gu;
export function isControl(string: string): boolean {
    return CONTROL_REGEX.test(string);
}

export const LETTER_REGEX = /\p{General_Category=Letter}/gu;
export function isLetter(string: string): boolean {
    return LETTER_REGEX.test(string);
}

export const MARK_REGEX = /\p{General_Category=Mark}/gu;
export function isMark(string: string): boolean {
    return MARK_REGEX.test(string);
}

export const NUMBER_REGEX = /\p{General_Category=Number}/gu;
export function isNumber(string: string): boolean {
    return NUMBER_REGEX.test(string);
}

export const PUNCTUATION_REGEX = /\p{General_Category=Punctuation}/gu;
export function isPunctuation(string: string): boolean {
    return PUNCTUATION_REGEX.test(string);
}

export const SYMBOL_REGEX = /\p{General_Category=Symbol}/gu;
export function isSymbol(string: string): boolean {
    return SYMBOL_REGEX.test(string);
}

export const SEPARATOR_REGEX = /\p{General_Category=Separator}/gu;
export function isSeparator(string: string): boolean {
    return SEPARATOR_REGEX.test(string);
}