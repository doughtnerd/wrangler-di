import React from 'react'

export type CharacterImageProps = {
  fullCharacterName: string
  characterImageURL: string
}

export const CharacterImage = ({
  fullCharacterName: characterName,
  characterImageURL
}: CharacterImageProps) => {
  return (
    <img
      data-testid='characterImage'
      src={characterImageURL}
      alt={`${characterName}`}
    />
  )
}
