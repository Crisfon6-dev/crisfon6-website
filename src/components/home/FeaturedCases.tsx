'use client';

import { useSyncExternalStore } from 'react';
import { chooseCasesLayout, type CasesLayout } from './casesLayout';
import { FeaturedProjectsSection } from './FeaturedProjectsSection';
import { HorizontalCases } from './HorizontalCases';
import { prefersReducedMotion, subscribeViewport } from './viewportEnv';

const readLayout = (): CasesLayout =>
  chooseCasesLayout({ width: window.innerWidth, reducedMotion: prefersReducedMotion() });

/** The server (and no-JS visitors) always get the vertical grid; large screens upgrade to the track. */
const getServerLayout = (): CasesLayout => 'grid';

export function FeaturedCases() {
  const layout = useSyncExternalStore(subscribeViewport, readLayout, getServerLayout);
  return layout === 'track' ? <HorizontalCases /> : <FeaturedProjectsSection />;
}
