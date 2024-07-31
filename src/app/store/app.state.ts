import { ActionReducerMap } from '@ngrx/store';
import { GameStateType } from '../configs/game/game.state.types';
import { gamesReducer } from './reducers/games.reducers';

export interface AppState {
	games: GameStateType;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
	games: gamesReducer,
	
};
