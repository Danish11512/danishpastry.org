/* ============================================================
   EVENT CONFIG — edit these, commit, push. That's it.
   inviteeName can also be set via ?to=Name in the URL.
   theme: "blush" | "midnight"  (see js/ui/themes.js to add more)
   details icons: see js/ui/icons.js (pin is added automatically)
   ============================================================ */
export const EVENT = {
  inviteeName: "", // or use ?to=Name
  title: "Date Night",
  host: "Danish",
  start: "2025-11-14T19:00:00", // local time, ISO format
  end: "2025-11-14T22:30:00",
  location: "Somewhere nice",
  locationSub: "Full address shared the day of",
  details: [
    { icon: "food", text: "Dinner's on me" },
    { icon: "shirt", text: "Dress nice-ish" },
    { icon: "car", text: "Ride share recommended" },
  ],
  description:
    "One evening. Good food, better company.\n\nI'll handle the plan — you just show up.",
  theme: "blush",
};
