Now I have a thorough understanding of the entire codebase. Let me write the complete formal SDD specifications.

---

# SDD: personal-brand-redesign — crisfon6-website

**Project**: crisfon6-website
**Change Branch**: personal-brand-redesign
**Author**: cfonseca@prosperas.com
**Date**: 2026-04-15
**Scope**: 3 phases — Copy & Messaging, UI Improvements, New Sections

---

## PHASE 1 — COPY & MESSAGING

---

## SPEC-001: Hero Section Copy Rewrite (messages.ts)

**Phase**: 1
**Files**: `src/i18n/messages.ts`
**Priority**: critical

### Scenarios

**Scenario 1: EN hero.tagline updated**

- Given: the messages.ts `en` object is loaded
- When: `t.hero.tagline` is read
- Then: the value SHALL equal `"AI SYSTEMS ENGINEER · LATAM"` exactly, including the interpunct character `·` (U+00B7)

**Scenario 2: ES hero.tagline updated**

- Given: the messages.ts `es` object is loaded
- When: `t.hero.tagline` is read
- Then: the value SHALL equal `"INGENIERÍA DE SISTEMAS AI · LATAM"` exactly

**Scenario 3: EN hero heading trio rewritten**

- Given: the `en` object is loaded
- When: `t.hero.heading1`, `t.hero.heading2`, and `t.hero.heading3` are read
- Then: `heading1` SHALL equal `"I build AI systems"`, `heading2` SHALL equal `"that run in production."`, and `heading3` SHALL equal `"Then I show you how."`

**Scenario 4: ES hero heading trio rewritten**

- Given: the `es` object is loaded
- When: `t.hero.heading1`, `t.hero.heading2`, and `t.hero.heading3` are read
- Then: `heading1` SHALL equal `"Construyo sistemas de AI"`, `heading2` SHALL equal `"que corren en producción."`, and `heading3` SHALL equal `"Luego te muestro cómo."`

**Scenario 5: EN hero.description leads with Anthropic certification**

- Given: the `en` object is loaded
- When: `t.hero.description` is read
- Then: the value SHALL begin with `"Certified by Anthropic (Claude Code in Action, 2026)."` and SHALL mention `"agentic systems"`, `"MCP workflows"`, `"LLM pipelines"`, `"real data"`, and SHALL end with a reference to weekly public documentation

**Scenario 6: ES hero.description leads with Anthropic certification**

- Given: the `es` object is loaded
- When: `t.hero.description` is read
- Then: the value SHALL be the Spanish-language equivalent of the EN hero.description, beginning with the Anthropic certification mention, and SHALL NOT be identical to the current value `"Technical Lead detras de un marketplace de credito..."`

**Scenario 7: EN hero.socialProof updated**

- Given: the `en` object is loaded
- When: `t.hero.socialProof` is read
- Then: the value SHALL equal `"Join 500+ engineers and founders following AI systems that actually ship."`

**Scenario 8: ES hero.socialProof updated**

- Given: the `es` object is loaded
- When: `t.hero.socialProof` is read
- Then: the value SHALL be the Spanish-language equivalent of the EN `hero.socialProof`

**Scenario 9: EN hero.cta1 updated**

- Given: the `en` object is loaded
- When: `t.hero.cta1` is read
- Then: the value SHALL equal `"Get this week's AI blueprint"`

**Scenario 10: ES hero.cta1 updated**

- Given: the `es` object is loaded
- When: `t.hero.cta1` is read
- Then: the value SHALL be the Spanish-language equivalent of `"Get this week's AI blueprint"` and SHALL NOT equal the old value `"No te pierdas el blueprint de esta semana"`

**Scenario 11: hero.cta2 key is preserved**

- Given: the `en` and `es` objects are loaded
- When: `t.hero.cta2` is read
- Then: the key SHALL still exist and SHALL NOT be removed; its value MAY remain unchanged (`"See my work"` / `"Ver mi trabajo"`)

**Negative Scenario 12: Old tagline values are absent**

- Given: the `en` and `es` objects are loaded
- When: `t.hero.tagline` is read for either locale
- Then: the value SHALL NOT equal `"TECHNICAL LEAD & AI BUILDER"` for any locale

### Acceptance Criteria

- MUST update all 9 hero copy keys (`tagline`, `heading1`, `heading2`, `heading3`, `description`, `socialProof`, `cta1`) in both `en` and `es` objects
- MUST preserve `hero.cta2` key and all other existing `hero.*` keys not listed above
- SHALL maintain `as const` assertion on the messages export so TypeScript types regenerate correctly
- `npm run type-check` MUST pass with zero errors after this change
- `npm run lint` MUST pass after this change

---

## SPEC-002: Footer Tagline Copy Rewrite (messages.ts)

**Phase**: 1
**Files**: `src/i18n/messages.ts`
**Priority**: critical

### Scenarios

**Scenario 1: EN footer.tagline updated**

- Given: the `en` object is loaded
- When: `t.footer.tagline` is read
- Then: the value SHALL equal `"AI systems engineer. Building and shipping in public. Weekly blueprints you can deploy."`

**Scenario 2: ES footer.tagline updated**

- Given: the `es` object is loaded
- When: `t.footer.tagline` is read
- Then: the value SHALL be the Spanish-language equivalent and SHALL NOT contain the phrase `"de dia"` or `"de noche"` (removing the "by day / by night" framing)

**Negative Scenario 3: Old "by day / by night" framing is absent**

- Given: `en` and `es` footer.tagline values are read
- Then: neither value SHALL contain the substring `"by day"`, `"by night"`, `"de dia"`, or `"de noche"`

### Acceptance Criteria

- MUST update `footer.tagline` in both `en` and `es` objects
- MUST preserve `footer.pages` and `footer.connect` keys unchanged
- `npm run type-check` MUST pass

---

## SPEC-003: About Section Copy Rewrite (messages.ts)

**Phase**: 1
**Files**: `src/i18n/messages.ts`
**Priority**: critical

### Scenarios

**Scenario 1: EN about.heading1 updated**

- Given: the `en` object is loaded
- When: `t.about.heading1` is read
- Then: the value SHALL equal `"I build AI systems that run at scale."`

**Scenario 2: ES about.heading1 updated**

- Given: the `es` object is loaded
- When: `t.about.heading1` is read
- Then: the value SHALL be the Spanish equivalent and SHALL NOT equal the old value `"Construyo FinTech a escala."`

**Scenario 3: EN about.heading2 updated**

- Given: the `en` object is loaded
- When: `t.about.heading2` is read
- Then: the value SHALL equal `"And I document everything."`

**Scenario 4: ES about.heading2 updated**

- Given: the `es` object is loaded
- When: `t.about.heading2` is read
- Then: the value SHALL be the Spanish equivalent and SHALL NOT equal the old value `"Y automatizaciones con IA en paralelo."`

**Scenario 5: EN about.intro3 leads with AI specialization**

