/**
 * Mouse Button represents the button that was pressed during a mouse message.
 */
export enum MouseButton {
  None = 0,
  Button1 = 1,
  Button2 = 2,
  Button3 = 3,
  Button4 = 4,
  Button5 = 5,
  Button6 = 6,
  Button7 = 7,
  Button8 = 8,
  Button9 = 9,
  Button10 = 10,
  Button11 = 11,
}

/**
 * Mouse event buttons
 *
 * This is based on X11 mouse button codes.
 *
 * - 1 = left button
 * - 2 = middle button (pressing the scroll wheel)
 * - 3 = right button
 * - 4 = turn scroll wheel up
 * - 5 = turn scroll wheel down
 * - 6 = push scroll wheel left
 * - 7 = push scroll wheel right
 * - 8 = 4th button (aka browser backward button)
 * - 9 = 5th button (aka browser forward button)
 * - 10
 * - 11
 *
 * Other buttons are not supported.
 */
export const MOUSE_LEFT = MouseButton.Button1;
export const MOUSE_MIDDLE = MouseButton.Button2;
export const MOUSE_RIGHT = MouseButton.Button3;
export const MOUSE_WHEEL_UP = MouseButton.Button4;
export const MOUSE_WHEEL_DOWN = MouseButton.Button5;
export const MOUSE_WHEEL_LEFT = MouseButton.Button6;
export const MOUSE_WHEEL_RIGHT = MouseButton.Button7;
export const MOUSE_BACKWARD = MouseButton.Button8;
export const MOUSE_FORWARD = MouseButton.Button9;
export const MOUSE_RELEASE = MouseButton.None;

const mouseButtons: Record<MouseButton, string> = {
  [MouseButton.None]: "none",
  [MouseButton.Button1]: "left",
  [MouseButton.Button2]: "middle",
  [MouseButton.Button3]: "right",
  [MouseButton.Button4]: "wheelup",
  [MouseButton.Button5]: "wheeldown",
  [MouseButton.Button6]: "wheelleft",
  [MouseButton.Button7]: "wheelright",
  [MouseButton.Button8]: "backward",
  [MouseButton.Button9]: "forward",
  [MouseButton.Button10]: "button10",
  [MouseButton.Button11]: "button11",
};

/**
 * Returns a string representation of the mouse button.
 */
export function mouseButtonToString(button: MouseButton): string {
  return mouseButtons[button] || "unknown";
}

/**
 * Encode Mouse Button returns a byte representing a mouse button.
 * The button is a bitmask of the following leftmost values:
 *
 * - The first two bits are the button number:
 *   0 = left button, wheel up, or button no. 8 aka (backwards)
 *   1 = middle button, wheel down, or button no. 9 aka (forwards)
 *   2 = right button, wheel left, or button no. 10
 *   3 = release event, wheel right, or button no. 11
 *
 * - The third bit indicates whether the shift key was pressed.
 *
 * - The fourth bit indicates the alt key was pressed.
 *
 * - The fifth bit indicates the control key was pressed.
 *
 * - The sixth bit indicates motion events. Combined with button number 3, i.e.
 *   release event, it represents a drag event.
 *
 * - The seventh bit indicates a wheel event.
 *
 * - The eighth bit indicates additional buttons.
 *
 * If button is {@link MouseButton.None}, and motion is false, this returns a release event.
 * If button is undefined, this function returns 0xff.
 */
export function encodeMouseButton(
  b: MouseButton,
  motion: boolean,
  shift: boolean,
  alt: boolean,
  ctrl: boolean,
): number {
  // mouse bit shifts
  const BIT_SHIFT = 0b0000_0100;
  const BIT_ALT = 0b0000_1000;
  const BIT_CTRL = 0b0001_0000;
  const BIT_MOTION = 0b0010_0000;
  const BIT_WHEEL = 0b0100_0000;
  const BIT_ADD = 0b1000_0000; // additional buttons 8-11
  const BITS_MASK = 0b0000_0011;

  let m: number;

  if (b === MouseButton.None) {
    m = BITS_MASK;
  } else if (b >= MOUSE_LEFT && b <= MOUSE_RIGHT) {
    m = b - MOUSE_LEFT;
  } else if (b >= MOUSE_WHEEL_UP && b <= MOUSE_WHEEL_RIGHT) {
    m = b - MOUSE_WHEEL_UP;
    m |= BIT_WHEEL;
  } else if (b >= MOUSE_BACKWARD && b <= MouseButton.Button11) {
    m = b - MOUSE_BACKWARD;
    m |= BIT_ADD;
  } else {
    m = 0xff; // invalid button
  }

  if (shift) {
    m |= BIT_SHIFT;
  }
  if (alt) {
    m |= BIT_ALT;
  }
  if (ctrl) {
    m |= BIT_CTRL;
  }
  if (motion) {
    m |= BIT_MOTION;
  }

  return m;
}

/**
 * x10Offset is the offset for X10 mouse events.
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#Mouse%20Tracking
 */
const X10_OFFSET = 32;

/**
 * Mouse X10 returns an escape sequence representing a mouse event in X10 mode.
 * Note that this requires the terminal support X10 mouse modes.
 *
 * ```
 * CSI M Cb Cx Cy
 * ```
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#Mouse%20Tracking
 */
export function mouseX10(b: number, x: number, y: number): string {
  return (
    "\x1b[M" +
    String.fromCharCode(b + X10_OFFSET) +
    String.fromCharCode(x + X10_OFFSET + 1) +
    String.fromCharCode(y + X10_OFFSET + 1)
  );
}

/**
 * Mouse SGR returns an escape sequence representing a mouse event in SGR mode.
 *
 * ```
 * CSI < Cb ; Cx ; Cy M
 * CSI < Cb ; Cx ; Cy m (release)
 * ```
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#Mouse%20Tracking
 */
export function mouseSgr(
  b: number,
  x: number,
  y: number,
  release: boolean,
): string {
  const s = release ? "m" : "M";

  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }

  return `\x1b[<${b};${x + 1};${y + 1}${s}`;
}
