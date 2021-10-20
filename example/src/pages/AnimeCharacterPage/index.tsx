import React from 'react'
import { withInjector, Provider } from '@doughtnerd/wrangler-di'
import {
  GRAPHQL_API,
  UrqlGraphQLService
} from '../../services/urql-graphql-client.service'
import {
  AnimeCharacterAPI,
  ANIME_CHARACTER_API_TOKEN
} from './anime-character-api.service'
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


/** 
 * Personal opinion is this file doesn't need testing for two reasons:
 * 1. We assume the library itself has appropriately handled it's testing (perhaps a dangerous assumption but it does simplify testing needs)
 * 2. We make sure to fully test AnimeCharacterPageWithDeps and each provider
 * 
 * With each portion of the code used here independently tested, testing this file is redundant/not valueable
 * */
export default withInjector(<AnimeCharacterPageWithDeps />, providers)
