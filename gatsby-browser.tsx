import * as React from 'react'
import type { GatsbyBrowser } from 'gatsby'

import LanguageContextProvider from './src/i18n/LanguageContext'
import Layout from './src/components/Layout/Layout'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props: { location },
}) => {
  return (
    <React.StrictMode>
      <LanguageContextProvider>
        <Layout location={location}>{element}</Layout>
      </LanguageContextProvider>
    </React.StrictMode>
  )
}
