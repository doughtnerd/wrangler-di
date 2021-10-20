import React from 'react'
import { InjectorContextProvider, Provider } from '@dougntnerd/wrangler-di'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createClient, Provider as UrqlProvider } from 'urql'
import {
  GRAPHQL_API,
  UrqlGraphQLService
} from './services/urql-graphql-client.service'

const client = createClient({
  url: 'https://graphql.anilist.co'
})

const AnimeListPage = React.lazy(
  () => import('./pages/AnimeListPage/AnimeListPage')
)

const AnimeCharacterPage = React.lazy(
  () => import('./pages/AnimeCharacterPage')
)

const appProviders: Provider[] = [
  { provide: GRAPHQL_API, useValue: UrqlGraphQLService }
]

const App = () => {
  return (
    <UrqlProvider value={client}>
      <InjectorContextProvider providers={appProviders}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Switch>
              <Route path='/anime-details' component={AnimeListPage}></Route>
              <Route
                path='/anime-character-details'
                component={AnimeCharacterPage}
              ></Route>
            </Switch>
          </Router>
        </React.Suspense>
      </InjectorContextProvider>
    </UrqlProvider>
  )
}

export default App
