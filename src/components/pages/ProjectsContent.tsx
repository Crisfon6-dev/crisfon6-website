'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';
import { SubpageHeader } from '@/components/primitives/SubpageHeader';
import { Atmosphere } from '@/components/primitives/Atmosphere';
import { Chip } from '@/components/primitives/Chip';
import { Kicker } from '@/components/primitives/Kicker';
import { CASE_STUDIES, ROLES, formatRolePeriod, type CaseStudy } from '@/data/career';

const TIERS: readonly CaseStudy['tier'][] = ['A', 'B', 'C'];

export function ProjectsContent() {
  const { t, locale } = useLanguage();

  const casesByTier = (tier: CaseStudy['tier']) => CASE_STUDIES.filter((cs) => cs.tier === tier);
  const tierKicker: Record<CaseStudy['tier'], string> = {
    A: t.projects.tierA,
    B: t.projects.tierB,
    C: t.projects.tierC,
  };

  const renderCard = (cs: CaseStudy) => {
    const role = ROLES.find((r) => r.id === cs.roleId)!;
    const period = formatRolePeriod(role, locale, t.experience.present);
    const isFeaturedHero = cs.tier === 'A' && cs.featured;

    return (
      <li
        key={cs.id}
        id={cs.id}
        className={isFeaturedHero ? 'lg:col-span-12' : 'lg:col-span-6'}
        data-testid="project-card"
        data-tier={cs.tier}
        data-featured={cs.featured ? 'true' : 'false'}
      >
        <article className="group relative flex h-full flex-col gap-sp-4 overflow-hidden rounded-sp-lg border border-warm-border bg-warm-bg-elev p-sp-6 transition-all hover:-translate-y-0.5 hover:border-warm-border-strong">
          <div className="flex flex-wrap items-center gap-sp-2">
            <Chip variant="outline">{cs.tag}</Chip>
            <Chip variant="default">{cs.status[locale]}</Chip>
          </div>
          <h2
            className="font-heading text-warm-fg"
            style={{
              fontSize: isFeaturedHero ? 'clamp(24px, 3vw, 36px)' : 'clamp(20px, 2.2vw, 26px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              fontWeight: 600,
            }}
          >
            {cs.title[locale]}
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm-fg-muted">
            {role.employer[locale]} · {period} · {role.title[locale]}
          </p>

          {cs.context ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-warm-fg-faint">
                {t.projects.context}
              </p>
              <p className="mt-1 text-sm text-warm-fg-muted">{cs.context[locale]}</p>
            </div>
          ) : null}

          {cs.incidents ? (
            <div className="space-y-sp-3">
              {cs.incidents.map((incident, i) => (
                <div
                  key={i}
                  data-testid="incident-row"
                  className="rounded-sp-md border border-warm-border bg-warm-bg p-sp-3 text-sm text-warm-fg-muted"
                >
                  <p>{incident.symptom[locale]}</p>
                  {incident.cause ? (
                    <p className="mt-1 text-warm-fg-faint">{incident.cause[locale]}</p>
                  ) : null}
                  {incident.fix ? <p className="mt-1">{incident.fix[locale]}</p> : null}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-warm-fg-faint">
                {t.projects.whatIDid}
              </p>
              <ul className="mt-1 space-y-1 text-sm text-warm-fg-muted">
                {cs.whatIDid.map((w, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="text-warm-fg-faint">
                      ·
                    </span>
                    <span>{w[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cs.footnote ? (
            <p className="text-xs italic text-warm-fg-faint">{cs.footnote[locale]}</p>
          ) : null}

          {cs.outcomes.length > 0 ? (
            <div data-testid="outcome" className="flex flex-wrap gap-1.5">
              {cs.outcomes.map((o, i) => (
                <Chip key={i} variant="accent">
                  {o[locale]}
                </Chip>
              ))}
            </div>
          ) : null}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-sp-3 border-t border-warm-border pt-sp-4">
            <div className="flex flex-wrap gap-1.5">
              {cs.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-sp-sm border border-warm-border bg-warm-bg px-2 py-0.5 text-[11px] font-mono text-warm-fg-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-sp-3">
              {cs.repoUrl ? (
                <a
                  href={cs.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:underline"
                >
                  Repo ↗
                </a>
              ) : null}
              {cs.liveUrl ? (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:underline"
                >
                  Live ↗
                </a>
              ) : null}
              <Link
                href={`/experience#${cs.roleId}`}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:underline"
              >
                {t.projects.roleLink}
              </Link>
            </div>
          </div>
        </article>
      </li>
    );
  };

  return (
    <main className="page-in relative">
      <Atmosphere />
      <SubpageHeader
        number="03"
        label="PROJECTS"
        title={t.projects.heading}
        description={t.projects.description}
      />

      {TIERS.map((tier) => (
        <section key={tier} className="mx-auto max-w-6xl px-sp-5 pb-sp-8">
          <Kicker className="mb-sp-5">{tierKicker[tier]}</Kicker>
          <ul className="grid grid-cols-1 gap-sp-5 lg:grid-cols-12">
            {casesByTier(tier).map(renderCard)}
          </ul>
        </section>
      ))}

      {/* Building in public */}
      <section className="mx-auto max-w-6xl px-sp-5 pb-sp-8">
        <div className="rounded-sp-lg border border-warm-border bg-warm-bg-subtle p-sp-6">
          <p className="text-sm leading-relaxed text-warm-fg-muted">
            {locale === 'es' ? (
              <>
                Fuera del trabajo con clientes publico lo que aprendo: blueprints semanales de
                automatización con IA en <strong>PowerAI</strong>, análisis técnicos en el{' '}
                <strong>blog</strong> y código en <strong>GitHub</strong>.
              </>
            ) : (
              <>
                Outside client work I publish what I learn: weekly AI automation blueprints in{' '}
                <strong>PowerAI</strong>, technical deep dives on the <strong>blog</strong>, and
                code on <strong>GitHub</strong>.
              </>
            )}
          </p>
          <div className="mt-sp-4 flex flex-wrap gap-sp-4 text-sm font-medium text-accent">
            <Link href="/newsletter" className="hover:underline">
              {t.nav.subscribe}
            </Link>
            <Link href="/blog" className="hover:underline">
              {t.nav.blog}
            </Link>
            <Link href="/automations" className="hover:underline">
              {t.nav.automations}
            </Link>
            <a
              href="https://github.com/Crisfon6-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-sp-5 py-sp-8">
        <div className="rounded-sp-xl bg-warm-fg px-sp-6 py-sp-8 text-center text-warm-bg">
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              letterSpacing: '-0.02em',
              fontWeight: 600,
            }}
          >
            {t.projects.ctaHeading}
          </h2>
          <p className="mx-auto mt-sp-3 max-w-xl text-sm opacity-80">{t.projects.ctaDescription}</p>
          <div className="mt-sp-5 flex flex-wrap items-center justify-center gap-sp-3">
            <Link
              href="/newsletter"
              data-testid="projects-cta"
              className="inline-flex items-center gap-2 rounded-sp-xl bg-accent px-sp-5 py-sp-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              {t.cta.subscribeZTP} <span aria-hidden>→</span>
            </Link>
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-sp-xl border border-warm-border/40 px-sp-5 py-sp-3 text-sm font-medium text-warm-bg transition-colors hover:border-warm-border-strong"
            >
              {t.nav.experience}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
