'use client';

import {
  HeroSection,
  StatsSection,
  StackMarqueeSection,
  AutomationSection,
  FeaturedProjectsSection,
  NewsletterPanel,
  ContactPanel,
} from '@/components/home';
import { Atmosphere } from '@/components/primitives/Atmosphere';

export function HomeContent() {
  return (
    <main className="page-in relative">
      <Atmosphere />
      <HeroSection />
      <StatsSection />
      <StackMarqueeSection />
      <AutomationSection />
      <FeaturedProjectsSection />
      <NewsletterPanel />
      <ContactPanel />
    </main>
  );
}
