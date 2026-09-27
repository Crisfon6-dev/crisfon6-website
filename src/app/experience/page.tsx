import type { Metadata } from 'next';
import { ExperienceContent } from '@/components/pages/ExperienceContent';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Experience — Cristhian Fonseca, Technical Lead',
  description:
    '5+ years building FinTech and banking platforms on AWS and AI agents in production. Full work history, case studies, certifications and how to verify them.',
};

export default function Experience() {
  return (
    <>
      <ExperienceContent />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: { '@id': 'https://crisfon6.com/#person' },
        }}
      />
    </>
  );
}
