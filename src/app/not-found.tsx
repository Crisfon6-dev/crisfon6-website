import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-start justify-center px-sp-5 py-sp-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-muted">404</p>
      <h1
        className="mt-sp-3 font-heading text-warm-fg"
        style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          letterSpacing: '-0.03em',
          lineHeight: 0.98,
          fontWeight: 600,
        }}
      >
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-sp-4 max-w-xl text-base text-warm-fg-muted">
        The link may be old, or the address mistyped. Here is where the work is.
      </p>
      <div className="mt-sp-6 flex flex-wrap gap-x-sp-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-sp-xl bg-accent-fill px-sp-5 text-sm font-medium text-white"
        >
          Home
        </Link>
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center text-sm font-medium text-accent-text hover:underline"
        >
          Projects
        </Link>
        <Link
          href="/work-with-me"
          className="inline-flex min-h-11 items-center text-sm font-medium text-accent-text hover:underline"
        >
          Work with me
        </Link>
      </div>
    </div>
  );
}
