import { Provider, withInjector } from '@doughtnerd/wrangler-di'
import { GRAPHQL_API, UrqlGraphQLService } from '../../services/urql-graphql-client.service'
import { AnimeCharacterPageWithDeps } from './AnimeCharacterPage'
import {
  AnimeCharacterAPI,
  ANIME_CHARACTER_API_TOKEN
} from './services/anime-character-api.service'

/**
 * Personal opinion is this file doesn't need testing for two reasons:
 * 1. We assume the library itself has appropriately handled it's testing (perhaps a dangerous assumption but it does simplify testing needs)
 * 2. We make sure to fully test AnimeCharacterPage and each provider
 *
 * With each portion of the code used here independently tested, testing this file is redundant/not valuable
 * */

/**
 * Because we only need this provider on this page,
 * we inject it here and not in the root of the app.
 */
const providers: Provider[] = [
  {
    provide: ANIME_CHARACTER_API_TOKEN,
    useFactory: (gqlService: typeof UrqlGraphQLService) => {
      return new AnimeCharacterAPI(gqlService)
    },
    deps: [GRAPHQL_API] // However we can use a provider in the root of the app as a dependency and it all still works.
  }
]

export default withInjector(AnimeCharacterPageWithDeps, providers)
