# Tasks — Verifiable portfolio

Strict TDD (per `openspec/config.yaml`): write/adjust the test, see it fail, implement.
Before starting read `content.md` end-to-end — it is the only source of copy and data.
Next.js 16: read `node_modules/next/dist/docs/` for anything route-related (see `AGENTS.md`).

## Phase 0 — Setup

- 0.1 Branch `feat/verifiable-portfolio`.
- 0.2 `npm ci` currently fails: `package-lock.json` is out of sync (`@swc/helpers@0.5.23`
  missing). Run `npm install`, commit the lockfile alone (`chore(deps): sync lockfile`).

## Phase 1 — Data

- 1.1 Test `src/data/__tests__/career.test.ts`: R1 scenarios (counts, ordering, referential integrity, `formatPeriod` EN/ES).
- 1.2 Implement `src/data/career.ts` with the types in `design.md` D1 and the data in `content.md` §1–4, §9–11 (Appendix A holds the full text of reused v1 cards).
- 1.3 Do NOT resolve `content.md` §12 decisions — apply defaults only.

## Phase 2 — `/experience`

- 2.1 Add i18n keys (`content.md` §6) to `en` and `es` in `src/i18n/messages.ts`.
- 2.2 Tests in `src/components/pages/__tests__/subpages.test.tsx` → `describe('ExperienceContent')`: R2 scenarios (6 roles with ids — 5 employment + founder —, 2 current chips, founder without chip, verify section links, ES render, print button calls `window.print`).
- 2.3 `src/components/pages/ExperienceContent.tsx` (layout `design.md` D2).
- 2.4 `src/app/experience/page.tsx` — metadata + `ProfilePage` JSON-LD.
- 2.5 `@media print` block in `globals.css` (D4); add `data-print-hide` where needed.
- 2.6 How I work, Writing (hidden without url), Testimonials (hidden when empty), Founder work sub-section.

## Phase 3 — `/projects`

- 3.1 Update tests: 12 cards (4 per tier A/B/C), 1 featured (`ai-in-production`), role link per card, outcome hidden when empty, 5 incident rows, founder footnote without links, CTAs.
- 3.2 Rewrite `ProjectsContent.tsx` from `CASE_STUDIES` in 3 tiers (D3) + incident rows + "Building in public" strip.
- 3.3 Update `app/projects/page.tsx` metadata and `projects.description` (EN/ES).

## Phase 4 — Claim alignment & reuse

- 4.1 Test for R4 (forbidden phrases) across Home/About/Projects/Experience in EN + ES.
- 4.2 `StatsSection` → `KEY_FACTS`; update its tests.
- 4.3 `AboutContent` timeline + certs + core stack (`STACK_GROUPS`) → from `career.ts`; update "4 timeline items" test.
- 4.4 `FeaturedProjectsSection` → the first 3 Tier A case studies from `career.ts` (`ai-in-production`, `credit-marketplace`, `aws-cost-audit`).
- 4.5 Apply every MUST row of `content.md` §7 (hero kicker/typewords/proof, about intro1/intro2, metadata, GitHub URL).
- 4.6 SHOULD rows of §7 — apply; `newsletter.joinBuilders` only after Cristhian confirms the subscriber count.

## Phase 5 — Wiring

- 5.1 Navbar (desktop + mobile) and Footer: `/experience`; update Navbar/Footer tests.
- 5.2 `sitemap.ts`, `llms.txt/route.ts`.
- 5.3 `layout.tsx` `Person` JSON-LD per §8.
- 5.4 Hero: "Full work history →" text link to `/experience` under the proof line.

## Phase 6 — Guard & verify

- 6.1 `src/__tests__/confidential.test.ts` (R7), env-driven denylist, skipped when unset.
- 6.2 E2E `tests/e2e/experience.spec.ts`: open `/experience`, toggle ES, click a case-study link → lands on `/projects#<id>`, click role link back → `/experience#<roleId>`.
- 6.3 `npm run type-check && npm run lint && npm run test && npm run test:e2e && npm run build`.
- 6.4 Manual: print `/experience` to PDF (Chrome, A4) → ≤ 2 pages, no nav/footer. Check mobile 375px.
- 6.5 Fill remaining `TODO(Cristhian)` values (cert URLs, AI outcome) — or leave hidden.
