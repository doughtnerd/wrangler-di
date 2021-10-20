import React from 'react'
import {
  InjectorContextProvider,
  withProviders,
} from '@doughtnerd/wrangler-di'
import {
  GRAPHQL_API,
  UrqlGraphQLService
} from '../../services/urql-graphql-client.service'
import { AnimeListAPI, ANIME_LIST_API } from './anime-list-page.service'

const AnimeListPage = ({ deps }: any) => {
  const apiService = deps[0]

  const [{ fetching, data, error }] = apiService.getAnimeInfo()

  if (error) {
    return <div>Error!</div>
  }

  if (fetching) {
    return <div>Loading...</div>
  }

  if (data) {
    return (
      <React.Fragment>
        <div>{data.Media.id}</div>
        <div>{data.Media.title.english}</div>
        <div>{data.Media.genres}</div>
        <div>{data.Media.source}</div>
        <div>{data.Media.popularity}</div>
      </React.Fragment>
    )
  }

  return null
}

const AnimeListPageWithDeps = withProviders(<AnimeListPage />, [
  ANIME_LIST_API
])

export default () => {
  return (
    <InjectorContextProvider
      providers={[
        {
          provide: ANIME_LIST_API,
          useFactory: (gqlService: typeof UrqlGraphQLService) => {
            return new AnimeListAPI(gqlService)
          },
          deps: [GRAPHQL_API]
        }
      ]}
    >
      <AnimeListPageWithDeps />
    </InjectorContextProvider>
  )
}
