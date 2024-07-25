import { Injectable } from '@angular/core';

import { map, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GameType } from '../../configs';
import { MessageService } from '../message/message.service';

@Injectable({
	providedIn: 'root',
})
export class HttpClientGameService {
	private gamesUrl = 'http://localhost:8080/api/v1/games';

	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) {}

	getGames(): Observable<GameType[]> {
		return this.http
			.get<GameType[]>(this.gamesUrl)
			.pipe(catchError(this.handleError<GameType[]>('getGames', [])));
	}

	getGame(id: number): Observable<GameType> {
		return this.http
			.get<GameType>(`${this.gamesUrl}/${id}`)
			.pipe(catchError(this.handleError<GameType>(`getGame id=${id}`)));
	}

	createGame(game: GameType): Observable<GameType> {
		return this.http.post<GameType>(this.gamesUrl, game, this.httpOptions).pipe(
			tap((newGame: GameType) =>
				this.messageService.add(`Juego creado id=${newGame.id}`)
			),
			catchError(this.handleError<GameType>('createGame'))
		);
	}

	updateGame(game: GameType): Observable<GameType> {
		return this.http.put<GameType>(`${this.gamesUrl}/${game.id}`, game).pipe(
			tap((_) => this.messageService.add(`Juego actualizado id=${game.id}`)),
			catchError(this.handleError<any>('updateGame'))
		);
	}

	deleteGame(gameId: number): Observable<GameType> {
		const url = `${this.gamesUrl}/${gameId}`;

		return this.http.delete<GameType>(url, this.httpOptions).pipe(
			tap((_) => this.messageService.add(`Juego eliminado id=${gameId}`)),
			catchError(this.handleError<GameType>('deleteGame'))
		);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);
			if (error.error.message) {
				this.messageService.add(`Error: ${error.error.message}`);
				return of(result as T);
			}
			this.messageService.add(
				`Error: ${Object.values(error.error).join(', ')}`
			);
			return of(result as T);
		};
	}

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	};
}
