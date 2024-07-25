import {
	ChangeDetectionStrategy,
	Component,
	inject,
	Input,
	OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { GameType } from 'src/app/configs';
import { HttpClientGameService } from 'src/app/services/games/httpClientGame.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
	selector: 'app-game-list',
	templateUrl: './game-list.component.html',
	styleUrls: ['./game-list.component.scss'],
	standalone: true,
	imports: [RouterModule, CommonModule],
})
export class GameListComponent {
	@Input() games: GameType[] = [];

	constructor(private httpClientGameService: HttpClientGameService) {}

	deleteGame(game: GameType): void {
		this.games = this.games.filter((j) => j !== game);
		this.httpClientGameService.deleteGame(game.id).subscribe();
	}
}
