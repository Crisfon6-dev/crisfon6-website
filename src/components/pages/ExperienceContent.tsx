'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { SubpageHeader } from '@/components/primitives/SubpageHeader';
import { Kicker } from '@/components/primitives/Kicker';
import { Chip } from '@/components/primitives/Chip';
import { Atmosphere } from '@/components/primitives/Atmosphere';
import {
  ROLES,
  CREDENTIALS,
  KEY_FACTS,
  PRINCIPLES,
  WRITING,
  TESTIMONIALS,
  PROFILE,
  formatPeriod,
  sortRoles,
} from '@/data/career';

export function ExperienceContent() {
  const { t, locale } = useLanguage();

  const sorted = sortRoles(ROLES);
  const employmentRoles = sorted.filter((r) => r.kind === 'employment');
  const founderRoles = sorted.filter((r) => r.kind === 'founder');
  const writingWithUrl = WRITING.filter((w) => w.url);

  const renderRole = (role: (typeof sorted)[number]) => {
    const isCurrent = role.kind === 'employment' && role.end === null;
    return (
      <article
        key={role.id}
        id={role.id}
        data-testid="role"
        className="grid gap-sp-4 border-b border-warm-border py-sp-6 last:border-none lg:grid-cols-[192px_1fr]"
      >
        <div className="font-mono text-xs text-warm-fg-muted">
          <p>{formatPeriod(role.start, role.end, locale, t.experience.present)}</p>
          <p className="mt-1">{role.type[locale]}</p>
          {role.location ? <p className="mt-1">{role.location}</p> : null}
          {isCurrent ? (
            <Chip variant="live" className="mt-sp-3" data-testid="current-chip">
              {t.experience.current}
            </Chip>
          ) : null}
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold text-warm-fg">
            {role.title[locale]}{' '}
            <span className="text-warm-fg-muted">· {role.employer[locale]}</span>
          </h2>
          <p className="mt-1 text-sm text-warm-fg-muted">{role.clientLine[locale]}</p>
          <ul className="mt-sp-4 space-y-2 text-sm leading-relaxed text-warm-fg-muted">
            {role.bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-warm-fg-faint">
                  ·
                </span>
                <span>{b[locale]}</span>
              </li>
            ))}
          </ul>
          <div className="mt-sp-4 flex flex-wrap gap-1.5">
            {role.stack.map((s) => (
              <Chip key={s} variant="outline">
                {s}
              </Chip>
            ))}
          </div>
          {role.caseStudyIds.length > 0 ? (
            <div className="mt-sp-4 flex flex-wrap gap-sp-4">
              {role.caseStudyIds.map((id) => (
                <Link
                  key={id}
                  href={`/projects#${id}`}
                  className="text-sm font-medium text-accent hover:underline"
                >
                  {t.experience.seeCaseStudy}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    );
  };

  return (
    <main className="page-in relative">
      <Atmosphere data-print-hide />
      <SubpageHeader
        number="CV"
        label={t.experience.label}
        title={
          <>
            {PROFILE.displayName}
            <span className="mt-sp-2 block font-mono text-base font-normal text-warm-fg-muted">
              {PROFILE.legalName}
            </span>
          </>
        }
        description={
          <>
            {PROFILE.title[locale]} · {PROFILE.tagline[locale]}
          </>
        }
      />

      {/* Meta row */}
      <section className="mx-auto max-w-6xl px-sp-5 pb-sp-6">
        <div className="flex flex-wrap items-center justify-between gap-sp-4 border-y border-warm-border py-sp-4 text-sm text-warm-fg-muted">
          <div className="flex flex-wrap items-center gap-sp-4">
            <span>{PROFILE.location[locale]}</span>
            <span aria-hidden>·</span>
            <span>
              {t.experience.openTo}: {PROFILE.openTo[locale]}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-sp-3">
            <a href={`mailto:${PROFILE.email}`} className="hover:underline">
              {t.experience.emailMe}
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <button
              type="button"
              data-testid="print-button"
              data-print-hide
              onClick={() => window.print()}
              className="rounded-sp-md border border-warm-border px-sp-3 py-1.5 text-warm-fg transition-colors hover:border-warm-border-strong"
            >
              {t.experience.print}
            </button>
          </div>
        </div>
        <p className="mt-sp-4 max-w-2xl text-xs text-warm-fg-faint">{t.experience.confidential}</p>
        <p className="mt-sp-4 max-w-3xl text-base leading-relaxed text-warm-fg-muted">
          {PROFILE.summary[locale]}
        </p>
      </section>

      {/* Key facts */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-6">
        <Kicker>{t.experience.keyFacts}</Kicker>
        <ul className="mt-sp-5 grid gap-sp-4 sm:grid-cols-2 lg:grid-cols-4">
          {KEY_FACTS.map((fact) => (
            <li
              key={fact.label[locale]}
              className="rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-5"
            >
              <p className="font-heading text-3xl font-semibold text-warm-fg">{fact.value}</p>
              <p className="mt-2 text-sm text-warm-fg-muted">{fact.label[locale]}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Work history */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-6">
        <Kicker>{t.experience.history}</Kicker>
        <div data-testid="work-history" className="mt-sp-5">
          {employmentRoles.map(renderRole)}
        </div>
      </section>

      {founderRoles.length > 0 ? (
        <section className="mx-auto max-w-6xl px-sp-5 py-sp-6">
          <Kicker>{t.experience.founderWork}</Kicker>
          <div data-testid="founder-work" className="mt-sp-5">
            {founderRoles.map(renderRole)}
          </div>
        </section>
      ) : null}

      {/* How I work */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-6">
        <Kicker>{t.experience.howIWork}</Kicker>
        <ul className="mt-sp-5 space-y-sp-4">
          {PRINCIPLES.map((p) => (
            <li key={p.title[locale]} className="text-sm leading-relaxed text-warm-fg-muted">
              <span className="font-semibold text-warm-fg">{p.title[locale]}</span>{' '}
              {p.proof[locale]}
            </li>
          ))}
        </ul>
      </section>

      {/* Education & certifications */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-6">
        <Kicker>{t.experience.education}</Kicker>
        <ul className="mt-sp-5 grid gap-sp-3 md:grid-cols-2">
          {CREDENTIALS.map((cred) => (
            <li
              key={cred.name.en}
              className="rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-4"
            >
              <p className="text-sm font-medium text-warm-fg">{cred.name[locale]}</p>
              <p className="mt-1 text-xs text-warm-fg-muted">
                {cred.issuer} · {cred.date}
              </p>
              {cred.verifyUrl ? (
                <a
                  href={cred.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="cert-verify"
                  className="mt-2 inline-block text-xs font-medium text-accent hover:underline"
                >
                  {t.experience.verify}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {/* Writing */}
      {writingWithUrl.length > 0 ? (
        <section data-testid="writing-section" className="mx-auto max-w-6xl px-sp-5 py-sp-6">
          <Kicker>{t.experience.writing}</Kicker>
          <ul className="mt-sp-5 space-y-sp-3">
            {writingWithUrl.map((entry) => (
              <li key={entry.url}>
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-warm-fg hover:underline"
                >
                  {entry.title[locale]}
                </a>
                <p className="mt-1 text-xs text-warm-fg-muted">{entry.lesson}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Testimonials */}
      {TESTIMONIALS.length > 0 ? (
        <section data-testid="testimonials-section" className="mx-auto max-w-6xl px-sp-5 py-sp-6">
          <Kicker>{t.experience.testimonials}</Kicker>
          <ul className="mt-sp-5 grid gap-sp-4 md:grid-cols-2">
            {TESTIMONIALS.map((tm) => (
              <li
                key={tm.name}
                className="rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-5"
              >
                <p className="text-sm italic text-warm-fg-muted">
                  &ldquo;{tm.quote[locale]}&rdquo;
                </p>
                <p className="mt-sp-3 text-sm font-medium text-warm-fg">
                  {tm.name} · {tm.role}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* How to verify */}
      <section data-testid="verify" className="mx-auto max-w-6xl px-sp-5 py-sp-6">
        <Kicker>How to verify this</Kicker>
        <ul className="mt-sp-5 space-y-sp-3 text-sm">
          <li>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              {locale === 'es'
                ? 'Los mismos cargos y fechas en LinkedIn'
                : 'Same roles and dates on LinkedIn'}
            </a>
          </li>
          <li>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              {locale === 'es' ? 'Código y trabajo open source' : 'Code and open-source work'}
            </a>
          </li>
          {CREDENTIALS.find((c) => c.name.en === 'Claude Code in Action')?.verifyUrl ? (
            <li>
              <a
                href={CREDENTIALS.find((c) => c.name.en === 'Claude Code in Action')?.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                {locale === 'es' ? 'Certificado de Anthropic' : 'Anthropic certificate'}
              </a>
            </li>
          ) : null}
          <li>
            <a
              href={`mailto:${PROFILE.email}?subject=Reference%20request`}
              className="font-medium text-accent hover:underline"
            >
              {locale === 'es'
                ? 'Referencias de jefes y clientes — bajo solicitud'
                : 'References from managers and clients — on request'}
            </a>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-8">
        <div className="rounded-sp-lg border border-warm-border bg-warm-bg-subtle p-sp-6 text-center">
          <h2
            className="font-heading text-warm-fg"
            style={{
              fontSize: 'clamp(22px, 3vw, 30px)',
              letterSpacing: '-0.02em',
              fontWeight: 600,
            }}
          >
            {t.experience.ctaHeading}
          </h2>
          <p className="mt-sp-3 text-warm-fg-muted">{t.experience.ctaDescription}</p>
          <div className="mt-sp-5 flex flex-wrap justify-center gap-sp-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-sp-xl bg-warm-fg px-sp-5 py-sp-3 text-sm font-medium text-warm-bg transition-transform hover:-translate-y-0.5"
            >
              {t.experience.emailMe} <span aria-hidden>→</span>
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-sp-xl border border-warm-border px-sp-5 py-sp-3 text-sm font-medium text-warm-fg transition-colors hover:border-warm-border-strong"
            >
              {t.nav.projects}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
