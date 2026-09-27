# Proposal — Verifiable portfolio (`/experience` + case-study `/projects`)

**Change id:** `2026-09-27-verifiable-portfolio`
**Status:** proposed · **v2 2026-09-27** — content enriched from Cristhian's three private engineering knowledge bases (see `content.md` header); 12 case studies in 3 tiers, founder project (anonymized), How I work, Writing, open decisions §12
**Owner:** Cristhian Fonseca

## Why

crisfon6.com is shared with recruiters, hiring managers and people who want to confirm
Cristhian's experience. Today the site sells well (hero, newsletter, automations) but it does
not answer the four questions a verifier actually asks:

1. **Where did you work, in what role, and when?** — there is no employer-by-employer history.
   The About timeline has 4 generic entries without company names or exact dates.
2. **What exactly did you build there?** — `/projects` cards describe systems but don't say
   for which employer, in which period, or what his role was.
3. **Do the numbers match the CV and LinkedIn?** — several figures on the site do not match
   the CV that is sent to employers (see `content.md` → _Claim alignment_). A verifier who
   cross-checks and finds a mismatch discards the whole profile.
4. **How do I confirm it?** — no page points to LinkedIn, the certificate, GitHub and
   references together.

## What changes

| #   | Change                                                                                                                                                                        | Type       |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1   | New route **`/experience`** — the online CV: summary, key facts, full work history (5 employers, exact dates), education, certifications, "How to verify" block, print-to-PDF | new page   |
| 2   | **`/projects` rebuilt as case studies** — each one tied to employer + period + role, with Context → What I did → Outcome → Stack                                              | rewrite    |
| 3   | **Single source of truth** `src/data/career.ts` consumed by `/experience`, `/projects`, `/about` timeline, home featured projects, and JSON-LD                                | new module |
| 4   | **Claim alignment** — every public number/title matches the CV (years, users, titles, dates)                                                                                  | copy fix   |
| 5   | Navbar + footer + sitemap + `llms.txt` include `/experience`                                                                                                                  | wiring     |
| 6   | `Person` JSON-LD enriched (`jobTitle`, `worksFor`, `alumniOf`, `hasCredential`, `knowsAbout`) + `ProfilePage` JSON-LD on `/experience`                                        | SEO        |
| 7   | Print stylesheet so `/experience` → _Save as PDF_ produces a clean 2-page CV                                                                                                  | CSS        |

## Non-goals

- No changes to newsletter, automations, blog pipeline or Beehiiv action.
- No real client names anywhere in code or copy (see Confidentiality rule in `content.md`).
- No downloadable CV PDF committed to `public/` (the internal CV names clients). The print
  view of `/experience` replaces it.

## Affected files

| File                                                     | Server/Client               | Action                                            |
| -------------------------------------------------------- | --------------------------- | ------------------------------------------------- |
| `src/data/career.ts`                                     | shared (no `'use client'`)  | **new**                                           |
| `src/app/experience/page.tsx`                            | server (metadata + JSON-LD) | **new**                                           |
| `src/components/pages/ExperienceContent.tsx`             | client (i18n)               | **new**                                           |
| `src/components/pages/ProjectsContent.tsx`               | client                      | rewrite                                           |
| `src/app/projects/page.tsx`                              | server                      | metadata copy                                     |
| `src/components/pages/AboutContent.tsx`                  | client                      | timeline from `career.ts`, certs from `career.ts` |
| `src/app/about/page.tsx`                                 | server                      | metadata copy                                     |
| `src/components/home/StatsSection.tsx`                   | client                      | values                                            |
| `src/components/home/FeaturedProjectsSection.tsx`        | client                      | read from `career.ts`                             |
| `src/components/home/HeroSection.tsx`                    | client                      | GitHub URL + optional 3rd CTA                     |
| `src/components/Navbar.tsx`, `src/components/Footer.tsx` | client                      | add `/experience`                                 |
| `src/app/sitemap.ts`, `src/app/llms.txt/route.ts`        | server                      | add route                                         |
| `src/app/layout.tsx`                                     | server                      | enrich `Person` JSON-LD                           |
| `src/app/globals.css`                                    | —                           | `@media print` block                              |
| `src/i18n/messages.ts`                                   | —                           | new `experience` + updated keys (EN + ES)         |
| tests under `src/**/__tests__/` + `tests/e2e/`           | —                           | new + updated                                     |

## Risks & rollback

- **Risk:** confidentiality leak (client names). **Mitigation:** spec scenario + unit test that
  greps rendered output for a denylist (see `spec.md` → R7).
- **Risk:** existing tests assert "7 project cards" and "4 timeline items". They must be
  updated in the same PR (strict TDD: update tests first).
- **Rollback:** single PR, no data migration. `git revert` restores previous pages.

## Detail

- `content.md` — **all copy and data, EN + ES, ready to paste.** This is the source.
- `spec.md` — requirements and Given/When/Then scenarios.
- `design.md` — data model, component layout, decisions.
- `tasks.md` — ordered tasks (TDD).
