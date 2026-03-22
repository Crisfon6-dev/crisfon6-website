"use client";

import Giscus from "@giscus/react";

/**
 * Giscus comments widget powered by GitHub Discussions.
 *
 * SETUP REQUIRED:
 * 1. Enable GitHub Discussions on the repo: Crisfon6-dev/crisfon6-website
 * 2. Install the Giscus app: https://github.com/apps/giscus
 * 3. Create a "Blog Comments" discussion category
 * 4. Go to https://giscus.app to generate your repoId and categoryId
 * 5. Replace the empty strings below with the generated values
 */
export function GiscusComments() {
  return (
    <Giscus
      repo="Crisfon6-dev/crisfon6-website"
      repoId="" // TODO: Replace with your repo ID from https://giscus.app
      category="Blog Comments"
      categoryId="" // TODO: Replace with your category ID from https://giscus.app
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark_dimmed"
      lang="en"
      loading="lazy"
    />
  );
}
