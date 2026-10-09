import { describe, it, expect } from 'vitest';
import { KEY_FACTS } from '@/data/career';
import { HERO_FILM_OVERLAYS, SHOT_COUNT, overlayText } from '../heroFilmOverlays';

describe('HERO_FILM_OVERLAYS', () => {
  it('references only existing KEY_FACTS entries', () => {
    for (const overlay of HERO_FILM_OVERLAYS) {
      expect(KEY_FACTS[overlay.factIndex], `factIndex ${overlay.factIndex}`).toBeDefined();
    }
  });

  it('has valid, ordered, non-overlapping windows inside 0..1', () => {
    let previousEnd = 0;
    for (const overlay of HERO_FILM_OVERLAYS) {
      expect(overlay.from).toBeGreaterThanOrEqual(previousEnd);
      expect(overlay.to).toBeGreaterThan(overlay.from);
      expect(overlay.to).toBeLessThanOrEqual(1);
      previousEnd = overlay.to;
    }
  });

  it('keeps each overlay inside a single shot of the approved story', () => {
    const shotOf = (p: number) => Math.min(SHOT_COUNT - 1, Math.floor(p * SHOT_COUNT));
    for (const overlay of HERO_FILM_OVERLAYS) {
      const insideEnd = overlay.to - 1e-9;
      expect(shotOf(overlay.from)).toBe(shotOf(insideEnd));
    }
  });

  it('maps the approved shots to the approved facts and leaves the others empty', () => {
    const byShot = new Map(
      HERO_FILM_OVERLAYS.map((o) => [
        Math.min(SHOT_COUNT - 1, Math.floor(o.from * SHOT_COUNT)) + 1,
        o.factIndex,
      ])
    );
    // shot 3 compute: -43% | shot 4 data: 30x | shot 6 delivery: ~100K | shot 7 reveal: 5+
    expect(Object.fromEntries(byShot)).toEqual({ 3: 2, 4: 3, 6: 1, 7: 0 });
  });
});

describe('overlayText', () => {
  it('returns exactly the fact value and bilingual label, nothing rewritten', () => {
    for (const overlay of HERO_FILM_OVERLAYS) {
      const fact = KEY_FACTS[overlay.factIndex];
      expect(overlayText(overlay, 'en')).toEqual({ value: fact.value, label: fact.label.en });
      expect(overlayText(overlay, 'es')).toEqual({ value: fact.value, label: fact.label.es });
    }
  });
});
