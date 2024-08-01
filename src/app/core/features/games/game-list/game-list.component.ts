import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { GameType } from 'src/app/configs/game';
import * as GameActions from 'src/app/store/actions/games.actions';
import * as GameSelectors from 'src/app/store/selectors/games.selectors';
import { ofType } from '@ngrx/effects';

@Component({
	selector: 'app-game-list',
	templateUrl: './game-list.component.html',
	styleUrls: ['./game-list.component.scss'],
	standalone: true,
	imports: [RouterModule, CommonModule],
})
export class GameListComponent implements OnDestroy {
	games$: Observable<GameType[]> = new Observable();
	loading$: Observable<boolean>;
	unsubscribe$: Subject<void>;

	constructor(private store: Store<{ games: GameType }>) {
		this.loading$ = this.store.pipe(select(GameSelectors.selectLoading));
		this.unsubscribe$ = new Subject();
	}

	ngOnInit(): void {
		this.store.select(GameSelectors.selectLoading);
		this.getGames();
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	getGames(): void {
		this.store.dispatch(GameActions.getGames());
		this.games$ = this.store.select(GameSelectors.selectAllGames);
	}

	deleteGame(game: GameType): void {
		this.store.dispatch(GameActions.deleteGame({ id: game.id }));
	}
}
