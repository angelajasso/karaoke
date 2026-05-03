import { loadAudio, play, pause } from "./audio.js";

export function setupEvents() {

  document.getElementById("audio-input").onchange = (e) => {
    const file = e.target.files[0];
    if (file) loadAudio(file);
  };

  document.getElementById("play").onclick = play;
  document.getElementById("pause").onclick = pause;
}

import { parseLRC } from "./lyrics.js";
import { setState } from "./state.js";

document.getElementById("lyrics-input").onchange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const text = await file.text();
  const parsed = parseLRC(text);

  setState({
    lyrics: parsed,
    currentLineIndex: 0
  });
};

document.getElementById("lyrics-input").onchange = async (e) => {
  console.log("📄 archivo seleccionado");

  const file = e.target.files[0];
  if (!file) return;

  const text = await file.text();
  console.log("🧠 contenido:", text);

  const parsed = parseLRC(text);
  console.log("🎯 parsed:", parsed);

  setState({
    lyrics: parsed,
    currentLineIndex: 0
  });
};