/**
 * Notify Working Directory returns a sequence that notifies the terminal
 * of the current working directory.
 *
 * ```
 * OSC 7 ; Pt BEL
 * ```
 *
 * Where Pt is a URL in the format "file://[host]/[path]".
 * Set host to "localhost" if this is a path on the local computer.
 *
 * @see https://wezfurlong.org/wezterm/shell-integration.html#osc-7-escape-sequence-to-set-the-working-directory
 * @see https://iterm2.com/documentation-escape-codes.html#:~:text=RemoteHost%20and%20CurrentDir%3A-,OSC%207,-%3B%20%5BPs%5D%20ST
 */
export function notifyWorkingDirectory(
  host: string,
  ...paths: string[]
): string {
  // Join paths similar to Go's path.Join
  let joinedPath = paths.join("/");

  // Normalize path separators and remove duplicate slashes
  joinedPath = joinedPath.replace(/\/+/g, "/");

  // Ensure path starts with /
  if (!joinedPath.startsWith("/")) {
    joinedPath = "/" + joinedPath;
  }

  // Create URL
  const url = new URL(`file://${host}${joinedPath}`);

  return "\x1b]7;" + url.toString() + "\x07";
}
