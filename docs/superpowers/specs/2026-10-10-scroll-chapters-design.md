# Scroll chapters: from captions to case dossiers

Status: draft for owner review. Branch: `feat/scroll-chapters` (stacked on `feat/ux-overhaul`, PR #28).

## Problem

The home film is 700vh of scroll (`FILM_TRAVEL_VH = 7`). Six chapters swap a small bottom-left card
(`ChapterPlate`) showing a title, one claim line and one number. Chapter I has no number and no link.
The art carries the section, the content does not, so the visitor spends about seven screens of
scroll for very little information. Owner feedback: it generates less impact than it could, and
gives the visitor no reason to stay. Judges in the UX audit said the same (the proof strip only
moved proof earlier; it did not fix the section).

## Goal

Information leads, spectacle supports it. Scrolling through a chapter should be how the visitor
reads a short case: Problem, Decision, Result. The film stays as the backdrop.

## Non-goals

- No new video or image assets; no change to `FILM_TRAVEL_VH` in this change (pacing is tuned after
  seeing real content).
- No new claims. Every figure and line is read from `src/data/career.ts`.
- No change to the mobile/stills layout structure beyond rendering the same dossier under each still.

## Design

### Chapter anatomy

Case-backed chapters (II, III, IV, V) render three beats inside a larger panel (about 5 of 12
columns, alternating left/right by chapter index):

| Beat     | Source                                                         |
| -------- | -------------------------------------------------------------- |
| Problem  | the case's existing `context`                                  |
| Decision | new optional `decision: L` on `CaseStudy` (short, one line)    |
| Result   | `outcomes[0]` as the anchored number, `outcomes[1]` as support |

Chapter I (no case): two beats from the hero's own line, "Who does it hurt?" and "What does it
cost?". No number, no link.

Chapter VI (no case): a closing recap of the four `KEY_FACTS` plus the existing hiring email CTA.

Chapter V (credit-marketplace) has no real decision in the source. Owner decision (A): it renders
two beats, Problem then Result. Absence of `decision` always degrades to two beats; it never
renders an empty slot.

### Scroll mechanics

- Local progress `p = clamp((progress - chapter.from) / (chapter.to - chapter.from), 0, 1)`.
- Reveal thresholds: Problem 0.08, Decision 0.35, Result 0.62. The remaining ~38% holds with
  everything visible before the next chapter swaps in.
- A reveal is a CSS transition of about 280ms on `transform` and `opacity` only. It is not scrubbed
  to scroll position.
- The result number uses the existing `CountUp` primitive when the value parses as numeric,
  otherwise it fades in.
- Pure function `beatVisibility(p, hasDecision)` in a new `src/components/home/chapterBeats.ts` decides
  which beats are visible; written test-first.
- Reduced motion, stills layout, and narrow screens: all beats visible at once. Text is always in
  the DOM; only opacity changes, so assistive tech reads the full content at any scroll position.

### Data model

`CaseStudy` gains `decision?: L`. Populated for `aws-cost-audit`, `analytics-platform` and
`ai-orchestration-harness`; absent for `credit-marketplace`.

Draft decision lines (English; Spanish reuses the existing Spanish wording of the same bullets).
**Pending owner confirmation:**

- aws-cost-audit: "Refused a tempting downsize: the production cluster averaged 12.7% CPU, but its
  p99 was 97.5%."
- analytics-platform: "Reused the product's existing tenant scoping instead of rebuilding it in a
  BI tool, and proved parity on seven months of production data before retiring the old service."
- ai-orchestration-harness: "Two blind judges review every branch independently; a separate fixer
  applies only confirmed defects."

### Visual direction

Engineer's field notebook, as on the rest of the site: warm paper panel (`.slab`), ink type, one
coral accent, Geist display for the number. The number is the visual anchor; the beats are set in
sentence case with small mono labels (Problem / Decision / Result). Dark mode reuses the existing
dark `.slab` rules. Contrast must hold at 4.5:1 over the film in both themes.

### Testing

- Unit: `beatVisibility` before 0, at each threshold, past 1, NaN, with and without a decision.
- Component: `ChapterPlate` renders three beats for a case with a decision and two without; keeps
  existing test IDs; renders all beats under reduced motion.
- Data: a test that case-backed chapter text comes from `career.ts` (no hardcoded figures).
- Existing chapter, copy-voice and e2e tests stay green or are updated with a stated reason.
- Final gate: the same three-judge team (visual, CTO persona, accessibility) approves.

## Risks

- Panel size over a busy film can hurt contrast: mitigated by the opaque `.slab` face and the
  contrast probe in the judge pass.
- A larger panel can hide the scene on short viewports: cap panel height, allow internal layout to
  collapse the Result support line first.
- Length of the 700vh may still feel long: decided after seeing it, not guessed.

## Open items for the owner

1. Confirm or edit the three decision lines above.
2. Review chapter I and VI copy as described (no new claims were introduced).
