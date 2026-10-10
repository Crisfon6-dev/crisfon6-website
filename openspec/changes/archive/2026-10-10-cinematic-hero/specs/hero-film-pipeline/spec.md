## ADDED Requirements

### Requirement: Tools and credit check come first

Before any generation the pipeline SHALL confirm the Higgsfield MCP tools are callable and SHALL report the credit balance.

#### Scenario: tools unavailable

- **WHEN** the Higgsfield tools cannot be called
- **THEN** the pipeline stops and reports it, and generates nothing

#### Scenario: balance reported

- **WHEN** tools are available
- **THEN** the current credit balance is reported before any other step

### Requirement: Visual Story is approved before generation

The pipeline SHALL produce a Visual Story (scene-by-scene shot list, scroll-pacing plan in viewport-heights, fact-to-shot overlay map, film length, estimated credit cost) and SHALL NOT generate any still or clip until the owner approves it.

#### Scenario: no approval

- **WHEN** the Visual Story has not been approved
- **THEN** no Higgsfield generation call is made

#### Scenario: estimate present

- **WHEN** the Visual Story is presented
- **THEN** it includes the proposed film length and an estimated credit cost, and the owner supplies a credit cap

### Requirement: Establishing still anchors the style

The pipeline SHALL generate one establishing still, obtain the owner's approval of it, and keep every later still and clip in its style, by supplying it as a reference where the model allows, or otherwise by chaining from frames that descend from it and checking palette drift against it.

#### Scenario: reference supported

- **WHEN** the model accepts reference media together with a start frame
- **THEN** the approved establishing still is supplied as a reference to every later still and clip

#### Scenario: reference not combinable

- **WHEN** the model rejects a start frame combined with reference media
- **THEN** each clip starts from the previous clip's last frame, the palette is restated in the prompt, and a palette-drift check against the establishing still is run on every clip, with any flag forcing a visual review

### Requirement: One continuous camera move

Clips SHALL form a single continuous first-person move with no cuts or dissolves, each clip starting from the last frame of the previous clip.

#### Scenario: chaining

- **WHEN** clip N+1 is generated
- **THEN** its start image is the last frame of clip N

#### Scenario: automated continuity checks

- **WHEN** the master film is built
- **THEN** the maximum per-frame scene score over all frames is far below a hard-cut level (under 0.1), and the similarity between each clip's last frame and the next clip's first frame is at least 0.98

#### Scenario: visual QA

- **WHEN** a clip is reviewed
- **THEN** frames sampled at 0.5 s intervals and the last frame at full size are inspected, and any hidden dissolve, morphing geometry, impossible structure or discontinuity causes the shot to be rejected and regenerated

### Requirement: Generated media contains no identifying or textual content

Generated stills, clips and delivery files SHALL contain no text, numbers, logos, real brands, people, faces or hands, and no client, partner or Aphrodite identifiers in content, filenames or metadata.

#### Scenario: content QA

- **WHEN** a frame shows legible or warped text, a logo, a person, a hand, a face, or a dark outline ring
- **THEN** the shot is rejected and regenerated

#### Scenario: metadata and names

- **WHEN** delivery files are inspected with `ffprobe`
- **THEN** no format tags are present other than the container brand fields (`major_brand`, `minor_version`, `compatible_brands`), no encoder-settings string is embedded in the bitstream, and no filename contains a term from the content denylist

### Requirement: Delivery files meet budgets measured in bytes

Delivery assets SHALL satisfy, measured in bytes: desktop MP4 <= 8,000,000, poster WebP <= 200,000, each still WebP <= 150,000. The desktop MP4 SHALL be all-intra (every frame an intra frame) with no audio stream. No mobile video SHALL be produced or served.

#### Scenario: budget check

- **WHEN** the asset check runs over `public/hero/`
- **THEN** it fails if any file exceeds its byte budget, the video has an audio stream, any video frame is not an intra frame, or a video file named for mobile exists

#### Scenario: unit is bytes

- **WHEN** a budget is evaluated
- **THEN** it is compared as a byte count, never as MB or MiB

### Requirement: Only versioned deliverables enter the repo

Masters, raw clips, rejected attempts and unused generations SHALL stay outside the repository; only versioned delivery files (`-v1` in the name) under `public/hero/` are committed.

#### Scenario: repo contents

- **WHEN** the change is staged
- **THEN** no file outside the delivery set and the code, tests and spec files is added, and every file under `public/hero/` carries a version suffix

### Requirement: Regeneration is capped

Each shot SHALL be regenerated at most twice automatically; after that the pipeline MUST stop and ask the owner.

#### Scenario: third failure

- **WHEN** a shot fails QA a third time
- **THEN** the pipeline stops and reports what failed and what it tried

### Requirement: No merge and no deploy

The pipeline SHALL work on a dedicated branch and SHALL NOT merge or deploy. It MAY push the branch and open a pull request, because the owner approved that explicitly.

#### Scenario: completion

- **WHEN** all tasks are done
- **THEN** a pull request is open against the main branch with a summary, before and after screenshots, page weight and credits used, and no merge or deploy has been performed
