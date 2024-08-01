import { GameType } from './game.types';
export interface GameStateType {
	games: GameType[];
	selectedGame: GameType;
	loading: boolean;
	messages: string[];
}
