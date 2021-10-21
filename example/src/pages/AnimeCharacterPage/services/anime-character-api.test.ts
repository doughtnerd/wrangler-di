import { UrqlGraphQLService } from "../../../services/urql-graphql-client.service"
import { AnimeCharacterAPI } from "./anime-character-api.service"


const mockGraphql: typeof UrqlGraphQLService = {
    useMutation: () => { throw new Error("You should be mocking this") },
    useQuery: () => { throw new Error("You should be mocking this") }
}

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
        
        it('Should return character info in the correct format', () => {
            const service = new AnimeCharacterAPI(mockGraphql)
            jest.spyOn(mockGraphql, 'useQuery').mockReturnValue([{
                fetching: false,
                stale: false,
                data: expectedValue
            }, jest.fn()])
            expect(service.getCharacterInfo(1)[0].data).toBe(expectedValue)
        })
    })
})