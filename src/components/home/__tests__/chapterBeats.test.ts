import { describe, it, expect } from 'vitest';
import {
  ALL_BEATS_VISIBLE,
  BEAT_THRESHOLDS,
  beatVisibility,
  chapterProgress,
} from '../chapterBeats';

describe('chapterProgress', () => {
  const chapter = { from: 0.4, to: 0.6 };

  it('is 0 at the start and 1 at the end of the window', () => {
    expect(chapterProgress(0.4, chapter)).toBe(0);
    expect(chapterProgress(0.6, chapter)).toBe(1);
  });

  it('is linear inside the window', () => {
    expect(chapterProgress(0.5, chapter)).toBeCloseTo(0.5, 10);
  });

  it('clamps outside the window', () => {
    expect(chapterProgress(0, chapter)).toBe(0);
    expect(chapterProgress(9, chapter)).toBe(1);
  });

  it('reads non-finite progress and empty windows as 0', () => {
    expect(chapterProgress(Number.NaN, chapter)).toBe(0);
    expect(chapterProgress(Number.NEGATIVE_INFINITY, chapter)).toBe(0);
    expect(chapterProgress(0.5, { from: 0.5, to: 0.5 })).toBe(0);
    expect(chapterProgress(0.5, { from: 0.6, to: 0.4 })).toBe(0);
  });
});

describe('beatVisibility', () => {
  it('shows the problem on entry, so a chapter never opens as an empty panel', () => {
    expect(beatVisibility(0, true)).toEqual({ problem: true, decision: false, result: false });
  });

  it('reveals the beats in order as progress grows', () => {
    expect(beatVisibility(0.2, true)).toEqual({ problem: true, decision: false, result: false });
    expect(beatVisibility(0.4, true)).toEqual({ problem: true, decision: true, result: false });
    expect(beatVisibility(0.9, true)).toEqual({ problem: true, decision: true, result: true });
  });

  it('shows a beat exactly on its threshold', () => {
    expect(beatVisibility(BEAT_THRESHOLDS.problem, true).problem).toBe(true);
    expect(beatVisibility(BEAT_THRESHOLDS.decision, true).decision).toBe(true);
    expect(beatVisibility(BEAT_THRESHOLDS.result, true).result).toBe(true);
    expect(beatVisibility(BEAT_THRESHOLDS.result - 0.001, true).result).toBe(false);
  });

  it('never shows a decision when the case has none', () => {
    expect(beatVisibility(1, false)).toEqual({ problem: true, decision: false, result: true });
  });

  it('treats non-finite progress as the start', () => {
    expect(beatVisibility(Number.NaN, true)).toEqual({
      problem: true,
      decision: false,
      result: false,
    });
  });

  it('exposes an all-visible value for reduced motion and stills', () => {
    expect(ALL_BEATS_VISIBLE).toEqual({ problem: true, decision: true, result: true });
  });
});
