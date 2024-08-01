import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import * as GameActions from 'src/app/store/actions/games.actions';
import * as GameSelectors from 'src/app/store/selectors/games.selectors';

import { GameType } from 'src/app/configs/game';

@Component({
	selector: 'app-game-detail',
	templateUrl: './game-detail.component.html',
	styleUrls: ['./game-detail.component.scss'],
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
})
export class GameDetailComponent implements OnInit, OnDestroy {
	protected name = new FormControl('');
	protected description = new FormControl('');
	protected activePlayers = new FormControl(0);

	public game: GameType = {} as GameType;
	private unsuscribe$: Subject<void>;
	public loading$: Observable<boolean>;

	constructor(
		private route: ActivatedRoute,
		private store: Store,
		private location: Location
	) {
		this.loading$ = this.store.select(GameSelectors.selectLoading);
		this.unsuscribe$ = new Subject();
	}

	public ngOnInit() {
		this.getGame();
	}

	public ngOnDestroy(): void {
		this.unsuscribe$.next();
		this.unsuscribe$.complete();
	}

	private getGame(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		this.store.dispatch(GameActions.getGameById({ id }));
		this.store.select(GameSelectors.selectSelectedGame).subscribe((game) => {
			this.game = game;
			this.initForm();
		});
	}

	private initForm(): void {
		this.name.setValue(this.game.name);
		this.description.setValue(this.game.description);
		this.activePlayers.setValue(this.game.activePlayers);
	}

	public update({ name, description, activePlayers }: GameType): void {
		const gameUpdated = {
			...this.game,
			name,
			description,
			activePlayers,
		};

		this.store.dispatch(GameActions.editGame({ game: gameUpdated }));

		this.goBack();
	}

	public goBack(): void {
		this.location.back();
	}
}
