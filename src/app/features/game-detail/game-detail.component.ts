import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GameType } from '../../configs';
import { HttpClientGameService } from '../../services/games/httpClientGame.service';

@Component({
	selector: 'app-game-detail',
	templateUrl: './game-detail.component.html',
	styleUrls: ['./game-detail.component.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule],
})
export class GameDetailComponent implements OnInit {
	public game: GameType;

	constructor(
		private route: ActivatedRoute,
		private httpClientGameService: HttpClientGameService,
		private location: Location
	) {
		this.game = {} as GameType;
	}

	public ngOnInit() {
		this.getGame();
	}

	private getGame(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		this.httpClientGameService
			.getGame(id)
			.subscribe((game) => (this.game = game));
	}

	public update(): void {
		if (this.game) {
			this.httpClientGameService
				.updateGame(this.game)
				.subscribe(() => this.goBack());
		}
	}

	public goBack(): void {
		this.location.back();
	}
}
