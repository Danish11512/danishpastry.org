/**
 * Registry of RSVP options — the open/closed point of the RSVP system.
 * Add a new option here and it appears as a button + status screen
 * with no other code changes.
 *
 *   key        — stored value
 *   label      — button text
 *   title      — status heading after selection
 *   sub        — status subtext
 *   calendar   — whether to show "add to calendar" actions
 *   confetti   — whether to celebrate
 *   primaryBtn — render the button filled (the main CTA)
 */
export const RSVP_OPTIONS = [
  {
    key: "going",
    label: "Going",
    title: "You're going!",
    sub: "One tap to get it on your calendar:",
    calendar: true,
    confetti: true,
    primaryBtn: true,
  },
  {
    key: "maybe",
    label: "Maybe",
    title: "Maybe it is",
    sub: "No pressure — the invite stands.",
    calendar: false,
    confetti: false,
    primaryBtn: false,
  },
  {
    key: "cant",
    label: "Can't go",
    title: "Can't make it",
    sub: "Their loss. Maybe next time.",
    calendar: false,
    confetti: false,
    primaryBtn: false,
  },
];

export const findOption = (key) => RSVP_OPTIONS.find((o) => o.key === key);
