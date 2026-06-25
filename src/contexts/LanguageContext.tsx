"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { type Locale, getTranslations, type Translations } from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  isRTL: boolean;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: getTranslations("en"),
  isRTL: false,
  dir: "ltr",
});

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("dzstartup-locale") as Locale;
  if (saved && ["en", "fr", "ar"].includes(saved)) return saved;
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("dzstartup-locale", newLocale);
    document.documentElement.setAttribute("lang", newLocale);
    document.documentElement.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr");
  };

  const isRTL = locale === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: getTranslations(locale),
        isRTL,
        dir,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
