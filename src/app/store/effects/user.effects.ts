import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { UserType } from 'src/app/configs/user';
import * as UserActions from '../actions/user.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { catchError, map, merge, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {
	getUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.getUser),
			mergeMap((action) =>
				this.authService.getUser().pipe(
					map(() =>
						UserActions.getUserSuccess({
							message: 'Ok, se pudo obtener el usuario',
						})
					),
					catchError(() =>
						of(
							UserActions.getUserFailure({
								error: 'Error, no se pudo obtener el usuario',
							})
						)
					)
				)
			)
		)
	);

	signIn$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.signIn),
			mergeMap((action) =>
				this.authService.signIn(action.user).pipe(
					map(() =>
						UserActions.signInsuccess({
							message: 'Ok, se pudo iniciar sesión',
						})
					),
					catchError(() =>
						of(
							UserActions.signInFailure({
								error: 'Error, no se pudo iniciar sesión',
							})
						)
					)
				)
			)
		)
	);

	signUp$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.signUp),
			mergeMap((action) =>
				this.authService.signUp(action.user).pipe(
					map(() => {
						console.log(action.user);
						return UserActions.signUpSuccess({
							user: action.user,
							message: 'Ok, se pudo registrar el usuario',
						});
					}),
					catchError(() =>
						of(
							UserActions.signUpFailure({
								error: 'Error, no se pudo registrar al usuario',
							})
						)
					)
				)
			)
		)
	);

	signOut$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.signOut),
			mergeMap((action) =>
				this.authService.signOut(action.user).pipe(
					map(() =>
						UserActions.signOutSuccess({
							message: 'Ok, se pudo cerrar sesión',
						})
					),
					catchError(() =>
						of(
							UserActions.signOutFailure({
								error: 'Error, no se pudo cerrar la sesión del usuario',
							})
						)
					)
				)
			)
		)
	);

	constructor(private actions$: Actions, private authService: AuthService) {}
}
