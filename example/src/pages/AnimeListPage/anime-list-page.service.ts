import { UrqlGraphQLService } from '../../services/urql-graphql-client.service'

var animeInfoQuery = `
query ($id: Int) {
  Media (id: $id, type: ANIME) {
    id    
    title {        
      english
    }
    startDate {
      year
      month
      day
    }
    genres
    source
    popularity
  }
}
`

export const ANIME_LIST_API: string = 'APIService'

export class AnimeListAPI {
  constructor(private graphqlService: typeof UrqlGraphQLService) {}

  public getAnimeInfo(animeId: number) {
    return this.graphqlService.useQuery({
      query: animeInfoQuery,
      variables: { id: animeId }
    })
  }
}
