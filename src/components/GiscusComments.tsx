'use client';

import Giscus from '@giscus/react';

export function GiscusComments() {
  return (
    <Giscus
      repo="Crisfon6-dev/crisfon6-website"
      repoId="R_kgDORtY_Rw"
      category="Blog comments"
      categoryId="DIC_kwDORtY_R84C5BmN"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="dark_dimmed"
      lang="en"
      loading="lazy"
    />
  );
}
