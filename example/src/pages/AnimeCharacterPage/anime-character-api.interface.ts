import { UseQueryResponse } from "urql";


export interface IAnimeCharacterAPI {
    getCharacterInfo(animeId: number): UseQueryResponse<any, {id: number}>;
}