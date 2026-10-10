import { describe, it, expect } from 'vitest';
import { chooseFilmMode, STILLS_MAX_WIDTH } from '../heroFilmMode';

const base = { reducedMotion: false, width: 1440, saveData: false };

describe('chooseFilmMode', () => {
  it('plays the film on a wide screen with motion allowed', () => {
    expect(chooseFilmMode(base)).toBe('film');
  });

  it('shows stills when the user prefers reduced motion', () => {
    expect(chooseFilmMode({ ...base, reducedMotion: true })).toBe('stills');
  });

  it('shows stills when the data saver hint is on', () => {
    expect(chooseFilmMode({ ...base, saveData: true })).toBe('stills');
  });

  it('shows stills on small screens, with 768 as the last small width', () => {
    expect(STILLS_MAX_WIDTH).toBe(768);
    expect(chooseFilmMode({ ...base, width: 390 })).toBe('stills');
    expect(chooseFilmMode({ ...base, width: 768 })).toBe('stills');
    expect(chooseFilmMode({ ...base, width: 769 })).toBe('film');
  });

  it('lets any single reason win', () => {
    expect(chooseFilmMode({ reducedMotion: true, width: 390, saveData: true })).toBe('stills');
  });
});
