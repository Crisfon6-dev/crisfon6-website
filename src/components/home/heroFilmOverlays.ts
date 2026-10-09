import { KEY_FACTS } from '@/data/career';
import type { FilmOverlay } from './heroFilmLogic';

/** 7 equal shots, one viewport-height of scroll each (see openspec/changes/cinematic-hero). */
export const SHOT_COUNT = 7;

/** Keeps an overlay clear of the shot edges so it never straddles two shots. */
const INSET = 0.03;

function shotWindow(shot: number, factIndex: number): FilmOverlay {
  return {
    factIndex,
    from: (shot - 1) / SHOT_COUNT + INSET,
    to: shot / SHOT_COUNT - INSET,
  };
}

/**
 * Overlays reference KEY_FACTS by index and nothing else, so an unverified
 * figure cannot be shown. Shots 1, 2 and 5 intentionally have no overlay.
 */
export const HERO_FILM_OVERLAYS: readonly FilmOverlay[] = [
  shotWindow(3, 2), // compute: -43% AWS bill
  shotWindow(4, 3), // data: 30x export
  shotWindow(6, 1), // delivery: ~100K monthly users
  shotWindow(7, 0), // reveal: 5+ years
];

export function overlayText(overlay: FilmOverlay, locale: 'en' | 'es') {
  const fact = KEY_FACTS[overlay.factIndex];
  return { value: fact.value, label: fact.label[locale] };
}
