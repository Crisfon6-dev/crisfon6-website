## ADDED Requirements

### Requirement: AI-generated media disclosure

Every page that shows the site footer SHALL include a note, in EN and ES, stating that the hero film and its imagery were generated with AI.

#### Scenario: note present

- **WHEN** any page is rendered in EN or ES
- **THEN** the footer contains the disclosure note in the active locale

### Requirement: Long cache for versioned hero assets

Files under `/hero/` SHALL be served with `Cache-Control: public, max-age=31536000, immutable`, and HTML routes SHALL NOT receive that policy.

#### Scenario: hero headers

- **WHEN** `next.config` headers are resolved for the source `/hero/:path*`
- **THEN** the `Cache-Control` value is `public, max-age=31536000, immutable`

#### Scenario: HTML not long-cached

- **WHEN** `next.config` headers are resolved
- **THEN** no immutable long-cache rule matches the home page HTML route

#### Scenario: versioned names

- **WHEN** the files under `public/hero/` are listed
- **THEN** every file name contains a version suffix such as `-v1`, so a changed asset gets a new URL
