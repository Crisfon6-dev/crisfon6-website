"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { messages, type Locale, type Messages } from "./messages";

type LanguageContextType = {
  locale: Locale;
  t: Messages;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  t: messages.en,
  toggleLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "es" : "en"));
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, t: messages[locale], toggleLocale }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
