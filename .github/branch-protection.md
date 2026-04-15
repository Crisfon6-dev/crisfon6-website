# Branch Protection Rules

This document describes the branch protection configuration for the `main` branch.
These settings must be configured manually in **GitHub Repository Settings → Branches**.

## Main Branch Rules

Go to: `Settings → Branches → Add branch protection rule` → Branch name pattern: `main`

### Required settings

- [x] **Require a pull request before merging**
  - [x] Require approvals: 1 (waive for solo dev — enable when collaborators join)
  - [x] Dismiss stale PR approvals when new commits are pushed

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Required checks (enable after first CI run so GitHub knows their names):
    - `Lint`
    - `Type Check`
    - `Unit Tests`
    - `E2E Tests`
    - `Secrets Scan`
    - `Dependency Audit`

- [x] **Require conversation resolution before merging**

- [x] **Do not allow bypassing the above settings**

- [ ] ~~Restrict who can push to matching branches~~ — Solo dev, not needed

- [x] **Allow force pushes**: Off
- [x] **Allow deletions**: Off

## Release Please Bot

The `github-actions[bot]` needs to be able to merge release PRs. If you enable
"Restrict who can merge PRs", add `github-actions[bot]` to the allowlist.

Alternatively, enable **Allow GitHub Actions to create and approve pull requests**:
`Settings → Actions → General → Workflow permissions → Allow GitHub Actions to create and approve pull requests`

## Notes

- These rules cannot be automated without GitHub CLI or Terraform — document them here as a runbook.
- Revisit when adding collaborators to strengthen approval requirements.
