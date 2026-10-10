'use client';

import { useEffect, useState, type ReactNode } from 'react';

/**
 * A case study folded behind its header. It opens by itself when its id is in the URL hash, so a
 * link from the home page or the CV lands on the content, not on a closed row.
 */
export function CollapsibleCase({
  id,
  head,
  body,
}: {
  id: string;
  head: ReactNode;
  body: ReactNode;
}) {
  const [open, setOpen] = useState(
    () => typeof window !== 'undefined' && window.location.hash === `#${id}`
  );

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };
    sync();
    // client-side navigation changes the hash without a hashchange event, so check once more after paint
    const frame = requestAnimationFrame(sync);
    window.addEventListener('hashchange', sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', sync);
    };
  }, [id]);

  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className="group flex h-full flex-col"
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-sp-4 [&::-webkit-details-marker]:hidden">
        <div className="flex flex-1 flex-col gap-sp-4">{head}</div>
        <span
          aria-hidden
          className="mt-1 text-xl text-warm-fg-faint transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="mt-sp-4 flex flex-1 flex-col gap-sp-4">{body}</div>
    </details>
  );
}
