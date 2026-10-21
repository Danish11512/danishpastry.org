/** Icon registry for detail rows — add a name → svg here to use it in config. */
const wrap = (inner) =>
  `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

export const ICONS = {
  pin: wrap(`<path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/>`),
  food: wrap(`<path d="M6 3v8M9 3v8M6 7h3M7.5 11v10"/><path d="M17 3c-1.8 1.5-3 4-3 7v4h3v7"/><path d="M17 3v18"/>`),
  drink: wrap(`<path d="M5 4h14l-7 8-7-8z"/><path d="M12 12v7M8 21h8"/>`),
  car: wrap(`<path d="M4 13l1.7-5A2 2 0 0 1 7.6 7h8.8a2 2 0 0 1 1.9 1.3L20 13"/><rect x="4" y="13" width="16" height="5" rx="1.5"/><path d="M7 18v2M17 18v2"/>`),
  shirt: wrap(`<path d="M9 4 4 7l2 3 2-1v11h8V9l2 1 2-3-5-3a3 3 0 0 1-6 0z"/>`),
  letter: wrap(`<rect x="3" y="6" width="18" height="13" rx="2"/><path d="m4 8 8 6 8-6"/>`),
  music: wrap(`<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>`),
  star: wrap(`<path d="m12 3 2.5 5.5L20 9.8l-4 4.1.9 5.8-4.9-2.5-4.9 2.5.9-5.8-4-4.1 5.5-1.3z"/>`),
  camera: wrap(`<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8.5 7l1.2-2h4.6l1.2 2"/>`),
};
