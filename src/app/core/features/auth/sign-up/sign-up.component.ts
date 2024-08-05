import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	ReactiveFormsModule,
	FormControl,
	FormGroup,
	FormBuilder,
	Validators,
} from '@angular/forms';
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
	signUpForm: FormGroup = this.formBuilder.group({
		username: ['', [Validators.required, Validators.minLength(5)]],
		password: ['', [Validators.required, Validators.minLength(8)]],
		passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]],
	});

	isAuthenticated: boolean = false;
	loading: boolean = false;
	error: string = '';
	submitted: boolean = false;

	constructor(
		private store: Store,
		private router: Router,
		private authService: AuthService,
		private formBuilder: FormBuilder
	) {
		this.getLoading();

		this.getError();
	}

	ngOnInit() {
		this.authService.redirectIfAuthenticated({
			routes: ['/games'],
		});
	}

	signUp() {
		this.submitted = true;
		const username = this.signUpForm.get('username')?.value;
		const password = this.signUpForm.get('password')?.value;
		const passwordConfirmation = this.signUpForm.get(
			'passwordConfirmation'
		)?.value;

		if (!username || !password || !passwordConfirmation) {
			console.log({ username, password, passwordConfirmation });
			this.setError({ error: 'Error, no están todos los datos' });
			return;
		}

		if (!this.checkPassword(password, passwordConfirmation)) {
			this.setError({
				error: 'Error, la contraseña y la confimación son diferentes',
			});
			return;
		}

		if (!this.signUpForm.valid) {
			this.setError({
				error: 'Error, los campos no cumplen con todas las condiciones',
			});
			return;
		}

		const newUser: UserType = {
			id: Math.floor(Math.random() * 10000000000),
			username: username,
			password: password,
			role: USER_ROLE.USER,
			isAuthenticated: false,
		};

		this.setUserActive({ user: newUser });
		this.clearFields();
		this.getError();
	}

	// TODO cambiar este método
	private checkPassword(password: string, passwordConfirmation: string) {
		return password === passwordConfirmation;
	}

	goToSignIn() {
		this.router.navigate(['/auth/signin']);
	}

	setUserActive({ user }: { user: UserType }) {
		this.store.dispatch(UserActions.signUp({ user }));
	}

	getLoading() {
		this.store
			.select(UserSelectors.selectLoading)
			.subscribe((res) => (this.loading = res));
	}

	setError({ error }: { error: string }) {
		this.store.dispatch(UserActions.signUpFailure({ error }));
	}

	getError() {
		return this.store
			.select(UserSelectors.selectError)
			.subscribe((res) => (this.error = res));
	}

	// No hace falta pero ahi la voy a dejar por si algo
	clearFields(): void {
		this.signUpForm.get('username')?.setValue('');
		this.signUpForm.get('password')?.setValue('');
		this.signUpForm.get('passwordConfirmation')?.setValue('');
	}
}
