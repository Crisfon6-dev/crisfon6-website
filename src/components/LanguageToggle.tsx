"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="w-8 h-8 p-0 text-text-tertiary hover:text-text-primary font-mono text-xs"
      aria-label="Toggle language"
    >
      {locale === "en" ? "ES" : "EN"}
    </Button>
  );
}
