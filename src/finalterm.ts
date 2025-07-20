/**
 * Final Term returns an escape sequence that is used for shell integrations.
 * Originally, FinalTerm designed the protocol hence the name.
 *
 * ```
 * OSC 133 ; Ps ; Pm ST
 * OSC 133 ; Ps ; Pm BEL
 * ```
 *
 * @see https://iterm2.com/documentation-shell-integration.html
 */
export function finalTerm(...pm: string[]): string {
  return "\x1b]133;" + pm.join(";") + "\x07";
}

/**
 * Final Term Prompt returns an escape sequence that is used for shell
 * integrations prompt marks. This is sent just before the start of the shell
 * prompt.
 *
 * This is an alias for {@link finalTerm}("A").
 */
export function finalTermPrompt(...pm: string[]): string {
  if (pm.length === 0) {
    return finalTerm("A");
  }
  return finalTerm("A", ...pm);
}

/**
 * Final Term Cmd Start returns an escape sequence that is used for shell
 * integrations command start marks. This is sent just after the end of the
 * shell prompt, before the user enters a command.
 *
 * This is an alias for {@link finalTerm}("B").
 */
export function finalTermCmdStart(...pm: string[]): string {
  if (pm.length === 0) {
    return finalTerm("B");
  }
  return finalTerm("B", ...pm);
}

/**
 * Final Term Cmd Executed returns an escape sequence that is used for shell
 * integrations command executed marks. This is sent just before the start of
 * the command output.
 *
 * This is an alias for {@link finalTerm}("C").
 */
export function finalTermCmdExecuted(...pm: string[]): string {
  if (pm.length === 0) {
    return finalTerm("C");
  }
  return finalTerm("C", ...pm);
}

/**
 * Final Term Cmd Finished returns an escape sequence that is used for shell
 * integrations command finished marks.
 *
 * If the command was sent after
 * {@link finalTermCmdStart}, it indicates that the command was aborted. If the
 * command was sent after {@link finalTermCmdExecuted}, it indicates the end of the
 * command output. If neither was sent, {@link finalTermCmdFinished} should be
 * ignored.
 *
 * This is an alias for {@link finalTerm}("D").
 */
export function finalTermCmdFinished(...pm: string[]): string {
  if (pm.length === 0) {
    return finalTerm("D");
  }
  return finalTerm("D", ...pm);
}
