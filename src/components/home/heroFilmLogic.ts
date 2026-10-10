/** Maps scroll progress through the pinned section linearly to video time, clamped. */
export function progressToTime(progress: number, duration: number): number {
  if (!Number.isFinite(progress) || !Number.isFinite(duration) || duration <= 0) return 0;
  const clamped = Math.min(1, Math.max(0, progress));
  return clamped * duration;
}

/** Progress through a pinned wrapper; implemented in lib/scrollMath and shared with other sections. */
export { pinnedProgress as scrollProgress } from '@/lib/scrollMath';

/** Share of the page colour laid over the film: light while it plays, near-opaque once it is done. */
export const VEIL_MIN = 0.2;
export const VEIL_MAX = 0.92;
/** Viewport-heights of scroll after the film ends over which the veil closes. */
export const VEIL_RAMP_VH = 1.5;

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

/**
 * Share of the footage the scroll plays. The travel is only a couple of screens, so scrubbing the
 * whole clip across it raced through every shot; this plays the opening of it at a readable pace.
 */
export const FILM_PLAYBACK_SHARE = 0.35;

/** Film progress for a travel in pixels; no travel (or invalid input) reads as the first frame. */
export function filmProgressOver(scrollY: number, travelPx: number): number {
  if (![scrollY, travelPx].every(Number.isFinite) || travelPx <= 0) return 0;
  return clamp01(scrollY / travelPx) * FILM_PLAYBACK_SHARE;
}

/** Page-colour veil over the film for a travel in pixels: minimal while it plays, closing after. */
export function veilOpacityOver(scrollY: number, viewportHeight: number, travelPx: number): number {
  if (![scrollY, viewportHeight, travelPx].every(Number.isFinite) || viewportHeight <= 0) {
    return VEIL_MIN;
  }
  const t = clamp01((scrollY - travelPx) / (viewportHeight * VEIL_RAMP_VH));
  return VEIL_MIN + (VEIL_MAX - VEIL_MIN) * t;
}
