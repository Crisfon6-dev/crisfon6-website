# Spec — Verifiable portfolio

Source of truth for all copy and data: `content.md`. Design: `design.md`.

## R1. Career data module

`src/data/career.ts` SHALL export `ROLES` (6: 5 employment + `founder`), `CASE_STUDIES` (12), `CREDENTIALS` (5),
`KEY_FACTS` (4), `PRINCIPLES` (5), `WRITING`, `TESTIMONIALS` (`[]`), `STACK_GROUPS`, `PROFILE`, `formatPeriod`, `sortRoles`, with the values in `content.md` §1–4 and §9–11.

**Open decisions in `content.md` §12 MUST be implemented with their stated default and MUST NOT be resolved by the builder.**

- **Scenario: roles are ordered for a verifier**
  - Given `sortRoles(ROLES)`
  - When the result is read
  - Then the first two ids are `prosperas` and `esoluzion` (both `end: null`), followed by `imkglobal`, `dualboot`, `accenture`; `founder` is last (kind `founder` sorts after all employment).
- **Scenario: every case study points to an existing role**
  - Given `CASE_STUDIES`
  - Then every `roleId` MUST exist in `ROLES`, and every id in a role's `caseStudyIds` MUST exist in `CASE_STUDIES`.
- **Scenario: period formatting**
  - Given `formatPeriod('2025-05', null, 'en', 'Present')` → `May 2025 – Present`
  - Given `formatPeriod('2021-05', '2022-06', 'es', 'Presente')` → month abbreviations in Spanish, e.g. `may 2021 – jun 2022`.

## R2. `/experience` route

`src/app/experience/page.tsx` (server) SHALL export `metadata` (content §8) and render
`ExperienceContent` plus a `ProfilePage` JSON-LD.

- **Scenario: full history visible**
  - Given a visitor opens `/experience`
  - Then 6 elements with `data-testid="role"` are rendered (5 under Work history, 1 under Founder work), each with `id` equal to the role id
  - And each shows employer, title, period, type, client line, bullets and stack.
- **Scenario: current roles are flagged**
  - Then exactly 2 roles show the "Current" chip, and the `founder` role shows none.
- **Scenario: deep link**
  - Given the URL `/experience#esoluzion`
  - Then the browser scrolls to the eSoluzion role (native anchor).
- **Scenario: language toggle**
  - Given locale `es`
  - Then all role bullets, titles, labels and dates render in Spanish.
- **Scenario: verification links**
  - Then a `data-testid="verify"` section contains links to `linkedin.com/in/crisfon6` and `github.com/Crisfon6-dev` and a `mailto:` reference link.
  - And a certificate "Verify" link is rendered only when `verifyUrl` is defined.
- **Scenario: print**
  - Given the user clicks "Save as PDF"
  - Then `window.print()` is called
  - And in print media the navbar, footer, atmosphere and the button itself are hidden.

## R3. `/projects` as case studies

- **Scenario: cards**
  - Then 12 elements with `data-testid="project-card"` render: 4 with `data-tier="A"`, 4 `B`, 4 `C`; exactly one `data-featured="true"` (`ai-in-production`), each with `id` = case id.
- **Scenario: incidents format**
  - Then the `production-reliability` card renders 5 incident rows, each with symptom, cause and fix.
- **Scenario: founder card honesty**
  - Then the `conversational-ai-product` card shows the pre-launch footnote and renders no link (no repoUrl/liveUrl).
- **Scenario: traceable to a role**
  - Then every card shows `Employer · Period · Role` and a link to `/experience#<roleId>`.
- **Scenario: no invented outcomes**
  - Given a case study with `outcomes: []`
  - Then the Outcome section is not rendered.
- **Scenario: CTAs**
  - Then `data-testid="projects-cta"` still links to `/newsletter`, and a link to `/experience` exists.

## R4. Claim alignment

Every MUST row in `content.md` §7 SHALL be applied.

- **Scenario: no "millions of users" anywhere**
  - Given the rendered output of Home, About, Projects, Experience in EN and ES
  - Then none contains `millions of users`, `millones de usuarios`, `1M+`, `4+ years`, `4+ años`, `First LATAM cohort`, `Primera cohorte LATAM`.
- **Scenario: stats**
  - Then `StatsSection` shows `5+`, `~100K`, `2M+`, `10+` with the §1 labels.

## R5. Navigation & discovery

- Navbar (desktop + mobile) and footer SHALL link to `/experience`.
- `sitemap.ts` SHALL include `/experience`; `llms.txt` SHALL list it.
- `layout.tsx` `Person` JSON-LD SHALL match `content.md` §8 (`jobTitle: "Technical Lead"`, `@id`).

## R6. Accessibility

- Each role and case study is an `<article>` with a heading (`h2` on `/experience` roles, `h2` on project cards).
- External links use `target="_blank" rel="noopener noreferrer"` and have visible text.
- Lighthouse accessibility on `/experience` SHOULD be ≥ 95.

## R7. Confidentiality guard (test)

- **Scenario: denylist**
  - Given a unit test that renders `ExperienceContent`, `ProjectsContent`, `AboutContent` and `HomeContent` in EN and ES, and also reads `src/data/career.ts` as text
  - Then none of the strings in `CONFIDENTIAL_DENYLIST` appear (case-insensitive).
  - The denylist covers client/partner names, the side product's brand, domain and vertical terms, and people's names. Cristhian keeps the real list outside the repo.
  - `CONFIDENTIAL_DENYLIST` lives in `src/__tests__/confidential.test.ts` and is **provided
    locally by Cristhian** (it contains client names, so it MUST NOT be committed with real
    values: read it from an env var `CONFIDENTIAL_DENYLIST` — comma-separated — and skip the
    test with a warning when the var is unset).
