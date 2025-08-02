import { CSI } from "./c1";

/** ModeSetting represents a mode setting. */
export enum ModeSetting {
  NOT_RECOGNIZED = 0,
  SET = 1,
  RESET = 2,
  PERMANENTLY_SET = 3,
  PERMANENTLY_RESET = 4,
}

/**
 * Represents an interface for terminal modes.
 * Modes can be set, reset, and requested.
 */
export abstract class Mode {
  /** The mode's value. */
  readonly value: number;

  /**
   * Set mode (SM) sequence to set this mode.
   *
   * ANSI format:
   *
   * ```
   * CSI Pd ; ... ; Pd h
   * ```
   *
   * DEC format:
   *
   * ```
   * CSI ? Pd ; ... ; Pd h
   * ```
   *
   * @see https://vt100.net/docs/vt510-rm/SM.html
   */
  set: string;

  /**
   * Reset mode (RM) sequence to reset this mode.
   *
   * ANSI format:
   *
   * ```
   * CSI Pd ; ... ; Pd l
   * ```
   *
   * DEC format:
   *
   * ```
   * CSI ? Pd ; ... ; Pd l
   * ```
   *
   * @see https://vt100.net/docs/vt510-rm/RM.html
   */
  reset: string;

  /**
   * Request mode (DECRQM) sequence to request this mode from the terminal.
   *
   * ANSI format:
   *
   * ```
   * CSI Pa $ p
   * ```
   *
   * DEC format:
   *
   * ```
   * CSI ? Pa $ p
   * ```
   *
   * @see https://vt100.net/docs/vt510-rm/DECRQM.html
   * @returns escape sequence
   */
  request: string;

  /**
   * Report mode (DECRPM) sequence that the terminal sends to the host
   * in response to this mode request {@link DECRQM}.
   *
   * ANSI format:
   *
   * ```
   * CSI Pa ; Ps ; $ y
   * ```
   *
   * DEC format:
   *
   * ```
   * CSI ? Pa ; Ps $ y
   * ```
   *
   * Where Pa is the mode number, and Ps is the mode value.
   *
   * - 0: Not recognized
   * - 1: Set
   * - 2: Reset
   * - 3: Permanent set
   * - 4: Permanent reset
   *
   * @see https://vt100.net/docs/vt510-rm/DECRPM.html
   * @param setting - the mode setting
   * @returns escape sequence
   */
  report<S extends ModeSetting>(setting: S) {
    return Mode.report(this, setting);
  }

  constructor(value: number) {
    this.value = value;
    this.set = Mode.set(this, this);
    this.reset = Mode.reset(this);
    this.request = Mode.request(this);
  }

  /**
   * Parses number to mode setting.
   *
   * @param value - the number to parse
   * @returns the mode setting
   */
  static parseSetting(value: number | string): ModeSetting {
    switch (typeof value === "number" ? value : parseInt(value, 10)) {
      case 0:
        return ModeSetting.NOT_RECOGNIZED;
      case 1:
        return ModeSetting.SET;
      case 2:
        return ModeSetting.RESET;
      case 3:
        return ModeSetting.PERMANENTLY_SET;
      case 4:
        return ModeSetting.PERMANENTLY_RESET;
      default:
        throw new Error(`Invalid mode setting ${value}`);
    }
  }

  /** Returns true if the mode setting is not recognized. */
  static isNotRecognized(setting: ModeSetting): boolean {
    return setting === ModeSetting.NOT_RECOGNIZED;
  }

  /** Returns true if the mode setting is set or permanently set. */
  static isSet(setting: ModeSetting): boolean {
    return (
      setting === ModeSetting.SET || setting === ModeSetting.PERMANENTLY_SET
    );
  }

  /** Returns true if the mode setting is reset or permanently reset. */
  static isReset(setting: ModeSetting): boolean {
    return (
      setting === ModeSetting.RESET || setting === ModeSetting.PERMANENTLY_RESET
    );
  }

  /** Returns true if the mode setting is permanently set. */
  static isPermanentlySet(setting: ModeSetting): boolean {
    return setting === ModeSetting.PERMANENTLY_SET;
  }

  /** Returns true if the mode setting is permanently reset. */
  static isPermanentlyReset(setting: ModeSetting): boolean {
    return setting === ModeSetting.PERMANENTLY_RESET;
  }

  static #set(reset: boolean, ...modes: Mode[]) {
    if (modes.length === 0) return "";

