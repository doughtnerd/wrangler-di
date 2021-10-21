import { UseQueryResponse } from "urql";

export interface IAnimeCharacterAPI {
    getCharacterInfo(characterId: number): UseQueryResponse<any, {id: number}>;
}