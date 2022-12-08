import { useState } from 'react'

export enum SupportedLocale {
  EN = 'en',
}

export const DEFAULT_LOCALE = SupportedLocale.EN

export interface LanguageManagerSelectors {
  locale: SupportedLocale
}

export interface LanguageManagerActions {
  handleLanguageChange: (locale: SupportedLocale) => void
}

export interface LanguageContextHook {
  selectors: LanguageManagerSelectors
  actions: LanguageManagerActions
}

function useLanguageManager(): LanguageContextHook {
  const [locale, setLocale] = useState<SupportedLocale>(DEFAULT_LOCALE)

  const handleLanguageChange = (locale: SupportedLocale) => {
    setLocale(locale)
  }

  return {
    selectors: {
      locale,
    },
    actions: {
      handleLanguageChange,
    },
  }
}

export default useLanguageManager