- Given: the `en` object is loaded
- When: `t.about.intro3` is read
- Then: the value SHALL begin with `"I specialize in agentic AI systems"` and SHALL mention `"MCP agents"`, `"multi-step LLM pipelines"`, `"cost constraints"`, and `"production"`

**Scenario 6: ES about.intro3 updated accordingly**

- Given: the `es` object is loaded
- When: `t.about.intro3` is read
- Then: the value SHALL be the Spanish-language equivalent of the new EN intro3 and SHALL NOT equal the old value `"En paralelo, construyo en la interseccion de IA e infraestructura..."`

**Scenario 7: EN about.ctaHeading updated**

- Given: the `en` object is loaded
- When: `t.about.ctaHeading` is read
- Then: the value SHALL equal `"Building with AI at scale? Let's connect."`

**Scenario 8: ES about.ctaHeading updated**

- Given: the `es` object is loaded
- When: `t.about.ctaHeading` is read
- Then: the value SHALL be the Spanish equivalent and SHALL NOT equal the old value `"Fellow builder? Conectemos."`

**Negative Scenario 9: Preserved about keys are unchanged**

- Given: the `en` and `es` objects are loaded
- When: `t.about.intro1`, `t.about.intro2`, `t.about.intro4`, `t.about.coreStack`, `t.about.experience`, `t.about.education`, `t.about.ctaDescription` are read
- Then: none of these keys SHALL be removed or have their values changed

### Acceptance Criteria

- MUST update `heading1`, `heading2`, `intro3`, and `ctaHeading` in both `en` and `es`
- MUST preserve all other `about.*` keys
- `npm run type-check` MUST pass

---

## SPEC-004: Projects Section Copy Update (messages.ts)

**Phase**: 1
**Files**: `src/i18n/messages.ts`
**Priority**: high

### Scenarios

**Scenario 1: EN projects.heading updated**

- Given: the `en` object is loaded
- When: `t.projects.heading` is read
- Then: the value SHALL equal `"Systems I've shipped."`

**Scenario 2: ES projects.heading updated**

- Given: the `es` object is loaded
- When: `t.projects.heading` is read
- Then: the value SHALL be the Spanish equivalent and SHALL NOT equal the old value `"Lo que he construido."`

**Scenario 3: EN projects.description amended**

- Given: the `en` object is loaded
- When: `t.projects.description` is read
- Then: the value SHALL contain the phrase `"All shipped to production"` and SHALL contain a reference to `"real AI stacks"`, and SHALL NOT be labeled as demos

**Scenario 4: ES projects.description amended**

- Given: the `es` object is loaded
- When: `t.projects.description` is read
- Then: the value SHALL be the Spanish equivalent of the updated EN description

**Negative Scenario 5: Old projects heading is absent**

- Given: the `en` projects.heading is read
- Then: the value SHALL NOT equal `"Things I've built."`

### Acceptance Criteria

- MUST update `projects.heading` and `projects.description` in both `en` and `es`
- MUST preserve `projects.ctaHeading` and `projects.ctaDescription` unchanged
- `npm run type-check` MUST pass

---

## SPEC-005: Automations Description Update (messages.ts)

**Phase**: 1
**Files**: `src/i18n/messages.ts`
**Priority**: high

### Scenarios

**Scenario 1: EN automations.description amended with certification authority sentence**

- Given: the `en` object is loaded
- When: `t.automations.description` is read
- Then: the value SHALL begin with a sentence containing `"Anthropic-certified AI engineering patterns"` and SHALL include `"architecture-first"`, `"cost-conscious"`, and `"production-ready"`

**Scenario 2: ES automations.description amended**

- Given: the `es` object is loaded
- When: `t.automations.description` is read
- Then: the value SHALL be the Spanish equivalent with the certification authority sentence prepended, and SHALL NOT be identical to the current value

**Negative Scenario 3: Existing automations copy is preserved**

- Given: the `en` automations object is loaded
- When: `t.automations.heading`, `t.automations.ctaHeading`, `t.automations.ctaDescription`, `t.automations.ctaLabel`, `t.automations.subscribeTo`, `t.automations.toGetDelivered` are read
- Then: none of these keys SHALL be removed

### Acceptance Criteria

- MUST prepend the certification authority sentence to `automations.description` in both `en` and `es`
- MUST preserve all other `automations.*` keys
- `npm run type-check` MUST pass

---

## SPEC-006: Newsletter Authority & Final CTA Copy Update (messages.ts)

**Phase**: 1
**Files**: `src/i18n/messages.ts`
**Priority**: high

### Scenarios

**Scenario 1: EN newsletter.authority updated to Anthropic-certified framing**

- Given: the `en` object is loaded
- When: `t.newsletter.authority` is read
- Then: the value SHALL equal `"Built by an Anthropic-certified AI engineer shipping at LATAM scale."` and SHALL NOT contain the phrase `"Technical Lead shipping FinTech"`

**Scenario 2: ES newsletter.authority updated**

- Given: the `es` object is loaded
- When: `t.newsletter.authority` is read
- Then: the value SHALL be the Spanish equivalent of the new EN authority string

**Scenario 3: EN newsletter.finalCtaHeading updated**

- Given: the `en` object is loaded
- When: `t.newsletter.finalCtaHeading` is read
- Then: the value SHALL equal `"The most useful AI engineering newsletter you'll read this week."`

**Scenario 4: ES newsletter.finalCtaHeading updated**

- Given: the `es` object is loaded
- When: `t.newsletter.finalCtaHeading` is read
- Then: the value SHALL be the Spanish equivalent and SHALL NOT equal the old value `"Recibe $2,000+ en templates de automatizacion. Gratis."`

**Negative Scenario 5: Old authority line absent**

- Given: `en` `t.newsletter.authority` is read
- Then: the value SHALL NOT equal `"Built by a Technical Lead shipping FinTech to millions across LATAM"`

**Negative Scenario 6: Preserved newsletter keys unchanged**

- Given: the `en` and `es` objects are loaded
- When: `t.newsletter.heading`, `t.newsletter.description`, `t.newsletter.joinBuilders`, `t.newsletter.startGetting`, `t.newsletter.noSpam`, `t.newsletter.whatYouGet`, `t.newsletter.recentTemplates`, `t.newsletter.whoIsThisFor`, `t.newsletter.finalCtaDescription` are read
- Then: none of these keys SHALL be removed or altered

### Acceptance Criteria

- MUST update `newsletter.authority` and `newsletter.finalCtaHeading` in both `en` and `es`
- MUST preserve all other `newsletter.*` keys
- `npm run type-check` MUST pass

---

## SPEC-007: Work With Me Heading Update (messages.ts)

**Phase**: 1
**Files**: `src/i18n/messages.ts`
**Priority**: high

### Scenarios

**Scenario 1: EN workWithMe.heading updated**

