/* eslint-disable max-len */
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Router } from 'react-router-dom'
import { UseQueryResponse } from 'urql'
import { AnimeCharacterPage } from './AnimeCharacterPage'
import { IAnimeCharacterAPI } from './services/anime-character-api.interface'

// Annoying workaround I have to use for now for react-markdown until I figure out why jest is being a pain for this lib.
jest.mock('react-markdown', () => {
  return (props: any) => <div {...props} />
})

const defaultTestCharacter = {
  name: {
    full: 'Test Character'
  },
  image: { large: 'test-url' },
  dateOfBirth: { day: 1, month: 1, year: 2000 }
}

const testCharacter2 = { ...defaultTestCharacter, ...{ name: { full: 'Test Character 2' } } }

/**
 * Notice how this test service:
 * 1. Doesn't need to be constructed with Urql - we've successfully decoupled this component test from indirect dependencies without mocking
 * 2. Doesn't require ANYTHING tied to jest, it's pure TS. Not to say you can't use jest stuff but it is nice to just "think in javascript/typescript"
 * 3. Implements EXACTLY the contract described by the IAnimeCharacterAPI interface, maintaining parity between the real dependency and the test one.
 */
class TestAnimeCharacterAPI implements IAnimeCharacterAPI {
  getCharacterInfo(characterId: number): UseQueryResponse<any, { id: number }> {
    const characters = [null, defaultTestCharacter, testCharacter2]
    return [
      { fetching: false, data: { Character: characters[characterId] }, stale: false },
      () => {}
    ]
  }
}

const renderComponent = (
  animeApi: IAnimeCharacterAPI = new TestAnimeCharacterAPI(),
  history: any = createBrowserHistory()
): RenderResult => {
  return render(
    // Notice with prop injection, we don't need to use an injector (withInjector) at all in order to test this component.
    // Unfortunately, React router still needs to be added to the test in our case but that's a limitation of React Router, not this library.
    <Router history={history}>
      <Route exact path='/anime-character-details/:characterId'>
        <AnimeCharacterPage deps={[animeApi]} />
      </Route>
    </Router>
  )
}

/**
 * Also notice that each test is a handful of lines each and the data can very easily be locally controlled in each testing scenario.
 * In less than 100 lines, we've reached 100% coverage on this component!
 */
describe('AnimeCharacterPage', () => {
  describe('Given has navigated to the anime character details', () => {
    describe('When there is an error loading the page', () => {
      test('Then the user is shown an error message', () => {
        const animeCharacterAPI = new TestAnimeCharacterAPI()
        jest.spyOn(animeCharacterAPI, 'getCharacterInfo').mockReturnValue([
          {
            fetching: false,
            stale: false,
            data: {},
            error: { graphQLErrors: [], name: 'Test', message: 'Test Error' }
          },
          jest.fn()
        ])
        const history = createBrowserHistory()
        history.push('/anime-character-details/1')
        const { getByTestId } = renderComponent(animeCharacterAPI, history)
        getByTestId('errorMessage')
      })
    })

    describe('When the page is loading', () => {
      test('Then the user is shown a loading indicator', () => {
        const animeCharacterAPI = new TestAnimeCharacterAPI()
        jest
          .spyOn(animeCharacterAPI, 'getCharacterInfo')
          .mockReturnValue([{ fetching: true, stale: false, data: {} }, jest.fn()])
        const history = createBrowserHistory()
        history.push('/anime-character-details/1')
        const { getByTestId } = renderComponent(animeCharacterAPI, history)
        getByTestId('indeterminateLoadingIndicator')
      })
    })

    describe('When the page has loaded', () => {
      /**
       * If needed you can have jest mock the return value of the api service function but it does tie your tests to jest code.
       * For most people it's fine to tie tests to one testing framework/library but it is a consideration.
       */
      test('Then they should see the first character by default', () => {
        const animeCharacterAPI = new TestAnimeCharacterAPI()
        jest.spyOn(animeCharacterAPI, 'getCharacterInfo')
        const history = createBrowserHistory()
        history.push('/anime-character-details/1')
        renderComponent(animeCharacterAPI, history)
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

    /**
     * Here, instead of using jest to spy on the api function, we just test that the 2nd character we've provided in the mock
     * is rendered instead. This code doesn't strictly rely on jest functionality but it does mean we have to develop
     * our mock service more than what might be desired by some.
     */
    describe('When the user navigates to the next character', () => {
      test('Then the new character is displayed', () => {
        const history = createBrowserHistory()
        history.push('/anime-character-details/1')
        const { getByText, getByTestId } = renderComponent(undefined, history)

        fireEvent.click(getByTestId('nextCharacterButton'))
        getByText(testCharacter2.name.full)
      })
    })

    describe('When the user navigates to the previous character', () => {
      test('Then the new character is displayed', () => {
        const history = createBrowserHistory()
        history.push('/anime-character-details/1')
        const { getByText, getByTestId } = renderComponent(undefined, history)

        fireEvent.click(getByTestId('nextCharacterButton'))
        fireEvent.click(getByTestId('previousCharacterButton'))

        getByText(defaultTestCharacter.name.full)
      })
    })

    describe("When the user navigates to the previous character AND they're at the first page", () => {
      test('Then nothing happens', () => {
        const history = createBrowserHistory()
        history.push('/anime-character-details/1')
        const { getByText, getByTestId } = renderComponent(undefined, history)

        getByText(defaultTestCharacter.name.full)
        fireEvent.click(getByTestId('previousCharacterButton'))
        getByText(defaultTestCharacter.name.full)
      })
    })
  })
})
