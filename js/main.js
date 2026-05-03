import { subscribe, state } from "./state.js";
import { render, animateHighlight } from "./ui.js";
import { setupEvents } from "./events.js";
import { syncLyrics } from "./actions.js";
import { getFrequencyData } from "./audio.js";
import { createParticles, updateParticles } from "./particles.js";

function init() {
  // 🎯 1. eventos
  setupEvents();

  // 🎨 2. render reactivo (solo cuando cambia el state)
  subscribe(() => {
    render();
  });

  // 🎇 3. canvas
  const canvas = document.getElementById("visualizer");
  if (!canvas) {
    console.error("🚨 canvas no encontrado");
    return;
  }

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // 🔁 4. loop principal (optimizado)
  function loop() {
    // 🎤 sincronización karaoke
    syncLyrics();

    // ✨ animación de highlight (siempre corre suave)
    animateHighlight();

    // 🎧 solo si hay audio reproduciéndose
    if (state.isPlaying) {
      const data = getFrequencyData();

      if (data) {
        const avg =
          data.reduce((sum, val) => sum + val, 0) / data.length;

        createParticles(avg);
      }
    }

    // 🎇 dibujar partículas
    updateParticles(ctx, canvas.width, canvas.height);

    requestAnimationFrame(loop);
  }

  loop();
}

// ⚠️ importante: esperar DOM
window.addEventListener("DOMContentLoaded", init);