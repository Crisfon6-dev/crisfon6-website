import { describe, it, expect } from 'vitest';
import { CASE_STUDIES } from '@/data/career';
import { FEATURED_IDS, getFeaturedCases } from '../featuredCaseData';

describe('getFeaturedCases: decision line', () => {
  it.each(['en', 'es'] as const)('reads the decision from career data in %s', (locale) => {
    for (const card of getFeaturedCases(locale)) {
      const cs = CASE_STUDIES.find((c) => c.id === card.id)!;
      expect(card.decision, card.id).toBe(cs.decision?.[locale] ?? null);
    }
  });

  it('has a decision for the cases that define one and null for the rest', () => {
    const byId = Object.fromEntries(getFeaturedCases('en').map((c) => [c.id, c.decision]));
    expect(byId['aws-cost-audit']).toBeTruthy();
    expect(byId['ai-orchestration-harness']).toBeTruthy();
    expect(byId['credit-marketplace']).toBeNull();
    expect(FEATURED_IDS.length).toBe(getFeaturedCases('en').length);
  });
});
