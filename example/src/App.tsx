import { Provider, withInjector } from '@doughtnerd/wrangler-di'
import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { GRAPHQL_API, UrqlGraphQLService } from './services/urql-graphql-client.service'

const AnimeCharacterPage = React.lazy(() => import('./pages/AnimeCharacterPage'))

const appProviders: Provider[] = [
  { provide: GRAPHQL_API, useFactory: () => new UrqlGraphQLService('https://graphql.anilist.co') }
]

const App: React.FC<{}> = () => {
  return (
    <React.StrictMode>
      <React.Suspense fallback={<div>Loading...</div>}>
        <HashRouter basename='/'>
          <Switch>
            <Route path='/' exact>
              <Redirect to='/anime-character-details/1' />
            </Route>
            <Route
              path='/anime-character-details/:characterId'
              exact
              component={AnimeCharacterPage}
            />
          </Switch>
        </HashRouter>
      </React.Suspense>
    </React.StrictMode>
  )
}

export default withInjector(<App />, appProviders)
