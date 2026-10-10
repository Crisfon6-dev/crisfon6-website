/* The plates are pre-optimized, versioned WebP files in /public, so Next's image optimizer would
   only re-encode them: a plain <img> is intentional here. */
/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from 'react';
import { Kicker } from './Kicker';
import { PLATES, type PlateId } from './plates';

type SubpageHeaderProps = {
  number: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  /** The page's still from the film; shown in a slab frame beside the title. */
  plate?: PlateId;
};

export function SubpageHeader({
  number,
  label,
  title,
  description,
  className = '',
  plate,
}: SubpageHeaderProps) {
  const text = (
    <>
      <Kicker className="mb-sp-5">
        <span>
          {number} · {label}
        </span>
      </Kicker>
      <h1
        className={`font-heading text-warm-fg ${
          plate ? 'text-[clamp(36px,5vw,72px)]' : 'text-[clamp(40px,7vw,96px)]'
        }`}
        style={{
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
    </>
  );

  return (
    <header className={`mx-auto max-w-6xl px-sp-5 pt-sp-8 pb-sp-7 ${className}`.trim()}>
      {plate ? (
        <div className="grid items-center gap-sp-7 lg:grid-cols-12">
          <div className="lg:col-span-7">{text}</div>
          <div data-testid="subpage-plate" className="slab p-sp-2 lg:col-span-5">
            <img
              src={PLATES[plate]}
              alt=""
              aria-hidden="true"
              width={1280}
              height={720}
              decoding="async"
              className="aspect-[4/3] max-h-44 h-auto w-full rounded-sp-md object-cover lg:max-h-none dark:brightness-[0.58] dark:contrast-[1.05]"
            />
          </div>
        </div>
      ) : (
        text
      )}
    </header>
  );
}