    const cmd = reset ? "l" : "h";
    const seq = CSI.toString();

    if (modes.length === 1) {
      const mode = modes[0];
      const prefix = mode instanceof DECMode ? "?" : "";
      return `${seq}${prefix}${mode.value}${cmd}`;
    }

    const dec: number[] = [];
    const ansi: number[] = [];
    for (const m of modes) {
      if (m instanceof DECMode) {
        dec.push(m.value);
      } else if (m instanceof ANSIMode) {
        ansi.push(m.value);
      }
    }

    let s = "";
    if (ansi.length > 0) {
      s += `${seq}${ansi.join(";")}${cmd}`;
    }
    if (dec.length > 0) {
      s += `${seq}?${dec.join(";")}${cmd}`;
    }
    return s;
  }

  /**
   * Set mode (SM) returns a sequence to set a mode.
   * The mode arguments are a list of modes to set.
   *
   * If one of the modes is a {@link DECMode}, the function will return two escape
   * sequences.
   *
   * ANSI format:
   *
   * ```
   * CSI Pd ; ... ; Pd h
   * ```
   *
   * DEC format:
   *
   * ```
   * CSI ? Pd ; ... ; Pd h
   * ```
   *
   * @see https://vt100.net/docs/vt510-rm/SM.html
   */
  static set(...modes: Mode[]) {
    return Mode.#set(false, ...modes) as `\x1b[${"?" | ""}${string}h`;
  }

  /**
   * Reset mode (RM) returns a sequence to reset a mode.
   * The mode arguments are a list of modes to reset.
   *
   * If one of the modes is a {@link DECMode}, the function will return two escape
   * sequences.
   *
   * ANSI format:
   *
   * ```
   * CSI Pd ; ... ; Pd l
   * ```
   *
   * DEC format:
   *
   * ```
   * CSI ? Pd ; ... ; Pd l
   * ```
   *
   * @see https://vt100.net/docs/vt510-rm/RM.html
   */
  static reset(...modes: Mode[]) {
    return Mode.#set(true, ...modes) as "" | `\x1b[${"?" | ""}${string}l`;
  }

  /**
   * Request mode (DECRQM) returns a sequence to request a mode from the terminal.
   * The terminal responds with a report mode function {@link DECRPM}.
   *
   * ANSI format:
   *
   * ```
   * CSI Pa $ p
   * ```
   *
   * DEC format:
   *
   * ```
   * CSI ? Pa $ p
   * ```
   *
   * @see https://vt100.net/docs/vt510-rm/DECRQM.html
   */
  static request<T extends number>(mode: Mode) {
    const prefix = mode instanceof DECMode ? "?" : "";
    return `${CSI}${prefix}${mode.value}$p` as `\x1b[${"?" | ""}${T}$p`;
  }

  /**
   * Report mode (DECRPM) returns a sequence that the terminal sends to the host
   * in response to a mode request {@link DECRQM}.
   *
   * ANSI format:
   *
   * ```
   * CSI Pa ; Ps ; $ y
   * ```
   *
   * DEC format:
   *
   * ```
   * CSI ? Pa ; Ps $ y
   * ```
   *
   * Where Pa is the mode number, and Ps is the mode value.
   *
   * - 0: Not recognized
   * - 1: Set
   * - 2: Reset
   * - 3: Permanent set
   * - 4: Permanent reset
   *
   * @see https://vt100.net/docs/vt510-rm/DECRPM.html
   */
  static report(mode: Mode, setting: ModeSetting) {
    return `${CSI}${mode instanceof DECMode ? "?" : ""}${mode.value};${setting > 4 ? 0 : setting}$y`;
  }

  /**
   * Parses the mode setting from a report mode (DECRPM) sequence.
   *
   * @param report - the report mode sequence
   * @returns the mode setting
   */
  static parseReport(report: string): ModeSetting {
    if (!report.startsWith(CSI.toString())) return ModeSetting.NOT_RECOGNIZED;

    const regex = report
      .replace(CSI.toString(), "")
      .match(/^\?(\d+);(\d+)\$y$/);
    if (regex === null) return ModeSetting.NOT_RECOGNIZED;

    return Mode.parseSetting(regex[2]);
  }
}

/** Represents an ANSI terminal mode. */
export class ANSIMode extends Mode {}

/** Represents a private DEC terminal mode. */
export class DECMode extends Mode {}

export const setMode = Mode.set;

/** SM is an alias for {@link setMode}. */
export const SM = setMode;

