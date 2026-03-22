import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="font-mono text-sm text-slate-300">crisfon6.com</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              I ship FinTech at scale and build AI automations in public. Templates, blueprints, and lessons every week.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-3">Navigate</h4>
            <div className="space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/projects", label: "Projects" },
                { href: "/automations", label: "Automations" },
                { href: "/blog", label: "Blog" },
                { href: "/newsletter", label: "Newsletter" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-3">Connect</h4>
            <div className="space-y-2">
              {[
                { href: "https://linkedin.com/in/crisfon6", label: "LinkedIn" },
                { href: "https://x.com/crisfon6", label: "X / Twitter" },
                { href: "https://github.com/CristhianFonseca", label: "GitHub" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Cristhian Fonseca. All rights reserved.
          </p>
          <p className="text-xs text-slate-700 font-mono">// built with Next.js + Vercel</p>
        </div>
      </div>
    </footer>
  );
}
