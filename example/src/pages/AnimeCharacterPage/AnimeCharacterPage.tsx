import React from 'react'
import { withProviders } from '@dougntnerd/wrangler-di'
import { Card } from '../../components/Card'
import { FlexRow } from '../../components/FlexBox'
import { ANIME_CHARACTER_API_TOKEN } from './anime-character-api.service'
import { CharacterDescription } from './components/CharacterDescription'
import { CharacterImage } from './components/CharacterImage'
import { CharacterInfoTable } from './components/CharacterInfoTable'

const AnimeCharacterPage = ({ deps: [apiService] }: any) => {
  const [pageNumber, setPageNumber] = React.useState(1)

  const [{ fetching, data, error }] = apiService.getCharacterInfo(pageNumber)

  if (error) {
    return <div>Error!</div>
  }

  if (fetching) {
    return <div>Loading...</div>
  }

  if (data) {
    return (
      <div style={{ margin: 'auto', maxWidth: '800px', padding: '64px' }}>
        <Card>
          <FlexRow style={{ justifyContent: 'space-around' }}>
            <CharacterImage
              fullCharacterName={data.Character.name.full}
              characterImageURL={data.Character.image.large}
            />
            <CharacterInfoTable Character={data.Character} />
          </FlexRow>
          <CharacterDescription description={data.Character.description} />
        </Card>
        <FlexRow
          style={{ justifyContent: 'space-between', padding: '0 16px 0 16px' }}
        >
          <button
            type='button'
            data-testid="previousCharacterButton"
            disabled={pageNumber === 1}
            onClick={() => setPageNumber((val) => (val === 1 ? 1 : val - 1))}
          >
            Previous
          </button>
          <button type='button' data-testid="nextCharacterButton" onClick={() => setPageNumber((val) => val + 1)}>
            Next
          </button>
        </FlexRow>
      </div>
    )
  }

  return null
}

export const AnimeCharacterPageWithDeps = withProviders(
  <AnimeCharacterPage />,
  [ANIME_CHARACTER_API_TOKEN]
)