- Given: the `en` object is loaded
- When: `t.workWithMe.heading` is read
- Then: the value SHALL equal `"Let's build something with AI that actually works."`

**Scenario 2: ES workWithMe.heading updated**

- Given: the `es` object is loaded
- When: `t.workWithMe.heading` is read
- Then: the value SHALL be the Spanish equivalent and SHALL NOT equal the old value `"Construyamos algo juntos."`

**Negative Scenario 3: Old workWithMe heading absent**

- Given: the `en` workWithMe.heading is read
- Then: the value SHALL NOT equal `"Let's build something together."`

**Negative Scenario 4: Other workWithMe keys preserved**

- Given: the `en` and `es` objects are loaded
- When: any key other than `workWithMe.heading` within the `workWithMe` namespace is read
- Then: all other keys SHALL remain present and unchanged

### Acceptance Criteria

- MUST update `workWithMe.heading` in both `en` and `es`
- MUST preserve all other `workWithMe.*` keys
- `npm run type-check` MUST pass

---

## SPEC-008: nav.subscribe Display Value Update (messages.ts)

**Phase**: 1
**Files**: `src/i18n/messages.ts`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`
**Priority**: critical

### Scenarios

**Scenario 1: EN nav.subscribe value is updated to "PowerAI"**

- Given: the `en` object is loaded
- When: `t.nav.subscribe` is read
- Then: the value SHALL equal `"PowerAI"`

**Scenario 2: ES nav.subscribe value is updated to "PowerAI"**

- Given: the `es` object is loaded
- When: `t.nav.subscribe` is read
- Then: the value SHALL equal `"PowerAI"` (brand name, not translated)

**Scenario 3: nav.subscribe key name is unchanged**

- Given: the messages.ts `en` and `es` objects are inspected structurally
- When: the key identifier within the `nav` namespace for the subscribe entry is read
- Then: the key SHALL remain `"subscribe"` (not renamed) so that all existing call sites in `Navbar.tsx` and `Footer.tsx` using `t.nav.subscribe` continue to resolve without modification

**Scenario 4: Navbar renders "PowerAI" in the subscribe button**

- Given: `Navbar` component renders with EN locale
- When: the subscribe button is located (the primary CTA `Button variant="default"`)
- Then: the button's visible text SHALL be `"PowerAI"`

**Scenario 5: Footer renders "PowerAI" for the subscribe nav link**

- Given: `Footer` component renders with EN locale
- When: the link in the PAGES column pointing to `/newsletter` is inspected
- Then: the visible text SHALL be `"PowerAI"`

**Negative Scenario 6: No call sites reference the key by the new value string directly**

- Given: `Navbar.tsx` and `Footer.tsx` source files are inspected
- When: the string `"Subscribe"` (old display value) is searched in those files
- Then: it SHALL NOT appear as a hardcoded display string replacing `t.nav.subscribe`

### Acceptance Criteria

- MUST update the value of `nav.subscribe` to `"PowerAI"` in both `en` and `es` in messages.ts
- MUST NOT rename the `nav.subscribe` key itself
- Navbar.tsx and Footer.tsx MUST NOT be modified (they already reference `t.nav.subscribe` correctly)
- `npm run type-check` MUST pass

---

## SPEC-009: HomeContent.tsx — Projects Array Reorder

**Phase**: 1
**Files**: `src/components/pages/HomeContent.tsx`
**Priority**: high

### Scenarios

**Scenario 1: AI Automation Templates card is the first project card on the home page**

- Given: `HomeContent` renders the Featured Projects section
- When: the three project cards are queried in DOM order
- Then: the first card SHALL have its `tag` badge containing `"AI / OPEN SOURCE"` and `title` equal to `"AI Automation Templates"`

**Scenario 2: FinTech Credit Marketplace is the second card**

- Given: `HomeContent` renders the Featured Projects section
- When: the second project card in DOM order is inspected
- Then: it SHALL have the tag `"FINTECH"` and title `"FinTech Credit Marketplace"`

**Scenario 3: Enterprise Banking Platform is the third card**

- Given: `HomeContent` renders the Featured Projects section
- When: the third project card in DOM order is inspected
- Then: it SHALL have the tag `"BANKING"` and title `"Enterprise Banking Platform"`

**Negative Scenario 4: Old order is no longer present**

- Given: `HomeContent` renders the Featured Projects section
- When: the first project card in DOM order is inspected
- Then: the `tag` badge SHALL NOT contain `"FINTECH"` as the first badge

### Acceptance Criteria

- MUST reorder the `projects` array in `HomeContent.tsx` so the entry with `tag: "AI / OPEN SOURCE"` is at index 0, `"FINTECH"` at index 1, `"BANKING"` at index 2
- MUST NOT change any property values within the individual project objects
- `npm run type-check` MUST pass

---

## SPEC-010: AboutContent.tsx — stackCategories Array Reorder

**Phase**: 1
**Files**: `src/components/pages/AboutContent.tsx`
**Priority**: high

### Scenarios

**Scenario 1: "AI & Automation" stack category is rendered first**

- Given: `AboutContent` renders the CORE STACK section
- When: the stack category cards are queried in DOM order
- Then: the first card SHALL have its heading equal to `"AI & Automation"`

**Scenario 2: "Cloud & DevOps" is rendered second**

- Given: `AboutContent` renders the CORE STACK section
- When: the second stack category card is inspected
- Then: its heading SHALL equal `"Cloud & DevOps"`

**Scenario 3: "Full Stack" is rendered third**

- Given: `AboutContent` renders the CORE STACK section
- When: the third stack category card is inspected
- Then: its heading SHALL equal `"Full Stack"`

**Negative Scenario 4: Old first-position card is no longer first**

- Given: `AboutContent` renders the CORE STACK section
- When: the first card heading is read
- Then: it SHALL NOT equal `"Cloud & DevOps"`

### Acceptance Criteria

- MUST reorder the `stackCategories` array in `AboutContent.tsx` so `"AI & Automation"` is at index 0, `"Cloud & DevOps"` at index 1, `"Full Stack"` at index 2
- MUST NOT change any property values within individual stack category objects
- `npm run type-check` MUST pass

---

## SPEC-011: AboutContent.tsx — Certifications Array Reorder and featured Flag

**Phase**: 1
**Files**: `src/components/pages/AboutContent.tsx`
**Priority**: high

### Scenarios

**Scenario 1: Claude Code in Action cert is the first cert badge**

- Given: `AboutContent` renders the EDUCATION & CERTIFICATIONS section
- When: the cert badges are queried in DOM order
- Then: the first badge SHALL contain the text `"Claude Code in Action"` and `"Anthropic"`

**Scenario 2: B.Eng. degree is the second cert badge**

- Given: `AboutContent` renders the EDUCATION & CERTIFICATIONS section
- When: the second badge is inspected
- Then: it SHALL contain `"B.Eng. Systems Engineering"` and `"UNAB"`

**Scenario 3: featured flag added to Anthropic cert object**

- Given: the `certs` array in `AboutContent.tsx` source is inspected
- When: the entry with `name: "Claude Code in Action"` is found
- Then: that object SHALL have the property `featured: true`

**Scenario 4: No other cert object has featured: true**

- Given: the `certs` array source is inspected
- When: every entry is checked for the `featured` property
- Then: only the Anthropic entry SHALL have `featured: true`; all others SHALL either have `featured: false` or omit the property

**Negative Scenario 5: Old first-position cert is no longer first**

- Given: `AboutContent` renders the EDUCATION & CERTIFICATIONS section
- When: the first badge is inspected
- Then: it SHALL NOT contain `"B.Eng. Systems Engineering"` as the primary name

### Acceptance Criteria

- MUST reorder `certs` array so the Anthropic entry is at index 0
- MUST add `featured: true` to the Anthropic cert object in the `certs` array
- MUST NOT remove or alter any other cert entries
- The TypeScript type for the cert objects MUST accommodate the optional `featured?: boolean` property without type errors
- `npm run type-check` MUST pass

---

## SPEC-012: ProjectsContent.tsx — Projects Array Reorder

**Phase**: 1
**Files**: `src/components/pages/ProjectsContent.tsx`
**Priority**: high

### Scenarios

**Scenario 1: AI Automation Templates is the first project card on the Projects page**

- Given: `ProjectsContent` renders its project list
- When: the project cards are queried in DOM order
- Then: the first card SHALL have its tag badge equal to `"AI / OPEN SOURCE"` and title `"AI Automation Templates"`

**Scenario 2: FinTech Credit Marketplace is the second card**

- Given: `ProjectsContent` renders its project list
- When: the second card is inspected
- Then: it SHALL have tag `"FINTECH"` and title `"FinTech Credit Marketplace"`

**Negative Scenario 3: Old first-position project is no longer first**

- Given: `ProjectsContent` renders its project list
- When: the first card tag badge is read
- Then: it SHALL NOT equal `"FINTECH"`

### Acceptance Criteria

- MUST reorder the `projects` array in `ProjectsContent.tsx` so the `"AI / OPEN SOURCE"` entry is at index 0, `"FINTECH"` at index 1
- MUST preserve all other project entries and their order relative to each other
- MUST NOT change any property values within individual project objects
- `npm run type-check` MUST pass

---

## SPEC-013: WorkWithMeContent.tsx — i18n Extraction and Advisory Card

**Phase**: 1
**Files**: `src/components/pages/WorkWithMeContent.tsx`, `src/i18n/messages.ts`
**Priority**: high

### Scenarios

**Scenario 1: All hardcoded strings extracted from WorkWithMeContent.tsx**

- Given: the `WorkWithMeContent.tsx` source is inspected
- When: any user-visible string (page label, heading, description, CTA text) is searched
- Then: no hardcoded English or Spanish prose strings SHALL remain inline; all SHALL be referenced via `t.workWithMe.*` or a new i18n key

**Scenario 2: The component header text reads from i18n**

- Given: `WorkWithMeContent` renders in EN locale
- When: the `<h1>` text is inspected
- Then: it SHALL equal `t.workWithMe.heading`, which is `"Let's build something with AI that actually works."`

**Scenario 3: Advisory card appears as the 4th engagement option**

- Given: `WorkWithMeContent` renders the ENGAGEMENT CARDS section
- When: the engagement cards are queried in DOM order
- Then: there SHALL be exactly 4 cards, and the 4th card SHALL have a label badge value of `"04"` and SHALL describe an Advisory engagement type

**Scenario 4: Advisory card has correct i18n content in EN**

- Given: `WorkWithMeContent` renders in EN locale
- When: the 4th engagement card is inspected
- Then: its title and description SHALL be sourced from `t.workWithMe` (not hardcoded), SHALL reference AI advisory or AI systems advisory context, and SHALL have an appropriate CTA

**Scenario 5: Advisory card has correct i18n content in ES**

- Given: `WorkWithMeContent` renders in ES locale
- When: the 4th engagement card is inspected
- Then: its title and description SHALL be in Spanish, sourced from `t.workWithMe` i18n keys

**Scenario 6: workWithMe keys added to messages.ts for Advisory card**

- Given: the `en` and `es` workWithMe objects are inspected in messages.ts
- When: the keys for the advisory engagement (e.g., `advisory`, `advisoryDescription`, `advisoryCtaText`) are read
- Then: these keys SHALL exist and SHALL NOT be empty strings

**Scenario 7: All existing engagements still render**

- Given: `WorkWithMeContent` renders
- When: the DOM is inspected for all 4 engagement cards
- Then: cards with labels `"01"`, `"02"`, `"03"`, and `"04"` SHALL all be present

**Scenario 8: TRACK RECORD section uses i18n**

- Given: `WorkWithMeContent` renders in EN locale
- When: the section label above the stats is inspected
- Then: it SHALL read from `t.workWithMe.proofHeading`, which SHALL equal `"TRACK RECORD"`

**Negative Scenario 9: TODO comment is removed**

- Given: the `WorkWithMeContent.tsx` source is inspected
- When: the first line is read
- Then: it SHALL NOT contain `"TODO: i18n"`; the comment SHALL be removed as the i18n work is complete

### Acceptance Criteria

- MUST extract all hardcoded user-visible strings to `t.workWithMe.*` keys in messages.ts
- MUST add both `en` and `es` versions of all newly added workWithMe keys
- MUST add a 4th Advisory engagement card to the `engagements` array
- MUST remove the `// TODO: i18n` comment from the top of `WorkWithMeContent.tsx`
- The `useLanguage()` hook MUST be used (not just called as `useLanguage()` without destructuring)
- `npm run type-check` MUST pass
- `npm run lint` MUST pass

