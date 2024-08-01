import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
	username = new FormControl('');
	password = new FormControl('');
	loading: boolean = false;

	constructor(
		private store: Store,
		private router: Router,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.store
			.select(UserSelectors.selectLoading)
			.subscribe((loading) => (this.loading = loading));

		this.authService.redirectIfAuthenticated({
			routes: ['/games'],
		});
	}

	signIn() {
		const user: Partial<UserType> = {
			username: this.username.value!,
			password: this.password.value!,
			isAuthenticated: false,
		};

		this.store.dispatch(UserActions.signIn({ user }));

		this.clearFields();
		this.store
			.select(UserSelectors.selectMessage)
			.subscribe((message) => console.log(message));
		this.store
			.select(UserSelectors.selectError)
			.subscribe((error) => console.log(error));
	}

	clearFields(): void {
		this.username.setValue('');
		this.password.setValue('');
	}
}
