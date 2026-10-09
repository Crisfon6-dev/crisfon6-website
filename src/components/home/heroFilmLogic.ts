export type FilmOverlay = { factIndex: number; from: number; to: number };

/** Maps scroll progress through the pinned section linearly to video time, clamped. */
export function progressToTime(progress: number, duration: number): number {
  if (!Number.isFinite(progress) || !Number.isFinite(duration) || duration <= 0) return 0;
  const clamped = Math.min(1, Math.max(0, progress));
  return clamped * duration;
}

/** Returns the overlay whose [from, to) window contains the progress, or null. */
export function activeOverlay(
  progress: number,
  overlays: readonly FilmOverlay[]
): FilmOverlay | null {
  if (!Number.isFinite(progress)) return null;
  return overlays.find((o) => progress >= o.from && progress < o.to) ?? null;
}

/** Progress through a pinned wrapper; implemented in lib/scrollMath and shared with other sections. */
export { pinnedProgress as scrollProgress } from '@/lib/scrollMath';
