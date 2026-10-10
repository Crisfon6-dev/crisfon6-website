## Why

The home hero is text-only. A CTO or recruiter who lands on it gets the claim ("I build AI systems that run in production") but nothing memorable in the first five seconds. The brand is _blueprints_, so the opportunity is a short film that turns a blueprint into a running production system and reinforces the verified proof beside it.

The risk is real: AI-generated footage can look like stock slop and cost credibility with exactly this audience, and a scroll-scrubbed video can wreck Lighthouse. This change exists to do it under hard constraints, with approval gates before any credit is spent.

## What Changes

- Add a pinned, scroll-scrubbed hero film to the home page only. The H1, subtitle and CTAs are server-rendered and visible immediately; the film adds to them and never delays them.
- Produce the film with the Higgsfield MCP as ONE continuous first-person camera move through an abstract, non-photoreal production system (blueprint plane, edge layer, compute nodes, data slabs, two blind reviewer chambers plus a merger and a fixer, converging branches, aerial pull-back).
- Overlay verified facts per shot as HTML, EN and ES, sourced only from `KEY_FACTS` in `src/data/career.ts`. No text, numbers, logos, people or hands inside generated media.
- Add a gated production pipeline: tools and credit check, Visual Story approval, establishing-still approval, clip generation chained by last frame, ffmpeg master, frame-by-frame QA, delivery encodes under a size budget.
- Add a reduced-motion / no-JS fallback (static stills, no video) and a mobile 720p variant.
- Work happens on a dedicated branch, with no merge and no deploy.

No removals. Nothing here is **BREAKING**.

## Capabilities

### New Capabilities

- `cinematic-hero`: the home hero film behavior: scroll scrubbing, immediate H1/CTA render, per-shot verified-fact overlays, bilingual text, reduced-motion and no-JS fallback, mobile variant, performance and accessibility floors.
- `hero-film-pipeline`: how the media is produced and accepted: approval gates, credit check, style-reference chaining, continuity rules, asset budgets, content denylist (no text, logos, people, client names, Aphrodite vertical), QA criteria.
- `scroll-sections`: four scroll-driven sections that reuse verified content only: a scroll-drawn system diagram, a full-screen principle statement, a timeline whose line draws, and horizontal pinned case-study cards on large screens.
- `site-media-delivery`: the EN/ES AI-generated-media disclosure in the footer and long-lived cache headers for versioned `/hero/` assets.

### Modified Capabilities

None. `openspec/specs/personal-brand-redesign.md` is a legacy spec and does not govern the current hero requirements.

## Impact

- **Client/server boundary:** a new client component for the pinned scrub section; the hero heading and CTAs stay in the server-rendered tree. Request APIs are async in Next.js 16; this change adds none.
- **Files:** `src/components/home/HeroSection.tsx` (composition), a new film component under `src/components/home/`, `src/i18n/messages.ts` (overlay strings, EN + ES), `public/hero/` (delivery assets only), tests under `src/**/__tests__/`.
- **Dependencies:** none added by default; scrubbing uses `requestAnimationFrame` and `video.currentTime`. Any added animation library needs a stated reason in design.md.
- **External:** Higgsfield credits (cost is estimated and approved before generation); ffmpeg for encoding.
- **Repo size:** only compressed delivery files are committed (desktop <= 8 MB, mobile <= 4 MB, plus poster); masters stay outside the repo.
- **Performance floor:** Lighthouse on `/` must hold performance >= 90, accessibility >= 95, CLS near 0. If it drops, the film is shortened or compressed, not the bar lowered.
- **Rollback:** the film is behind a single component. Removing its import from `HeroSection` restores the current hero, and deleting `public/hero/` removes the assets. No data or schema is touched.
- **Dependency on other work:** builds on the unmerged credibility changes (hero copy, business angle). That branch should be committed or merged first, or this work branches from it.

## Amendments after owner approval (plan v2)

Approved by the owner after reviewing the generated film and a guide derived from a tutorial:

- Desktop uses video scrubbing; **small screens (768px and narrower), reduced motion, data saver and no-JS get stills only**, so no mobile video file is produced.
- Delivery budgets are written **in bytes**; the desktop file ships at crf 31 (7,191,777 bytes).
- Four scroll sections are added after the hero (`scroll-sections`), plus the AI disclosure and cache headers (`site-media-delivery`).
- Per-shot captions stay limited to the four verified overlays.
- A pull request is opened at the end (push allowed); no merge, no deploy.
- Implementation choice flagged for review: the film stage is a **separate pinned section directly after the hero text**, not layered behind it. The 200px wordmark and blurb would collide with the diagram's centered composition, and keeping them out of the film protects LCP and the conversion path. Reversible: the component takes the stage as a standalone section.
