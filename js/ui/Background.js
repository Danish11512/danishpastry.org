/**
 * Ambient animated background — falling rose petals and rose blooms
 * drifting down behind the page, in romantic rose colors.
 * Respects prefers-reduced-motion (draws one static frame).
 */
const PETAL_COLORS = [
  "#e5383b",
  "#ff4d6d",
  "#ff8fa3",
  "#ffb3c1",
  "#ffd6de",
  "#c9184a",
];
const BLOOM_COLORS = ["#e5383b", "#c9184a", "#ff4d6d"];

export class Background {
  #canvas;
  #ctx;
  #items = [];
  #last = 0;

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
    const count = Math.max(
      14,
      Math.min(30, Math.round((innerWidth * innerHeight) / 55000)),
    );
    this.#items = Array.from({ length: count }, (_, i) =>
      this.#spawn(i % 5 === 0),
    );
  }

  #spawn(bloomSlot) {
    const rose = bloomSlot && Math.random() < 0.6;
    return {
      bloomSlot,
      type: rose ? "rose" : "petal",
      baseX: Math.random(),
      y: Math.random() * innerHeight * 1.2 - innerHeight * 0.2,
      size: rose ? 10 + Math.random() * 7 : 8 + Math.random() * 13,
      color: (rose ? BLOOM_COLORS : PETAL_COLORS)[
        Math.floor(Math.random() * (rose ? BLOOM_COLORS : PETAL_COLORS).length)
      ],
      alpha: 0.5 + Math.random() * 0.4,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 1.6, // tumble, rad/s
      fall: 70 + Math.random() * 85, // px/s downward
      swayA: 30 + Math.random() * 60,
      swayF: 0.0004 + Math.random() * 0.0006,
      phase: Math.random() * Math.PI * 2,
    };
  }

  #loop(t) {
    if (!this.#last) this.#last = t;
    const dt = Math.min((t - this.#last) / 1000, 0.05);
    this.#last = t;
    for (const p of this.#items) {
      p.y += p.fall * dt;
      p.rot += p.vr * dt;
      if (p.y > innerHeight + p.size * 3) {
        const fresh = this.#spawn(p.bloomSlot);
        Object.assign(p, fresh, { y: -p.size * 3 });
      }
    }
    this.#draw(t);
    requestAnimationFrame((nt) => this.#loop(nt));
  }

  #draw(t) {
    const ctx = this.#ctx;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of this.#items) {
      const x =
        p.baseX * innerWidth + Math.sin(t * p.swayF + p.phase) * p.swayA;
      if (p.type === "rose") this.#rose(x, p.y, p);
      else this.#petal(x, p.y, p);
    }
  }

  #petal(x, y, p) {
    const ctx = this.#ctx;
    const s = p.size;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 1.1, -s * 0.5, s * 0.7, s * 0.65, 0, s);
    ctx.bezierCurveTo(-s * 0.7, s * 0.65, -s * 1.1, -s * 0.5, 0, -s);
    ctx.fill();
    ctx.restore();
  }

  #rose(x, y, p) {
    const ctx = this.#ctx;
    const s = p.size;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.alpha;
    ctx.strokeStyle = p.color;
    ctx.lineWidth = s * 0.16;
    ctx.lineCap = "round";
    ctx.beginPath();
    const turns = 4.4 * Math.PI;
    for (let a = 0; a <= turns; a += 0.15) {
      const r = (a / turns) * s;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (a === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();
  }
}
