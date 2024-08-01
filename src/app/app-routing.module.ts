import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameDetailComponent } from './core/features/games/game-detail/game-detail.component';
import { GamesComponent } from './core/features/games/games.component';
import { IndexComponent } from './core/features/index/index.component';
import { SignInComponent } from './core/features/auth/sign-in/sign-in.component';
import { SignUpComponent } from './core/features/auth/sign-up/sign-up.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
	{
		path: 'games/:id',
		loadComponent: () =>
			import('./core/features/games/game-detail/game-detail.component').then(
				(m) => m.GameDetailComponent
			),
	},
	{
		path: 'games',
		loadComponent: () =>
			import('./core/features/games/games.component').then(
				(m) => m.GamesComponent
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'auth/signin',
		component: SignInComponent,
	},
	{
		path: 'auth/signup',
		component: SignUpComponent,
	},
	{ path: '', component: IndexComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
