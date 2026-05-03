import { setState } from "./state.js";

let audioEl = new Audio();

// 🔊 Web Audio
let audioCtx;
let analyser;
let source;
let dataArray;

// 🎵 cargar audio
export function loadAudio(file) {
  const url = URL.createObjectURL(file);
  audioEl.src = url;

  setState({ status: "loading" });

  audioEl.onloadedmetadata = () => {
    setState({
      duration: audioEl.duration,
      status: "ready"
    });

    initAudioAnalysis();
  };

  audioEl.ontimeupdate = () => {
    setState({
      currentTime: audioEl.currentTime
    });
  };
}

// ▶️ play
export function play() {
  if (!audioEl.src) {
    console.warn("⚠️ no hay audio cargado");
    return;
  }

  // ⚠️ crear contexto SOLO cuando el usuario hace click
  if (!audioCtx) {
    initAudioAnalysis();
  }

  audioCtx.resume();

  audioEl.play().catch(err => {
    console.error("🚨 audio error:", err);
  });

  setState({ isPlaying: true });
}

// ⏸ pause
export function pause() {
  audioEl.pause();
  setState({ isPlaying: false });
}

// 🎧 inicializar análisis
function initAudioAnalysis() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;

  const bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  source = audioCtx.createMediaElementSource(audioEl);

  source.connect(analyser);
  analyser.connect(audioCtx.destination);
}

// 📊 obtener frecuencias
export function getFrequencyData() {
  if (!analyser) return null;

  analyser.getByteFrequencyData(dataArray);
  return dataArray;
}