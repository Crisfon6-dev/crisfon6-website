"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Logo } from "@/components/Logo";

const linkKeys = [
  { href: "/about", key: "about" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/automations", key: "automations" as const },
  { href: "/blog", key: "blog" as const },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface-0/90 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="group hover:opacity-80 transition-opacity">
          <Logo />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
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
                    ? "text-text-primary bg-surface-2"
                    : "text-text-tertiary hover:text-text-secondary"
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
            className="text-text-tertiary hover:text-text-secondary"
          >
            <a
              href="https://www.linkedin.com/in/crisfon6/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href="/newsletter">{t.nav.subscribe}</Link>
          </Button>
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-tertiary hover:text-text-primary transition-colors p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface-0/95 backdrop-blur-lg px-6 py-3 space-y-1">
          {linkKeys.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                asChild
                className={`w-full justify-start ${
                  isActive
                    ? "text-text-primary bg-surface-2"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                <Link href={link.href} onClick={() => setMobileOpen(false)}>
                  {t.nav[link.key]}
                </Link>
              </Button>
            );
          })}
          <Button
            variant="default"
            size="sm"
            asChild
            className="w-full justify-start"
          >
            <Link href="/newsletter" onClick={() => setMobileOpen(false)}>
              {t.nav.subscribe}
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
