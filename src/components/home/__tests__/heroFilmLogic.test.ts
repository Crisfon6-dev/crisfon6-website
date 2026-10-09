import { describe, it, expect } from 'vitest';
import { progressToTime, activeOverlay, scrollProgress, type FilmOverlay } from '../heroFilmLogic';

describe('progressToTime', () => {
  it('maps the endpoints to 0 and the duration', () => {
    expect(progressToTime(0, 28)).toBe(0);
    expect(progressToTime(1, 28)).toBe(28);
  });

  it('maps linearly in between', () => {
    expect(progressToTime(0.5, 28)).toBe(14);
    expect(progressToTime(0.25, 28)).toBe(7);
  });

  it('clamps progress below 0 and above 1', () => {
    expect(progressToTime(-0.4, 28)).toBe(0);
    expect(progressToTime(1.7, 28)).toBe(28);
  });

  it('returns 0 for a non-finite progress or a non-positive duration', () => {
    expect(progressToTime(Number.NaN, 28)).toBe(0);
    expect(progressToTime(0.5, 0)).toBe(0);
    expect(progressToTime(0.5, -3)).toBe(0);
    expect(progressToTime(0.5, Number.NaN)).toBe(0);
  });
});

describe('activeOverlay', () => {
  const overlays: readonly FilmOverlay[] = [
    { factIndex: 2, from: 0.3, to: 0.4 },
    { factIndex: 3, from: 0.45, to: 0.55 },
  ];

  it('returns the overlay whose window contains the progress', () => {
    expect(activeOverlay(0.35, overlays)).toEqual(overlays[0]);
    expect(activeOverlay(0.5, overlays)).toEqual(overlays[1]);
  });

  it('includes the start boundary and excludes the end boundary', () => {
    expect(activeOverlay(0.3, overlays)).toEqual(overlays[0]);
    expect(activeOverlay(0.4, overlays)).toBeNull();
  });

  it('returns null in the gaps and outside the film', () => {
    expect(activeOverlay(0.1, overlays)).toBeNull();
    expect(activeOverlay(0.42, overlays)).toBeNull();
    expect(activeOverlay(0.9, overlays)).toBeNull();
    expect(activeOverlay(-1, overlays)).toBeNull();
    expect(activeOverlay(2, overlays)).toBeNull();
  });

  it('returns null for a non-finite progress or an empty list', () => {
    expect(activeOverlay(Number.NaN, overlays)).toBeNull();
    expect(activeOverlay(0.35, [])).toBeNull();
  });
});

describe('scrollProgress', () => {
  // wrapper 6400px tall, viewport 800px: 5600px of travel
  it('is 0 while the wrapper top is at or below the viewport top', () => {
    expect(scrollProgress(0, 6400, 800)).toBe(0);
    expect(scrollProgress(300, 6400, 800)).toBe(0);
  });

  it('is 1 once the pinned travel is used up', () => {
    expect(scrollProgress(-5600, 6400, 800)).toBe(1);
    expect(scrollProgress(-9000, 6400, 800)).toBe(1);
  });

  it('is linear in between', () => {
    expect(scrollProgress(-2800, 6400, 800)).toBe(0.5);
    expect(scrollProgress(-1400, 6400, 800)).toBe(0.25);
  });

  it('is 0 when there is no travel or the inputs are not finite', () => {
    expect(scrollProgress(-100, 800, 800)).toBe(0);
    expect(scrollProgress(-100, 600, 800)).toBe(0);
    expect(scrollProgress(Number.NaN, 6400, 800)).toBe(0);
  });
});
