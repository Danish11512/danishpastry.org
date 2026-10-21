/** Copies the invite link to the clipboard. */
export class ShareButton {
  constructor(el) {
    el.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        el.textContent = "Copied";
      } catch {
        el.textContent = location.href;
      }
      setTimeout(() => (el.textContent = "Share"), 1600);
    });
  }
}
