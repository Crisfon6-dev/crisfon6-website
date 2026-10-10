export type FilmMode = 'film' | 'stills';

/** Widths up to and including this get stills instead of the scrubbed film. */
export const STILLS_MAX_WIDTH = 768;

type Env = { reducedMotion: boolean; width: number; saveData: boolean };

/** One reason is enough to skip the film: motion preference, data saver or a small screen. */
export function chooseFilmMode({ reducedMotion, width, saveData }: Env): FilmMode {
  return reducedMotion || saveData || width <= STILLS_MAX_WIDTH ? 'stills' : 'film';
}
