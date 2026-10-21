/**
 * Theme registry — the page background is tinted to the event's palette,
 * like a real Partiful page. Add a new theme here and set EVENT.theme
 * to use it; nothing else changes.
 *
 * poster colors accept any CSS color (hex, rgb, hsl…).
 */
export const THEMES = {
  ember: {
    vars: {
      "--bg": "#b8390f",
      "--ink": "#fff3e6",
      "--paper": "#fff7f3",
      "--muted": "rgba(255,243,230,0.62)",
      "--faint": "rgba(255,243,230,0.28)",
      "--chip": "rgba(255,243,230,0.12)",
      "--accent": "#ff8a3d",
      "--accent2": "#ffd166",
      "--accent3": "#4f9d69",
    },
    poster: {
      g1: "#ff6b35",
      g2: "#ffd166",
      g3: "#3d7a52",
      ink: "#33110a",
      dot: "rgba(255,255,255,0.5)",
    },
  },
  blush: {
    vars: {
      "--bg": "#f4e2ec",
      "--ink": "#251226",
      "--paper": "#fff7f3",
      "--muted": "rgba(37,18,38,0.6)",
      "--faint": "rgba(37,18,38,0.16)",
      "--chip": "rgba(37,18,38,0.08)",
      "--accent": "#ff4f81",
      "--accent2": "#ffb347",
      "--accent3": "#7c5cff",
    },
    poster: {
      g1: "#ff5d8f",
      g2: "#ff9d5c",
      g3: "#8b5cf6",
      ink: "#2b0f33",
      dot: "rgba(255,255,255,0.55)",
    },
  },
  midnight: {
    vars: {
      "--bg": "#171015",
      "--ink": "#fdf4f0",
      "--paper": "#241a22",
      "--muted": "rgba(253,244,240,0.6)",
      "--faint": "rgba(253,244,240,0.22)",
      "--chip": "rgba(253,244,240,0.1)",
      "--accent": "#ff5d8f",
      "--accent2": "#ffc46b",
      "--accent3": "#9d7bff",
    },
    poster: {
      g1: "#2b0f33",
      g2: "#ff5d8f",
      g3: "#9d7bff",
      ink: "#ffe9f2",
      dot: "rgba(255,255,255,0.35)",
    },
  },
};

/** Apply a theme's CSS variables to :root and return the theme object. */
export function applyTheme(name) {
  const theme = THEMES[name] || THEMES.ember;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
  return theme;
}
