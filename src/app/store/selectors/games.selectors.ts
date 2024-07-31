import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GameStateType } from 'src/app/configs/game';

export const selectGameState = createFeatureSelector<GameStateType>('games');

export const selectAllGames = createSelector(
	selectGameState,
	(state: GameStateType) => state.games
);

export const selectSelectedGame = createSelector(
	selectGameState,
	(state: GameStateType) => state.selectedGame
);

export const selectLoading = createSelector(
	selectGameState,
	(state: GameStateType) => {
		return state.loading;
	}
);

export const selectMessages = createSelector(
	selectGameState,
	(state: GameStateType) => state.messages
);
