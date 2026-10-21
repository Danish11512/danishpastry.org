/**
 * Ambient animated background — roses drifting down behind the page,
 * each drawn as a bloom: scalloped petal lobes plus an inner spiral,
 * in romantic rose colors. Respects prefers-reduced-motion (static frame).
 */
const ROSES = [
  ["#ff8fa3", "#d6516d"],
  ["#ff4d6d", "#b31e3f"],
  ["#e5383b", "#8f1d20"],
  ["#ffb3c1", "#e07a90"],
  ["#ffd6de", "#e89eb0"],
  ["#c9184a", "#8c0d33"],
];

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
      12,
      Math.min(26, Math.round((innerWidth * innerHeight) / 60000)),
    );
    this.#items = Array.from({ length: count }, () => this.#spawn());
  }

  #spawn() {
    const [base, shade] = ROSES[Math.floor(Math.random() * ROSES.length)];
    return {
      baseX: Math.random(),
      y: Math.random() * innerHeight * 1.2 - innerHeight * 0.2,
      size: 11 + Math.random() * 12,
      color: base,
      shade,
      alpha: 0.55 + Math.random() * 0.35,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 1.2, // tumble, rad/s
      fall: 90 + Math.random() * 80, // px/s downward
      swayA: 30 + Math.random() * 60,
      swayF: 0.0004 + Math.random() * 0.0006,
      phase: Math.random() * Math.PI * 2,
      lobes: 5 + Math.floor(Math.random() * 2), // 5–6 outer petals
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
        const fresh = this.#spawn();
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
      this.#rose(x, p.y, p);
    }
  }

  #rose(x, y, p) {
    const ctx = this.#ctx;
    const s = p.size;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.alpha;

    // outer petal lobes — ruffled bloom silhouette
    ctx.fillStyle = p.color;
    for (let i = 0; i < p.lobes; i++) {
      const a = (i / p.lobes) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(
        Math.cos(a) * s * 0.5,
        Math.sin(a) * s * 0.5,
        s * 0.52,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    // bloom core
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.62, 0, Math.PI * 2);
    ctx.fill();

    // inner spiral — the swirl that reads as a rose
    ctx.strokeStyle = p.shade;
    ctx.lineWidth = s * 0.13;
    ctx.lineCap = "round";
    ctx.beginPath();
    const turns = 2.6 * Math.PI;
    for (let a = 0; a <= turns; a += 0.15) {
      const r = s * 0.1 + (a / turns) * s * 0.5;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (a === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();
  }
}
