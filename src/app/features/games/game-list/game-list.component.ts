import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { GameType } from 'src/app/configs';
import { GameDataService } from 'src/app/services/games/game-data.service';
import { HttpClientGameService } from 'src/app/services/games/httpClientGame.service';
import { concatMap, Observable } from 'rxjs';

@Component({
	selector: 'app-game-list',
	templateUrl: './game-list.component.html',
	styleUrls: ['./game-list.component.scss'],
	standalone: true,
	imports: [RouterModule, CommonModule],
})
export class GameListComponent {
	games: GameType[] = [];

	constructor(
		private gameDataService: GameDataService,
		private httpClientGameService: HttpClientGameService
	) {}

	ngOnInit() {
		this.getGames();
		this.listenChangesInGames();
	}

	httpGetGames$(): Observable<GameType[]> {
		return this.httpClientGameService.getGames();
	}

	getGames(): void {
		this.httpGetGames$().subscribe((games) => this.setGames(games));
	}

	setGames(games: GameType[]): void {
		this.games = games;
	}

	listenChangesInGames(): void {
		this.gameDataService.changes$
			.pipe(concatMap(() => this.httpGetGames$()))
			.subscribe((games) => this.setGames(games));
	}

	deleteGame(game: GameType): void {
		this.games = this.games.filter((g) => g.id !== game.id);
		this.httpClientGameService.deleteGame(game.id).subscribe();
	}

	trackByGames(index: number, game: GameType): number {
		return game.id;
	}
}
