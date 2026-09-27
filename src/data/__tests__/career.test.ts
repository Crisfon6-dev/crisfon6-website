import { describe, it, expect } from 'vitest';
import {
  ROLES,
  CASE_STUDIES,
  CREDENTIALS,
  KEY_FACTS,
  PRINCIPLES,
  TESTIMONIALS,
  formatPeriod,
  formatRolePeriod,
  sortRoles,
  type L,
} from '../career';

function expectNonEmptyL(value: L | undefined, label: string) {
  expect(value, `${label} should be defined`).toBeDefined();
  expect(value!.en.trim().length, `${label}.en should not be empty`).toBeGreaterThan(0);
  expect(value!.es.trim().length, `${label}.es should not be empty`).toBeGreaterThan(0);
}

describe('career data', () => {
  it('has 6 roles (5 employment + founder)', () => {
    expect(ROLES).toHaveLength(6);
  });

  it('has 12 case studies (4 per tier)', () => {
    expect(CASE_STUDIES).toHaveLength(12);
    const byTier = { A: 0, B: 0, C: 0 };
    for (const cs of CASE_STUDIES) byTier[cs.tier]++;
    expect(byTier).toEqual({ A: 4, B: 4, C: 4 });
  });

  it('has exactly one featured case study: ai-in-production', () => {
    const featured = CASE_STUDIES.filter((cs) => cs.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0].id).toBe('ai-in-production');
  });

  it('has 5 credentials', () => {
    expect(CREDENTIALS).toHaveLength(5);
  });

  it('has 4 key facts', () => {
    expect(KEY_FACTS).toHaveLength(4);
  });

  it('has 5 principles', () => {
    expect(PRINCIPLES).toHaveLength(5);
  });

  it('has no testimonials yet (open decision D10 default)', () => {
    expect(TESTIMONIALS).toEqual([]);
  });

  describe('sortRoles', () => {
    it('orders current roles first, then by start date desc, founder last', () => {
      const sorted = sortRoles(ROLES).map((r) => r.id);
      expect(sorted).toEqual([
        'prosperas',
        'esoluzion',
        'imkglobal',
        'dualboot',
        'accenture',
        'founder',
      ]);
    });
  });

  describe('referential integrity', () => {
    it('every case study roleId exists in ROLES', () => {
      const roleIds = new Set(ROLES.map((r) => r.id));
      for (const cs of CASE_STUDIES) {
        expect(roleIds.has(cs.roleId), `${cs.id}.roleId=${cs.roleId}`).toBe(true);
      }
    });

    it('every role.caseStudyIds entry exists in CASE_STUDIES', () => {
      const caseIds = new Set(CASE_STUDIES.map((cs) => cs.id));
      for (const role of ROLES) {
        for (const csId of role.caseStudyIds) {
          expect(caseIds.has(csId), `${role.id}.caseStudyIds includes ${csId}`).toBe(true);
        }
      }
    });
  });

  describe('formatPeriod', () => {
    it('formats an ongoing role in English', () => {
      expect(formatPeriod('2025-05', null, 'en', 'Present')).toBe('May 2025 – Present');
    });

    it('formats a closed role in Spanish with short month names', () => {
      expect(formatPeriod('2021-05', '2022-06', 'es', 'Presente')).toBe('may 2021 – jun 2022');
    });
  });

  describe('formatRolePeriod', () => {
    it('shows month + year for an employment role', () => {
      const role = ROLES.find((r) => r.id === 'prosperas')!;
      expect(formatRolePeriod(role, 'en', 'Present')).toBe('May 2025 – Present');
    });

    it('shows year only for the founder role (content.md only gives a year, no month)', () => {
      const role = ROLES.find((r) => r.id === 'founder')!;
      expect(formatRolePeriod(role, 'en', 'Present')).toBe('2026 – Present');
    });
  });

  describe('founder role date fidelity', () => {
    it("does not assert a month content.md never gave (start is year-only, not 'YYYY-MM')", () => {
      const role = ROLES.find((r) => r.id === 'founder')!;
      expect(role.start).toMatch(/^\d{4}$/);
    });
  });

  describe('bilingual completeness', () => {
    it('every case study has non-empty en/es text in every field', () => {
      for (const cs of CASE_STUDIES) {
        expectNonEmptyL(cs.title, `${cs.id}.title`);
        expectNonEmptyL(cs.status, `${cs.id}.status`);
        if (cs.context) expectNonEmptyL(cs.context, `${cs.id}.context`);
        cs.whatIDid.forEach((w, i) => expectNonEmptyL(w, `${cs.id}.whatIDid[${i}]`));
        cs.outcomes.forEach((o, i) => expectNonEmptyL(o, `${cs.id}.outcomes[${i}]`));
        if (cs.footnote) expectNonEmptyL(cs.footnote, `${cs.id}.footnote`);
        cs.incidents?.forEach((inc, i) => {
          expectNonEmptyL(inc.symptom, `${cs.id}.incidents[${i}].symptom`);
          if (inc.cause) expectNonEmptyL(inc.cause, `${cs.id}.incidents[${i}].cause`);
          if (inc.fix) expectNonEmptyL(inc.fix, `${cs.id}.incidents[${i}].fix`);
        });
      }
    });

    it('every role has non-empty en/es text in every field', () => {
      for (const role of ROLES) {
        expectNonEmptyL(role.employer, `${role.id}.employer`);
        expectNonEmptyL(role.title, `${role.id}.title`);
        expectNonEmptyL(role.type, `${role.id}.type`);
        expectNonEmptyL(role.clientLine, `${role.id}.clientLine`);
        role.bullets.forEach((b, i) => expectNonEmptyL(b, `${role.id}.bullets[${i}]`));
      }
    });
  });

  describe('production-reliability incidents', () => {
    it('renders 5 incident rows with symptom/cause/fix', () => {
      const cs = CASE_STUDIES.find((c) => c.id === 'production-reliability');
      expect(cs?.incidents).toHaveLength(5);
    });
  });

  describe('conversational-ai-product anonymity', () => {
    it('has no repoUrl or liveUrl', () => {
      const cs = CASE_STUDIES.find((c) => c.id === 'conversational-ai-product');
      expect(cs?.repoUrl).toBeUndefined();
      expect(cs?.liveUrl).toBeUndefined();
    });
  });
});
