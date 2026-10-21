/* ============================================================
   EVENT CONFIG — edit these, commit, push. That's it.
   inviteeName can also be set via ?to=Name in the URL.
   theme: "ember" | "blush" | "midnight"  (see js/ui/themes.js)
   details icons: see js/ui/icons.js (pin is added automatically);
   add href to make a row a link.
   sections: collapsible "The plan"-style accordions.
   ============================================================ */
export const EVENT = {
  inviteeName: "", // or use ?to=Name
  title: "date night",
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
  posterImage: "assets/poster.png", // remove to use generated SVG art instead
  sections: [
    {
      title: "The plan",
      body: "Drinks first, then dinner.\nExact spot is a surprise.",
    },
    { title: "What to know", body: "Just bring yourself." },
  ],
  theme: "ember",
};
