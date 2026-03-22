@AGENTS.md

# crisfon6-website

Personal website & AI automation portfolio — crisfon6.com

## Commands

```bash
npm run dev          # Start dev server (Turbopack, http://localhost:3000)
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint (flat config, eslint.config.mjs)
npm run type-check   # TypeScript type checking (tsc --noEmit)
npm run test         # Vitest unit/component tests (single run)
npm run test:watch   # Vitest in watch mode
npm run test:e2e     # Playwright E2E tests (builds app first)
npm run test:e2e:ui  # Playwright interactive UI mode
```

## Architecture

Next.js 16 App Router with `src/` directory.

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Geist fonts, Navbar, Footer)
│   ├── page.tsx            # Home — hero, stats, featured projects, newsletter CTA
│   ├── globals.css         # Tailwind v4 @theme tokens, custom utilities
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── automations/page.tsx
│   ├── blog/page.tsx
│   └── newsletter/page.tsx
└── components/
    ├── Navbar.tsx           # Client component — sticky nav, mobile menu
    └── Footer.tsx           # Server component — links, social
```

## Code Style

- **Dark theme**: slate-900 background, blue-400/600 accent. All UI defaults to dark.
- **Tailwind v4**: Uses `@theme inline` block in `globals.css` for design tokens.
- **Geist fonts**: Sans (`--font-geist-sans`) + Mono (`--font-geist-mono`) via `next/font/google`.
- **Import alias**: `@/*` maps to `./src/*`.
- **Components**: Named exports (`export function Navbar`), not default exports.
- **`'use client'`** only where needed (Navbar uses hooks). Default to Server Components.

## Gotchas

- Next.js 16: All request APIs are async — `await cookies()`, `await headers()`, `await params`.
- Tailwind v4: No `tailwind.config.js` — tokens defined in `globals.css` via `@theme inline`.
- ESLint v9 flat config — `eslint.config.mjs`, not `.eslintrc`.
