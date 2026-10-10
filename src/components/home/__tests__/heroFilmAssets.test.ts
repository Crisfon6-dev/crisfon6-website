import { describe, it, expect } from 'vitest';
import { HERO_FILM_ASSETS, HERO_FILM_ASSETS_NIGHT, heroFilmAssetsFor } from '../heroFilmAssets';

describe('hero film assets by theme', () => {
  it('has a night set with the same chapters as the light set, on different files', () => {
    expect(HERO_FILM_ASSETS_NIGHT.stills.map((s) => s.id)).toEqual(
      HERO_FILM_ASSETS.stills.map((s) => s.id)
    );
    expect(HERO_FILM_ASSETS_NIGHT.video).not.toBe(HERO_FILM_ASSETS.video);
    expect(HERO_FILM_ASSETS_NIGHT.poster).not.toBe(HERO_FILM_ASSETS.poster);
    for (const still of HERO_FILM_ASSETS_NIGHT.stills) {
      const light = HERO_FILM_ASSETS.stills.find((s) => s.id === still.id)!;
      expect(still.src).not.toBe(light.src);
    }
  });

  it('serves the night set only when the resolved theme is dark', () => {
    expect(heroFilmAssetsFor('dark')).toBe(HERO_FILM_ASSETS_NIGHT);
    expect(heroFilmAssetsFor('light')).toBe(HERO_FILM_ASSETS);
    expect(heroFilmAssetsFor(undefined)).toBe(HERO_FILM_ASSETS);
    expect(heroFilmAssetsFor('system')).toBe(HERO_FILM_ASSETS);
  });
});
