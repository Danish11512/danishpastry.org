import { CalendarProvider } from "./CalendarProvider.js";
import { toUtcStamp } from "../utils/dates.js";

const ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4M12 14v4M10 16h4"/></svg>`;

/** Opens Google Calendar's "create event" template in a new tab. */
export class GoogleCalendarProvider extends CalendarProvider {
  get label() {
    return "Google Calendar";
  }
  get icon() {
    return ICON;
  }

  createAction(event) {
    const a = document.createElement("a");
    a.className = "cal-btn";
    a.target = "_blank";
    a.rel = "noopener";
    a.href = this.#url(event);
    a.innerHTML = `${this.icon}${this.label}`;
    return a;
  }

  activate(event) {
    window.open(this.#url(event), "_blank", "noopener");
  }

  #url(event) {
    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", event.title);
    url.searchParams.set("dates", `${toUtcStamp(event.startDate)}/${toUtcStamp(event.endDate)}`);
    url.searchParams.set("details", event.description);
    url.searchParams.set("location", event.location);
    return url.toString();
  }
}
