/**
 * Interface for "add to calendar" providers.
 *
 * Any provider is interchangeable (LSP): the view calls createAction()
 * to render a button/link, and activate() to trigger it programmatically.
 *
 * Properties:
 *   label    — button text
 *   icon     — inline SVG markup
 *   primary  — renders with the filled style
 *   auto     — fires activate() automatically when the guest picks "going"
 */
export class CalendarProvider {
  get label() {
    throw new Error("CalendarProvider: label not implemented");
  }
  get icon() {
    return "";
  }
  get primary() {
    return false;
  }
  get auto() {
    return false;
  }
  /** @returns {HTMLElement} a button or anchor for the calendar action */
  createAction(_event) {
    throw new Error("CalendarProvider: createAction() not implemented");
  }
  /** Trigger the action without user interaction (e.g. on "going"). */
  activate(_event) {
    throw new Error("CalendarProvider: activate() not implemented");
  }
}
