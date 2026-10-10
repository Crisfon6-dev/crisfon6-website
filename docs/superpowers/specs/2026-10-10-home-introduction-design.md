# Home page: introduce the person first

Status: draft for owner review. Branch: `feat/home-introduction` (from `main` at the merge of PR #30).

## Problem

The home page is the owner's introduction, but it says little about the owner. Verified against the
code on `main`: the hero shows a name, a role line, availability and one quote; the proof strip shows
four numbers; then roughly seven screens of scroll are spent on six case-study chapters
(`HeroFilm` + `ChapterPlate`) that already live on `/projects` and `/experience`. The facts a visitor
wants about the person (current role, where, credentials, stack, a face) exist in `career.ts` and on
`/about`, one click away, and appear nowhere on the home page.

Owner feedback: the chapters do not give the visitor what they came for.

## Goal

A visitor learns, in order: **A** who the owner is, **B** what the owner has done, **C** how to
make contact. Priority order given by the owner. The visual language (type, warm-black and coral
palette, slab cards) does not change.

## Non-goals

- No new copy about the owner: every sentence and fact is read from existing data or messages.
- No redesign of `/about`, `/projects`, `/experience`, the navbar or the footer.
- No new footage. The existing light and night footage stay in use as the film backdrop.

## Design

### Home order

1. **Hero** (unchanged).
2. **Who I am** (new): photo plus bio and facts, in a near-opaque slab card.
3. **Proof**: the four-number proof strip, then the featured case cards.
4. **Contact**, then the newsletter panel.

The principle band stays exactly where it is, between the cases and the contact panel, untouched.

### The film becomes a backdrop

`HeroFilm` stops being a seven-screen empty spacer with chapter panels. A new `FilmStage` wraps the
first three sections (hero, who I am, proof strip) and keeps the footage pinned behind them. Playback
follows scroll across the **measured height of that wrapper**, not a fixed `FILM_TRAVEL_VH`:

- `progress = clamp(scrollY / max(1, wrapperHeight - viewportHeight), 0, 1)`, as a pure function
  `filmProgressOver` with its own tests (zero, past the end, zero or negative height, non-finite).
- The page-colour veil closes after the wrapper ends (existing `veilOpacity`, with the wrapper's
  scroll extent in place of `FILM_TRAVEL_VH`).
- The hero shade keeps its hold-then-fade shape (`heroShadeOpacity`).
- Light theme plays the light footage, dark theme the night footage (`heroFilmAssetsFor`).
- Small screens and reduced motion get the poster as a faint backdrop and no video, as today.
- The sections render on the server and without JavaScript; only the media is client-side.

### Who I am

A section (`id="who-i-am"`) inside a `.slab` card, so text contrast does not depend on the frame
behind it. Desktop: 12-column grid, photo 4 columns, text 8. Mobile: photo first (max 280px wide),
then text. Both locales.

| Part                                                | Source                                                     |
| --------------------------------------------------- | ---------------------------------------------------------- |
| Label                                               | new translated label ("WHO I AM")                          |
| Lead sentence                                       | `about.intro1`                                             |
| Supporting line                                     | `about.businessAngle`                                      |
| Now: title · employer · since, plus the client line | role `prosperas` in `career.ts` (`formatRolePeriod`)       |
| Based                                               | `PROFILE.location`                                         |
| Credentials, at most 3                              | `CREDENTIALS`, in the data's order                         |
| Stack: 4 groups, the first 3 items of each          | `STACK_GROUPS`, in the data's order                        |
| Links                                               | `/about` ("Full story") and `/experience` ("Work history") |

### Photo

Source: the owner's chosen photo (casual selfie in a barbershop). It is not used as-is: about 40% of
the frame is ceiling and two other people are visible in the background, who have not agreed to
appear on a public site. The photo is cropped to head and shoulders and the background removed, the
face untouched. Output: transparent WebP, about 800x1000, under 120 KB, at
`public/people/cristhian-v1.webp` (a new folder: the hero-asset guard covers only `public/hero`).
The cutout edges are inspected before use; if the hair edge is rough the owner chooses between a
softer edge and a plain dark backdrop. Alt text is real content, localized ("Portrait of Cristhian
Fonseca").

### The decision lines move into the case cards

The one-line `decision` on three cases (`aws-cost-audit`, `analytics-platform`,
`ai-orchestration-harness`) currently shows only in the chapters. The featured case cards
(`FeaturedProjectsSection`, `HorizontalCases`) show it under the description when present and skip it
cleanly when absent (`credit-marketplace`).

### Removed (dead code after this change)

`ChapterPlate`, `homeChapters`, `chapterBeats`, the stills grid, the screen-reader chapter list, the
chapter plate in `HeroFilm`, `plateOpacity`, the `chapters.items` and `chapters.beats` translations,
and their tests. The plan enumerates every reference with a search before deleting. One dependency to
handle first: the case cards read `t.chapters.seeCase` for their "Read the case" label, so that label
moves to the cards' own translation namespace before the block is removed. The old implementation
stays in git history.

### Testing

- Unit: every shown fact equals its source in `career.ts` / `messages.ts` in both languages (no
  hardcoded facts); `filmProgressOver` edges; case cards with and without a decision line; the photo
  file exists, is under budget, and the image has alt text.
- Component: home DOM order is hero, who I am, proof strip, cases, contact, newsletter.
- Existing guards stay green, including `src/lib/__tests__/heroAssetBudget.test.ts` and the asset
  file tests. **The whole unit suite is run before every push**, including `src/lib`: a previous CI
  failure came from a directory outside the changed modules.
- e2e specs that reference chapter test IDs are updated or removed with a stated reason.
- Final gate: the same three-judge team (visual, CTO persona, accessibility) approves at light and
  dark, at 1440x900, 1280x640 and 375x812, with contrast measured behind text over the footage.

## Risks

- Deleting recently merged work makes a large diff, mostly removals.
- Tying film progress to measured content height is new logic; it must be verified on short laptops
  and after fonts and images load (height changes).
- The cutout may look artificial around the hair. Mitigation above.
- Over-long bio or stack lines can make the card tall; the card caps the stack at 12 chips.

## Open items for the owner

1. Review this spec.
2. Confirm that "Credentials: at most 3, in the data's order" and "stack: first 3 of each group, in
   the data's order" are the right selection rule, or name the items you want shown.
