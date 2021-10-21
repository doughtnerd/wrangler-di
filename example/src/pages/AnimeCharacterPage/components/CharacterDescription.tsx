import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export type CharacterDescriptionProps = {
  description: string
}

export const CharacterDescription = ({
  description
}: CharacterDescriptionProps) => {
  return (
    // <div data-testid="characterDescription">{description}</div>
    <ReactMarkdown data-testid='characterDescription'>
      {description}
    </ReactMarkdown>
  )
}