---

## SPEC-014: Site Metadata Update (layout.tsx)

**Phase**: 1
**Files**: `src/app/layout.tsx`
**Priority**: critical

### Scenarios

**Scenario 1: title.default updated to AI Systems Engineer framing**

- Given: `src/app/layout.tsx` exports a `metadata` constant
- When: `metadata.title.default` is read
- Then: the value SHALL equal `"Cristhian Fonseca | AI Systems Engineer · LATAM"`

**Scenario 2: description leads with Anthropic certification**

- Given: `metadata.description` is read
- When: the content is inspected
- Then: the value SHALL mention `"Anthropic"`, `"Claude Code in Action"`, `"2026"` (or equivalent cert reference), and SHALL NOT begin with `"I build FinTech products"`

**Scenario 3: keywords array includes new AI engineering terms**

- Given: `metadata.keywords` is read as an array
- When: the array elements are inspected
- Then: the array SHALL include `"Claude Code"`, `"Anthropic"`, `"AI Engineering LATAM"`, and `"MCP Agents"`

**Scenario 4: keywords array retains existing relevant terms**

- Given: `metadata.keywords` is read
- Then: `"AWS Architect"` and `"Building in Public"` SHALL still be present (or equivalents retained)

**Scenario 5: OpenGraph title updated**

