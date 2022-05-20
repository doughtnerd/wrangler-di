import { CombinedError } from 'urql';
import { Character } from './anime-character-api.service';

export interface IAnimeCharacterAPI {
  getCharacterInfo(characterId: number): Promise<{ data?: Character; error?: CombinedError }>
}
