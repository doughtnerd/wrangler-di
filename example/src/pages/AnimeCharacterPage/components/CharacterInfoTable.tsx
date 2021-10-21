import React from 'react'
import styled from 'styled-components'
import { CharacterDateOfBirth } from './CharacterDateOfBirth'

const LeftAlignedTable = styled.table`
  text-align: left;
  width: 256px;
`

export type CharacterInfoTableProps = {
  Character: any
}

export const CharacterInfoTable = ({ Character }: CharacterInfoTableProps) => {
  return (
    <LeftAlignedTable data-testid='characterInfo'>
      <tbody>
        <tr>
          <th>Full Name</th>
          <td>{Character.name.full}</td>
        </tr>
        <tr>
          <th>Age</th>
          <td>{Character.age}</td>
        </tr>
        <tr>
          <th>Date Of Birth</th>
          <td>
            <CharacterDateOfBirth
              {...Character.dateOfBirth}
            ></CharacterDateOfBirth>
          </td>
        </tr>
        <tr>
          <th>Blood Type</th>
          <td>{Character.bloodType || 'NA'}</td>
        </tr>
      </tbody>
    </LeftAlignedTable>
  )
}
