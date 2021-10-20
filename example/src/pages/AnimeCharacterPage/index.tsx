import React from 'react'
import { withInjector, Provider } from 'react-dependency-injection'
import {
  GRAPHQL_API,
  UrqlGraphQLService
} from '../../services/urql-graphql-client.service'
import {
  AnimeCharacterAPI,
  ANIME_CHARACTER_API_TOKEN
} from './anime-character.service'
import { AnimeCharacterPageWithDeps } from './AnimeCharacterPage'

const providers: Provider[] = [
  {
    provide: ANIME_CHARACTER_API_TOKEN,
    useFactory: (gqlService: typeof UrqlGraphQLService) => {
      return new AnimeCharacterAPI(gqlService)
    },
    deps: [GRAPHQL_API]
  }
]

export default withInjector(<AnimeCharacterPageWithDeps />, providers)
