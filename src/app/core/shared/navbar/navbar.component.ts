import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as UserSelectors from 'src/app/store/selectors/user.selectors';
import * as UserActions from 'src/app/store/actions/user.actions';
import { UserType } from 'src/app/configs/user';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	isAuthenticated: boolean = false;
	user: UserType = {} as UserType;

	constructor(
		public authService: AuthService,
		private store: Store,
		private router: Router
	) {
		this.store
			.select(UserSelectors.selectIsAuthenticated)
			.subscribe((res) => (this.isAuthenticated = res!));

		this.store
			.select(UserSelectors.selectUser)
			.subscribe((u) => this.user = u!);
	}

	singOut() {
		this.store.dispatch(UserActions.signOut({ user: this.user }));
		this.router.navigate(['/']);
	}
}
