import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { HttpClientGameService } from '../../../services/games/httpClientGame.service';
import { GameType } from '../../../configs';
import { MessageService } from 'src/app/services/message/message.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameListComponent } from '../game-list/game-list.component';
@Component({
	selector: 'app-add-game',
	templateUrl: './add-game.component.html',
	styleUrls: ['./add-game.component.scss'],
	standalone: true,
})
export class AddGameComponent {
	@Input() games: GameType[] = [];

	@ViewChild('gameName') gameName!: ElementRef;
	@ViewChild('gameDescription') gameDescription!: ElementRef;
	@ViewChild('gameActivePlayers') gameActivePlayers!: ElementRef;

	constructor(
		private httpClientgameService: HttpClientGameService,
		private messageService: MessageService
	) {}

	add(name: string, description: string, activePlayers: number): void {
		try {
			name = name.trim();
			description = description.trim();
			if (!name || !description || !activePlayers) {
				this.messageService.add(
					'Nombre, descripción y jugadores activos son requeridos'
				);
				return;
			}

			this.httpClientgameService
				.createGame({ name, description, activePlayers } as GameType)
				.subscribe((game) => {
					if (game !== undefined) {
						this.games.push(game);
						this.clearFields();
					}
				});
		} catch (error) {
			console.log(error);
		}
	}

	clearFields(): void {
		this.gameName.nativeElement.value = '';
		this.gameDescription.nativeElement.value = '';
		this.gameActivePlayers.nativeElement.value = '';
	}
}
