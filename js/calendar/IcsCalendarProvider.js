import { CalendarProvider } from "./CalendarProvider.js";
import { toUtcStamp } from "../utils/dates.js";

const ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>`;

/** Downloads a .ics file — works with Apple Calendar, Outlook, etc. */
export class IcsCalendarProvider extends CalendarProvider {
  get label() {
    return "Add to Calendar (.ics)";
  }
  get icon() {
    return ICON;
  }
  get primary() {
    return true;
  }
  get auto() {
    return true;
  }

  createAction(event) {
    const btn = document.createElement("button");
    btn.className = "cal-btn primary";
    btn.innerHTML = `${this.icon}${this.label}`;
    btn.addEventListener("click", () => this.activate(event));
    return btn;
  }

  activate(event) {
    const blob = new Blob([this.#buildIcs(event)], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, "-").toLowerCase()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  #buildIcs(event) {
    const esc = (s) =>
      s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//danishpastry.org//invite//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@danishpastry.org`,
      `DTSTAMP:${toUtcStamp(new Date())}`,
      `DTSTART:${toUtcStamp(event.startDate)}`,
      `DTEND:${toUtcStamp(event.endDate)}`,
      `SUMMARY:${esc(event.title)}`,
      `LOCATION:${esc(event.location)}`,
      `DESCRIPTION:${esc(event.description)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
  }
}
