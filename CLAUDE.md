@AGENTS.md

# crisfon6-website

Authority-building platform & AI automation portfolio — crisfon6.com

## Mission & Vision

**Mission**: Build a platform that establishes Cristhian Fonseca as a recognized authority in AI and cloud engineering — attracting a high-value network of CTOs, founders, and senior engineers through genuine technical content.

**Vision**: Every decision in this project serves one goal — when a CTO, CEO, or senior engineer lands on this site, they should think: "This person has shipped real systems at scale. I want to connect with them."

**What this means for every change:**
- Content must signal **real production experience**, not theory. Use real costs, real metrics, real code.
- Copy must attract **technical decision-makers** (CTOs, VPs Eng, founders), not beginners.
- The tone is **builder-pragmatist**: "Here's what I built, here's what it costs, here's the code." No hype.
- Every page must have a clear **conversion path** to either `/newsletter` (community) or `/work-with-me` (high-value networking).
- The newsletter **PowerAI** is the core community-building tool. Protect its value.
- **Authority signals matter**: social proof, specific numbers (M+ users, $12/mo), production credentials.
- When in doubt, ask: "Would a CTO find this credible and valuable?"

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

### Content Workflow

```bash
# Create a new blog post (via content-writer agent)
# Just tell Claude: "write a post about [topic]"

# Manual: create content/blog/your-slug.mdx with frontmatter (see Blog System below)
# Verify: npm run build (checks MDX parsing + static generation)
```

## Architecture

Next.js 16 App Router with `src/` directory.

```
src/
├── app/
│   ├── layout.tsx             # Root layout (Geist fonts, Navbar, Footer, ThemeProvider, i18n)
│   ├── page.tsx               # Home — renders <HomeContent />
│   ├── globals.css            # Tailwind v4 @theme tokens, custom utilities
│   ├── icon.svg               # SVG favicon (code brackets hexagon)
│   ├── robots.ts              # robots.txt (allows AI crawlers)
│   ├── sitemap.ts             # Dynamic sitemap (static routes + blog posts)
│   ├── opengraph-image.tsx    # Dynamic OG image
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── automations/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx   # MDX blog post (SSG via generateStaticParams)
│   ├── newsletter/page.tsx
│   ├── work-with-me/page.tsx
│   ├── feed.xml/route.ts      # RSS feed (PowerAI newsletter)
│   ├── llms.txt/route.ts      # AI-readable site index
│   ├── llms-full.txt/route.ts # Full blog content for LLM ingestion
│   └── actions/subscribe.ts   # Server Action: Beehiiv newsletter subscription
├── components/
│   ├── pages/                 # Client page content components (*Content.tsx)
│   │   ├── HomeContent.tsx
│   │   ├── AboutContent.tsx
│   │   ├── ProjectsContent.tsx
│   │   ├── AutomationsContent.tsx
│   │   ├── BlogContent.tsx
│   │   ├── NewsletterContent.tsx
│   │   └── WorkWithMeContent.tsx
│   ├── ui/                    # shadcn/ui components (Button, Card, Badge, etc.)
│   ├── Navbar.tsx             # Client — sticky nav, mobile menu, i18n, theme toggle
│   ├── Footer.tsx             # Client — links, social, i18n
│   ├── Logo.tsx               # SVG logo (code brackets hexagon + wordmark)
│   ├── SubscribeForm.tsx      # Newsletter email capture (Beehiiv API)
│   ├── GiscusComments.tsx     # GitHub Discussions comments
│   ├── ThemeToggle.tsx        # Dark/light mode toggle
│   ├── LanguageToggle.tsx     # EN/ES language switch
│   ├── FadeIn.tsx             # Framer Motion scroll animation wrapper
│   └── JsonLd.tsx             # Structured data (JSON-LD) helper
├── i18n/
│   ├── messages.ts            # EN + ES translations (all UI text lives here)
│   └── LanguageProvider.tsx   # React context for language state
├── lib/
│   └── blog.ts               # getAllPosts() / getPost() — reads content/blog/*.mdx
└── mdx-components.tsx         # Custom MDX element styling
content/
└── blog/                      # MDX blog posts (file = slug)
    ├── ai-document-processor.mdx
    └── agent-teams-claude-sdk.mdx
```

## Page Component Pattern

Every route follows this pattern:
- `app/*/page.tsx` — Server Component with `Metadata` export. Renders `<*Content />`.
- `components/pages/*Content.tsx` — Client Component (`'use client'`) with `useLanguage()` hook for i18n. Contains all page UI.

This split keeps metadata server-rendered while enabling client interactivity and i18n.

## Blog System

Posts are MDX files in `content/blog/`. Required frontmatter:

```yaml
---
title: "Post Title"
excerpt: "1-2 sentence summary"
date: "YYYY-MM-DD"
readTime: "X min read"
tag: "Automation"           # Automation | Architecture | AI / MCP | DevOps | Performance | Business
tagColor: "text-green bg-green-dim"
published: true             # false = draft, excluded from listings
---
```

- `src/lib/blog.ts` reads MDX files, parses frontmatter with `gray-matter`, returns sorted posts.
- Blog post pages use `next-mdx-remote-client/rsc` for rendering.
- Each post gets `BlogPosting` JSON-LD for AI SEO.
- Use the `content-writer` agent (`.claude/agents/content-writer.md`) to create new posts.

## i18n

All UI text is in `src/i18n/messages.ts` (EN + ES). Components access translations via:

```tsx
const { t } = useLanguage();
// t.hero.heading1, t.nav.about, t.cta.dontMiss, etc.
```

When adding new text, add keys to both `en` and `es` objects in `messages.ts`.

## Code Style

- **Dark theme**: slate-900 background, blue-400/600 accent. All UI defaults to dark.
- **Tailwind v4**: Uses `@theme inline` block in `globals.css` for design tokens.
- **Geist fonts**: Sans (`--font-geist-sans`) + Mono (`--font-geist-mono`) via `next/font/google`.
- **Import alias**: `@/*` maps to `./src/*`.
- **Components**: Named exports (`export function Navbar`), not default exports.
- **`'use client'`** only where needed. Default to Server Components. Push client boundary down.
- **shadcn/ui**: UI primitives in `src/components/ui/`. Added via `npx shadcn@latest add`.

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `BEEHIIV_API_KEY` | No | Beehiiv newsletter API key. Without it, subscribe form redirects to external Beehiiv page. |
| `BEEHIIV_PUBLICATION_ID` | No | Beehiiv publication ID. Paired with API key for direct subscription. |

## Gotchas

- Next.js 16: All request APIs are async — `await cookies()`, `await headers()`, `await params`.
- Tailwind v4: No `tailwind.config.js` — tokens defined in `globals.css` via `@theme inline`.
- ESLint v9 flat config — `eslint.config.mjs`, not `.eslintrc`.
- Blog posts with `published: false` are excluded from listings, RSS, sitemap, and llms.txt.
- The `useMDXComponents` function in `mdx-components.tsx` is not a React hook despite the name — it returns a plain object. Call it at module scope, not inside async components.