export const resetMode = Mode.reset;

/** RM is an alias for {@link resetMode}. */
export const RM = resetMode;

export const requestMode = Mode.request;

/** DECRQM is an alias for {@link requestMode}. */
export const DECRQM = requestMode;

export const reportMode = Mode.report;

/** DECRPM is an alias for {@link reportMode}. */
export const DECRPM = reportMode;

/**
 * Keyboard Action Mode (KAM) is a mode that controls locking of the keyboard.
 * When the keyboard is locked, it cannot send data to the terminal.
 *
 * @see https://vt100.net/docs/vt510-rm/KAM.html
 */
export const keyboardActionMode = new ANSIMode(2);
/** {@link keyboardActionMode} */
export const KAM = keyboardActionMode;
export const setKeyboardActionMode = "\x1b[2h";
export const resetKeyboardActionMode = "\x1b[2l";
export const requestKeyboardActionMode = "\x1b[2$p";

/**
 * Insert/Replace Mode (IRM) is a mode that determines whether characters are
 * inserted or replaced when typed.
 *
 * When enabled, characters are inserted at the cursor position pushing the
 * characters to the right. When disabled, characters replace the character at
 * the cursor position.
 *
 * @see https://vt100.net/docs/vt510-rm/IRM.html
 */
export const insertReplaceMode = new ANSIMode(4);
/** {@link insertReplaceMode} */
export const IRM = insertReplaceMode;
export const setInsertReplaceMode = "\x1b[4h";
export const resetInsertReplaceMode = "\x1b[4l";
export const requestInsertReplaceMode = "\x1b[4$p";

/**
 * BiDirectional Support Mode (BDSM) is a mode that determines whether the
 * terminal supports bidirectional text. When enabled, the terminal supports
 * bidirectional text and is set to implicit bidirectional mode. When disabled,
 * the terminal does not support bidirectional text.
 *
 * @see ECMA-48 7.2.1.
 */
export const biDirectionalSupportMode = new ANSIMode(8);
/** {@link biDirectionalSupportMode} */
export const BDSM = biDirectionalSupportMode;
export const setBiDirectionalSupportMode = "\x1b[8h";
export const resetBiDirectionalSupportMode = "\x1b[8l";
export const requestBiDirectionalSupportMode = "\x1b[8$p";

/**
 * Send Receive Mode (SRM) or Local Echo Mode is a mode that determines whether
 * the terminal echoes characters back to the host. When enabled, the terminal
 * sends characters to the host as they are typed.
 *
 * @see https://vt100.net/docs/vt510-rm/SRM.html
 */
export const sendReceiveMode = new ANSIMode(12);
/** {@link sendReceiveMode} */
export const localEchoMode = sendReceiveMode;
/** {@link sendReceiveMode} */
export const SRM = sendReceiveMode;
export const setSendReceiveMode = "\x1b[12h";
export const resetSendReceiveMode = "\x1b[12l";
export const requestSendReceiveMode = "\x1b[12$p";
export const setLocalEchoMode = "\x1b[12h";
export const resetLocalEchoMode = "\x1b[12l";
export const requestLocalEchoMode = "\x1b[12$p";

/**
 * Line Feed/New Line Mode (LNM) is a mode that determines whether the terminal
 * interprets the line feed character as a new line.
 *
 * When enabled, the terminal interprets the line feed character as a new line.
 * When disabled, the terminal interprets the line feed character as a line feed.
 *
 * A new line moves the cursor to the first position of the next line.
 * A line feed moves the cursor down one line without changing the column
 * scrolling the screen if necessary.
 *
 * @see https://vt100.net/docs/vt510-rm/LNM.html
 */
export const lineFeedNewLineMode = new ANSIMode(20);
/** {@link lineFeedNewLineMode} */
export const LNM = lineFeedNewLineMode;
export const setLineFeedNewLineMode = "\x1b[20h";
export const resetLineFeedNewLineMode = "\x1b[20l";
export const requestLineFeedNewLineMode = "\x1b[20$p";

/**
 * Cursor Keys Mode (DECCKM) is a mode that determines whether the cursor keys
 * send ANSI cursor sequences or application sequences.
 *
 * @see https://vt100.net/docs/vt510-rm/DECCKM.html
 */
export const cursorKeysMode = new DECMode(1);
/** {@link cursorKeysMode} */
export const DECCKM = cursorKeysMode;
export const setCursorKeysMode = "\x1b[?1h";
export const resetCursorKeysMode = "\x1b[?1l";
export const requestCursorKeysMode = "\x1b[?1$p";

