import { Component, ElementRef, Output, ViewChild } from '@angular/core';
import { HttpClientGameService } from '../../services/games/httpClientGame.service';
import { GameType } from '../../configs';
import { MessageService } from '../../services/message/message.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { AddGameComponent } from './add-game/add-game.component';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss'],
	standalone: true,
	imports: [CommonModule, RouterModule, GameListComponent, AddGameComponent],
})
export class GamesComponent {
	games: GameType[] = [];

	constructor(private httpClientgameService: HttpClientGameService) {}

	ngOnInit() {
		this.getGames();
	}

	getGames(): void {
		this.httpClientgameService
			.getGames()
			.subscribe((games) => (this.games = games));
	}
}
