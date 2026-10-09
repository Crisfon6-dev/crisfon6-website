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

/** Intrinsic size of the poster and stills, so images reserve their space (no layout shift). */
export const FILM_FRAME = { width: 1280, height: 720 } as const;

/** Film length in seconds; used until the video reports its real duration. */
export const FILM_DURATION_SECONDS = 28;

/** Viewport-heights of scroll the pinned stage lasts (one per shot of the Visual Story). */
export const FILM_TRAVEL_VH = 7;
