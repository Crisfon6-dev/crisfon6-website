'use client';

import { useEffect, useRef } from 'react';
import { documentProgress } from '@/lib/scrollMath';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * The film's coral line, running down the page margin on wide screens and filling as you read.
 * It is decoration only: hidden from assistive tech, and fully drawn with reduced motion.
 */
export function Spine() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(REDUCED_MOTION).matches;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const progress = reduced
        ? 1
        : documentProgress(
            window.scrollY,
            document.documentElement.scrollHeight,
            window.innerHeight
          );
      el.style.setProperty('--spine', String(progress));
    };
    read();
    if (reduced) return;
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      data-testid="spine"
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 top-0 z-0 hidden w-px bg-warm-border xl:block"
      style={{ left: 'calc((100vw - 72rem) / 2 - 1.25rem)' }}
    >
      <div
        className="absolute inset-x-0 top-0 h-full origin-top bg-accent"
        style={{ transform: 'scaleY(var(--spine, 0))' }}
      />
      {reduced ? null : (
        <span
          data-testid="spine-dot"
          className="absolute -left-[3px] size-[7px] rounded-full bg-accent shadow-[0_0_0_4px_rgb(217_119_87/0.18)]"
          style={{ top: 'calc(var(--spine, 0) * 100%)' }}
        />
      )}
    </div>
  );
}
