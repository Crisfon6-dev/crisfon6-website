'use client';

import { useEffect, useRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';

type RevealProps = {
  as?: ElementType;
  delay?: number;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

export function Reveal({ as, delay, children, className = '', ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (delay && delay > 0) {
            el.style.transitionDelay = `${delay * 80}ms`;
          }
          el.setAttribute('data-revealed', 'true');
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '-40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Tag = (as ?? 'div') as ElementType;
  const merged = `reveal ${className}`.trim();

  return (
    <Tag ref={ref} className={merged} {...rest}>
      {children}
    </Tag>
  );
}
