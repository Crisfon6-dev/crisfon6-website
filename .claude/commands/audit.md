---
description: Run a full site health audit (SEO + conversion + i18n + quality)
---

# Full Site Audit

Run the `seo-auditor` and `site-auditor` agents in parallel for a comprehensive health check.

## Steps

1. **Launch both auditors in parallel**:
   - `seo-auditor` agent: checks meta tags, structured data, AI SEO, sitemap, RSS
   - `site-auditor` agent: checks conversion flows, i18n gaps, nav consistency, blog health

2. **Compile results** into a single report:

```
## Site Health Report — crisfon6.com

### SEO Score: X/100
[seo-auditor findings]

### Site Score: X/100
[site-auditor findings]

### Combined Score: X/100

### Action Items (prioritized)
1. [CRITICAL] ...
2. [WARNING] ...
3. [INFO] ...
```

3. **Ask the user** which issues to fix.

Do NOT auto-fix anything. Present the report and let the user decide.
