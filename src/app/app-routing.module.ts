import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameDetailComponent } from './features/game-detail/index';
import { GamesComponent } from './features/games/games.component';

const routes: Routes = [
	{
		path: 'games/:id',
		loadComponent: () =>
			import('./features/game-detail/index').then((m) => m.GameDetailComponent),
	},
	{
		path: 'games',
		loadComponent: () =>
			import('./features/games/games.component').then((m) => m.GamesComponent),
	},
	{ path: '', redirectTo: '/games', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
