import { withProviders } from '@doughtnerd/wrangler-di'
import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { FlexRow } from '../../components/FlexBox'
import { IndeterminateLoader } from '../../components/IndeterminateLoader'
import { PageLayout } from '../../components/PageLayout'
import { CharacterCard } from './components/CharacterCard'
import { IAnimeCharacterAPI } from './services/anime-character-api.interface'
import { ANIME_CHARACTER_API_TOKEN } from './services/anime-character-api.service'

export type AnimeCharacterPageProps = {
  deps: [
    IAnimeCharacterAPI
  ]
}


export const AnimeCharacterPage = ({ deps: [apiService] }: AnimeCharacterPageProps) => {
  const params: { characterId: string } = useParams()
  const characterId = Number.parseInt(params.characterId, 10)

  const [{ fetching, data, error }] = apiService.getCharacterInfo(characterId)

  if (fetching) {
    return <IndeterminateLoader />
  }

  return (
    <PageLayout>
      {error && <div data-testid="errorMessage">No Character with ID: {characterId} Found</div>}
      {data?.Character && <CharacterCard Character={data.Character} />}
      <FlexRow style={{ justifyContent: 'space-between', padding: '0 16px 0 16px' }}>
        <Link
          to={{
            pathname: `/anime-character-details/${characterId === 1 ? characterId : characterId - 1}`,
          }}
          data-testid='previousCharacterButton'
        >
          Previous
        </Link>
        <Link
          to={{
            pathname: `/anime-character-details/${characterId + 1}`,
          }}
          data-testid='nextCharacterButton'
        >
          Next
        </Link>
      </FlexRow>
    </PageLayout>
  )
}

export const AnimeCharacterPageWithDeps = withProviders(AnimeCharacterPage, [
  ANIME_CHARACTER_API_TOKEN
])
