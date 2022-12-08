import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useMemo,
} from 'react'
import { IntlProvider } from 'react-intl'

import useLanguageManager, {
  DEFAULT_LOCALE,
  SupportedLocale,
} from './hooks/useLanguageManager'
import messages from './messages'

interface IntlContextInterface {
  locale: string
  defaultLocale: string
  handleLanguageChange: (locale: SupportedLocale) => void
}

const LanguageContext = createContext<IntlContextInterface | null>(null)

export const useLanguageContext = (): Partial<IntlContextInterface | null> => {
  const context = useContext(LanguageContext)

  if (context === undefined) {
    throw new Error(
      'useLanguageContext must be used within LanguageContextProvider'
    )
  }

  return context
}

export interface Props {
  children: ReactNode
}

const LanguageContextProvider: FunctionComponent<Props> = ({ children }) => {
  const {
    selectors: { locale },
    actions: { handleLanguageChange },
  } = useLanguageManager()
  const languageMessage = useMemo(() => messages[locale], [locale])

  return (
    <LanguageContext.Provider
      value={{ locale: locale, defaultLocale: 'en', handleLanguageChange }}
    >
      <IntlProvider
        locale={locale}
        defaultLocale={DEFAULT_LOCALE}
        messages={languageMessage}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

export default LanguageContextProvider
