import type { ReactNode } from 'react';

export type ChipVariant = 'default' | 'live' | 'outline' | 'accent';

type ChipProps = {
  children: ReactNode;
  variant?: ChipVariant;
  className?: string;
};

const variantClass: Record<ChipVariant, string> = {
  default: 'bg-warm-bg-subtle text-warm-fg-muted border-warm-border',
  live: 'bg-green-dim text-green border-green/30',
  outline: 'border-warm-border text-warm-fg-muted',
  accent: 'bg-accent-weak text-accent border-accent/30',
};

export function Chip({ children, variant = 'default', className = '' }: ChipProps) {
  const base =
    'inline-flex items-center gap-1.5 rounded-sp-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] leading-none';
  const merged = `${base} ${variantClass[variant]} ${className}`.trim();
  return (
    <span className={merged}>
      {variant === 'live' ? (
        <span
          aria-hidden
          className="pulse-dot inline-block h-[5px] w-[5px] rounded-full bg-green"
        />
      ) : null}
      {children}
    </span>
  );
}
