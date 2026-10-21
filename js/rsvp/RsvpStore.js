/**
 * Persistence for the guest's RSVP answer.
 * Depends only on a Storage-like object, so it's trivially swappable
 * (e.g. an in-memory stub for tests, or a real backend later).
 */
export class RsvpStore {
  #storage;
  #key;

  constructor(storage = window.localStorage, key = "rsvp") {
    this.#storage = storage;
    this.#key = key;
  }

  get() {
    return this.#storage.getItem(this.#key);
  }

  set(state) {
    this.#storage.setItem(this.#key, state);
  }

  clear() {
    this.#storage.removeItem(this.#key);
  }
}
