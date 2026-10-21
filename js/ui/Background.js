/**
 * Ambient animated background — a fixed full-viewport canvas of soft
 * light orbs drifting slowly, tinted to the event theme. Static sites
 * can't ship Partiful's per-theme video, so this renders the equivalent
 * procedurally. Respects prefers-reduced-motion (draws one static frame).
 */
const TINTS = ["g1", "g2", "g3"];

export class Background {
  #palette;
  #canvas;
  #ctx;
  #orbs = [];

  constructor(palette) {
    this.#palette = palette;
  }

  start() {
    const canvas = document.createElement("canvas");
    canvas.id = "bgfx";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");

    this.#resize();
    addEventListener("resize", () => this.#resize());
    this.#seed();

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.#draw(0);
    } else {
      requestAnimationFrame((t) => this.#loop(t));
    }
  }

  #resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    this.#canvas.width = innerWidth * dpr;
    this.#canvas.height = innerHeight * dpr;
    this.#ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  #seed() {
    this.#orbs = Array.from({ length: 5 }, (_, i) => ({
      cx: Math.random(),
      cy: Math.random(),
      ax: 0.08 + Math.random() * 0.12,   // drift amplitude (fraction of viewport)
      ay: 0.08 + Math.random() * 0.12,
      sx: 0.00004 + Math.random() * 0.00005,  // angular speed
      sy: 0.00004 + Math.random() * 0.00005,
      phase: Math.random() * Math.PI * 2,
      r: 0.28 + Math.random() * 0.22,    // radius as fraction of min(viewport)
      color: this.#palette[TINTS[i % TINTS.length]],
    }));
  }

  #loop(t) {
    this.#draw(t);
    requestAnimationFrame((nt) => this.#loop(nt));
  }

  #draw(t) {
    const { ctx } = { ctx: this.#ctx };
    const w = innerWidth;
    const h = innerHeight;
    const base = Math.min(w, h);
    ctx.clearRect(0, 0, w, h);
    for (const o of this.#orbs) {
      const x = (o.cx + Math.sin(t * o.sx + o.phase) * o.ax) * w;
      const y = (o.cy + Math.cos(t * o.sy + o.phase) * o.ay) * h;
      const r = o.r * base;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, hexA(o.color, 0.5));
      g.addColorStop(1, hexA(o.color, 0));
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }
}

function hexA(hex, alpha) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}
