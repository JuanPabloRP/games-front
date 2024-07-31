import { createAction, props } from '@ngrx/store';
import { GameType } from 'src/app/configs/game';

// get games
export const getGames = createAction('[Games component] getGames');
export const getGamesSuccess = createAction(
	'[Games component] getGamesSuccess',
	props<{ games: GameType[] }>()
);
export const getGamesFailure = createAction(
	'[Games component] getGamesFailure'
);

// Get game by id
export const getGameById = createAction(
	'[Games component] GetGameById',
	props<{ id: number }>()
);
export const getGameByIdSuccess = createAction(
	'[Games component] GetGameByIdSuccess',
	props<{ game: GameType }>()
);
export const getGameByIdFailure = createAction(
	'[Games component] GetGameByIdFailure'
);

// Add game
export const addGame = createAction(
	'[Games component] AddGame',
	props<{ game: GameType }>()
);
export const addGameSuccess = createAction(
	'[Games component] AddGameSuccess',
	props<{ game: GameType }>()
);
export const addGameFailure = createAction('[Games component] AddGameFailure');

// Edit game
export const editGame = createAction(
	'[Games component] EditGame',
	props<{ game: GameType }>()
);
export const editGameSuccess = createAction(
	'[Games component] EditGameSuccess',
	props<{ game: GameType }>()
);
export const editGameFailure = createAction(
	'[Games component] EditGameFailure'
);

// Delete game
export const deleteGame = createAction(
	'[Games component] DeleteGame',
	props<{ id: number }>()
);
export const deleteGameSuccess = createAction(
	'[Games component] DeleteGameSuccess',
	props<{ id: number }>()
);
export const deleteGameFailure = createAction(
	'[Games component] DeleteGameFailure',
	props<{ id: number }>()
);

// Add message
export const addMessage = createAction(
	'[Games component] AddMessage',
	props<{ message: string }>()
);

// Clear messages
export const clearMessages = createAction('[Games component] ClearMessages');
