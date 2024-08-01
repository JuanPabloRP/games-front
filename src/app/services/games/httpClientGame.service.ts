import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';

import { GameType } from '../../configs/game';
import { GAMES_URL_API } from '../../configs/game';

@Injectable({
	providedIn: 'root',
})
export class HttpClientGameService {
	private gamesUrl: string;

	constructor(private http: HttpClient) {
		this.gamesUrl = GAMES_URL_API;
	}

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
		return this.http
			.post<GameType>(this.gamesUrl, game, this.httpOptions)
			.pipe(catchError(this.handleError<GameType>('createGame')));
	}

	updateGame(game: GameType): Observable<GameType> {
		return this.http
			.put<GameType>(`${this.gamesUrl}/${game.id}`, game)
			.pipe(catchError(this.handleError<any>('updateGame')));
	}

	deleteGame(gameId: number): Observable<GameType> {
		const url = `${this.gamesUrl}/${gameId}`;

		return this.http
			.delete<GameType>(url, this.httpOptions)
			.pipe(catchError(this.handleError<GameType>('deleteGame')));
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);
			if (error.error.message) {
				return of(result as T);
			}
			return of(result as T);
		};
	}

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	};
}
