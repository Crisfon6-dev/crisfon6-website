import Link from "next/link";

const nav = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/automations", label: "Automations" },
  { href: "/blog", label: "Blog" },
  { href: "/newsletter", label: "Newsletter" },
];

const social = [
  { href: "https://linkedin.com/in/crisfon6", label: "LinkedIn" },
  { href: "https://x.com/crisfon6", label: "X" },
  { href: "https://github.com/CristhianFonseca", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-border blueprint-grid">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              <span className="font-mono text-sm text-text-secondary tracking-tight">
                crisfon6
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              FinTech at scale by day. AI automations in public by night.
              Blueprints you can deploy, every week.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p className="text-xs font-mono text-text-muted mb-3 tracking-wider">
                PAGES
              </p>
              <div className="space-y-2">
                {nav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-text-tertiary hover:text-text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-text-muted mb-3 tracking-wider">
                CONNECT
              </p>
              <div className="space-y-2">
                {social.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-text-tertiary hover:text-text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Cristhian Fonseca
          </p>
          <p className="text-xs text-text-muted font-mono">
            Next.js + Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