- Given: `metadata.openGraph.title` is read
- When: the value is inspected
- Then: it SHALL equal `"Cristhian Fonseca | AI Systems Engineer · LATAM"`

**Scenario 6: Twitter card title updated**

- Given: `metadata.twitter.title` is read
- When: the value is inspected
- Then: it SHALL equal `"Cristhian Fonseca | AI Systems Engineer · LATAM"`

**Scenario 7: JSON-LD jobTitle updated**

- Given: the `Person` JSON-LD data object inside `RootLayout` is inspected
- When: the `jobTitle` property is read
- Then: it SHALL equal `"AI Systems Engineer · LATAM"` and SHALL NOT equal `"Technical Lead & AI Builder"`

**Negative Scenario 8: Old title string absent**

- Given: `metadata.title.default` is read
- Then: the value SHALL NOT equal `"Cristhian Fonseca | Technical Lead & AI Builder"`

### Acceptance Criteria

- MUST update `metadata.title.default`, `metadata.description`, `metadata.keywords`, `metadata.openGraph.title`, `metadata.twitter.title`
- MUST update the JSON-LD `jobTitle` in the Person structured data
- MUST preserve `metadata.title.template`, all OpenGraph fields not listed, all Twitter fields not listed, `metadata.robots`, and `metadata.alternates` unchanged
- `npm run type-check` MUST pass

---

## SPEC-015: Test Updates for Phase 1 Breaking Changes

**Phase**: 1
**Files**: `tests/e2e/navigation.spec.ts`, `tests/e2e/home.spec.ts`, `src/components/__tests__/Footer.test.tsx`
**Priority**: critical

### Scenarios

**Scenario 1: navigation.spec.ts hero heading test updated**

- Given: the e2e test in `navigation.spec.ts` line 7 asserts `"I ship FinTech at scale"`
- When: the hero heading changes to `"I build AI systems"`
- Then: the test SHALL be updated to assert `"I build AI systems"` so it continues to pass

**Scenario 2: home.spec.ts newsletter CTA link test updated**

- Given: the e2e test in `home.spec.ts` finds a link by name `"Don't miss this week's blueprint"`
- When: `hero.cta1` changes to `"Get this week's AI blueprint"`
- Then: the test SHALL be updated to find the link by name `"Get this week's AI blueprint"`

**Scenario 3: Footer.test.tsx subscribe link label updated**

- Given: the unit test in `Footer.test.tsx` asserts `screen.getByText("Subscribe")`
- When: `nav.subscribe` display value changes to `"PowerAI"`
- Then: the test SHALL be updated to assert `screen.getByText("PowerAI")`

**Scenario 4: Updated tests pass after all Phase 1 copy changes**

- Given: all Phase 1 specs are implemented
- When: `npm run test` is executed
- Then: all Vitest unit/component tests SHALL pass with exit code 0

**Scenario 5: E2E tests pass after Phase 1 changes**

- Given: all Phase 1 specs are implemented and tests are updated
- When: `npm run test:e2e` is executed
- Then: all Playwright E2E tests SHALL pass with exit code 0

### Acceptance Criteria

- MUST update `tests/e2e/navigation.spec.ts` to reflect new hero.heading1 value
- MUST update `tests/e2e/home.spec.ts` to reflect new hero.cta1 value
- MUST update `src/components/__tests__/Footer.test.tsx` to reflect new nav.subscribe display value (`"PowerAI"`)
- All three test files MUST be updated BEFORE or simultaneously with the corresponding source changes (TDD requirement)
- `npm run test` MUST pass
- `npm run test:e2e` MUST pass

---

## PHASE 2 — UI IMPROVEMENTS

---

## SPEC-016: globals.css — Anthropic Color Token

**Phase**: 2
**Files**: `src/app/globals.css`
**Priority**: high

### Scenarios

**Scenario 1: --color-anthropic token declared in @theme inline block**

- Given: `src/app/globals.css` is loaded
- When: the `@theme inline` block is inspected
- Then: the block SHALL contain the declaration `--color-anthropic: #d4844a;`

**Scenario 2: Token is usable as a Tailwind utility class**

- Given: the `--color-anthropic` token is declared in `@theme inline`
- When: the class `bg-anthropic` or `text-anthropic` is applied in a component
- Then: it SHALL resolve to `#d4844a` (Tailwind v4 token bridge behavior)

**Scenario 3: Existing tokens are preserved**

- Given: `globals.css` is modified
- When: all existing `--color-*` declarations in the `@theme inline` block are inspected
- Then: all existing tokens (`--color-green`, `--color-violet`, `--color-amber`, `--color-cyan`, `--color-red`, and all others) SHALL still be present with unchanged values

**Negative Scenario 4: Token is NOT added outside the @theme inline block**

- Given: the `globals.css` file is inspected
- When: the placement of `--color-anthropic` is located
- Then: it SHALL be inside the `@theme inline { ... }` block, not in `:root`, `.dark`, or at the top level

### Acceptance Criteria

- MUST add `--color-anthropic: #d4844a` to the `@theme inline` block in `globals.css`
- MUST NOT alter the value of any existing design token
- `npm run type-check` MUST pass (CSS changes do not affect TypeScript)
- `npm run lint` MUST pass

---

## SPEC-017: AboutContent.tsx — Anthropic Credential Hero Card

**Phase**: 2
**Files**: `src/components/pages/AboutContent.tsx`
**Priority**: high

### Scenarios

**Scenario 1: Credential hero card renders between intro prose and stack section**

- Given: `AboutContent` renders
- When: the DOM structure is inspected
- Then: there SHALL be a card element that appears after the `<div>` containing `t.about.intro*` paragraphs and before the `<section>` containing `t.about.coreStack`

**Scenario 2: Credential card is full-width**

- Given: the Anthropic credential hero card renders
- When: its CSS classes are inspected
- Then: it SHALL have `col-span-full` or equivalent full-width layout class, and SHALL NOT be constrained to a column grid

**Scenario 3: Credential card applies violet color theme**

- Given: the credential card renders
- When: its styling is inspected
- Then: the card SHALL use violet styling (border, background, or accent) consistent with the `--color-violet` or `bg-violet-dim` / `border-l-violet` token; it SHALL NOT use `bg-anthropic` unless the token has been added via SPEC-016

**Scenario 4: Credential card displays the certification name**

- Given: the credential card renders in EN locale
- When: the card content is read
- Then: it SHALL display `"Claude Code in Action"` and `"Anthropic"` and the year `"2026"`

**Scenario 5: Credential card renders only for the cert entry with featured: true**

- Given: the `certs` array has `featured: true` only on the Anthropic entry (per SPEC-011)
- When: the credential hero card is rendered
- Then: it SHALL only render once and SHALL correspond to the Anthropic certification

