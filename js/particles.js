let particles = [];

// ✅ EXPORT correcto
export function createParticles(strength) {
  const count = Math.floor(strength / 25);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      alpha: 1
    });
  }
}

// ✅ EXPORT correcto
export function updateParticles(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((p, i) => {
    p.y -= p.speed;
    p.alpha -= 0.01;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
      return;
    }

    ctx.globalAlpha = p.alpha;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffcc";
    ctx.fill();
  });

  ctx.globalAlpha = 1;
}