import { UseQueryResponse } from 'urql'
import { UrqlGraphQLService } from '../../../services/urql-graphql-client.service'
import { IAnimeCharacterAPI } from './anime-character-api.interface'

const animeCharacterInfoQuery = `
query ($id: Int) {
  Character(id: $id){
    description
    age
    dateOfBirth {
      year
      month
      day
    }
    image {
      large
    }
    name {
      full
    }
    bloodType
  }
}
`

export const ANIME_CHARACTER_API_TOKEN = 'APIService'

export class AnimeCharacterAPI implements IAnimeCharacterAPI {
  // eslint-disable-next-line no-useless-constructor
  constructor(private graphqlService: typeof UrqlGraphQLService) {}

  public getCharacterInfo(characterId: number): UseQueryResponse<any, { id: number }> {
    return this.graphqlService.useQuery({
      query: animeCharacterInfoQuery,
      variables: { id: characterId }
    })
  }
}
