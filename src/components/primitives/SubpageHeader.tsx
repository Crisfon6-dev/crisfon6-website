import type { ReactNode } from 'react';
import { Kicker } from './Kicker';

type SubpageHeaderProps = {
  number: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SubpageHeader({
  number,
  label,
  title,
  description,
  className = '',
}: SubpageHeaderProps) {
  return (
    <header className={`mx-auto max-w-6xl px-sp-5 pt-sp-8 pb-sp-7 ${className}`.trim()}>
      <Kicker className="mb-sp-5">
        <span>
          {number} · {label}
        </span>
      </Kicker>
      <h1
        className="font-heading text-warm-fg"
        style={{
          fontSize: 'clamp(40px, 7vw, 96px)',
          letterSpacing: '-0.03em',
          lineHeight: '0.95',
          fontWeight: 600,
        }}
      >
        {title}
      </h1>
      {description ? (
        <p className="mt-sp-5 max-w-2xl text-base leading-relaxed text-warm-fg-muted">
          {description}
        </p>
      ) : null}
    </header>
  );
}
