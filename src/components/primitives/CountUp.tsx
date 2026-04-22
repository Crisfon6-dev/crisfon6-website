'use client';

import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
  suffixClassName?: string;
};

export function CountUp({
  end,
  suffix,
  duration = 1600,
  className,
  suffixClassName = 'text-accent',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timerId: ReturnType<typeof setTimeout>;
    if (reduced) {
      timerId = setTimeout(() => setValue(end), 0);
      return () => clearTimeout(timerId);
    }
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = t < 1 ? Math.floor(eased * end) : end;
      setValue(next);
      if (t < 1) timerId = setTimeout(tick, 16);
    };
    timerId = setTimeout(tick, 0);
    return () => clearTimeout(timerId);
  }, [started, end, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix ? <span className={suffixClassName}>{suffix}</span> : null}
    </span>
  );
}