**Scenario 6: Credential card does not appear in the Education badges list**

- Given: the credential hero card exists above the stack section
- When: the EDUCATION & CERTIFICATIONS badge list is inspected
- Then: the Anthropic cert SHALL still appear in the badges list as well (it is shown in both places)

**Negative Scenario 7: Card is not visible on mobile below md breakpoint without explicit handling**

- Given: the credential card has no explicit mobile-hidden class
- When: it renders
- Then: it SHALL be visible on all viewport sizes (it is not desktop-only unless the proposal specifies otherwise — the proposal only restricts the Navbar badge to desktop; this card is shown on all viewports)

### Acceptance Criteria

- MUST add an Anthropic Credential Hero Card component or JSX block in `AboutContent.tsx`
- Card MUST render between the intro section and the CORE STACK section
- Card MUST be full-width within the `max-w-4xl` container
- Card MUST display the cert name, issuer (`"Anthropic"`), and year
- Card MUST use violet styling aligned with the existing `--color-violet` design token
- `npm run type-check` MUST pass

---

## SPEC-018: AboutContent.tsx — "Why I Build in Public" Prose Section

**Phase**: 2
**Files**: `src/components/pages/AboutContent.tsx`
**Priority**: medium

### Scenarios

**Scenario 1: "Why I Build in Public" section renders between Experience and Education**

- Given: `AboutContent` renders
- When: the DOM structure is inspected
- Then: there SHALL be a section that appears after the EXPERIENCE section and before the EDUCATION & CERTIFICATIONS section

**Scenario 2: Section has a mono section label**

- Given: the "Why I Build in Public" section renders
- When: the section label element is inspected
- Then: it SHALL be styled with `font-mono` and `tracking-widest` consistent with other section labels (e.g., `t.about.experience`, `t.about.education`)

**Scenario 3: Section contains exactly 3 paragraphs**

- Given: the "Why I Build in Public" section renders
- When: the paragraph count within the section is measured
- Then: there SHALL be exactly 3 `<p>` elements inside the section's prose block

**Scenario 4: Section prose content is in messages.ts (both EN and ES)**

- Given: the `AboutContent.tsx` source is inspected
- When: the 3 paragraph texts are located
- Then: they SHALL be referenced via `t.about.*` i18n keys (e.g., `t.about.whyPublic1`, `t.about.whyPublic2`, `t.about.whyPublic3`) and SHALL NOT be hardcoded inline strings

**Scenario 5: Section label text is in messages.ts**

- Given: the section label is inspected
- When: its content is traced to messages.ts
- Then: a key such as `t.about.whyPublicLabel` SHALL exist in both `en` and `es` objects with appropriate text

**Scenario 6: ES locale renders Spanish content in this section**

- Given: `AboutContent` renders with ES locale
- When: the "Why I Build in Public" section prose is read
- Then: the paragraphs SHALL be in Spanish, sourced from the `es.about.*` keys

### Acceptance Criteria

- MUST add the "Why I Build in Public" section between Experience and Education sections in `AboutContent.tsx`
- MUST add section label and 3 paragraph i18n keys to `messages.ts` in both `en` and `es`
- Section label MUST match the monospace styling pattern of other section labels
- MUST contain exactly 3 prose paragraphs in the UI
- `npm run type-check` MUST pass

---

## SPEC-019: Navbar.tsx — Anthropic Cert Micro-Badge

**Phase**: 2
**Files**: `src/components/Navbar.tsx`
**Priority**: medium

### Scenarios

**Scenario 1: Micro-badge renders adjacent to Logo on desktop**

- Given: `Navbar` renders on a viewport where `md` breakpoint is active (>= 768px)
- When: the navbar brand area is inspected
- Then: there SHALL be a badge-like element adjacent to the `<Logo />` component, within or immediately after the brand `<Link>` wrapper

**Scenario 2: Micro-badge is hidden on mobile**

- Given: `Navbar` renders on a viewport below the `md` breakpoint
- When: the micro-badge element is inspected
- Then: the element SHALL have the class `hidden md:inline-flex` (or equivalent) so it is not visible on mobile

**Scenario 3: Micro-badge uses violet color**

- Given: the micro-badge element renders
- When: its CSS classes or inline styles are inspected
- Then: the badge SHALL use `text-violet` or `bg-violet-dim` or `border-violet` from the existing color tokens, consistent with the Anthropic credential visual identity established in other specs

**Scenario 4: Micro-badge displays certification label**

- Given: the micro-badge renders
- When: its text content is read
- Then: it SHALL display a short label referencing the Anthropic certification (e.g., `"Anthropic Certified"`, `"Claude Code"`, or a similar compact form) — the exact text SHALL be determined at implementation but MUST NOT exceed 20 characters to remain a "micro" badge

**Scenario 5: Micro-badge does not break Navbar layout on desktop**

- Given: `Navbar` renders with the micro-badge
- When: the full desktop nav is visually inspected (via E2E or snapshot)
- Then: the brand area SHALL remain in a single row, and the badge SHALL not cause text wrapping or overflow

**Negative Scenario 6: Micro-badge is not rendered in the mobile menu**

- Given: `Navbar` renders with mobile menu open
- When: the mobile menu DOM is inspected
- Then: the micro-badge element SHALL NOT appear inside the mobile menu dropdown

### Acceptance Criteria

- MUST add a micro-badge element adjacent to `<Logo />` in the desktop nav section
- Badge MUST have the CSS class `hidden md:inline-flex` (or `hidden md:flex`) to hide on mobile
- Badge MUST use violet color tokens
- Badge MUST display a recognizable Anthropic certification reference
- MUST NOT affect the mobile menu layout or rendering
- `npm run type-check` MUST pass
- `npm run lint` MUST pass

---

## SPEC-020: HomeContent.tsx — Cert Callout Strip

**Phase**: 2
**Files**: `src/components/pages/HomeContent.tsx`
**Priority**: medium

### Scenarios

**Scenario 1: Cert callout strip renders between hero section and tech stack bar**

- Given: `HomeContent` renders
- When: the DOM structure is inspected
- Then: there SHALL be a callout strip element that appears after the hero `<section>` and before the `<section>` containing the `STACK` bar

**Scenario 2: Callout strip references the Anthropic certification**

- Given: the callout strip renders in EN locale
- When: the strip's text content is read
- Then: it SHALL mention `"Anthropic"`, `"Claude Code"`, or the certification name, and SHALL visually differentiate the cert as a credential (e.g., using a violet accent or badge)

**Scenario 3: Callout strip text content is sourced from i18n**

- Given: the `HomeContent.tsx` source is inspected
- When: the callout strip text is traced
- Then: the text SHALL be referenced via `t.*` i18n keys and SHALL NOT be hardcoded English-only strings

**Scenario 4: Corresponding i18n keys exist in messages.ts**

- Given: `messages.ts` is loaded
- When: the i18n keys used by the callout strip are looked up
- Then: those keys SHALL exist in both `en` and `es` objects with non-empty values

