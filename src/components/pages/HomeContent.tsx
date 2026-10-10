'use client';

import {
  HeroSection,
  HeroFilm,
  WhoIAm,
  ProofStrip,
  FeaturedCases,
  PrincipleStatement,
  NewsletterPanel,
  ContactPanel,
} from '@/components/home';
import { Atmosphere } from '@/components/primitives/Atmosphere';

export function HomeContent() {
  return (
    <div className="page-in relative">
      <Atmosphere />
      <HeroFilm>
        <HeroSection />
        <WhoIAm />
        <ProofStrip />
      </HeroFilm>
      <FeaturedCases />
      <PrincipleStatement />
      <ContactPanel />
      <NewsletterPanel />
    </div>
  );
}
