import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClientGameService } from 'src/app/services/games/httpClientGame.service';
import { GameType } from 'src/app/configs/game';
import * as GameActions from '../actions/games.actions';

import { mergeMap, map, catchError, of, tap } from 'rxjs';

@Injectable()
export class GamesEffects {
	getGames$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GameActions.getGames),
			mergeMap(() =>
				this.httpsClientGameService.getGames().pipe(
					map((games: GameType[]) => GameActions.getGamesSuccess({ games })),
					catchError(() => of(GameActions.getGamesFailure()))
				)
			)
		)
	);

	getGameById$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GameActions.getGameById),
			mergeMap((action) =>
				this.httpsClientGameService.getGame(action.id).pipe(
					map((game) => {
						if (!game) return GameActions.getGameByIdFailure();
						return GameActions.getGameByIdSuccess({ game });
					}),
					catchError(() => of(GameActions.getGamesFailure()))
				)
			)
		)
	);

	addGame$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GameActions.addGame),
			mergeMap(({ game }) => {
				if (
					game.name.trim() === '' ||
					game.description.trim() === '' ||
					game.activePlayers <= 0
				) {
					return of(GameActions.addGameFailure());
				}
				return this.httpsClientGameService.createGame(game).pipe(
					map((game: GameType) => GameActions.addGameSuccess({ game })),
					catchError(() => of(GameActions.addGameFailure()))
				);
			})
		)
	);

	deleteGame$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GameActions.deleteGame),
			mergeMap(({ id }) => {
				return this.httpsClientGameService.deleteGame(id).pipe(
					map(({ id }) => {
						console.log(id);

						return GameActions.deleteGameSuccess({ id });
					}),
					catchError(() => of(GameActions.deleteGameFailure({ id })))
				);
			})
		)
	);

	editGame$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GameActions.editGame),
			mergeMap(({ game }) =>
				this.httpsClientGameService.updateGame(game).pipe(
					map((game: GameType) => GameActions.editGameSuccess({ game })),
					catchError(() => of(GameActions.editGameFailure()))
				)
			)
		)
	);

	constructor(
		private httpsClientGameService: HttpClientGameService,
		private actions$: Actions
	) {}
}
