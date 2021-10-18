import React from 'react'
import { InjectorContextProvider } from 'react-dependency-injection'
import { createClient, Provider } from 'urql'
// import { AnimeListPageWithDeps } from './pages/AnimeListPage'
import {
  GraphQLInjectionToken,
  GraphQLService
} from './services/graphql-client.service'

const client = createClient({
  url: 'https://graphql.anilist.co'
})

const AnimeListPage = React.lazy(() => import('./pages/AnimeListPage'))

const App = () => {
  return (
    <Provider value={client}>
      <InjectorContextProvider
        dependencies={[
          { provide: GraphQLInjectionToken, useValue: GraphQLService }
        ]}
      >
        <React.Suspense fallback={<div>Loading...</div>}>
          <AnimeListPage />
        </React.Suspense>
      </InjectorContextProvider>
    </Provider>
  )
}

export default App
