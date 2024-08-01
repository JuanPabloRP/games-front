import { ActionReducerMap } from '@ngrx/store';
import { GameStateType } from '../configs/game/game.state.types';
import { gamesReducer } from './reducers/games.reducers';
import { UserStateType } from '../configs/user';
import { userReducer } from './reducers/user.reducers';

export interface AppState {
	games: GameStateType;
	user: UserStateType;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
	games: gamesReducer,
	user: userReducer,
};
