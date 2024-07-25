import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GameListComponent } from './game-list/game-list.component';
import { AddGameComponent } from './add-game/add-game.component';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		GameListComponent,
		AddGameComponent,
		ReactiveFormsModule,
	],
})
export class GamesComponent {}
