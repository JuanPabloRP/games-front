import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { USER_ROLE, UserType } from 'src/app/configs/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as UserActions from 'src/app/store/actions/user.actions';
import * as UserSelectors from 'src/app/store/selectors/user.selectors';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
})
export class SignUpComponent implements OnInit {
	public user = new FormControl('');
	public password = new FormControl('');
	public passwordConfirmation = new FormControl('');
	isAuthenticated: boolean = false;

	loading: boolean = false;

	constructor(
		private store: Store,
		private router: Router,
		private authService: AuthService
	) {
		this.store
			.select(UserSelectors.selectLoading)
			.subscribe((res) => (this.loading = res));
	}

	ngOnInit() {
		this.authService.redirectIfAuthenticated({
			routes: ['/games'],
		});
	}

	signUp() {
		if (!this.checkPassword()) {
			// Mostrar error
			console.log('Error, las contraseñas son diferentes');
			return;
		}
		const newUser: Partial<UserType> = {
			id: Math.floor(Math.random() * 10000000000),
			username: this.user.value!,
			password: this.password.value!,
			role: USER_ROLE.USER,
			isAuthenticated: false,
		};
		this.store.dispatch(UserActions.signUp({ user: newUser }));

		this.clearFields();
		this.store
			.select(UserSelectors.selectError)
			.subscribe((error) => console.log(error)); // Mostrar bien el error al usuario (después uso toast o algo asi xd)

		return;
	}

	private checkPassword() {
		return this.password.value === this.passwordConfirmation.value;
	}

	// No hace falta pero ahi la voy a dejar por si algo
	clearFields(): void {
		this.user.setValue('');
		this.password.setValue('');
		this.passwordConfirmation.setValue('');
	}
}
