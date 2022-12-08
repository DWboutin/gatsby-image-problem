import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
} from 'react'
import { WindowLocation } from '@reach/router'

import styled from 'styled-components'

interface LocationContextInterface {
  pathname: string
}

const LocationContext = createContext<LocationContextInterface>({
  pathname: '/',
})

export const useLocationContext = (): LocationContextInterface => {
  const context = useContext(LocationContext)

  if (context === undefined) {
    throw new Error('useLocationContext must be used within the Layout')
  }

  return context
}

const MainContent = styled.main`
  flex: 1 0 auto;
`

export interface Props {
  location: WindowLocation<unknown>
}

const Layout: FunctionComponent<PropsWithChildren<Props>> = ({
  location,
  children,
}) => {
  return (
    <LocationContext.Provider value={{ pathname: location.pathname }}>
      <MainContent>{children}</MainContent>
    </LocationContext.Provider>
  )
}

export default Layout
