import { state } from "./state.js";

// 🎯 Render principal (solo cuando cambia el state)
export function render() {
  renderLyrics();
  renderProgress();
  renderStatus();
}

// 📝 Render de letras
function renderLyrics() {
  const container = document.getElementById("lyrics");
  if (!container) return;

  container.innerHTML = `
    <div class="lyrics-inner">
      ${state.lyrics.map((line, i) => {
        let className = "";

        if (i === state.currentLineIndex) className = "active";
        else if (i < state.currentLineIndex) className = "past";

        return `
          <p data-index="${i}" class="${className}">
            <span class="text">${line.text}</span>
            <span class="highlight"></span>
          </p>
        `;
      }).join("")}
    </div>
  `;

  centerActiveLine();
}

// 🎯 Barra de progreso
function renderProgress() {
  const bar = document.getElementById("progress");
  if (!bar || !state.duration) return;

  const percent = (state.currentTime / state.duration) * 100;
  bar.style.width = percent + "%";
}

// 📊 Estado (debug / UX)
function renderStatus() {
  const el = document.getElementById("status");
  if (!el) return;

  el.textContent = `
    ${state.status} 
    ${state.isPlaying ? "▶️ Playing" : "⏸️ Paused"}
  `;
}

// 🎯 Auto-scroll centrado (tipo Spotify)
function centerActiveLine() {
  const container = document.getElementById("lyrics");
  const inner = container?.querySelector(".lyrics-inner");
  const active = container?.querySelector(".active");

  if (!container || !inner || !active) return;

  const containerHeight = container.clientHeight;
  const offsetTop = active.offsetTop;
  const elementHeight = active.clientHeight;

  const scroll = offsetTop - containerHeight / 2 + elementHeight / 2;

  inner.style.transform = `translateY(-${scroll}px)`;
}

// ✨ Animación progresiva (se llama en el loop)
export function animateHighlight() {
  const active = document.querySelector(".lyrics p.active");
  if (!active) return;

  const index = state.currentLineIndex;
  const current = state.lyrics[index];
  const next = state.lyrics[index + 1];

  if (!current || !next) return;

  const duration = next.time - current.time;

  // evitar división por 0
  if (duration <= 0) return;

  const progress = (state.currentTime - current.time) / duration;

  const highlight = active.querySelector(".highlight");

  if (highlight) {
    highlight.style.width = `${Math.min(Math.max(progress * 100, 0), 100)}%`;
  }
}