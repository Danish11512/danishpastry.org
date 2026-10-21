const COLORS = [
  "#ff5d8f",
  "#ffb347",
  "#7c5cff",
  "#4cd7d0",
  "#f0abfc",
  "#ffd93d",
];

/** Celebration service: fire a burst of confetti on a canvas. */
export class Confetti {
  #canvas;
  #ctx;

  constructor(canvas) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");
  }

  burst() {
    const canvas = this.#canvas;
    const ctx = this.#ctx;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const parts = Array.from({ length: 140 }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * 160,
      y: innerHeight * 0.35,
      vx: (Math.random() - 0.5) * 14,
      vy: -(Math.random() * 13 + 4),
      size: Math.random() * 8 + 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));

    let start;
    const tick = (t) => {
      if (start === undefined) start = t;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of parts) {
        p.vy += 0.32;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rot += p.vr;
        if (p.y < innerHeight + 30) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - (t - start) / 2400);
        ctx.fillStyle = p.color;
        if (p.shape === "rect")
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (alive && t - start < 2400) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    requestAnimationFrame(tick);
  }
}
