import { Provider, withInjector } from '@doughtnerd/wrangler-di'
import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { createClient, Provider as UrqlProvider } from 'urql'
import { GRAPHQL_API, UrqlGraphQLService } from './services/urql-graphql-client.service'

const client = createClient({
  url: 'https://graphql.anilist.co'
})

const AnimeCharacterPage = React.lazy(() => import('./pages/AnimeCharacterPage'))


const appProviders: Provider[] = [
  { provide: GRAPHQL_API, useValue: UrqlGraphQLService }
]

const App = () => {
  return (
    <React.StrictMode>
      <UrqlProvider value={client}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <HashRouter basename="/">
            <Switch>
              <Route path={'/'} exact>
                <Redirect to="/anime-character-details/1"></Redirect>
              </Route>
              <Route path={'/anime-character-details/:characterId'} exact component={AnimeCharacterPage}></Route>
            </Switch>
          </HashRouter>
        </React.Suspense>
      </UrqlProvider>
    </React.StrictMode>
  )
}

export default withInjector(App, appProviders)
