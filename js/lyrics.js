export function parseLRC(text) {
  const lines = text.split("\n");

  return lines.map(line => {
    const match = line.match(/\[(\d+):(\d+)(?:\.(\d+))?\]/);
    if (!match) return null;

    const min = parseInt(match[1]);
    const sec = parseInt(match[2]);
    const ms = match[3] ? parseInt(match[3]) : 0;

    const time = min * 60 + sec + ms / 1000;

    const content = line.replace(/\[.*?\]/, "").trim();

    return { time, text: content };
  }).filter(Boolean);
}