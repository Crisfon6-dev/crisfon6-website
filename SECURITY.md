# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Contact**: Send an email to [cfonseca@prosperas.com](mailto:cfonseca@prosperas.com) with the subject line `[SECURITY] crisfon6-website`.

Please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment

I will acknowledge your report within 48 hours and work to address the issue promptly.

**Please do not** open a public GitHub issue for security vulnerabilities.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| latest  | ✅        |

## Security Practices

This project follows these security practices:

- Dependencies are scanned weekly via Dependabot
- Secrets are detected in CI via Gitleaks
- All dependencies are pinned via `package-lock.json`
- Production deployments use `npm ci` for reproducible installs
- HTTP security headers are enforced via `vercel.json`
