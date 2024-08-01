import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GameType } from 'src/app/configs/game';
import { Observable } from 'rxjs';

import * as GameActions from 'src/app/store/actions/games.actions';
import * as GameSelectors from 'src/app/store/selectors/games.selectors';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
	messages$: Observable<string[]> = new Observable<string[]>();

	constructor(private store: Store<{ games: GameType }>) {}

	ngOnInit() {
		this.messages$ = this.store.select(GameSelectors.selectMessages);
	}

	add(message: string): void {
		this.store.dispatch(GameActions.addMessage({ message }));
	}

	clear(): void {
		this.store.dispatch(GameActions.clearMessages());
	}
}
