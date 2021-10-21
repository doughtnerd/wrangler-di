import React from 'react'

export type CharacterDateOfBirthProps = {
  year: number
  month: number
  day: number
  format: string
}

export const CharacterDateOfBirth = ({
  year,
  month,
  day,
  format = 'en-us'
}: CharacterDateOfBirthProps) => {
  return (
    <span data-testid='characterDateOfBirth'>
      {Intl.DateTimeFormat(format).format(new Date(year, month, day))}
    </span>
  )
}
