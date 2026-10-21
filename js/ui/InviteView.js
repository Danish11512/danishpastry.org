/** Renders the event details into the card. Single job: DOM output. */
export class InviteView {
  #event;
  #invitee;

  constructor(event, invitee) {
    this.#event = event;
    this.#invitee = invitee;
  }

  render() {
    const e = this.#event;
    document.getElementById("invitee").textContent = this.#invitee || "you";
    document.getElementById("title").textContent = e.title;
    document.title = `${e.title} — You're Invited`;
    document.getElementById("host").textContent = e.host;
    document.getElementById("host-initial").textContent = e.host[0] || "?";
    document.getElementById("location").textContent = e.location;
    document.getElementById("description").textContent = e.description;

    const dateFmt = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" });
    const timeFmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });
    document.getElementById("date-line").textContent = dateFmt.format(e.startDate);
    document.getElementById("time-line").textContent =
      `${timeFmt.format(e.startDate)} – ${timeFmt.format(e.endDate)}`;
  }
}
