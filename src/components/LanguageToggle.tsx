'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import { Button } from '@/components/ui/button';

export function LanguageToggle() {
  const { locale, t, toggleLocale } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="h-11 w-11 p-0 text-warm-fg-muted hover:text-warm-fg font-mono text-xs"
      aria-label={locale === 'en' ? t.nav.toSpanish : t.nav.toEnglish}
    >
      {locale === 'en' ? 'ES' : 'EN'}
    </Button>
  );
}
