import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserType } from 'src/app/configs/user';
import { AuthService } from 'src/app/services/auth/auth.service';

import * as UserActions from 'src/app/store/actions/user.actions';
import * as UserSelectors from 'src/app/store/selectors/user.selectors';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
})
export class SignInComponent {
	signInForm: FormGroup = this.formBuilder.group({
		username: ['', [Validators.required, Validators.minLength(5)]],
		password: ['', [Validators.required, Validators.minLength(8)]],
	});

	loading: boolean = false;
	user: UserType = {} as UserType;
	error: string = '';
	submitted: boolean = false;

	constructor(
		private store: Store,
		private router: Router,
		private authService: AuthService,
		private formBuilder: FormBuilder
	) {
		this.store
			.select(UserSelectors.selectUser)
			.subscribe((user) => (this.user = user));
		this.store
			.select(UserSelectors.selectLoading)
			.subscribe((loading) => (this.loading = loading));
		this.store
			.select(UserSelectors.selectError)
			.subscribe((error) => (this.error = error));
	}

	ngOnInit() {
		this.authService.redirectIfAuthenticated({
			routes: ['/games'],
		});
	}

	signIn() {
		this.submitted = true;
		const username = this.signInForm.get('username')?.value;
		const password = this.signInForm.get('password')?.value;
		console.log({ username, password });

		if (!username || !password) {
			this.setError({
				error: 'Error, no se ingresaron los datos necesarios',
			});

			this.getError();
			return;
		}

		if (username !== this.user.username || password !== this.user.password) {
			this.setError({
				error: 'Error, el usuario no existe',
			});

			this.getError();
			return;
		}

		if (!this.signInForm.valid) {
			this.setError({
				error: 'Error, los campos no cumplen con todas las condiciones',
			});
			return;
		}

		this.getMessage();

		this.setUser({ user: this.user });
		this.clearFields();
	}

	goToSignUp() {
		this.router.navigate(['/auth/signup']);
	}

	setUser({ user }: { user: UserType }) {
		this.store.dispatch(UserActions.signIn({ user }));
	}

	setError({ error }: { error: string }) {
		this.store.dispatch(UserActions.signInFailure({ error }));
	}

	getError() {
		this.store
			.select(UserSelectors.selectError)
			.subscribe((error) => console.log(error));
	}

	getMessage() {
		this.store
			.select(UserSelectors.selectMessage)
			.subscribe((message) => console.log(message));
	}

	clearFields(): void {
		this.signInForm.get('username')?.setValue('');
		this.signInForm.get('password')?.setValue('');
	}
}