**Scenario 5: ES locale renders Spanish content in the callout strip**

- Given: `HomeContent` renders with ES locale
- When: the callout strip text is read
- Then: it SHALL be in Spanish

**Scenario 6: Callout strip does not replace or displace the tech stack bar**

- Given: `HomeContent` renders with the callout strip
- When: the tech stack bar is checked
- Then: the STACK bar containing `"AWS"`, `"Next.js"`, etc. SHALL still be visible

### Acceptance Criteria

- MUST add a cert callout strip between the hero section and the tech stack bar in `HomeContent.tsx`
- Strip content MUST reference the Anthropic certification
- Strip text MUST be i18n'd (keys added to both `en` and `es` in `messages.ts`)
- The existing tech stack bar MUST remain present and unchanged
- `npm run type-check` MUST pass

---

## SPEC-021: NewsletterContent.tsx — Anthropic Benefits and Audience Updates

**Phase**: 2
**Files**: `src/components/pages/NewsletterContent.tsx`
**Priority**: medium

### Scenarios

**Scenario 1: "Anthropic-Certified Patterns" benefit is present in the benefits list**

- Given: `NewsletterContent` renders the WHAT YOU GET section
- When: the benefit cards are queried
- Then: there SHALL be a benefit card with a title containing `"Anthropic"` and/or `"Certified"` (e.g., `"Anthropic-Certified Patterns"`)

**Scenario 2: Benefits list retains all existing 4 benefits plus the new one**

- Given: `NewsletterContent` renders
- When: the benefit cards are counted
- Then: there SHALL be at least 5 benefit cards (original 4 plus the new Anthropic one)

**Scenario 3: "Technical decision-makers" audience entry is present**

- Given: `NewsletterContent` renders the WHO IS THIS FOR section
- When: the audience entries are read
- Then: there SHALL be an entry that mentions `"Technical decision-makers"` or `"decision makers"` (case-insensitive)

**Scenario 4: Existing audience entries are preserved**

- Given: `NewsletterContent` renders the WHO IS THIS FOR section
- When: the audience `who` labels are read
- Then: `"Engineers"`, `"Founders & CTOs"`, and `"Builders"` SHALL still be present

**Scenario 5: New benefit and audience entries support i18n**

- Given: the `NewsletterContent.tsx` source is inspected
- When: the new benefit object and audience object are traced
- Then: if the existing pattern uses hardcoded strings in the arrays (as it currently does), the new entries SHALL follow the same pattern for consistency; however, if i18n keys are introduced, they SHALL exist in both `en` and `es` in `messages.ts`

**Negative Scenario 6: Total benefit count does not exceed 6**

- Given: `NewsletterContent` renders
- When: the benefit cards are counted
- Then: there SHALL be at most 6 benefit cards (to maintain visual grid balance at sm:grid-cols-2)

### Acceptance Criteria

- MUST add an "Anthropic-Certified Patterns" benefit to the `benefits` array
- MUST add a "Technical decision-makers" entry to the `audiences` array
- MUST preserve all existing benefits and audiences
- If following the existing hardcoded pattern, the new entries MUST follow the same TypeScript object shape (`title: string`, `description: string` for benefits; `who: string`, `desc: string` for audiences)
- `npm run type-check` MUST pass

---

## PHASE 3 — NEW SECTIONS

---

## SPEC-022: HomeContent.tsx — "What I'm Building" Section

**Phase**: 3
**Files**: `src/components/pages/HomeContent.tsx`, `src/i18n/messages.ts`
**Priority**: medium

### Scenarios

**Scenario 1: "What I'm Building" section renders in HomeContent**

- Given: `HomeContent` renders
- When: the DOM is inspected for the new section
- Then: there SHALL be a section with a heading or section label containing a "What I'm Building" text (sourced from i18n)

**Scenario 2: Section contains exactly 2 cards**

- Given: the "What I'm Building" section renders
- When: the card elements within the section are counted
- Then: there SHALL be exactly 2 cards

**Scenario 3: First card is the PowerAI status card**

- Given: the "What I'm Building" section renders in EN locale
- When: the first card is inspected
- Then: its content SHALL reference `"PowerAI"` by name and SHALL include a status indicator (e.g., `"Active"`, `"Live"`, or a pulse indicator consistent with existing `pulse-subtle` patterns)

**Scenario 4: Second card is the next project teaser**

- Given: the "What I'm Building" section renders in EN locale
- When: the second card is inspected
- Then: its content SHALL describe a future or in-progress project, and SHALL have a status of `"Coming Soon"` or equivalent

**Scenario 5: Section label and card text content is i18n'd**

- Given: the section renders in EN locale
- When: the visible text is traced to source
- Then: the section label, card titles, and card descriptions SHALL reference `t.*` keys in messages.ts

**Scenario 6: ES locale renders Spanish content in this section**

- Given: `HomeContent` renders with ES locale
- When: the "What I'm Building" section text is read
- Then: all user-visible strings SHALL be in Spanish

**Scenario 7: i18n keys for the section exist in messages.ts**

- Given: messages.ts is loaded
- When: the keys for the "What I'm Building" section are looked up
- Then: corresponding keys SHALL exist in both `en` and `es` objects in an appropriate namespace (e.g., under a new `building` key or within an existing section)

**Scenario 8: Section is positioned logically within the page flow**

- Given: `HomeContent` renders
- When: the full page structure is inspected
- Then: the "What I'm Building" section SHALL appear after the AUTOMATION OF THE WEEK section and before the FEATURED PROJECTS section, OR after FEATURED PROJECTS — the implementation MUST choose a position that does not disrupt the primary conversion flow to the newsletter CTA

### Acceptance Criteria

- MUST add the "What I'm Building" section with exactly 2 cards to `HomeContent.tsx`
- Card 1 MUST reference PowerAI with a live/active status
- Card 2 MUST describe the next project as a teaser with coming-soon status
- All user-visible text MUST be i18n'd with keys added to both `en` and `es` in `messages.ts`
- MUST NOT remove any existing section from `HomeContent.tsx`
- `npm run type-check` MUST pass

---

## SPEC-023: AutomationsContent.tsx — certifiedStack Flag and GitHub Code Section

**Phase**: 3
**Files**: `src/components/pages/AutomationsContent.tsx`
**Priority**: medium

### Scenarios

**Scenario 1: certifiedStack flag added to Claude API automations**

- Given: the `automations` array in `AutomationsContent.tsx` source is inspected
- When: each automation entry is checked for the `certifiedStack` property
- Then: all automation entries whose `stack` array contains `"Claude API"` SHALL have `certifiedStack: true`; entries without `"Claude API"` in their stack SHALL have `certifiedStack: false` or omit the property

**Scenario 2: Certified automations display a visual indicator**

