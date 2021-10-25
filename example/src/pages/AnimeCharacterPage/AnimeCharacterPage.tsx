import { withProviders } from '@doughtnerd/wrangler-di'
import React from 'react'
import { FlexRow } from '../../components/FlexBox'
import { IndeterminateLoader } from '../../components/IndeterminateLoader'
import { CharacterCard } from './components/CharacterCard'
import { IAnimeCharacterAPI } from './services/anime-character-api.interface'
import { ANIME_CHARACTER_API_TOKEN } from './services/anime-character-api.service'

type AnimeCharacterPageProps = {
  deps: [
    IAnimeCharacterAPI
  ]
}

const AnimeCharacterPage = ({ deps: [apiService] }: AnimeCharacterPageProps) => {
  const [pageNumber, setPageNumber] = React.useState(1)

  const [{ fetching, data, error }] = apiService.getCharacterInfo(pageNumber)

  if (error) {
    return <div data-testid="errorMessage">Error!</div>
  }

  if (fetching) {
    return <IndeterminateLoader />
  }

  return (
    <div style={{ margin: 'auto', maxWidth: '800px', padding: '64px' }}>
      <CharacterCard Character={data.Character} />
      <FlexRow style={{ justifyContent: 'space-between', padding: '0 16px 0 16px' }}>
        <button
          type='button'
          data-testid='previousCharacterButton'
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((val) => (val === 1 ? 1 : val - 1))}
        >
          Previous
        </button>
        <button
          type='button'
          data-testid='nextCharacterButton'
          onClick={() => setPageNumber((val) => val + 1)}
        >
          Next
        </button>
      </FlexRow>
    </div>
  )
}

export const AnimeCharacterPageWithDeps = withProviders(AnimeCharacterPage, [
  ANIME_CHARACTER_API_TOKEN
])
