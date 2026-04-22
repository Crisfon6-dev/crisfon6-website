import type { ReactNode } from 'react';

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function Marquee({ children, className = '', ariaLabel }: MarqueeProps) {
  return (
    <div
      aria-label={ariaLabel}
      role={ariaLabel ? 'region' : undefined}
      className={`relative overflow-hidden ${className}`.trim()}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
      }}
    >
      <div className="marquee-track inline-flex w-max gap-sp-5 whitespace-nowrap py-sp-3">
        <div aria-hidden="false" className="inline-flex items-center gap-sp-5">
          {children}
        </div>
        <div aria-hidden="true" className="inline-flex items-center gap-sp-5">
          {children}
        </div>
      </div>
    </div>
  );
}
