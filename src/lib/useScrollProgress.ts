import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { centerProgress, passProgress } from './scrollMath';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

type Options = {
  /** Edge-based pass: starts when the top reaches `startAt`, ends when the bottom reaches `endAt`. */
  startAt?: number;
  endAt?: number;
  /** Center-based pass (wins over the edge options): center from `centerFrom` to `centerTo`. */
  centerFrom?: number;
  centerTo?: number;
};

/**
 * Progress (0..1) of an element passing through the viewport.
 * It starts at 1 (the finished state), so the server render and no-JS visitors see the final
 * result; with `prefers-reduced-motion: reduce` it never leaves 1.
 */
export function useScrollProgress<T extends HTMLElement>({
  startAt = 0.8,
  endAt = 0.4,
  centerFrom,
  centerTo = 0.4,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(1);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION).matches;
    if (reduced) return;
    const read = () => {
      const rect = el.getBoundingClientRect();
      setProgress(
        centerFrom !== undefined
          ? centerProgress(rect.top, rect.height, window.innerHeight, centerFrom, centerTo)
          : passProgress(rect.top, rect.height, window.innerHeight, startAt, endAt)
      );
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [startAt, endAt, centerFrom, centerTo]);

  return { ref, progress };
}
