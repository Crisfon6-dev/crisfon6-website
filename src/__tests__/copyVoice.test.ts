import { describe, it, expect } from 'vitest';
import { messages } from '@/i18n/messages';

const LOCALES = ['en', 'es'] as const;
const WEEKLY = /every week|weekly|this week|cada semana|semanal|esta semana|por semana/i;

describe('page copy follows the owner voice and brain rules', () => {
  it('work-with-me speaks to the person hiring, not a generic invitation', () => {
    expect(messages.en.workWithMe.heading).toBe('Hiring for a US team? Start here.');
    expect(messages.es.workWithMe.heading).toBe(
      '¿Contratas para un equipo en EE. UU.? Empieza aquí.'
    );
    expect(messages.en.workWithMe.description).toBe(
      'I connect with founders, CTOs, and engineers shipping products at scale.'
    );
  });

  it('the newsletter pitch is concrete, not an unprovable superlative', () => {
    expect(messages.en.newsletter.finalCtaHeading).not.toMatch(/most useful/i);
    expect(messages.es.newsletter.finalCtaHeading).not.toMatch(/más útil/i);
    expect(messages.en.newsletter.finalCtaHeading).toBe(
      'Architecture, costs and working code from systems that run.'
    );
  });

  it('the newsletter byline names the author and drops the vague "LATAM scale"', () => {
    for (const locale of LOCALES) {
      const { authority } = messages[locale].newsletter;
      expect(authority).toContain('Cristhian Fonseca');
      expect(authority).not.toMatch(/LATAM/);
    }
  });

  it('promises no weekly cadence in the pitches that were rewritten', () => {
    for (const locale of LOCALES) {
      const m = messages[locale];
      for (const text of [
        m.workWithMe.heading,
        m.workWithMe.description,
        m.newsletter.finalCtaHeading,
        m.newsletter.authority,
      ]) {
        expect(text).not.toMatch(WEEKLY);
      }
    }
  });
});
