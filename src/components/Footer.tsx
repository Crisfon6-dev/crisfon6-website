"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/i18n/LanguageProvider";

const navKeys = [
  { href: "/about", key: "about" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/automations", key: "automations" as const },
  { href: "/blog", key: "blog" as const },
  { href: "/newsletter", key: "subscribe" as const },
];

const social = [
  {
    href: "mailto:crisfon6@crisfon6.com",
    label: "crisfon6@crisfon6.com",
    external: false,
  },
  {
    href: "https://www.linkedin.com/in/crisfon6/",
    label: "LinkedIn",
    external: true,
  },
  { href: "https://github.com/Crisfon6-dev", label: "GitHub", external: true },
  {
    href: "https://www.instagram.com/crisfon6/",
    label: "Instagram",
    external: true,
  },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border blueprint-grid">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-3">
              <Logo />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-3 tracking-widest">
                {t.footer.pages}
              </p>
              <div className="space-y-2">
                {navKeys.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t.nav[link.key]}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-3 tracking-widest">
                {t.footer.connect}
              </p>
              <div className="space-y-2">
                {social.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="mt-10 mb-6" />

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Cristhian Fonseca
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Next.js + Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
