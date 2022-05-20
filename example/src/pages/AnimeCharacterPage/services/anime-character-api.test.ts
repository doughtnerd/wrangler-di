import { IGraphQLClient } from '../../../services/urql-graphql-client.service'
import { AnimeCharacterAPI } from './anime-character-api.service'

class MockGraphQL implements IGraphQLClient {
  query = jest.fn()
  mutation = jest.fn()
}

const mockGraphql = new MockGraphQL()

const expectedValue = {
  Character: {
    name: {
      full: 'Test Character'
    },
    image: { large: 'test-url' },
    dateOfBirth: { day: 1, month: 1, year: 2000 }
  }
}

describe('AnimeCharacterAPI', () => {
  describe('#getCharacterInfo', () => {
    it('Should return character info in the correct format', async () => {
      const service = new AnimeCharacterAPI(mockGraphql)
      jest.spyOn(mockGraphql, 'query').mockResolvedValue({
        fetching: false,
        stale: false,
        data: expectedValue
      })

      const result = await service.getCharacterInfo(1)
      expect(result.data).toBe(expectedValue)
    })
  })
})