/** @deprecated use {@link SetCursorKeysMode} and {@link ResetCursorKeysMode} instead. */
export const enableCursorKeys = "\x1b[?1h";
/** @deprecated use {@link SetCursorKeysMode} and {@link ResetCursorKeysMode} instead. */
export const disableCursorKeys = "\x1b[?1l";

/**
 * Origin Mode (DECOM) is a mode that determines whether the cursor moves to the
 * home position or the margin position.
 *
 * @see https://vt100.net/docs/vt510-rm/DECOM.html
 */
export const originMode = new DECMode(6);
/** {@link originMode} */
export const DECOM = originMode;
export const setOriginMode = "\x1b[?6h";
export const resetOriginMode = "\x1b[?6l";
export const requestOriginMode = "\x1b[?6$p";

/**
 * Auto Wrap Mode (DECAWM) is a mode that determines whether the cursor wraps
 * to the next line when it reaches the right margin.
 *
 * @see https://vt100.net/docs/vt510-rm/DECAWM.html
 */
export const autoWrapMode = new DECMode(7);
/** {@link autoWrapMode} */
export const DECAWM = autoWrapMode;
export const setAutoWrapMode = "\x1b[?7h";
export const resetAutoWrapMode = "\x1b[?7l";
export const requestAutoWrapMode = "\x1b[?7$p";

/**
 * X10 Mouse Mode is a mode that determines whether the mouse reports on button
 * presses.
 *
 * The terminal responds with the following encoding:
 *
 * ```
 * CSI M CbCxCy
 * ```
 *
 * Where Cb is the button-1, where it can be 1, 2, or 3.
 * Cx and Cy are the x and y coordinates of the mouse event.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Mouse-Tracking
 */
export const x10MouseMode = new DECMode(9);
export const setX10MouseMode = "\x1b[?9h";
export const resetX10MouseMode = "\x1b[?9l";
export const requestX10MouseMode = "\x1b[?9$p";

/**
 * Text Cursor Enable Mode (DECTCEM) is a mode that shows/hides the cursor.
 *
 * @see https://vt100.net/docs/vt510-rm/DECTCEM.html
 */
export const textCursorEnableMode = new DECMode(25);
/** {@link textCursorEnableMode} */
export const DECTCEM = textCursorEnableMode;
export const setTextCursorEnableMode = "\x1b[?25h";
export const resetTextCursorEnableMode = "\x1b[?25l";
export const requestTextCursorEnableMode = "\x1b[?25$p";

/** These are aliases for {@link SetTextCursorEnableMode} and {@link ResetTextCursorEnableMode}. */
export const showCursor = setTextCursorEnableMode;
/** These are aliases for {@link SetTextCursorEnableMode} and {@link ResetTextCursorEnableMode}. */
export const hideCursor = resetTextCursorEnableMode;

/**
 * Text Cursor Enable Mode (DECTCEM) is a mode that shows/hides the cursor.
 *
 * @see https://vt100.net/docs/vt510-rm/DECTCEM.html
 * @deprecated use {@link SetTextCursorEnableMode} and {@link ResetTextCursorEnableMode} instead.
 */
export const cursorEnableMode = new DECMode(25);
/**
 * @deprecated use {@link SetTextCursorEnableMode} and {@link ResetTextCursorEnableMode} instead.
 */
export const requestCursorVisibility = "\x1b[?25$p";

/**
 * Numeric Keypad Mode (DECNKM) is a mode that determines whether the keypad
 * sends application sequences or numeric sequences.
 *
 * This works like DECKPAM and DECKPNM, but uses different sequences.
 *
 * @see https://vt100.net/docs/vt510-rm/DECNKM.html
 */
export const numericKeypadMode = new DECMode(66);
/** {@link numericKeypadMode} */
export const DECNKM = numericKeypadMode;
export const setNumericKeypadMode = "\x1b[?66h";
export const resetNumericKeypadMode = "\x1b[?66l";
export const requestNumericKeypadMode = "\x1b[?66$p";

/**
 * Backarrow Key Mode (DECBKM) is a mode that determines whether the backspace
 * key sends a backspace or delete character. Disabled by default.
 *
 * @see https://vt100.net/docs/vt510-rm/DECBKM.html
 */
