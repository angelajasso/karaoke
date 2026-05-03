export const state = {
  audio: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  status: "idle",
  error: null,
  lyrics: [],
currentLineIndex: 0
};

const listeners = [];

export function subscribe(fn) {
  listeners.push(fn);
}

export function setState(newState) {
  Object.assign(state, newState);
  listeners.forEach(fn => fn(state));
}