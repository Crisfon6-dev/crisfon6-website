# crisfon6.com — Roadmap

> Authority-building platform for Cristhian Fonseca.
> Last updated: 2026-03-22

---

## Mission

Transform crisfon6.com into the go-to authority platform for AI builders and technical leaders. Build a high-value community that opens doors to CTO roles, strategic partnerships, consulting, and product launches.

## Target Audience

- **Primary**: CTOs, VPs of Engineering, senior engineers (5-10 yrs)
- **Secondary**: Technical founders, CEOs looking for AI/tech partners
- **Tertiary**: Ambitious mid-level engineers who aspire to lead

## Positioning

> "I ship FinTech at scale and build AI automations in public — with real costs, real code, and real architecture diagrams. Not theory."

---

## Site Map

```
crisfon6.com
├── / (Home)
│   ├── Hero — positioning + primary CTA
│   ├── Tech stack bar
│   ├── Stats (4+ yrs, M+ users, 10+ AWS, weekly templates)
│   ├── Automation of the week (featured blueprint)
│   ├── Featured projects (3 cards)
│   └── Dual CTA — Newsletter + Work with me
│
├── /about
│   ├── Authority narrative (not a resume)
│   ├── Core stack
│   ├── Experience timeline
│   ├── Education & certifications
│   └── CTA — Work with me + LinkedIn + Newsletter
│
├── /projects
│   ├── Project cards with results/metrics
│   └── CTA — Newsletter
│
├── /automations
│   ├── Automation template cards with costs
│   └── CTA — Newsletter
│
├── /blog
│   ├── Published posts (MDX from content/blog/)
│   ├── Upcoming posts (roadmap)
│   └── CTA — Newsletter
│
├── /blog/[slug]
│   ├── MDX content with custom components
│   ├── BlogPosting JSON-LD (AI SEO)
│   ├── Giscus comments (GitHub Discussions)
│   └── CTA — Newsletter + Work with me
│
├── /newsletter
│   ├── PowerAI value proposition
│   ├── Email capture (Beehiiv API)
│   ├── What you get (4 benefits)
│   ├── Sample topics (6 templates)
│   ├── Who is this for (3 audiences)
│   └── Final CTA — Subscribe
│
├── /work-with-me
│   ├── Strategic Conversations → LinkedIn
│   ├── Open Source & Collaboration → /automations
│   ├── Leadership Opportunities → Email
│   ├── Track record stats
│   └── CTA — Newsletter (stay connected)
│
├── /feed.xml (RSS)
├── /sitemap.xml
├── /robots.txt (AI crawlers allowed)
├── /llms.txt (AI-readable site index)
└── /llms-full.txt (full blog content for LLMs)
```

## Conversion Flows

```
VISITOR ENTRY POINTS
├── Google/AI search → Blog post → Newsletter + Work with me
├── LinkedIn share → Home → Newsletter + Work with me
├── Newsletter referral → Home → Projects → Work with me
└── Direct (resume review) → About → Work with me

NAVBAR (every page)
├── About | Projects | Automations | Blog
├── Work with me (ghost button)
└── Subscribe (primary button)

FOOTER (every page)
├── Pages: About, Projects, Automations, Blog, Subscribe, Work with me
└── Connect: Email, LinkedIn, GitHub, Instagram
```

---

## Roadmap

### Phase 1: Foundation [DONE]

- [x] CI/CD pipeline (GitHub Actions: lint, type-check, Vitest, Playwright)
- [x] Logo (code brackets hexagon + SVG favicon)
- [x] Vercel Analytics + Speed Insights
- [x] AI SEO (llms.txt, llms-full.txt, BlogPosting JSON-LD, AI crawler rules)
- [x] Giscus comments (GitHub Discussions)
- [x] Content writer agent (.claude/agents/content-writer.md)
- [x] Blog post: AI Document Processor ($12/mo)
- [x] Blog post: Agent Teams with Claude SDK

### Phase 2: Authority & Conversion [DONE]

- [x] /work-with-me page (networking, collaboration, leadership)
- [x] Copy upgrade with authority positioning (EN + ES)
- [x] Conversion flows — all pages funnel to /work-with-me + newsletter
- [x] Navbar "Work with me" link (replaces external LinkedIn)
- [x] Blog post footer dual CTA (newsletter + work with me)

### Phase 3: Discoverability & Content [NEXT]

- [ ] **Dynamic OG images** — branded social cards for blog posts and pages using Satori/next/og. When shared on LinkedIn/Twitter, show title + author + branding instead of generic preview.
- [ ] **3-5 more blog posts** — reach critical mass of content. Topics aligned with target audience:
  - "How I Architect Cloud-Native FinTech Platforms on AWS" (Architecture)
  - "Building MCP Agents That Actually Work in Production" (AI / MCP)
  - "My Full CI/CD Setup for FinTech: Push to Production" (DevOps)
  - "Optimizing 2M+ Record Queries Without Bigger Instances" (Performance)
  - "Why I Stopped Charging by the Hour" (Business)
- [ ] **Connect Beehiiv API** — set BEEHIIV_API_KEY + BEEHIIV_PUBLICATION_ID env vars so subscribers stay on-site instead of redirecting to external Beehiiv page.

### Phase 4: Social Proof & Persuasion

- [ ] **Testimonials section** — 2-3 recommendations from colleagues/managers on home and about pages. Needs real quotes from your network.
- [ ] **Lead magnet** — "The AI Automation Playbook" downloadable PDF (5 production-ready templates compiled). Upgrades newsletter conversion from "weekly email" to "immediate value".
- [ ] **Project case studies** — expand the 3 project cards into full case study pages with architecture diagrams, metrics, and lessons learned.

### Phase 5: Scale & Monetize

- [ ] **Consulting/advisory page** — when ready to monetize, add pricing, booking (Cal.com), and scope descriptions to /work-with-me.
- [ ] **Email sequences** — automated welcome sequence in Beehiiv (5 emails) that builds trust and funnels to /work-with-me.
- [ ] **Speaking page** — if pursuing conference talks, add a /speaking page with topics and past talks.
- [ ] **Community** — Discord or private Slack for PowerAI subscribers. Builds network effects.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Content | MDX files in content/blog/ |
| Newsletter | Beehiiv (external, API integration) |
| Comments | Giscus (GitHub Discussions) |
| Analytics | Vercel Analytics + Speed Insights |
| CI/CD | GitHub Actions (lint, type-check, Vitest, Playwright) |
| Deployment | Vercel (Git integration) |
| Fonts | Geist Sans + Geist Mono |
| i18n | Custom LanguageProvider (EN + ES) |

## Key Metrics to Track

| Metric | Target | How |
|--------|--------|-----|
| Newsletter subscribers | 1,000 in 3 months | Beehiiv dashboard |
| Blog posts published | 2/month minimum | content/blog/ count |
| LinkedIn connections (CTOs/founders) | 50 new/month | LinkedIn analytics |
| /work-with-me page visits | 100/month | Vercel Analytics |
| Inbound messages (email + LinkedIn) | 5/month | Manual tracking |
| AI citations (ChatGPT, Perplexity) | Increasing trend | Search your name |
