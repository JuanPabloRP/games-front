import { createReducer, on } from '@ngrx/store';

import * as GameActions from '../actions/games.actions';
import { GameStateType } from 'src/app/configs/game'; 
import { GameType } from 'src/app/configs/game';

export const initialState: GameStateType = {
	games: [],
	selectedGame: {} as GameType,
	loading: true,
	messages: [],
};

export const gamesReducer = createReducer(
	initialState,

	// Get games
	on(GameActions.getGames, (state) => {
		return {
			...state,
			loading: true,
		};
	}),
	on(GameActions.getGamesSuccess, (state, { games }) => ({
		...state,
		loading: false,
		games,
	})),
	on(GameActions.getGamesFailure, (state) => ({
		...state,
		loading: false,
		messages: [...state.messages, 'Error cargando los juegos'],
	})),

	// Get game by id
	on(GameActions.getGameById, (state) => ({
		...state,
		loading: true,
		selectedGame: {} as GameType,
	})),
	on(GameActions.getGameByIdSuccess, (state, { game }) => ({
		...state,
		loading: false,
		selectedGame: game,
		messages: [...state.messages, 'Se cargó el juego con id: ' + game.id],
	})),
	on(GameActions.getGameByIdFailure, (state) => ({
		...state,
		loading: false,
		messages: [...state.messages, 'Error cargando el juego'],
	})),

	// Add game
	on(GameActions.addGame, (state, { game }) => {
		return {
			...state,
		};
	}),
	on(GameActions.addGameSuccess, (state, { game }) => ({
		...state,
		games: [...state.games, game],
		messages: [...state.messages, 'Se agregó el juego: ' + game.name],
	})),
	on(GameActions.addGameFailure, (state) => ({
		...state,
		messages: [...state.messages, 'Error agregando el juego'],
	})),

	// Edit game
	on(GameActions.editGame, (state) => ({ ...state })),
	on(GameActions.editGameSuccess, (state, { game }) => ({
		...state,
		games: state.games.map((g) => (g.id === game.id ? game : g)),
		selectedGame: game,
		messages: [...state.messages, 'Se editó el juego con id: ' + game.id],
	})),
	on(GameActions.editGameFailure, (state) => ({
		...state,
		messages: [...state.messages, 'Error editando el juego'],
	})),

	// Delete game
	on(GameActions.deleteGame, (state, { id }) => ({
		...state,
		games: state.games.filter((g) => g.id !== id),
	})),
	on(GameActions.deleteGameSuccess, (state, { id }) => ({
		...state,
		messages: [...state.messages, 'Se eliminó el juego con id: ' + id],
	})),
	on(GameActions.deleteGameFailure, (state, { id }) => ({
		...state,
		messages: [...state.messages, 'Error eliminando el juego con id: ' + id],
	})),

	// Messages
	on(GameActions.addMessage, (state, { message }) => ({
		...state,
		messages: [...state.messages, message],
	})),
	on(GameActions.clearMessages, (state) => ({
		...state,
		messages: [],
	}))
);
