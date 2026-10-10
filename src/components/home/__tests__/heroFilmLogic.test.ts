import { describe, it, expect } from 'vitest';
import {
  progressToTime,
  filmTravelPx,
  filmProgressOver,
  veilOpacityOver,
  heroShadeOpacity,
  VEIL_MIN,
  VEIL_MAX,
  VEIL_READING,
  VEIL_READING_START_VH,
  VEIL_READING_RAMP_VH,
  VEIL_RAMP_VH,
} from '../heroFilmLogic';

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

describe('heroShadeOpacity (extra left-side shade that keeps the hero text readable)', () => {
  it('is fully on at the top and fades out within one viewport of scroll', () => {
    expect(heroShadeOpacity(0, 800)).toBe(1);
    expect(heroShadeOpacity(400, 800)).toBeGreaterThan(0);
    expect(heroShadeOpacity(400, 800)).toBeLessThan(1);
    expect(heroShadeOpacity(800, 800)).toBe(0);
    expect(heroShadeOpacity(5000, 800)).toBe(0);
  });

  it('holds full strength while the hero text is still under it, then fades by one viewport', () => {
    expect(heroShadeOpacity(0.3 * 800, 800)).toBe(1);
    expect(heroShadeOpacity(0.5 * 800, 800)).toBeGreaterThan(0.7);
    expect(heroShadeOpacity(0.6 * 800, 800)).toBeGreaterThan(0.5);
    expect(heroShadeOpacity(0.9 * 800, 800)).toBeLessThan(0.2);
  });

  it('reads invalid input as no shade', () => {
    expect(heroShadeOpacity(Number.NaN, 800)).toBe(0);
    expect(heroShadeOpacity(100, 0)).toBe(0);
  });
});

describe('filmTravelPx (the scroll distance the film plays over)', () => {
  it('is the wrapper height minus one viewport, since the film is fixed behind the sections', () => {
    expect(filmTravelPx(2400, 800)).toBe(1600);
  });

  it('is 0 when the wrapper is not taller than the viewport', () => {
    expect(filmTravelPx(800, 800)).toBe(0);
    expect(filmTravelPx(300, 800)).toBe(0);
  });

  it('is 0 for non-finite input', () => {
    expect(filmTravelPx(Number.NaN, 800)).toBe(0);
    expect(filmTravelPx(2400, Number.POSITIVE_INFINITY)).toBe(0);
  });
});

describe('filmProgressOver', () => {
  it('is 0 at the top and 1 once the whole travel has been scrolled', () => {
    expect(filmProgressOver(0, 1600)).toBe(0);
    expect(filmProgressOver(1600, 1600)).toBe(1);
  });

  it('is linear in between and clamps outside the range', () => {
    expect(filmProgressOver(800, 1600)).toBe(0.5);
    expect(filmProgressOver(-40, 1600)).toBe(0);
    expect(filmProgressOver(99999, 1600)).toBe(1);
  });

  it('is 0 when there is no travel or the input is invalid', () => {
    expect(filmProgressOver(100, 0)).toBe(0);
    expect(filmProgressOver(100, -5)).toBe(0);
    expect(filmProgressOver(Number.NaN, 1600)).toBe(0);
    expect(filmProgressOver(100, Number.NaN)).toBe(0);
  });
});

describe('veilOpacityOver', () => {
  const vh = 800;
  const travel = 5600;

  it('stays at the minimum through the introduction, where the film is the star', () => {
    expect(veilOpacityOver(0, vh, travel)).toBe(VEIL_MIN);
    expect(veilOpacityOver(VEIL_READING_START_VH * vh, vh, travel)).toBe(VEIL_MIN);
  });

  it('settles at a reading level for the body, so text straight on the film stays legible', () => {
    const settled = (VEIL_READING_START_VH + VEIL_READING_RAMP_VH) * vh;
    expect(veilOpacityOver(settled, vh, travel)).toBeCloseTo(VEIL_READING, 5);
    expect(veilOpacityOver(travel / 2, vh, travel)).toBeCloseTo(VEIL_READING, 5);
    expect(veilOpacityOver(travel, vh, travel)).toBeCloseTo(VEIL_READING, 5);
  });

  it('rises between the two, not in a jump', () => {
    const mid = (VEIL_READING_START_VH + VEIL_READING_RAMP_VH / 2) * vh;
    expect(veilOpacityOver(mid, vh, travel)).toBeCloseTo((VEIL_MIN + VEIL_READING) / 2, 5);
  });

  it('keeps the film visible all the way down: the reading level is well short of opaque', () => {
    expect(VEIL_READING).toBeGreaterThan(VEIL_MIN);
    expect(VEIL_READING).toBeLessThanOrEqual(0.6);
  });

  it('closes to the maximum over VEIL_RAMP_VH viewports once the page content ends (the footer)', () => {
    expect(veilOpacityOver(travel + VEIL_RAMP_VH * vh, vh, travel)).toBeCloseTo(VEIL_MAX, 5);
    const mid = veilOpacityOver(travel + (VEIL_RAMP_VH / 2) * vh, vh, travel);
    expect(mid).toBeCloseTo((VEIL_READING + VEIL_MAX) / 2, 5);
  });

  it('is the minimum for invalid input', () => {
    expect(veilOpacityOver(Number.NaN, vh, travel)).toBe(VEIL_MIN);
    expect(veilOpacityOver(100, 0, travel)).toBe(VEIL_MIN);
    expect(veilOpacityOver(100, vh, Number.NaN)).toBe(VEIL_MIN);
  });
});
