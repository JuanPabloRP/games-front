import { Component, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as GameActions from 'src/app/store/actions/games.actions';
import { GameType } from 'src/app/configs/game';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-add-game',
	templateUrl: './add-game.component.html',
	styleUrls: ['./add-game.component.scss'],
	standalone: true,
	imports: [ReactiveFormsModule],
})
export class AddGameComponent implements OnDestroy {
	name = new FormControl('');
	description = new FormControl('');
	activePlayers = new FormControl(0);

	unsuscribe$: Subject<void>;

	constructor(private store: Store<{ game: GameType }>) {
		this.unsuscribe$ = new Subject();
	}

	ngOnDestroy(): void {
		this.unsuscribe$.next();
		this.unsuscribe$.complete();
	}

	addGame({ name, description, activePlayers }: GameType): void {
		const newGame = { name, description, activePlayers } as GameType;

		this.store.dispatch(GameActions.addGame({ game: newGame as GameType }));

		this.clearFields();
	}

	clearFields(): void {
		this.name.setValue('');
		this.description.setValue('');
		this.activePlayers.setValue(0);
	}
}
