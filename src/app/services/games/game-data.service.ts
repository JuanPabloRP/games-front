import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class GameDataService {
	private changes = new Subject<void>();
	public changes$ = this.changes.asObservable();

	public sendChanges(): void {
		this.changes.next();
	}
}
