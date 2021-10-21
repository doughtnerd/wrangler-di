import React from 'react'
import ReactMarkdown from 'react-markdown'

export type CharacterDescriptionProps = {
  description: string
}

export const CharacterDescription = ({
  description
}: CharacterDescriptionProps) => {
  return (
    <ReactMarkdown data-testid='characterDescription'>
      {description}
    </ReactMarkdown>
  )
}