export const backarrowKeyMode = new DECMode(67);
/** {@link backarrowKeyMode} */
export const DECBKM = backarrowKeyMode;
export const setBackarrowKeyMode = "\x1b[?67h";
export const resetBackarrowKeyMode = "\x1b[?67l";
export const requestBackarrowKeyMode = "\x1b[?67$p";

/**
 * Left Right Margin Mode (DECLRMM) is a mode that determines whether the left
 * and right margins can be set with DECSLRM.
 *
 * @see https://vt100.net/docs/vt510-rm/DECLRMM.html
 */
export const leftRightMarginMode = new DECMode(69);
/** {@link leftRightMarginMode} */
export const DECLRMM = leftRightMarginMode;
export const setLeftRightMarginMode = "\x1b[?69h";
export const resetLeftRightMarginMode = "\x1b[?69l";
export const requestLeftRightMarginMode = "\x1b[?69$p";

/**
 * Normal Mouse Mode is a mode that determines whether the mouse reports on
 * button presses and releases. It will also report modifier keys, wheel
 * events, and extra buttons.
 *
 * It uses the same encoding as {@link x10MouseMode} with a few differences:
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Mouse-Tracking
 */
export const normalMouseMode = new DECMode(1000);
export const setNormalMouseMode = "\x1b[?1000h";
export const resetNormalMouseMode = "\x1b[?1000l";
export const requestNormalMouseMode = "\x1b[?1000$p";

/**
 * VT Mouse Tracking is a mode that determines whether the mouse reports on
 * button press and release.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Mouse-Tracking
 * @deprecated use {@link normalMouseMode} instead.
 */
export const mouseMode = new DECMode(1000);
/** @deprecated use {@link normalMouseMode} instead. */
export const enableMouse = "\x1b[?1000h";
/** @deprecated use {@link normalMouseMode} instead. */
export const disableMouse = "\x1b[?1000l";
/** @deprecated use {@link normalMouseMode} instead. */
export const requestMouse = "\x1b[?1000$p";

/**
 * Highlight Mouse Tracking is a mode that determines whether the mouse reports
 * on button presses, releases, and highlighted cells.
 *
 * It uses the same encoding as {@link normalMouseMode} with a few differences:
 *
 * On highlight events, the terminal responds with the following encoding:
 *
 * ```
 * CSI t CxCy
 * CSI T CxCyCxCyCxCy
 * ```
 *
 * Where the parameters are startx, starty, endx, endy, mousex, and mousey.
 */
export const highlightMouseMode = new DECMode(1001);
export const setHighlightMouseMode = "\x1b[?1001h";
export const resetHighlightMouseMode = "\x1b[?1001l";
export const requestHighlightMouseMode = "\x1b[?1001$p";

/**
 * VT Hilite Mouse Tracking is a mode that determines whether the mouse reports on
 * button presses, releases, and highlighted cells.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Mouse-Tracking
 * @deprecated use {@link highlightMouseMode} instead.
 */
export const mouseHiliteMode = new DECMode(1001);
/** @deprecated use {@link highlightMouseMode} instead. */
export const enableMouseHilite = "\x1b[?1001h";
/** @deprecated use {@link highlightMouseMode} instead. */
export const disableMouseHilite = "\x1b[?1001l";
/** @deprecated use {@link highlightMouseMode} instead. */
export const requestMouseHilite = "\x1b[?1001$p";

/**
 * Button Event Mouse Tracking is essentially the same as {@link normalMouseMode},
 * but it also reports button-motion events when a button is pressed.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Mouse-Tracking
 */
export const buttonEventMouseMode = new DECMode(1002);
export const setButtonEventMouseMode = "\x1b[?1002h";
export const resetButtonEventMouseMode = "\x1b[?1002l";
export const requestButtonEventMouseMode = "\x1b[?1002$p";

/**
 * Cell Motion Mouse Tracking is a mode that determines whether the mouse
 * reports on button press, release, and motion events.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Mouse-Tracking
 * @deprecated use {@link buttonEventMouseMode} instead.
 */
export const mouseCellMotionMode = new DECMode(1002);
/** @deprecated use {@link buttonEventMouseMode} instead. */
export const enableMouseCellMotion = "\x1b[?1002h";
/** @deprecated use {@link buttonEventMouseMode} instead. */
export const disableMouseCellMotion = "\x1b[?1002l";
/** @deprecated use {@link buttonEventMouseMode} instead. */
export const requestMouseCellMotion = "\x1b[?1002$p";

