/** The "Guests" section: host + invitee avatars and a small count line. */
export class GuestList {
  #host;
  #invitee;
  #going = false;

  constructor({ host, invitee }) {
    this.#host = host;
    this.#invitee = invitee;
  }

  render() {
    const avatars = document.getElementById("guest-avatars");
    avatars.replaceChildren(
      this.#avatar(this.#host[0] || "D", false),
      this.#avatar(this.#invitee ? this.#invitee[0] : "?", !this.#going)
    );
    document.getElementById("guest-count").textContent = this.#going ? "2 going" : "2 invited";
  }

  /** Flip the invitee avatar to "going" and update the count. */
  update(going) {
    this.#going = going;
    this.render();
  }

  #avatar(label, dimmed) {
    const s = document.createElement("span");
    s.className = dimmed ? "avatar you" : "avatar";
    s.textContent = label.toUpperCase();
    s.title = dimmed ? this.#invitee || "You" : this.#host;
    return s;
  }
}
