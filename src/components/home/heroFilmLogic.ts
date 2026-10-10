/** Maps scroll progress through the pinned section linearly to video time, clamped. */
export function progressToTime(progress: number, duration: number): number {
  if (!Number.isFinite(progress) || !Number.isFinite(duration) || duration <= 0) return 0;
  const clamped = Math.min(1, Math.max(0, progress));
  return clamped * duration;
}

/** Progress through a pinned wrapper; implemented in lib/scrollMath and shared with other sections. */
export { pinnedProgress as scrollProgress } from '@/lib/scrollMath';

/**
 * Share of the page colour laid over the film. Light while the introduction plays, a steady
 * reading level for the body (headings sit straight on the film there), and near-opaque once the
 * page content ends and the footer takes over.
 */
export const VEIL_MIN = 0.2;
export const VEIL_READING = 0.55;
export const VEIL_MAX = 0.92;
/** Viewport-heights of scroll the introduction keeps the light veil for, then the rise to reading. */
export const VEIL_READING_START_VH = 1;
export const VEIL_READING_RAMP_VH = 0.8;
/** Viewport-heights of scroll after the page content ends over which the veil closes. */
export const VEIL_RAMP_VH = 0.35;

/** Share of a viewport the hero shade holds at full strength: the hero text is still on screen. */
export const HERO_SHADE_HOLD_VH = 0.3;

/**
 * Left-side shade that keeps the hero text readable: full strength while the hero text is under it,
 * then fading out so it is gone one viewport down.
 */
export function heroShadeOpacity(scrollY: number, viewportHeight: number): number {
  if (![scrollY, viewportHeight].every(Number.isFinite) || viewportHeight <= 0) return 0;
  const faded = 1 - scrollY / viewportHeight;
  return Math.min(1, Math.max(0, faded / (1 - HERO_SHADE_HOLD_VH)));
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * The scroll distance the film plays over. The film is fixed behind the sections it wraps, so it
 * has played through once the wrapper's bottom reaches the bottom of the viewport.
 */
export function filmTravelPx(wrapperHeight: number, viewportHeight: number): number {
  if (![wrapperHeight, viewportHeight].every(Number.isFinite)) return 0;
  return Math.max(0, wrapperHeight - viewportHeight);
}

/** Film progress for a travel in pixels; no travel (or invalid input) reads as the first frame. */
export function filmProgressOver(scrollY: number, travelPx: number): number {
  if (![scrollY, travelPx].every(Number.isFinite) || travelPx <= 0) return 0;
  return clamp01(scrollY / travelPx);
}

/** Page-colour veil over the film for a travel in pixels: light, then reading level, then closing. */
export function veilOpacityOver(scrollY: number, viewportHeight: number, travelPx: number): number {
  if (![scrollY, viewportHeight, travelPx].every(Number.isFinite) || viewportHeight <= 0) {
    return VEIL_MIN;
  }
  const rise = clamp01(
    (scrollY - viewportHeight * VEIL_READING_START_VH) / (viewportHeight * VEIL_READING_RAMP_VH)
  );
  const reading = VEIL_MIN + (VEIL_READING - VEIL_MIN) * rise;
  const close = clamp01((scrollY - travelPx) / (viewportHeight * VEIL_RAMP_VH));
  return reading + (VEIL_MAX - reading) * close;
}