- Given: `AutomationsContent` renders
- When: the automation cards with `certifiedStack: true` are inspected
- Then: each such card SHALL display a visible badge or indicator referencing the Anthropic certification or certified stack status, using violet or anthropic color tokens

**Scenario 3: Non-certified automations do not show the indicator**

- Given: `AutomationsContent` renders
- When: automation cards without `certifiedStack: true` are inspected
- Then: those cards SHALL NOT show the certification indicator badge

**Scenario 4: "Code on GitHub" section renders on the Automations page**

- Given: `AutomationsContent` renders
- When: the page is inspected for a GitHub section
- Then: there SHALL be a section or card labeled with a "Code on GitHub" or equivalent heading (sourced from i18n), appearing after the automations list and before or after the existing CTA card

**Scenario 5: "Code on GitHub" section contains a link to the GitHub repository**

- Given: the "Code on GitHub" section renders
- When: the link element is inspected
- Then: it SHALL have an `href` pointing to `"https://github.com/Crisfon6-dev"` or a specific repo URL, and SHALL have `target="_blank"` and `rel="noopener noreferrer"`

**Scenario 6: "Code on GitHub" section text is i18n'd**

- Given: the section renders in both EN and ES locales
- When: the heading and description text is traced
- Then: the strings SHALL reference `t.automations.*` keys (new keys added to messages.ts) and SHALL NOT be hardcoded English-only strings

**Scenario 7: i18n keys for GitHub section exist in messages.ts**

- Given: `messages.ts` is loaded
- When: the new keys for the GitHub section are looked up in `en` and `es`
- Then: they SHALL exist and SHALL have non-empty values

**Negative Scenario 8: Existing automations data is unchanged**

- Given: the `automations` array is inspected after the change
- When: the existing properties (title, description, stack, cost, timeSaved, difficulty, week) are read
- Then: none of those properties SHALL be altered; only `certifiedStack` is added

### Acceptance Criteria

- MUST add `certifiedStack: boolean` property to the automation objects in the `automations` array
- MUST add the certification indicator to cards where `certifiedStack === true`
- MUST add a "Code on GitHub" section to `AutomationsContent.tsx`
- MUST add corresponding i18n keys to `messages.ts` for both `en` and `es`
- GitHub link MUST open in a new tab with proper security attributes
- `npm run type-check` MUST pass (TypeScript type for the automation object MUST accommodate the new optional/required `certifiedStack` property)

---

## CROSS-CUTTING REQUIREMENTS

---

## SPEC-024: TypeScript and Lint Gate (All Phases)

**Phase**: 1 | 2 | 3
**Files**: All modified files
**Priority**: critical

### Scenarios

**Scenario 1: Type-check passes after each phase**

- Given: all changes within a given phase are applied
- When: `npm run type-check` is executed
- Then: it SHALL exit with code 0 and produce zero TypeScript errors

**Scenario 2: Lint passes after each phase**

- Given: all changes within a given phase are applied
- When: `npm run lint` is executed
- Then: it SHALL exit with code 0 and produce zero ESLint errors

**Scenario 3: No default exports introduced**

- Given: any new component or utility file is created in any phase
- When: its exports are inspected
- Then: all exports SHALL use named export syntax (`export function`, `export const`) and SHALL NOT use `export default`

**Scenario 4: No tailwind.config.js created**

- Given: any phase introduces new design tokens or Tailwind utilities
- When: the project root is inspected
- Then: there SHALL NOT be a `tailwind.config.js` or `tailwind.config.ts` file; all tokens SHALL be in `globals.css` within the `@theme inline` block

**Scenario 5: New i18n keys exist in both locales**

- Given: any spec in any phase adds new i18n keys
- When: the `en` and `es` objects in `messages.ts` are compared structurally
- Then: every key present in `en` SHALL also be present in `es` with a non-empty Spanish-language value; the TypeScript `as const` assertion and `Messages` type SHALL enforce structural parity at compile time

**Scenario 6: Server/client component boundary is respected**

- Given: any new component or JSX block is added
- When: components are inspected for the `'use client'` directive
- Then: components using hooks (`useLanguage`, `useState`, `usePathname`, etc.) SHALL have `'use client'` at the top; components that are purely server-rendered (page.tsx files) SHALL NOT have `'use client'`

### Acceptance Criteria

- `npm run type-check` MUST pass with zero errors after all changes in each phase
- `npm run lint` MUST pass with zero errors after all changes in each phase
- `npm run test` MUST pass with zero test failures after all changes in each phase
- Named exports MUST be used exclusively — no default exports
- All new design tokens MUST be added to the `@theme inline` block in `globals.css`
- All new i18n text MUST have both `en` and `es` entries in `messages.ts`

---

## SPEC-025: Regression — Existing Page Navigation (All Phases)

**Phase**: 1 | 2 | 3
**Files**: `tests/e2e/navigation.spec.ts`
**Priority**: critical

### Scenarios

**Scenario 1: All existing routes remain reachable**

- Given: the application is running after all phase changes
- When: navigation links for `/about`, `/projects`, `/automations`, `/blog`, `/newsletter`, `/work-with-me` are followed
- Then: each SHALL respond with HTTP 200 and SHALL render an `<h1>` element

**Scenario 2: LanguageToggle continues to switch locales**

- Given: the application renders in EN locale
- When: the LanguageToggle is activated
- Then: the UI SHALL update to ES locale, and `t.hero.tagline` SHALL read `"INGENIERÍA DE SISTEMAS AI · LATAM"`

**Scenario 3: Theme toggle continues to work**

- Given: the application renders in dark mode
- When: the ThemeToggle is activated
- Then: the `<html>` element's `class` attribute SHALL change from `dark` to light mode class or vice versa

**Scenario 4: Newsletter subscribe form still renders**

- Given: `NewsletterContent` renders after Phase 2 changes
- When: the subscribe form area is inspected
- Then: the `<SubscribeForm />` component SHALL still be present and not removed

**Scenario 5: Footer social links are intact**

- Given: `Footer` renders after all changes
- When: social links are inspected
- Then: links to `linkedin.com/in/crisfon6/`, `github.com/Crisfon6-dev`, and `crisfon6@crisfon6.com` SHALL all be present

### Acceptance Criteria

- All existing routes SHALL remain functional throughout all phases
- i18n toggle SHALL function correctly with all new and updated copy
- No existing interactive components SHALL be removed or broken

---

### Critical Files for Implementation

- `/Users/crisfon6/Work/NextGol/projects/crisfon6-website/src/i18n/messages.ts`
- `/Users/crisfon6/Work/NextGol/projects/crisfon6-website/src/components/pages/WorkWithMeContent.tsx`
- `/Users/crisfon6/Work/NextGol/projects/crisfon6-website/src/components/pages/AboutContent.tsx`
- `/Users/crisfon6/Work/NextGol/projects/crisfon6-website/src/app/layout.tsx`
- `/Users/crisfon6/Work/NextGol/projects/crisfon6-website/src/app/globals.css`
