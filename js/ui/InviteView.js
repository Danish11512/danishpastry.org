import { ICONS } from "./icons.js";

/** Renders the event details into the page. Single job: DOM output. */
export class InviteView {
  #event;
  #invitee;

  constructor(event, invitee) {
    this.#event = event;
    this.#invitee = invitee;
  }

  render() {
    const e = this.#event;
    document.getElementById("invite-chip").textContent = this.#invitee
      ? `For ${this.#invitee}`
      : "A private invite";
    document.getElementById("title").textContent = e.title;
    document.title = `${e.title} — You're Invited`;
    document.getElementById("host").textContent = e.host;
    document.getElementById("host-initial").textContent = (
      e.host[0] || "?"
    ).toUpperCase();
    document.getElementById("description").textContent = e.description;
    this.#renderWhen(e);
    this.#renderRows(e);
  }

  /* Partiful format: "Friday, Nov 14" / "7:00pm – 10:30pm" */
  #renderWhen(e) {
    const dateFmt = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
    const timeFmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    const t = (d) => timeFmt.format(d).toLowerCase().replace(" ", "");
    document.getElementById("date-line").textContent = dateFmt.format(
      e.startDate,
    );
    document.getElementById("time-line").textContent =
      `${t(e.startDate)} – ${t(e.endDate)}`;
  }

  #renderRows(e) {
    const rows = document.getElementById("rows");
    const all = [
      { icon: "pin", text: e.location, sub: e.locationSub },
      ...e.details,
    ];
    for (const r of all) {
      const div = document.createElement("div");
      div.className = "row";
      div.innerHTML = `<span class="row-icon">${ICONS[r.icon] || ICONS.star}</span>`;
      const text = document.createElement("span");
      text.textContent = r.text;
      if (r.sub) {
        const sub = document.createElement("span");
        sub.className = "sub";
        sub.textContent = r.sub;
        text.appendChild(sub);
      }
      div.appendChild(text);
      rows.appendChild(div);
    }
  }
}
