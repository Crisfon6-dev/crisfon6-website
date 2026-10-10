'use client';

import {
  HeroSection,
  HeroFilm,
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
      <HeroSection />
      <ProofStrip />
      <HeroFilm />
      <FeaturedCases />
      <PrincipleStatement />
      <ContactPanel />
      <NewsletterPanel />
    </div>
  );
}
