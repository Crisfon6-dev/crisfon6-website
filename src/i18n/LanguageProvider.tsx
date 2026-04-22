'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { messages, type Locale, type Messages } from './messages';

const STORAGE_KEY = 'cf6.lang';

type LanguageContextType = {
  locale: Locale;
  t: Messages;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  t: messages.en,
  toggleLocale: () => {},
});

const isLocale = (value: unknown): value is Locale => value === 'en' || value === 'es';

const readStoredLocale = (): Locale | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(raw) ? raw : null;
  } catch {
    return null;
  }
};

const writeStoredLocale = (locale: Locale): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // ignore quota / private-mode errors
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  // Hydrate from localStorage after mount (SSR-safe — unavoidable setState in effect)
  useEffect(() => {
    const stored = readStoredLocale();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored && stored !== locale) setLocale(stored);
    // intentional: run once on mount to sync server-rendered 'en' with persisted pref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next: Locale = prev === 'en' ? 'es' : 'en';
      writeStoredLocale(next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, t: messages[locale], toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
