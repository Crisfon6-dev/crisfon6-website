'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { Marquee } from '@/components/primitives/Marquee';
import { Chip } from '@/components/primitives/Chip';

export function StackMarqueeSection() {
  const { t } = useLanguage();

  return (
    <section data-testid="stack-marquee" className="py-sp-6">
      <Marquee ariaLabel="tech stack">
        {t.marquee.items.map((item) => (
          <Chip key={item} variant="outline" className="text-sm">
            {item}
          </Chip>
        ))}
      </Marquee>
    </section>
  );
}
