## ADDED Requirements

### Requirement: Scroll-drawn system diagram

The home page SHALL include a section with an SVG diagram of the three-tier system whose line paths draw as the section scrolls through the viewport, using `stroke-dashoffset` driven by scroll progress.

#### Scenario: progress drives the drawing

- **WHEN** the section's scroll progress is 0 and then 1
- **THEN** the diagram's paths are fully hidden at 0 and fully drawn at 1, mapped linearly and clamped

#### Scenario: reduced motion

- **WHEN** `prefers-reduced-motion: reduce` matches
- **THEN** the diagram renders fully drawn with no scroll-driven animation

#### Scenario: no text in the diagram

- **WHEN** the diagram renders
- **THEN** it contains no `text` elements, is `aria-hidden` unless given an accessible label, and introduces no figures or claims

### Requirement: Principle statement

The home page SHALL include a full-screen statement section showing the first entry of `PRINCIPLES` in `src/data/career.ts` (title and proof, in the active locale) whose words reveal progressively with scroll.

#### Scenario: text equals the source

- **WHEN** the section is rendered in EN and ES at full reveal
- **THEN** its text equals the `PRINCIPLES[0]` title and proof for that locale, and no other copy appears

#### Scenario: reduced motion

- **WHEN** `prefers-reduced-motion: reduce` matches
- **THEN** all words are visible immediately

### Requirement: Timeline line draws with scroll

The `Timeline` primitive SHALL render a progress line that fills as the timeline scrolls through the viewport, without changing its items, order or text.

#### Scenario: items unchanged

- **WHEN** `AboutContent` is rendered
- **THEN** the timeline still has 6 items with the same titles and periods as before

#### Scenario: reduced motion

- **WHEN** `prefers-reduced-motion: reduce` matches
- **THEN** the line renders fully filled

### Requirement: Horizontal case-study cards on large screens

On viewports of 1024px or wider, with motion allowed, the home page SHALL present the four featured case studies as a pinned section that scrolls the cards horizontally with vertical scroll. Below 1024px, or with reduced motion, the existing vertical grid SHALL be shown instead.

#### Scenario: desktop pinned scroller

- **WHEN** the viewport is 1024px or wider and motion is allowed
- **THEN** the four cards (`ai-in-production`, `ai-orchestration-harness`, `credit-marketplace`, `aws-cost-audit`) render in one horizontal track whose translation maps linearly to the section's scroll progress

#### Scenario: links preserved

- **WHEN** any card is rendered in either layout
- **THEN** it links to `/projects#<case id>` and shows its title, tag and first outcome in the active locale

#### Scenario: fallback

- **WHEN** the viewport is narrower than 1024px or reduced motion matches
- **THEN** the existing `FeaturedProjectsSection` vertical grid renders and no pinned track exists

### Requirement: No unverified copy in new sections

New sections SHALL NOT introduce figures, claims or copy that do not come from `src/data/career.ts` or existing `messages.ts` keys, except neutral UI labels added in both EN and ES.

#### Scenario: claim guard

- **WHEN** the home page is rendered in EN and ES
- **THEN** the existing claim-alignment forbidden-phrase checks still pass
