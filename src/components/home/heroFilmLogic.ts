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

/**
 * Progress (0..1) through a pinned wrapper, from its top edge's position.
 * The pinned stage can travel `wrapperHeight - viewportHeight` pixels.
 */
export function scrollProgress(
  rectTop: number,
  wrapperHeight: number,
  viewportHeight: number
): number {
  if (![rectTop, wrapperHeight, viewportHeight].every(Number.isFinite)) return 0;
  const travel = wrapperHeight - viewportHeight;
  if (travel <= 0) return 0;
  return Math.min(1, Math.max(0, -rectTop / travel));
}
