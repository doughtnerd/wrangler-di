import { CombinedError } from 'urql'
import { IGraphQLClient } from '../../../services/urql-graphql-client.service'
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

export type Character = {
  description: string
  age: number
  dateOfBirth: {
    year: number
    month: number
    day: number
  }
  image: {
    large: string
  }
  name: {
    full: string
  }
  bloodType: string
}

export const ANIME_CHARACTER_API_TOKEN = 'APIService'

export class AnimeCharacterAPI implements IAnimeCharacterAPI {
  // eslint-disable-next-line no-useless-constructor
  constructor(private graphqlService: IGraphQLClient) {}

  public getCharacterInfo(
    characterId: number
  ): Promise<{ data?: Character; error?: CombinedError }> {
    return this.graphqlService.query<Character, { id: number }>(animeCharacterInfoQuery, {
      id: characterId
    })
  }
}
