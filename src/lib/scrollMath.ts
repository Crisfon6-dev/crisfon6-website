/** Clamps to 0..1; anything not finite becomes 0. */
export function clamp01(value: number): number {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}

/**
 * Progress (0..1) of an element passing through the viewport.
 * It starts when the element's top reaches `startAt` of the viewport height and ends when its
 * bottom reaches `endAt` (both measured from the viewport top).
 */
export function passProgress(
  rectTop: number,
  rectHeight: number,
  viewportHeight: number,
  startAt = 0.8,
  endAt = 0.4
): number {
  if (![rectTop, rectHeight, viewportHeight, startAt, endAt].every(Number.isFinite)) return 0;
  const travel = viewportHeight * (startAt - endAt) + rectHeight;
  if (travel <= 0) return 0;
  return clamp01((viewportHeight * startAt - rectTop) / travel);
}

/**
 * Staggered progress for one of `count` sequential segments (for example the paths of a drawing).
 * Segment 0 starts first and the last one ends exactly at overall progress 1; windows overlap by `overlap`.
 */
export function segmentProgress(progress: number, index: number, count: number, overlap = 0.15) {
  if (count <= 1) return clamp01(progress);
  const width = Math.min(1, 1 / count + overlap);
  const start = (index * (1 - width)) / (count - 1);
  return clamp01((progress - start) / width);
}

/** Opacity of word `index` of `total` as a left-to-right reveal; every word stays in the DOM. */
export function wordOpacity(index: number, total: number, progress: number, min = 0.15): number {
  if (total <= 0) return 1;
  // same as (progress - index / total) * total, but exact at integer boundaries
  const t = clamp01(progress * total - index);
  return min * (1 - t) + t;
}

/**
 * Progress (0..1) through a pinned wrapper, from its top edge's position.
 * The pinned stage can travel `wrapperHeight - viewportHeight` pixels.
 */
export function pinnedProgress(
  rectTop: number,
  wrapperHeight: number,
  viewportHeight: number
): number {
  if (![rectTop, wrapperHeight, viewportHeight].every(Number.isFinite)) return 0;
  const travel = wrapperHeight - viewportHeight;
  if (travel <= 0) return 0;
  return clamp01(-rectTop / travel);
}

/**
 * Progress (0..1) from the element's CENTER position: 0 when the center is at `from` of the
 * viewport height (measured from the top), 1 when it reaches `to`. Use it for content that must
 * finish animating while it is still in the middle of the screen, not after it has scrolled away.
 */
export function centerProgress(
  rectTop: number,
  rectHeight: number,
  viewportHeight: number,
  from = 0.85,
  to = 0.4
): number {
  if (![rectTop, rectHeight, viewportHeight, from, to].every(Number.isFinite)) return 0;
  const span = viewportHeight * (from - to);
  if (span <= 0) return 0;
  const center = rectTop + rectHeight / 2;
  return clamp01((viewportHeight * from - center) / span);
}

/** How far down the whole page the reader is, 0 at the top and 1 at the very bottom. */
export function documentProgress(
  scrollY: number,
  scrollHeight: number,
  viewportHeight: number
): number {
  if (![scrollY, scrollHeight, viewportHeight].every(Number.isFinite)) return 0;
  const travel = scrollHeight - viewportHeight;
  if (travel <= 0) return 1;
  return clamp01(scrollY / travel);
}
