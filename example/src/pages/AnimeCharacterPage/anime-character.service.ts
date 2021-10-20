import { UrqlGraphQLService } from '../../services/urql-graphql-client.service'

var animeCharacterInfoQuery = `
query ($id: Int) {
  Character(id: $id){
    id
    description
    age
    dateOfBirth {
      year
      month
      day
    }
    image {
      medium
      large
    }
    name {
      first
      middle
      last
      full
      native
      userPreferred
    }
    bloodType
  }
}
`

export const ANIME_CHARACTER_API_TOKEN: string = 'APIService'

export class AnimeCharacterAPI {
  constructor(private graphqlService: typeof UrqlGraphQLService) {}

  public getCharacterInfo(animeId: number) {
    return this.graphqlService.useQuery({
      query: animeCharacterInfoQuery,
      variables: { id: animeId }
    })
  }
}