/**
 * Any Event Mouse Tracking is the same as {@link buttonEventMouseMode}, except that
 * all motion events are reported even if no mouse buttons are pressed.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Mouse-Tracking
 */
export const anyEventMouseMode = new DECMode(1003);
export const setAnyEventMouseMode = "\x1b[?1003h";
export const resetAnyEventMouseMode = "\x1b[?1003l";
export const requestAnyEventMouseMode = "\x1b[?1003$p";

/**
 * All Mouse Tracking is a mode that determines whether the mouse reports on
 * button press, release, motion, and highlight events.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Mouse-Tracking
 * @deprecated use {@link anyEventMouseMode} instead.
 */
export const mouseAllMotionMode = new DECMode(1003);
/** @deprecated use {@link anyEventMouseMode} instead. */
export const enableMouseAllMotion = "\x1b[?1003h";
/** @deprecated use {@link anyEventMouseMode} instead. */
export const disableMouseAllMotion = "\x1b[?1003l";
/** @deprecated use {@link anyEventMouseMode} instead. */
export const requestMouseAllMotion = "\x1b[?1003$p";

/**
 * Focus Event Mode is a mode that determines whether the terminal reports focus
 * and blur events.
 *
 * The terminal sends the following encoding:
 *
 * ```
 * CSI I // Focus In
 * CSI O // Focus Out
 * ```
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Focus-Tracking
 */
export const focusEventMode = new DECMode(1004);
export const setFocusEventMode = "\x1b[?1004h";
export const resetFocusEventMode = "\x1b[?1004l";
export const requestFocusEventMode = "\x1b[?1004$p";

/**
 * @deprecated use {@link SetFocusEventMode}, {@link ResetFocusEventMode}, and
 * {@link RequestFocusEventMode} instead.
 */
export const reportFocusMode = new DECMode(1004);
/** @deprecated use {@link SetFocusEventMode}, {@link ResetFocusEventMode}, and {@link RequestFocusEventMode} instead. */
export const enableReportFocus = "\x1b[?1004h";
/** @deprecated use {@link SetFocusEventMode}, {@link ResetFocusEventMode}, and {@link RequestFocusEventMode} instead. */
export const disableReportFocus = "\x1b[?1004l";
/** @deprecated use {@link SetFocusEventMode}, {@link ResetFocusEventMode}, and {@link RequestFocusEventMode} instead. */
export const requestReportFocus = "\x1b[?1004$p";

/**
 * SGR Extended Mouse Mode is a mode that changes the mouse tracking encoding
 * to use SGR parameters.
 *
 * The terminal responds with the following encoding:
 *
 * ```
 * CSI < Cb ; Cx ; Cy M
 * ```
 *
 * Where Cb is the same as {@link normalMouseMode}, and Cx and Cy are the x and y.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Mouse-Tracking
 */
export const sgrExtMouseMode = new DECMode(1006);
export const setSgrExtMouseMode = "\x1b[?1006h";
export const resetSgrExtMouseMode = "\x1b[?1006l";
export const requestSgrExtMouseMode = "\x1b[?1006$p";

/**
 * @deprecated use {@link sgrExtMouseMode} {@link SetSgrExtMouseMode},
 * {@link ResetSgrExtMouseMode}, and {@link RequestSgrExtMouseMode} instead.
 */
export const mouseSgrExtMode = new DECMode(1006);
/** @deprecated use {@link sgrExtMouseMode} {@link SetSgrExtMouseMode}, {@link ResetSgrExtMouseMode}, and {@link RequestSgrExtMouseMode} instead. */
export const enableMouseSgrExt = "\x1b[?1006h";
/** @deprecated use {@link sgrExtMouseMode} {@link SetSgrExtMouseMode}, {@link ResetSgrExtMouseMode}, and {@link RequestSgrExtMouseMode} instead. */
export const disableMouseSgrExt = "\x1b[?1006l";
/** @deprecated use {@link sgrExtMouseMode} {@link SetSgrExtMouseMode}, {@link ResetSgrExtMouseMode}, and {@link RequestSgrExtMouseMode} instead. */
export const requestMouseSgrExt = "\x1b[?1006$p";

/**
 * UTF-8 Extended Mouse Mode is a mode that changes the mouse tracking encoding
 * to use UTF-8 parameters.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Mouse-Tracking
 */
export const utf8ExtMouseMode = new DECMode(1005);
export const setUtf8ExtMouseMode = "\x1b[?1005h";
export const resetUtf8ExtMouseMode = "\x1b[?1005l";
export const requestUtf8ExtMouseMode = "\x1b[?1005$p";

