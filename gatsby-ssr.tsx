import { GatsbySSR } from 'gatsby'
import * as React from 'react'

import LanguageContextProvider from './src/i18n/LanguageContext'
import Layout from './src/components/Layout/Layout'

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
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
