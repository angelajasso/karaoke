import { state, setState } from "./state.js";

export function syncLyrics() {
  const time = state.currentTime;

  const index = state.lyrics.findIndex((line, i) => {
    const next = state.lyrics[i + 1];
    return time >= line.time && (!next || time < next.time);
  });

  if (index !== -1 && index !== state.currentLineIndex) {
    setState({ currentLineIndex: index });
  }
}