/**
 * URXVT Extended Mouse Mode is a mode that changes the mouse tracking encoding
 * to use an alternate encoding.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Mouse-Tracking
 */
export const urxvtExtMouseMode = new DECMode(1015);
export const setUrxvtExtMouseMode = "\x1b[?1015h";
export const resetUrxvtExtMouseMode = "\x1b[?1015l";
export const requestUrxvtExtMouseMode = "\x1b[?1015$p";

/**
 * SGR Pixel Extended Mouse Mode is a mode that changes the mouse tracking
 * encoding to use SGR parameters with pixel coordinates.
 *
 * This is similar to {@link sgrExtMouseMode}, but also reports pixel coordinates.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Mouse-Tracking
 */
export const sgrPixelExtMouseMode = new DECMode(1016);
export const setSgrPixelExtMouseMode = "\x1b[?1016h";
export const resetSgrPixelExtMouseMode = "\x1b[?1016l";
export const requestSgrPixelExtMouseMode = "\x1b[?1016$p";

/**
 * Alternate Screen Mode is a mode that determines whether the alternate screen
 * buffer is active. When this mode is enabled, the alternate screen buffer is
 * cleared.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-The-Alternate-Screen-Buffer
 */
export const altScreenMode = new DECMode(1047);
export const setAltScreenMode = "\x1b[?1047h";
export const resetAltScreenMode = "\x1b[?1047l";
export const requestAltScreenMode = "\x1b[?1047$p";

/**
 * Save Cursor Mode is a mode that saves the cursor position.
 * This is equivalent to SaveCursor and RestoreCursor.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-The-Alternate-Screen-Buffer
 */
export const saveCursorMode = new DECMode(1048);
export const setSaveCursorMode = "\x1b[?1048h";
export const resetSaveCursorMode = "\x1b[?1048l";
export const requestSaveCursorMode = "\x1b[?1048$p";

/**
 * Alternate Screen Save Cursor Mode is a mode that saves the cursor position as in
 * {@link saveCursorMode}, switches to the alternate screen buffer as in {@link altScreenMode},
 * and clears the screen on switch.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-The-Alternate-Screen-Buffer
 */
export const altScreenSaveCursorMode = new DECMode(1049);
export const setAltScreenSaveCursorMode = "\x1b[?1049h";
export const resetAltScreenSaveCursorMode = "\x1b[?1049l";
export const requestAltScreenSaveCursorMode = "\x1b[?1049$p";

/**
 * Alternate Screen Buffer is a mode that determines whether the alternate screen
 * buffer is active.
 *
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-The-Alternate-Screen-Buffer
 * @deprecated use {@link altScreenSaveCursorMode} instead.
 */
export const altScreenBufferMode = new DECMode(1049);
/** @deprecated use {@link altScreenSaveCursorMode} instead. */
export const setAltScreenBufferMode = "\x1b[?1049h";
/** @deprecated use {@link altScreenSaveCursorMode} instead. */
export const resetAltScreenBufferMode = "\x1b[?1049l";
/** @deprecated use {@link altScreenSaveCursorMode} instead. */
export const requestAltScreenBufferMode = "\x1b[?1049$p";
/** @deprecated use {@link altScreenSaveCursorMode} instead. */
export const enableAltScreenBuffer = "\x1b[?1049h";
/** @deprecated use {@link altScreenSaveCursorMode} instead. */
export const disableAltScreenBuffer = "\x1b[?1049l";
/** @deprecated use {@link altScreenSaveCursorMode} instead. */
export const requestAltScreenBuffer = "\x1b[?1049$p";

/**
 * Bracketed Paste Mode is a mode that determines whether pasted text is
 * bracketed with escape sequences.
 *
 * @see https://cirw.in/blog/bracketed-paste
 * @see https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Bracketed-Paste-Mode
 */
export const bracketedPasteMode = new DECMode(2004);
export const setBracketedPasteMode = "\x1b[?2004h";
export const resetBracketedPasteMode = "\x1b[?2004l";
export const requestBracketedPasteMode = "\x1b[?2004$p";

/**
 * @deprecated use {@link SetBracketedPasteMode}, {@link ResetBracketedPasteMode}, and
 * {@link RequestBracketedPasteMode} instead.
 */
