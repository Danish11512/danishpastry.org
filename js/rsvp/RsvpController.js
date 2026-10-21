import { RSVP_OPTIONS, findOption } from "./rsvpOptions.js";

/**
 * Orchestrates the RSVP flow: renders option buttons, persists the
 * answer, and shows the matching status screen.
 *
 * Depends on abstractions, not concretions (DIP):
 *   store     — anything with get()/set()/clear()
 *   providers — CalendarProvider[] for "add to calendar" actions
 *   confetti  — anything with burst()
 */
export class RsvpController {
  #event;
  #store;
  #providers;
  #confetti;
  #guestList;
  #els;

  constructor({ event, store, providers, confetti, guestList }) {
    this.#event = event;
    this.#store = store;
    this.#providers = providers;
    this.#confetti = confetti;
    this.#guestList = guestList;
    this.#els = {
      rsvpBlock: document.getElementById("rsvp-block"),
      rsvpButtons: document.getElementById("rsvp-buttons"),
      status: document.getElementById("status"),
      statusTitle: document.getElementById("status-title"),
      statusSub: document.getElementById("status-sub"),
      calButtons: document.getElementById("cal-buttons"),
      changeRsvp: document.getElementById("change-rsvp"),
    };
  }

  init() {
    this.#renderButtons();
    this.#els.changeRsvp.addEventListener("click", () => this.#reset());

    const saved = this.#store.get();
    const option = saved && findOption(saved);
    if (option) {
      this.#showStatus(option);
      this.#guestList?.update(option.key === "going");
    }
  }

  #renderButtons() {
    for (const option of RSVP_OPTIONS) {
      const btn = document.createElement("button");
      btn.className = option.primaryBtn ? "rsvp-btn primary" : "rsvp-btn";
      btn.textContent = option.label;
      btn.addEventListener("click", () => this.#select(option));
      this.#els.rsvpButtons.appendChild(btn);
    }
  }

  #select(option) {
    this.#store.set(option.key);
    this.#showStatus(option);
    this.#guestList?.update(option.key === "going");
    if (option.confetti) this.#confetti.burst();
    if (option.calendar) {
      for (const p of this.#providers) {
        if (p.auto) p.activate(this.#event);
      }
    }
  }

  #showStatus(option) {
    this.#els.statusTitle.textContent = option.title;
    this.#els.statusSub.textContent = option.sub;

    this.#els.calButtons.replaceChildren();
    if (option.calendar) {
      for (const p of this.#providers) {
        this.#els.calButtons.appendChild(p.createAction(this.#event));
      }
    }

    this.#els.rsvpBlock.style.display = "none";
    this.#els.status.classList.add("show");
  }

  #reset() {
    this.#store.clear();
    this.#els.status.classList.remove("show");
    this.#els.rsvpBlock.style.display = "block";
    this.#guestList?.update(false);
  }
}
