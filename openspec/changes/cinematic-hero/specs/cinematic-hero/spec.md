## ADDED Requirements

### Requirement: Hero content renders independently of the film

The home hero SHALL include the `crisfon6` heading, the subtitle and both CTAs in the initial server-rendered HTML, and the film SHALL NOT delay or block them.

#### Scenario: film not loaded

- **WHEN** the home page is rendered and no film bytes have been requested
- **THEN** `src/components/home/HeroSection.tsx` output contains the `h1`, the subtitle, `hero-cta-primary` and `hero-cta-secondary`

#### Scenario: film fails

- **WHEN** the video cannot become playable within the load timeout
- **THEN** the poster stays visible in the film stage and the heading and CTAs are unaffected

### Requirement: The film stage follows the hero text

The pinned film stage SHALL be a separate section placed directly after `HeroSection` on the home page, not layered behind the hero text.

#### Scenario: placement

- **WHEN** `HomeContent` is rendered
- **THEN** the `hero-film` section appears immediately after the hero section and before the stats section

### Requirement: Scroll position drives video time

The film SHALL map scroll progress through the pinned section linearly to `video.currentTime`, clamped to the range `0` to `duration`.

#### Scenario: progress endpoints

- **WHEN** `progressToTime(0, duration)` and `progressToTime(1, duration)` are evaluated
- **THEN** the results are `0` and `duration`

#### Scenario: out-of-range progress

- **WHEN** progress is below `0` or above `1`
- **THEN** the result is clamped to `0` or `duration`

### Requirement: Overlays show verified facts only

Every film overlay SHALL reference an entry of `KEY_FACTS` in `src/data/career.ts` and SHALL display exactly that entry's value and label in the active locale.

#### Scenario: overlay resolves to a fact

- **WHEN** the overlay configuration is validated
- **THEN** every overlay's `factIndex` resolves to an existing `KEY_FACTS` entry

#### Scenario: no unverified text

- **WHEN** the film is rendered in EN and ES at any progress value
- **THEN** all overlay text equals a `KEY_FACTS` value or label, and no other overlay text exists

#### Scenario: shots without a fact

- **WHEN** progress falls in a shot that has no assigned fact
- **THEN** no overlay is shown

### Requirement: Stills replace the film where scrubbing is not wanted

The home page SHALL NOT render or request a video, and SHALL show the poster plus the four shot stills (compute, data, delivery, reveal) each captioned with its `KEY_FACTS` entry, when any of these hold: `prefers-reduced-motion: reduce`, a viewport of 768px or narrower, the `saveData` hint, or JavaScript disabled.

#### Scenario: reduced motion

- **WHEN** `prefers-reduced-motion: reduce` matches
- **THEN** no `video` element is rendered and the poster and four captioned stills are visible

#### Scenario: small viewport

- **WHEN** the viewport is 768px wide or narrower
- **THEN** no `video` element is rendered and no request is made for the desktop video file

#### Scenario: data saver

- **WHEN** `navigator.connection.saveData` is true
- **THEN** no video source is requested and the stills are visible

#### Scenario: captions are verified facts

- **WHEN** the stills are rendered in EN and ES
- **THEN** each caption equals the value and label of its `KEY_FACTS` entry (compute: `-43%`, data: `30x`, delivery: `~100K`, reveal: `5+`)

### Requirement: Film loading protects the hero text paint

Film assets SHALL be requested only after the page has loaded and the film stage is within one viewport of the visible area, so the LCP element stays the hero text.

#### Scenario: load order

- **WHEN** the home page loads on a desktop viewport without scrolling
- **THEN** no request is made for any file under `public/hero/` until the stage is within one viewport of view

#### Scenario: lazy poster

- **WHEN** the stage approaches the viewport
- **THEN** the poster is requested first and the video source is assigned only after the poster has loaded

### Requirement: Performance and accessibility floors

The home page with the film SHALL keep Lighthouse performance >= 90 and accessibility >= 95, with cumulative layout shift <= 0.01, on desktop and mobile profiles.

#### Scenario: Lighthouse run

- **WHEN** Lighthouse is run against `/` in production mode
- **THEN** performance >= 90, accessibility >= 95 and CLS <= 0.01 on both profiles, otherwise the film is shortened or compressed

#### Scenario: decorative media

- **WHEN** the film or stills render
- **THEN** the video and images are `aria-hidden` or have empty alt text, and overlay and caption text is real DOM text with contrast of at least 4.5:1 against its background or scrim

### Requirement: Film assets are scoped to the home page

Film assets SHALL be loaded only by the home page.

#### Scenario: other routes

- **WHEN** `/about`, `/projects`, `/experience` and `/work-with-me` are loaded
- **THEN** no request is made for any file under `public/hero/`
