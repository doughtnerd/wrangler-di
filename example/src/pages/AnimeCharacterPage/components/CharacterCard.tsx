import React from "react"
import { Card } from "../../../components/Card"
import { FlexRow } from "../../../components/FlexBox"
import { CharacterDescription } from "./CharacterDescription"
import { CharacterImage } from "./CharacterImage"
import { CharacterInfoTable } from "./CharacterInfoTable"


export type CharacterCardProps = {
    Character: any
}

export const CharacterCard = ({ Character }: CharacterCardProps) => {
    return (
        <Card data-testid="characterCard">
            <FlexRow style={{ justifyContent: 'space-around' }}>
                <CharacterImage
                    fullCharacterName={Character.name.full}
                    characterImageURL={Character.image.large}
                />
                <CharacterInfoTable Character={Character} />
            </FlexRow>
            <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                <CharacterDescription description={Character.description} />
            </div>
        </Card>

    )
}