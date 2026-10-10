import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
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

  it('the work-with-me card says who it is for and offers references, in both languages', () => {
    expect(messages.en.workWithMe.stayConnected).toBe('Hiring? Email me.');
    expect(messages.es.workWithMe.stayConnected).toBe('¿Contratas? Escríbeme.');
    for (const locale of LOCALES) {
      expect(messages[locale].workWithMe.proofHeading).not.toMatch(/TRACK RECORD|HISTORIAL/i);
      expect(messages[locale].workWithMe.services[0].description).toMatch(/Technical Lead/);
    }
  });

  it('flags the automation figures as estimates in both languages', () => {
    expect(messages.en.automations.estimateNote).toMatch(/estimate/i);
    expect(messages.es.automations.estimateNote).toMatch(/estimaci/i);
  });

  it('the availability line and the contact slab agree on the kind of work', () => {
    expect(messages.en.hero.availability).toContain('full-time or contract');
    expect(messages.es.hero.availability).toContain('tiempo completo o contrato');
    expect(messages.en.hero.availability).not.toMatch(/contracts/);
  });

  it('offers no stream of content: nothing is delivered, followed or posted on a rhythm', () => {
    const STREAM = /delivered to your inbox|every article|as new .* land|follow along/i;
    const texts = [
      messages.en.automations.ctaDescription,
      messages.en.automations.githubDescription,
      messages.en.blog.ctaDescription,
    ];
    for (const text of texts) expect(text, text).not.toMatch(STREAM);
  });

  it('the Spanish copy uses one register (tú), with no voseo and no missing accents', () => {
    const VOSEO =
      /\b(construís|pedís|podés|Querés|RECIBÍS|sos|Recibí|Empezá|Seguí|Suscribete|cancelá|Sobre mi|PAGINAS)\b/;
    const walk = (value: unknown, path: string[] = []): [string, string][] =>
      typeof value === 'string'
        ? [[path.join('.'), value]]
        : value && typeof value === 'object'
          ? Object.entries(value).flatMap(([k, v]) => walk(v, [...path, k]))
          : [];
    for (const [path, text] of walk(messages.es)) {
      expect(text, path).not.toMatch(VOSEO);
    }
  });

  it('names the real credential, the course, and never claims an Anthropic certification', () => {
    const OVERCLAIM =
      /Anthropic[- ]certified|certificado por Anthropic|ANTHROPIC CERTIFIED|certified (in|by)|certificado (en|por)/i;
    const walk = (value: unknown, trail: string[] = []): [string, string][] =>
      typeof value === 'string'
        ? [[trail.join('.'), value]]
        : value && typeof value === 'object'
          ? Object.entries(value).flatMap(([k, v]) => walk(v, [...trail, k]))
          : [];
    for (const locale of LOCALES) {
      for (const [key, text] of walk(messages[locale])) {
        expect(text, `${locale}.${key}`).not.toMatch(OVERCLAIM);
      }
    }
    for (const file of ['src/app/layout.tsx', 'src/app/opengraph-image.tsx']) {
      expect(readFileSync(path.join(process.cwd(), file), 'utf8'), file).not.toMatch(OVERCLAIM);
    }
    expect(messages.en.hero.cert).toBe('CLAUDE CODE IN ACTION · ANTHROPIC');
    expect(messages.es.hero.cert).toBe('CLAUDE CODE IN ACTION · ANTHROPIC');
  });

  it('the newsletter byline says what was completed, not what was certified', () => {
    expect(messages.en.newsletter.authority).toContain("Anthropic's Claude Code in Action course");
    expect(messages.es.newsletter.authority).toContain('curso Claude Code in Action de Anthropic');
  });

  it('leads the closing lines with hiring, not a passive open door', () => {
    expect(messages.en.about.ctaDescription).toBe(
      'Hiring for a remote Technical Lead? Email me. Founders and CTOs shipping with AI, say hello too.'
    );
    expect(messages.es.about.ctaDescription).toBe(
      '¿Buscas un Technical Lead remoto? Escríbeme. Founders y CTOs que construyen con IA, también.'
    );
    expect(messages.en.footer.tagline).not.toMatch(/in public/i);
  });

  it('labels the automation figures as illustrative estimates, in both languages', () => {
    expect(messages.en.automations.estimateInline).toBe(
      'Illustrative estimate, not a measurement.'
    );
    expect(messages.es.automations.estimateInline).toBe('Estimación ilustrativa, no una medición.');
  });
});
