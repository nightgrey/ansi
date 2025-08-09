import { Mode, ModeSetting } from "./mode";

/**
 * Modes represents the terminal modes that can be set or reset. By default,
 * all modes are {@link ModeSetting.NOT_RECOGNIZED}.
 *
 *
 */
export class Modes extends Map<Mode, ModeSetting> {
  /**
   * Get returns the setting of a terminal mode. If the mode is not set, it
   * returns {@link ModeSetting.NOT_RECOGNIZED}.
   */
  get(mode: Mode): ModeSetting {
    return super.get(mode) ?? ModeSetting.NOT_RECOGNIZED;
  }

  /**
   * Delete deletes a terminal mode. This has the same effect as setting the mode
   * to {@link ModeSetting.NOT_RECOGNIZED}.
   */
  delete(mode: Mode) {
    return super.delete(mode);
  }

  /**
   * Set sets a terminal mode to {@link ModeSetting.SET}.
   */
  set(mode: Mode) {
    return super.set(mode, ModeSetting.SET);
  }

  /**
   * Permanently Set sets a terminal mode to {@link ModeSetting.PERMANENTLY_SET}.
   */
  permanentlySet(mode: Mode) {
    return super.set(mode, ModeSetting.PERMANENTLY_SET);
  }

  /**
   * Reset sets a terminal mode to {@link ModeSetting.RESET}.
   */
  reset(mode: Mode) {
    return super.set(mode, ModeSetting.RESET);
  }

  /**
   * Permanently Reset sets a terminal mode to {@link ModeSetting.PERMANENTLY_RESET}.
   */
  permanentlyReset(mode: Mode) {
    return super.set(mode, ModeSetting.PERMANENTLY_RESET);
  }

  /**
   * Is Set returns true if the mode is set to {@link ModeSetting.SET} or {@link ModeSetting.PERMANENTLY_SET}.
   */
  isSet(mode: Mode): boolean {
    return Mode.isSet(this.get(mode));
  }

  /**
   * Is Permanently Set returns true if the mode is set to {@link ModeSetting.PERMANENTLY_SET}.
   */
  isPermanentlySet(mode: Mode): boolean {
    return Mode.isPermanentlySet(this.get(mode));
  }

  /**
   * Is Reset returns true if the mode is set to {@link ModeSetting.RESET} or {@link ModeSetting.PERMANENTLY_RESET}.
   */
  isReset(mode: Mode): boolean {
    return Mode.isReset(this.get(mode));
  }

  /**
   * Is Permanently Reset returns true if the mode is set to {@link ModeSetting.PERMANENTLY_RESET}.
   */
  isPermanentlyReset(mode: Mode): boolean {
    return Mode.isPermanentlyReset(this.get(mode));
  }
}
