const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** True when the user asked for less motion. Safe where `matchMedia` does not exist (tests, old engines). */
export function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION).matches;
}

/** Subscribe to the things that can change a viewport-dependent layout choice. */
export function subscribeViewport(onChange: () => void): () => void {
  window.addEventListener('resize', onChange);
  const query = typeof window.matchMedia === 'function' ? window.matchMedia(REDUCED_MOTION) : null;
  query?.addEventListener?.('change', onChange);
  return () => {
    window.removeEventListener('resize', onChange);
    query?.removeEventListener?.('change', onChange);
  };
}
