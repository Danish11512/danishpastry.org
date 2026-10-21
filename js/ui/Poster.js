const NS = "http://www.w3.org/2000/svg";

/**
 * Builds the event poster as inline SVG — a typographic poster in the
 * style of real Partiful artwork: stacked bold words (alternating
 * filled/outlined), a gradient field, and decorative shapes.
 */
export class Poster {
  #el;

  constructor(el) {
    this.#el = el;
  }

  render({ title, host, palette }) {
    const words = title.toUpperCase().split(/\s+/).slice(0, 4);
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 400 500");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", title);

    const defs = el("defs");
    const grad = el("linearGradient", {
      id: "pg",
      x1: "0",
      y1: "0",
      x2: "1",
      y2: "1",
    });
    grad.append(el("stop", { offset: "0", "stop-color": palette.g1 }));
    grad.append(el("stop", { offset: "0.55", "stop-color": palette.g2 }));
    grad.append(el("stop", { offset: "1", "stop-color": palette.g3 }));
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      grad.append(
        el("animateTransform", {
          attributeName: "gradientTransform",
          type: "rotate",
          from: "0 0.5 0.5",
          to: "360 0.5 0.5",
          dur: "45s",
          repeatCount: "indefinite",
        }),
      );
    }
    defs.append(grad);
    svg.append(defs);

    svg.append(el("rect", { width: 400, height: 500, fill: "url(#pg)" }));
    svg.append(
      el("circle", {
        cx: 330,
        cy: 90,
        r: 130,
        fill: "rgba(255,255,255,0.14)",
        class: "p-orb",
      }),
    );
    svg.append(
      el("circle", {
        cx: 40,
        cy: 430,
        r: 100,
        fill: "rgba(0,0,0,0.10)",
        class: "p-orb p-orb2",
      }),
    );
    const s1 = sparkle(60, 90, 26, palette.ink);
    s1.setAttribute("class", "p-sparkle");
    const s2 = sparkle(350, 380, 34, palette.ink);
    s2.setAttribute("class", "p-sparkle s2");
    const s3 = sparkle(315, 300, 14, palette.dot);
    s3.setAttribute("class", "p-sparkle s3");
    svg.append(s1, s2, s3);

    // Stacked title words — alternate solid / outlined, slight offsets.
    const step = 86;
    const y0 = 210 - ((words.length - 1) * step) / 2;
    words.forEach((word, i) => {
      const t = el("text", {
        x: i % 2 ? 46 : 30,
        y: y0 + i * step,
        fill: i % 2 ? "none" : palette.ink,
        stroke: i % 2 ? palette.ink : "none",
        "stroke-width": 2.5,
        "font-size": words.some((w) => w.length > 7) ? 62 : 74,
        "font-weight": 800,
        "letter-spacing": "-2",
        "text-transform": "uppercase",
        transform: `rotate(-3 ${i % 2 ? 46 : 30} ${y0 + i * step})`,
      });
      t.textContent = word;
      svg.append(t);
    });

    const sub = el("text", {
      x: 30,
      y: 460,
      fill: palette.ink,
      "font-size": 15,
      "font-weight": 700,
      "letter-spacing": "3",
      "text-transform": "uppercase",
      opacity: 0.8,
    });
    sub.textContent = `hosted by ${host}`;
    svg.append(sub);

    this.#el.replaceChildren(svg);
  }
}

function el(name, attrs = {}) {
  const n = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
}

function sparkle(cx, cy, r, fill) {
  const path = el("path", {
    d: `M ${cx} ${cy - r} Q ${cx + r * 0.15} ${cy - r * 0.15} ${cx + r} ${cy} Q ${cx + r * 0.15} ${cy + r * 0.15} ${cx} ${cy + r} Q ${cx - r * 0.15} ${cy + r * 0.15} ${cx - r} ${cy} Q ${cx - r * 0.15} ${cy - r * 0.15} ${cx} ${cy - r}`,
    fill,
  });
  return path;
}
