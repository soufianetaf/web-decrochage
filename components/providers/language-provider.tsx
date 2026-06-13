// components/providers/language-provider.tsx
// Contexte de langue (fr/en) persisté en localStorage + hook useI18n.
'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { DICT, type Dict, type Locale } from '@/lib/i18n/dictionary'

interface I18nContextValue {
  locale: Locale
  t: Dict
  setLocale: (l: Locale) => void
  toggle: () => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    const saved = (localStorage.getItem('locale') as Locale | null) ?? null
    if (saved === 'fr' || saved === 'en') setLocaleState(saved)
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('locale', l)
    document.documentElement.lang = l
  }, [])

  const toggle = useCallback(() => setLocale(locale === 'fr' ? 'en' : 'fr'), [locale, setLocale])

  return (
    <I18nContext.Provider value={{ locale, t: DICT[locale] as Dict, setLocale, toggle }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}