export const enableBracketedPaste = "\x1b[?2004h";
/** @deprecated use {@link SetBracketedPasteMode}, {@link ResetBracketedPasteMode}, and {@link RequestBracketedPasteMode} instead. */
export const disableBracketedPaste = "\x1b[?2004l";
/** @deprecated use {@link SetBracketedPasteMode}, {@link ResetBracketedPasteMode}, and {@link RequestBracketedPasteMode} instead. */
export const requestBracketedPaste = "\x1b[?2004$p";

/**
 * Synchronized Output Mode is a mode that determines whether output is
 * synchronized with the terminal.
 *
 * @see https://gist.github.com/christianparpart/d8a62cc1ab659194337d73e399004036
 */
export const synchronizedOutputMode = new DECMode(2026);
export const setSynchronizedOutputMode = "\x1b[?2026h";
export const resetSynchronizedOutputMode = "\x1b[?2026l";
export const requestSynchronizedOutputMode = "\x1b[?2026$p";

/**
 * @deprecated use {@link synchronizedOutputMode}, {@link SetSynchronizedOutputMode}, and
 * {@link ResetSynchronizedOutputMode}, and {@link RequestSynchronizedOutputMode} instead.
 */
export const syncdOutputMode = new DECMode(2026);
/** @deprecated use {@link synchronizedOutputMode}, {@link SetSynchronizedOutputMode}, and {@link ResetSynchronizedOutputMode}, and {@link RequestSynchronizedOutputMode} instead. */
export const enableSyncdOutput = "\x1b[?2026h";
/** @deprecated use {@link synchronizedOutputMode}, {@link SetSynchronizedOutputMode}, and {@link ResetSynchronizedOutputMode}, and {@link RequestSynchronizedOutputMode} instead. */
export const disableSyncdOutput = "\x1b[?2026l";
/** @deprecated use {@link synchronizedOutputMode}, {@link SetSynchronizedOutputMode}, and {@link ResetSynchronizedOutputMode}, and {@link RequestSynchronizedOutputMode} instead. */
export const requestSyncdOutput = "\x1b[?2026$p";

/**
 * Grapheme Clustering Mode is a mode that determines whether the terminal
 * should look for grapheme clusters instead of single runes in the rendered
 * text. This makes the terminal properly render combining characters such as
 * emojis.
 *
 * @see https://github.com/contour-terminal/terminal-unicode-core
 */
export const graphemeClusteringMode = new DECMode(2027);
export const setGraphemeClusteringMode = "\x1b[?2027h";
export const resetGraphemeClusteringMode = "\x1b[?2027l";
export const requestGraphemeClusteringMode = "\x1b[?2027$p";

/**
 * @deprecated use {@link SetGraphemeClusteringMode}, {@link ResetGraphemeClusteringMode}, and
 * {@link RequestGraphemeClusteringMode} instead.
 */
export const enableGraphemeClustering = "\x1b[?2027h";
/** @deprecated use {@link SetGraphemeClusteringMode}, {@link ResetGraphemeClusteringMode}, and {@link RequestGraphemeClusteringMode} instead. */
export const disableGraphemeClustering = "\x1b[?2027l";
/** @deprecated use {@link SetGraphemeClusteringMode}, {@link ResetGraphemeClusteringMode}, and {@link RequestGraphemeClusteringMode} instead. */
export const requestGraphemeClustering = "\x1b[?2027$p";

/**
 * Win32Input is a mode that determines whether input is processed by the
 * Win32 console and Conpty.
 *
 * @see https://github.com/microsoft/terminal/blob/main/doc/specs/%234999%20-%20Improved%20keyboard%20handling%20in%20Conpty.md
 */
export const win32InputMode = new DECMode(9001);
export const setWin32InputMode = "\x1b[?9001h";
export const resetWin32InputMode = "\x1b[?9001l";
export const requestWin32InputMode = "\x1b[?9001$p";

/**
 * @deprecated use {@link SetWin32InputMode}, {@link ResetWin32InputMode}, and
 * {@link RequestWin32InputMode} instead.
 */
export const enableWin32Input = "\x1b[?9001h";
/** @deprecated use {@link SetWin32InputMode}, {@link ResetWin32InputMode}, and {@link RequestWin32InputMode} instead. */
export const disableWin32Input = "\x1b[?9001l";
/** @deprecated use {@link SetWin32InputMode}, {@link ResetWin32InputMode}, and {@link RequestWin32InputMode} instead. */
export const requestWin32Input = "\x1b[?9001$p";
