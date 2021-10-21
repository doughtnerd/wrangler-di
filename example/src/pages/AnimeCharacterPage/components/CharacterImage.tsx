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
      height="345px"
      width="245px"
      data-testid='characterImage'
      src={characterImageURL}
      alt={`${characterName}`}
    />
  )
}
