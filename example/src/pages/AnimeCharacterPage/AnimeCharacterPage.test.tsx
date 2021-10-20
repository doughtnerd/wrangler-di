import { fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import { InjectorContextProvider } from '@doughtnerd/wrangler-di';
import { UseQueryResponse } from 'urql';
import { IAnimeCharacterAPI } from './anime-character-api.interface';
import { ANIME_CHARACTER_API_TOKEN } from './anime-character-api.service';
import { AnimeCharacterPageWithDeps } from './AnimeCharacterPage';


/**
 * Notice how this test service:
 * 1. Doesn't need to be constructed with Urql - we've successfully decoupled this component test from indirect dependencies
 * 2. Doesn't require ANYTHING tied to jest, it's pure TS. Not to say you can't use jest stuff but it is nice to just "think in javascript/typescript"
 * 3. Implements EXACTLY the contract described by the IAnimeCharacterAPI interface, maintaining parity between the real dependency and the test one.
 */
class TestAnimeCharacterAPI implements IAnimeCharacterAPI {
    getCharacterInfo(animeId: number): UseQueryResponse<any, { id: number }> {
        const defaultTestCharacter = {
            name: {
                full: 'Test Character'
            },
            image: { large: 'test-url' },
            dateOfBirth: { day: 1, month: 1, year: 2000 }
        }
        return [{ fetching: false, data: { Character: defaultTestCharacter }, stale: false }, () => { }]
    }
}

const renderComponent = (animeApi: IAnimeCharacterAPI = new TestAnimeCharacterAPI()): RenderResult => {
    return render(
        <InjectorContextProvider providers={[{ provide: ANIME_CHARACTER_API_TOKEN, useValue: animeApi }]}>
            <AnimeCharacterPageWithDeps />
        </InjectorContextProvider>
    )
}

/**
 * Also notice that each test is a handfull of lines each and the data can very easily be locally controlled in each testing scenario.
 */
describe('AnimeCharacterPage', () => {

    describe('Given has navigated to the anime character details', () => {

        describe('When the page has loaded', () => {

            test('Then they should see the first character by default', () => {
                const animeCharacterAPI = new TestAnimeCharacterAPI()
                jest.spyOn(animeCharacterAPI, 'getCharacterInfo')
                renderComponent(animeCharacterAPI)
                expect(animeCharacterAPI.getCharacterInfo).toHaveBeenCalledWith(1)
            })

            test('Then they see the characters picture', () => {
                const { getByTestId } = renderComponent()
                getByTestId('characterImage')
            })

            test('Then they see the characters info', () => {
                const { getByTestId } = renderComponent()
                getByTestId('characterInfo')
            })

            test('Then they see the character description', () => {
                const { getByTestId } = renderComponent()
                getByTestId('characterDescription')
            })
        })

        describe('When the user navigates to the next character', () => {
            test('It displays the new character', () => {
                const animeCharacterAPI = new TestAnimeCharacterAPI()
                jest.spyOn(animeCharacterAPI, 'getCharacterInfo')
                const { getByTestId } = renderComponent(animeCharacterAPI)

                fireEvent.click(getByTestId('nextCharacterButton'))

                expect(animeCharacterAPI.getCharacterInfo).toHaveBeenCalled()
            })
        })
    })
})