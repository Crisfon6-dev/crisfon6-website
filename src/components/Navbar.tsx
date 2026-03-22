"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/automations", label: "Automations" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface-0/90 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green group-hover:bg-green/80 transition-colors pulse-subtle" />
          <span className="font-mono text-sm text-text-secondary group-hover:text-text-primary transition-colors tracking-tight">
            crisfon6
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? "text-text-primary bg-surface-2"
                    : "text-text-tertiary hover:text-text-secondary hover:bg-surface-1"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="w-px h-5 bg-border-emphasis mx-2" />
          <Link
            href="/newsletter"
            className="text-sm text-accent-light hover:text-accent px-3 py-1.5 rounded-md border border-accent-dim hover:border-accent/30 transition-colors"
          >
            Subscribe
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-tertiary hover:text-text-primary transition-colors p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface-0/95 backdrop-blur-lg px-6 py-3 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-text-primary bg-surface-2"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/newsletter"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-accent-light px-3 py-2"
          >
            Subscribe
          </Link>
        </div>
      )}
    </nav>
  );
}
