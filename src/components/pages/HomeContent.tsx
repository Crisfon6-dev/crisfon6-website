'use client';

import {
  HeroSection,
  HeroFilm,
  FeaturedCases,
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
      <FeaturedCases />
      <PrincipleStatement />
      <ContactPanel />
      <NewsletterPanel />
    </main>
  );
}
