import { describe, it, expect } from 'vitest';
import {
  centerProgress,
  clamp01,
  passProgress,
  pinnedProgress,
  segmentProgress,
  wordOpacity,
} from '../scrollMath';

describe('clamp01', () => {
  it('clamps to 0..1 and maps non-finite values to 0', () => {
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(0.4)).toBe(0.4);
    expect(clamp01(3)).toBe(1);
    expect(clamp01(Number.NaN)).toBe(0);
  });
});

describe('passProgress', () => {
  // viewport 1000px, element 1000px tall; starts when its top reaches 80% of the viewport
  // and ends when its bottom reaches 40%: 400 + 1000 = 1400px of travel
  it('is 0 until the top reaches the start line', () => {
    expect(passProgress(800, 1000, 1000)).toBe(0);
    expect(passProgress(1200, 1000, 1000)).toBe(0);
  });

  it('is 1 once the bottom has passed the end line', () => {
    expect(passProgress(-600, 1000, 1000)).toBe(1);
    expect(passProgress(-2000, 1000, 1000)).toBe(1);
  });

  it('is linear in between', () => {
    expect(passProgress(100, 1000, 1000)).toBe(0.5);
  });

  it('honors custom start and end lines', () => {
    // start at 100% of the viewport, end at 0%: travel = 1000 + h
    expect(passProgress(1000, 500, 1000, 1, 0)).toBe(0);
    expect(passProgress(-500, 500, 1000, 1, 0)).toBe(1);
  });

  it('is 0 for non-finite inputs or a zero-length path', () => {
    expect(passProgress(Number.NaN, 1000, 1000)).toBe(0);
    expect(passProgress(0, 0, 0)).toBe(0);
  });
});

describe('segmentProgress', () => {
  it('is 0 for every segment at the start and 1 for every segment at the end', () => {
    for (let i = 0; i < 4; i++) {
      expect(segmentProgress(0, i, 4)).toBe(0);
      expect(segmentProgress(1, i, 4)).toBe(1);
    }
  });

  it('draws segments in order: earlier ones finish first', () => {
    const p = 0.5;
    const values = [0, 1, 2, 3].map((i) => segmentProgress(p, i, 4));
    for (let i = 1; i < values.length; i++) {
      expect(values[i - 1]).toBeGreaterThanOrEqual(values[i]);
    }
    expect(values[0]).toBeGreaterThan(values[3]);
  });

  it('keeps a single segment equal to the overall progress', () => {
    expect(segmentProgress(0.3, 0, 1)).toBeCloseTo(0.3, 10);
  });
});

describe('wordOpacity', () => {
  it('shows every word dimmed at progress 0 and fully at progress 1', () => {
    for (let i = 0; i < 5; i++) {
      expect(wordOpacity(i, 5, 0)).toBeCloseTo(0.15, 10);
      expect(wordOpacity(i, 5, 1)).toBe(1);
    }
  });

  it('reveals words left to right', () => {
    const values = [0, 1, 2, 3, 4].map((i) => wordOpacity(i, 5, 0.5));
    for (let i = 1; i < values.length; i++) {
      expect(values[i - 1]).toBeGreaterThanOrEqual(values[i]);
    }
    expect(values[0]).toBe(1);
    expect(values[4]).toBeCloseTo(0.15, 10);
  });
});

describe('pinnedProgress', () => {
  // wrapper 6400px tall, viewport 800px: 5600px of travel
  it('is 0 at or before the start and 1 once the travel is used up', () => {
    expect(pinnedProgress(300, 6400, 800)).toBe(0);
    expect(pinnedProgress(0, 6400, 800)).toBe(0);
    expect(pinnedProgress(-5600, 6400, 800)).toBe(1);
    expect(pinnedProgress(-9000, 6400, 800)).toBe(1);
  });

  it('is linear in between', () => {
    expect(pinnedProgress(-2800, 6400, 800)).toBe(0.5);
  });

  it('is 0 without travel or with non-finite input', () => {
    expect(pinnedProgress(-100, 800, 800)).toBe(0);
    expect(pinnedProgress(Number.NaN, 6400, 800)).toBe(0);
  });
});

describe('centerProgress', () => {
  // viewport 1000, element 800 tall; its CENTER goes from 85% of the viewport (progress 0)
  // up to 40% of the viewport (progress 1): 450px of travel. center = top + 400.
  it('is 0 while the element center is at or below the start line', () => {
    expect(centerProgress(450, 800, 1000)).toBe(0); // center exactly at 850
    expect(centerProgress(900, 800, 1000)).toBe(0);
  });

  it('is 1 once the center has reached the end line', () => {
    expect(centerProgress(0, 800, 1000)).toBe(1); // center exactly at 400
    expect(centerProgress(-300, 800, 1000)).toBe(1);
  });

  it('is linear in between', () => {
    expect(centerProgress(225, 800, 1000)).toBeCloseTo(0.5, 10); // center 625, halfway between 850 and 400
  });

  it('honors custom lines (200px element, center from 50% to 20% of a 1000px viewport)', () => {
    expect(centerProgress(400, 200, 1000, 0.5, 0.2)).toBe(0); // center 500
    expect(centerProgress(250, 200, 1000, 0.5, 0.2)).toBeCloseTo(0.5, 10); // center 350
    expect(centerProgress(100, 200, 1000, 0.5, 0.2)).toBe(1); // center 200
  });

  it('is 0 for non-finite input or an inverted span', () => {
    expect(centerProgress(Number.NaN, 800, 1000)).toBe(0);
    expect(centerProgress(0, 800, 1000, 0.4, 0.85)).toBe(0);
  });
});
