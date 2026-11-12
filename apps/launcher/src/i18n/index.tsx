// SPDX-License-Identifier: GPL-3.0-only
// Launcher translations. Language codes are Minecraft's (e.g. es_es), so the same code is written to the game.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { en_us, type MessageKey, type Messages } from './en_us';
import { es_es } from './es_es';
import { MINECRAFT_LANGUAGES } from './languages';

const TRANSLATIONS: Record<string, Messages> = { en_us, es_es };
const STORAGE_KEY = 'veyra.language';

/** Translations for a code: exact match first, then another variant of the same language (es_mx → es_es). */
function translationFor(code: string): Messages | undefined {
  const exact = TRANSLATIONS[code];
  if (exact) return exact;
  const prefix = code.split('_')[0];
  const sibling = Object.keys(TRANSLATIONS).find((k) => k.split('_')[0] === prefix);
  return sibling ? TRANSLATIONS[sibling] : undefined;
}

export function isTranslated(code: string): boolean {
  return translationFor(code) !== undefined;
}

/** Best Minecraft code for the system locale: es-MX → es_mx; a bare "es" → es_es (the main variant); else en_us. */
function systemLanguage(): string {
  const wanted = (navigator.language || 'en-US').toLowerCase().replace('-', '_');
  const codes = MINECRAFT_LANGUAGES.map((l) => l.code);
  if (codes.includes(wanted)) return wanted;
  const prefix = wanted.split('_')[0] ?? 'en';
  if (codes.includes(`${prefix}_${prefix}`)) return `${prefix}_${prefix}`;
  return codes.find((c) => c.split('_')[0] === prefix) ?? 'en_us';
}

function savedLanguage(): string | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value && MINECRAFT_LANGUAGES.some((l) => l.code === value) ? value : null;
  } catch {
    return null;
  }
}

type Translate = (key: MessageKey, params?: Record<string, string | number>) => string;

interface I18n {
  language: string;
  setLanguage: (code: string) => void;
  t: Translate;
}

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(() => savedLanguage() ?? systemLanguage());

  const setLanguage = useCallback((code: string) => {
    setLanguageState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Storage can be unavailable; the choice still applies for this session.
    }
  }, []);

  const t = useCallback<Translate>(
    (key, params) => {
      let text = translationFor(language)?.[key] ?? en_us[key];
      for (const [name, value] of Object.entries(params ?? {})) text = text.replaceAll(`{${name}}`, String(value));
      return text;
    },
    [language],
  );

  // Right-to-left only when the launcher is actually shown in that language.
  useEffect(() => {
    const info = MINECRAFT_LANGUAGES.find((l) => l.code === language);
    const shownCode = isTranslated(language) ? language : 'en_us';
    document.documentElement.lang = shownCode.replace('_', '-');
    document.documentElement.dir = info?.rtl && isTranslated(language) ? 'rtl' : 'ltr';
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
