import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { HttpClientGameService } from '../../../services/games/httpClientGame.service';
import { GameType } from '../../../configs/game';
import { MessageService } from 'src/app/services/message/message.service';
@Component({
	selector: 'app-add-game',
	templateUrl: './add-game.component.html',
	styleUrls: ['./add-game.component.scss'],
	standalone: true,
	imports: [ReactiveFormsModule],
})
export class AddGameComponent {
	name = new FormControl('');
	description = new FormControl('');
	activePlayers = new FormControl(0);

	constructor(
		private httpClientgameService: HttpClientGameService,
		private gameDataService: GameDataService,
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
					
						this.clearFields();
					}
				});
		} catch (error) {
			console.log(error);
		}
	}

	createGame(name: string, description: string, activePlayers: number) {
		this.httpClientgameService
			.createGame({ name, description, activePlayers } as GameType)
			.subscribe((game) => {
				if (game !== undefined) {
					this.clearFields();
					this.gameDataService.sendChanges();
				}
			});
	}

	clearFields(): void {
		this.name.setValue('');
		this.description.setValue('');
		this.activePlayers.setValue(0);
	}
}
