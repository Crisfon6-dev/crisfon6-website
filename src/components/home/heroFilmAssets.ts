/** Versioned names so a changed asset gets a new URL and `/hero/*` can be cached for a year. */
export const HERO_FILM_ASSETS = {
  video: '/hero/hero-v2-desktop.mp4',
  poster: '/hero/hero-v1-poster.webp',
  /** One still per chapter that has its own shot; the blueprint chapter uses the poster. */
  stills: [
    { id: 'compute', src: '/hero/hero-v1-compute.webp' },
    { id: 'data', src: '/hero/hero-v1-data.webp' },
    { id: 'agents', src: '/hero/hero-v1-agents.webp' },
    { id: 'delivery', src: '/hero/hero-v1-delivery.webp' },
    { id: 'reveal', src: '/hero/hero-v1-reveal.webp' },
  ],
} as const;

/**
 * The same seven shots graded for dark mode: a deep warm-black base with coral light on the cables.
 * Light mode keeps the footage above; the chapter ids match so either set can drive the film.
 */
export const HERO_FILM_ASSETS_NIGHT = {
  video: '/hero/hero-night-v1-desktop.mp4',
  poster: '/hero/hero-night-v1-poster.webp',
  stills: [
    { id: 'compute', src: '/hero/hero-night-v1-compute.webp' },
    { id: 'data', src: '/hero/hero-night-v1-data.webp' },
    { id: 'agents', src: '/hero/hero-night-v1-agents.webp' },
    { id: 'delivery', src: '/hero/hero-night-v1-delivery.webp' },
    { id: 'reveal', src: '/hero/hero-night-v1-reveal.webp' },
  ],
} as const;

/** The footage for a resolved theme; anything but `dark` (including not yet known) is the light set. */
export function heroFilmAssetsFor(resolvedTheme: string | undefined) {
  return resolvedTheme === 'dark' ? HERO_FILM_ASSETS_NIGHT : HERO_FILM_ASSETS;
}

/** Film length in seconds; used until the video reports its real duration. */
export const FILM_DURATION_SECONDS = 28;
