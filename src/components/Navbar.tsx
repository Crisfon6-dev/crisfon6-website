'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Logo } from '@/components/Logo';
import { Badge } from '@/components/ui/badge';

const linkKeys = [
  { href: '/about', key: 'about' as const },
  { href: '/projects', key: 'projects' as const },
  { href: '/automations', key: 'automations' as const },
  { href: '/blog', key: 'blog' as const },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

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

  return (
    <>
      <nav
        data-scrolled={scrolled ? 'true' : 'false'}
        className="sticky top-0 z-50 bg-warm-bg/80 backdrop-blur-lg transition-[border-color,background-color] duration-200 data-[scrolled=true]:border-b data-[scrolled=true]:border-warm-border data-[scrolled=true]:bg-warm-bg/95"
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-sp-5">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Logo />
            <Badge
              variant="outline"
              className="hidden border-accent/30 bg-accent-weak px-2 py-0.5 font-mono text-[10px] tracking-widest text-accent md:inline-flex"
            >
              Anthropic Certified
            </Badge>
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
                  <Link href={link.href}>{t.nav[link.key]}</Link>
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
              <Link href="/work-with-me">{t.nav.workWithMe}</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/newsletter">{t.nav.subscribe}</Link>
            </Button>
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="p-1 text-warm-fg-muted transition-colors hover:text-warm-fg md:hidden"
            onClick={openMobile}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileOpen ? (
        <div
          data-testid="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[60] flex flex-col bg-warm-bg/98 px-sp-5 pt-sp-5 backdrop-blur-lg md:hidden"
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="p-2 text-warm-fg-muted hover:text-warm-fg"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="mt-sp-7 flex flex-1 flex-col gap-sp-5">
            {linkKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="text-3xl font-medium text-warm-fg transition-transform hover:translate-x-2 hover:text-accent"
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <Link
              href="/work-with-me"
              onClick={closeMobile}
              className="text-3xl font-medium text-warm-fg transition-transform hover:translate-x-2 hover:text-accent"
            >
              {t.nav.workWithMe}
            </Link>
            <Link
              href="/newsletter"
              onClick={closeMobile}
              className="mt-sp-4 inline-flex w-fit items-center gap-2 rounded-sp-md bg-accent px-sp-5 py-sp-3 text-base font-medium text-white"
            >
              {t.nav.subscribe}
            </Link>
          </nav>

          <div className="flex items-center gap-sp-3 border-t border-warm-border py-sp-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </>
  );
}
