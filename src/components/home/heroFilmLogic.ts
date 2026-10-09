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

/** The film is the page background, so its progress follows the page scroll from the very top. */
export function filmProgress(scrollY: number, viewportHeight: number, travelVh: number): number {
  if (![scrollY, viewportHeight, travelVh].every(Number.isFinite)) return 0;
  const travel = viewportHeight * travelVh;
  if (travel <= 0) return 0;
  return Math.min(1, Math.max(0, scrollY / travel));
}

/** Share of the page colour laid over the film: light while it plays, near-opaque once it is done. */
export const VEIL_MIN = 0.2;
export const VEIL_MAX = 0.92;
/** Viewport-heights of scroll after the film ends over which the veil closes. */
export const VEIL_RAMP_VH = 1.5;

export function veilOpacity(scrollY: number, viewportHeight: number, travelVh: number): number {
  if (![scrollY, viewportHeight, travelVh].every(Number.isFinite) || viewportHeight <= 0) {
    return VEIL_MIN;
  }
  const past = (scrollY - viewportHeight * travelVh) / (viewportHeight * VEIL_RAMP_VH);
  const t = Math.min(1, Math.max(0, past));
  return VEIL_MIN + (VEIL_MAX - VEIL_MIN) * t;
}

/** Left-side shade that keeps the hero text readable on the first screen, gone one screen down. */
export function heroShadeOpacity(scrollY: number, viewportHeight: number): number {
  if (![scrollY, viewportHeight].every(Number.isFinite) || viewportHeight <= 0) return 0;
  return Math.min(1, Math.max(0, 1 - scrollY / viewportHeight));
}
