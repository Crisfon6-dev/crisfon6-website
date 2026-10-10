'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Logo } from '@/components/Logo';

const linkKeys = [
  { href: '/about', key: 'about' as const },
  { href: '/experience', key: 'experience' as const },
  { href: '/projects', key: 'projects' as const },
  { href: '/automations', key: 'automations' as const },
  { href: '/blog', key: 'blog' as const },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Body scroll lock when overlay open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const original = document.documentElement.style.overflow;
    if (mobileOpen) document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = original;
    };
  }, [mobileOpen]);

  // Dialog keyboard contract: focus in on open, Esc closes, Tab wraps, focus returns to the opener.
  useEffect(() => {
    if (!mobileOpen) return;
    const opener = menuButtonRef.current;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      opener?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[70] focus-visible:rounded-md focus-visible:bg-accent-fill focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-white"
      >
        {t.nav.skip}
      </a>
      <nav
        data-scrolled={scrolled ? 'true' : 'false'}
        className="sticky top-0 z-50 bg-warm-bg/80 backdrop-blur-lg transition-[border-color,background-color] duration-200 data-[scrolled=true]:border-b data-[scrolled=true]:border-warm-border data-[scrolled=true]:bg-warm-bg/95"
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-sp-5">
          {/* Brand */}
          <Link
            href="/"
            className="group flex h-11 items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Logo />
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {linkKeys.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Button
                  key={link.href}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={
                    isActive
                      ? 'bg-warm-bg-subtle text-warm-fg'
                      : 'text-warm-fg-muted hover:text-warm-fg'
                  }
                >
                  <Link href={link.href} aria-current={isActive ? 'page' : undefined}>
                    {t.nav[link.key]}
                  </Link>
                </Button>
              );
            })}

            <Separator orientation="vertical" className="mx-2 h-5" />

            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-warm-fg-muted hover:text-warm-fg"
            >
              <Link href="/newsletter">{t.nav.subscribe}</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/work-with-me">{t.nav.workWithMe}</Link>
            </Button>
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <button
            ref={menuButtonRef}
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-warm-fg-muted transition-colors hover:text-warm-fg md:hidden"
            onClick={openMobile}
            aria-label={t.nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileOpen ? (
        <div
          id="mobile-menu"
          ref={dialogRef}
          data-testid="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.mobileNav}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-warm-bg/98 px-sp-5 pt-sp-3 backdrop-blur-lg md:hidden"
        >
          <div className="flex items-center justify-between">
            <Logo />
            <div className="-mr-2 flex items-center">
              <LanguageToggle />
              <ThemeToggle />
              <button
                ref={closeButtonRef}
                type="button"
                className="flex h-11 w-11 items-center justify-center text-warm-fg-muted hover:text-warm-fg"
                onClick={closeMobile}
                aria-label={t.nav.closeMenu}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <nav className="mt-sp-6 flex flex-1 flex-col gap-sp-4 pb-sp-6">
            <a
              href="mailto:crisfon6@crisfon6.com"
              data-testid="mobile-menu-email"
              onClick={closeMobile}
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-sp-md bg-accent-fill px-sp-5 py-sp-3 text-base font-medium text-white"
            >
              {t.cta.emailMe} <span aria-hidden>→</span>
            </a>
            {linkKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                aria-current={pathname === link.href ? 'page' : undefined}
                className="flex min-h-11 items-center text-3xl font-medium text-warm-fg transition-transform hover:translate-x-2 hover:text-accent-text"
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <Link
              href="/work-with-me"
              onClick={closeMobile}
              className="flex min-h-11 items-center text-3xl font-medium text-warm-fg transition-transform hover:translate-x-2 hover:text-accent-text"
            >
              {t.nav.workWithMe}
            </Link>
            <Link
              href="/newsletter"
              onClick={closeMobile}
              className="mt-sp-2 inline-flex min-h-11 w-fit items-center gap-2 text-base font-medium text-warm-fg-muted hover:text-warm-fg"
            >
              {t.nav.subscribe}
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
