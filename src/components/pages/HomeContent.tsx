'use client';

import {
  HeroSection,
  HeroFilm,
  StatsSection,
  StackMarqueeSection,
  AutomationSection,
  FeaturedCases,
  SystemDiagram,
  PrincipleStatement,
  NewsletterPanel,
  ContactPanel,
} from '@/components/home';
import { Atmosphere } from '@/components/primitives/Atmosphere';

export function HomeContent() {
  return (
    <main className="page-in relative">
      <Atmosphere />
      <HeroSection />
      <HeroFilm />
      <StatsSection />
      <StackMarqueeSection />
      <AutomationSection />
      <FeaturedCases />
      <SystemDiagram />
      <PrincipleStatement />
      <NewsletterPanel />
      <ContactPanel />
    </main>
  );
}
