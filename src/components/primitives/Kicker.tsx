import type { ReactNode } from 'react';

type KickerProps = {
  children: ReactNode;
  dot?: boolean;
  accent?: boolean;
  className?: string;
};

export function Kicker({ children, dot = false, accent = false, className = '' }: KickerProps) {
  const base =
    'inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] leading-none';
  const tone = accent ? 'text-accent' : 'text-warm-fg-muted';
  const merged = `${base} ${tone} ${className}`.trim();
  return (
    <span className={merged}>
      {dot ? (
        <span
          aria-hidden
          className="pulse-dot inline-block h-[6px] w-[6px] rounded-full bg-accent"
        />
      ) : null}
      {children}
    </span>
  );
}
