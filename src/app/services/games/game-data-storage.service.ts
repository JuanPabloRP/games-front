import { Injectable } from '@angular/core';
import { GameType } from 'src/app/configs';

@Injectable({
	providedIn: 'root',
})
export class GameDataStorageService {
	games: GameType[] = [];
	constructor() {}
}
