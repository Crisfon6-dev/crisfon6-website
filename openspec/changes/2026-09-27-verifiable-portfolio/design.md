# Design — Verifiable portfolio

## D1. One data module, no client names

`src/data/career.ts` (no `'use client'`, importable from server and client components).
All bilingual text lives here as `L = { en: string; es: string }` — not in `messages.ts` —
because it is data, not UI chrome. `messages.ts` keeps only labels (see `content.md` §6).

```ts
export type L = { en: string; es: string };
export type YearMonth = `${number}-${string}`; // 'YYYY-MM'

export type Role = {
  id: 'prosperas' | 'esoluzion' | 'imkglobal' | 'dualboot' | 'accenture' | 'founder';
  kind: 'employment' | 'founder'; // founder renders in its own sub-section, never with a 'Current' chip
  employer: L; // real employer name (same in both locales) — for 'founder' the stealth label from content §2.6
  title: L;
  start: YearMonth; // '2025-05'
  end: YearMonth | null; // null = Present
  type: L; // 'Full-time' / 'Contract · Remote'
  location?: string;
  clientLine: L; // generic description — NEVER a client name
  bullets: readonly L[];
  stack: readonly string[];
  caseStudyIds: readonly CaseStudy['id'][];
};

export type CaseStudy = {
  id:
    | 'ai-in-production'
    | 'credit-marketplace'
    | 'aws-cost-audit'
    | 'conversational-ai-product'
    | 'analytics-platform'
    | 'production-reliability'
    | 'identity-integrity'
    | 'public-platform-surfaces'
    | 'core-banking-modules'
    | 'us-car-rental-cloud'
    | 'govtech-tourism-apps'
    | 'banking-telecom-data';
  tier: 'A' | 'B' | 'C';
  incidents?: readonly { symptom: L; cause: L; fix: L }[]; // production-reliability only
  footnote?: L; // e.g. the pre-launch honesty line
  roleId: Role['id'];
  tag: string;
  status: L;
  title: L;
  context: L;
  whatIDid: readonly L[]; // may reuse role.bullets
  outcomes: readonly L[]; // [] => outcome row hidden
  stack: readonly string[];
  featured?: boolean;
  repoUrl?: string;
  liveUrl?: string;
};

export type Credential = {
  name: L;
  issuer: string;
  date: string;
  verifyUrl?: string;
  kind: 'degree' | 'cert';
};

export const ROLES: readonly Role[];
export const CASE_STUDIES: readonly CaseStudy[];
export const CREDENTIALS: readonly Credential[];
export const KEY_FACTS: readonly { value: string; label: L }[];
export const PRINCIPLES: readonly { title: L; proof: L }[]; // content §10
export const WRITING: readonly { date: string; title: L; lesson: L; url?: string }[]; // hide if !url
export const TESTIMONIALS: readonly { quote: L; name: string; role: string; relation: string }[]; // [] until D10
export const STACK_GROUPS: readonly { group: string; items: readonly string[] }[]; // content §11
export const PROFILE: {
  displayName;
  legalName;
  title: L;
  tagline: L;
  location: L;
  email;
  linkedin;
  github;
  openTo: L;
  summary: L;
  confidential: L;
};

export function formatPeriod(
  start: YearMonth,
  end: YearMonth | null,
  locale: 'en' | 'es',
  presentLabel: string
): string;
export function sortRoles(roles: readonly Role[]): Role[]; // current first, then by start desc
```

`TODO(Cristhian)` values are represented as `undefined` / empty arrays so the UI hides them.

## D2. `/experience` layout (top → bottom)

1. `SubpageHeader` with number `CV` and label `EXPERIENCE` → kicker reads `CV · EXPERIENCE`
   (existing pages keep their numbers; no renumbering). Title = display name, legal name
   below in mono-muted, then title + tagline.
2. Meta row: location · open-to · links (Email, LinkedIn, GitHub) · **Save as PDF** button
   (`window.print()`, `data-print-hide`).
3. Confidentiality line (small, muted).
4. Summary paragraph.
5. Key facts — 4 tiles (reuse `StatsSection` visual language; not animated here so print works).
6. Work history — employment roles first, then a "Founder work" sub-heading with the `founder` role. One `<article id={role.id}>` per role, 2-column on `lg`:
   left `w-48` = period (mono), type, "Current" chip; right = `Title · Employer`, client line,
   bullets, stack tags, "See case study →" links to `/projects#<caseId>`.
   Anchors allow deep links from `/projects` and from LinkedIn.
   6b. How I work — 5 principle rows (content §10).
7. Education & certifications — two lists side by side.
   7b. Writing (hidden when no entry has a url) and Testimonials (hidden when empty).
8. How to verify — 4 rows with outbound links.
9. CTA panel — `ctaHeading`, email button, link to `/projects`.

Server/client split: `app/experience/page.tsx` (server: `metadata`, `ProfilePage` JSON-LD)
renders `ExperienceContent` (client: `useLanguage()`), same pattern as every other route.

## D3. `/projects` layout

Keep `SubpageHeader` `03 · PROJECTS`. Three tiers with a kicker each: Tier A (featured — first card full width, the other three in a row/2-col), Tier B (2 columns), Tier C (compact 2-col, no Context section). `production-reliability` renders its `incidents` as symptom → cause → fix rows instead of bullets.
Each card: `<article id={cs.id}>`; header chips (tag, status), title, meta line
`Employer · Period · Role` (from role), sections _Context_, _What I did_, _Outcome_ (chips,
hidden when empty), stack tags, footer link to `/experience#<roleId>`, plus `repoUrl` /
`liveUrl` buttons when present. Below: "Building in public" strip. Keep newsletter CTA at the
end (`data-testid="projects-cta"`), and add a second button to `/experience`.

## D4. Print

In `globals.css`:

```css
@media print {
  nav,
  footer,
  [data-print-hide],
  .atmosphere {
    display: none !important;
  }
  body {
    background: #fff !important;
    color: #000 !important;
  }
  main {
    padding: 0 !important;
  }
  article {
    break-inside: avoid;
  }
  a[href^='http']::after {
    content: ' (' attr(href) ')';
    font-size: 10px;
  }
  @page {
    margin: 14mm;
  }
}
```

Verify `Atmosphere` has a class or add `data-print-hide` to it. Target: ≤ 2 A4 pages.

## D5. Navigation

Navbar `linkKeys`: `/about`, **`/experience`**, `/projects`, `/automations`, `/blog`.
Footer `navKeys`: add `/experience` after `/about`. Home hero: change `cta2` target to
`/experience` **or** keep `/projects` and add a text link "Full work history →" under the
proof line — prefer the text link (less disruption to the hero). Sitemap: add `/experience`
(priority 0.9). `llms.txt`: add line `- [Experience](https://crisfon6.com/experience): full
work history, case studies, certifications`.

## D6. Decisions & rationale

- **Anonymize clients, name employers.** Employers are what a verifier checks against
  LinkedIn/references; clients are covered by confidentiality and a public name can cost more
  than it earns. Details are offered "during a hiring process".
- **No public PDF.** The internal CV names clients. Print view replaces it and never drifts
  from the site.
- **Show overlapping roles honestly.** A verifier who finds an overlap on LinkedIn that the
  site hides trusts neither.
- **Hide missing data instead of placeholders.** An empty "Outcome" is better than an invented one.
