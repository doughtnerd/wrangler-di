import { withProviders } from '@doughtnerd/wrangler-di'
import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { CombinedError } from 'urql'
import { FlexRow } from '../../components/FlexBox'
import { IndeterminateLoader } from '../../components/IndeterminateLoader'
import { PageLayout } from '../../components/PageLayout'
import { CharacterCard } from './components/CharacterCard'
import { IAnimeCharacterAPI } from './services/anime-character-api.interface'
import { ANIME_CHARACTER_API_TOKEN, Character } from './services/anime-character-api.service'

export type AnimeCharacterPageProps = {
  title?: string
  deps: [IAnimeCharacterAPI]
}

export const AnimeCharacterPage = ({ title, deps: [apiService] }: AnimeCharacterPageProps) => {
  const params: { characterId: string } = useParams()

  const [characterId, setCharacterId] = React.useState<number>()
  React.useEffect(() => {
    if (params.characterId) {
      setCharacterId(parseInt(params.characterId))
    }
  }, [params.characterId])

  const [error, setError] = React.useState<CombinedError | undefined>()
  const [fetching, setFetching] = React.useState<boolean>(false)
  const [characterInfo, setCharacterInfo] = React.useState<Character | undefined>()
  React.useEffect(() => {
    if (characterId) {
      setFetching(true)
      apiService
        .getCharacterInfo(characterId)
        .then(({ data, error }) => {
          if (error) {
            setError(error)
          } else if (data) {
            setCharacterInfo(data)
          }
        })
        .catch((error) => {
          console.log('REACHED', error.message)
          setError(error)
        })
        .finally(() => {
          setFetching(false)
        })
    }
  }, [characterId, apiService])

  if (fetching) {
    return <IndeterminateLoader />
  }

  return (
    <PageLayout>
      <h4>{title}</h4>
      {error && <div data-testid='errorMessage'>No Character with ID: {characterId} Found</div>}
      {characterInfo && <CharacterCard Character={characterInfo} />}
      <FlexRow style={{ justifyContent: 'space-between', padding: '0 16px 0 16px' }}>
        <Link
          to={{
            pathname: `/anime-character-details/${
              characterId === 1 ? characterId : characterId ? characterId - 1 : 0
            }`
          }}
          data-testid='previousCharacterButton'
        >
          Previous
        </Link>
        <Link
          to={{
            pathname: `/anime-character-details/${characterId ? characterId + 1 : 0}`
          }}
          data-testid='nextCharacterButton'
        >
          Next
        </Link>
      </FlexRow>
    </PageLayout>
  )
}

export const AnimeCharacterPageWithDeps = withProviders<
  AnimeCharacterPageProps,
  [IAnimeCharacterAPI]
>(AnimeCharacterPage, [ANIME_CHARACTER_API_TOKEN])
