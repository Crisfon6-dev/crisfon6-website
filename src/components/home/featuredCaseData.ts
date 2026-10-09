import { CASE_STUDIES } from '@/data/career';

export const FEATURED_IDS = [
  'ai-in-production',
  'ai-orchestration-harness',
  'credit-marketplace',
  'aws-cost-audit',
] as const;

export type FeaturedCase = {
  id: (typeof FEATURED_IDS)[number];
  title: string;
  description: string;
  result: string;
  tag: string;
  href: string;
};

/** The featured case studies as card data, in the active locale. Content comes only from career.ts. */
export function getFeaturedCases(locale: 'en' | 'es'): FeaturedCase[] {
  return FEATURED_IDS.map((id) => {
    const cs = CASE_STUDIES.find((c) => c.id === id)!;
    return {
      id,
      title: cs.title[locale],
      description: cs.context?.[locale] ?? cs.whatIDid[0][locale],
      result: cs.outcomes[0]?.[locale] ?? cs.status[locale],
      tag: cs.tag,
      href: `/projects#${cs.id}`,
    };
  });
}
