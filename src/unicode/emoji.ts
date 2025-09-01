
export const EMOJI_REGEX = /\p{Emoji}/gu;
export function isEmoji(string: string): boolean {
    return EMOJI_REGEX.test(string)
}
