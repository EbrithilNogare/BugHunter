export function formatTime(ms: number): string {
  const seconds = ms / 1000;
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  if (min > 0) return `${min}:${sec.toFixed(3).padStart(7, "0")}s`;
  return `${sec.toFixed(3)}s`;
}
