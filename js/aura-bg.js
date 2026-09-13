// Lightweight energy-aura canvas animation for hero sections.
// Pure canvas 2D, no external libraries or assets — zero cost, works
// on any page that includes a <canvas id="aura-canvas"> in its hero.
(function () {
  const canvas = document.getElementById("aura-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h;
  const COLORS = ["#FF4D1C", "#FF8A3D", "#C93E15", "#7BAE4A", "#3DA5FF", "#B14DFF"];

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function makeParticle() {
    return {
      x: Math.random() * w,
      y: h + Math.random() * 100,
      r: 1 + Math.random() * 2.5,
      speed: 0.3 + Math.random() * 1.1,
      drift: (Math.random() - 0.5) * 0.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.2 + Math.random() * 0.5
    };
  }
  const particles = [];
  for (let i = 0; i < 70; i++) particles.push(makeParticle());

  let t = 0;
  function draw() {
    t += 0.01;
    ctx.clearRect(0, 0, w, h);

    // Rotating energy beams from a shifting core point — the "power-up" look
    const cx = w * 0.5 + Math.sin(t * 0.7) * w * 0.15;
    const cy = h * 0.55 + Math.cos(t * 0.5) * h * 0.1;
    const beamCount = 5;
    for (let i = 0; i < beamCount; i++) {
      const angle = t * 0.6 + (i * Math.PI * 2) / beamCount;
      const len = Math.max(w, h) * 0.8;
      const grad = ctx.createLinearGradient(
        cx, cy,
        cx + Math.cos(angle) * len,
        cy + Math.sin(angle) * len
      );
      const c = COLORS[i % COLORS.length];
      grad.addColorStop(0, c + "55");
      grad.addColorStop(1, c + "00");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2 + Math.sin(t * 2 + i) * 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
      ctx.stroke();
    }

    // Glowing pulsing core
    const coreR = 40 + Math.sin(t * 3) * 12;
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
    coreGrad.addColorStop(0, "#FFDAB0AA");
    coreGrad.addColorStop(0.4, "#FF4D1C66");
    coreGrad.addColorStop(1, "#FF4D1C00");
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();

    // Rising ember particles drifting through the beams
    particles.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -10) Object.assign(p, makeParticle(), { y: h + 10 });
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    requestAnimationFrame(draw);
  }
  draw();
})();
