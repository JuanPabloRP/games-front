import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { UserType } from 'src/app/configs/user';
import * as UserSelectors from 'src/app/store/selectors/user.selectors';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private userUrlApi: string = '';
	private isAuthenticated: boolean = false;

	constructor(
		private httpClient: HttpClient,
		private store: Store,
		private router: Router
	) {}

	public getIsAuthenticated(): boolean {
		this.store
			.select(UserSelectors.selectIsAuthenticated)
			.subscribe((res) => (this.isAuthenticated = res));

		return this.isAuthenticated;
	}

	redirectIfAuthenticated({ routes }: { routes: string[] }) {
		this.store
			.select(UserSelectors.selectIsAuthenticated)
			.subscribe((isAuthenticated) => {
				if (isAuthenticated) {
					this.router.navigate(routes);
				}
			});
	}

	// ----------------------

	public getUser(): Observable<UserType> {
		this.userUrlApi = '';

		return this.httpClient.get<UserType>(this.userUrlApi);
	}

	public signIn(user: UserType): Observable<UserType> {
		this.userUrlApi = '';

		return this.httpClient.post<UserType>(this.userUrlApi, user);
	}

	public signUp(user: UserType): Observable<UserType> {
		this.userUrlApi =
			'https://run.mocky.io/v3/7542e2b4-49a9-4ca4-82b2-b61f959e9dcf';
		return this.httpClient.post<UserType>(this.userUrlApi, user);
	}

	public signOut(user: UserType): Observable<UserType> {
		this.userUrlApi =
			'https://run.mocky.io/v3/6b992066-d14f-4c7c-a188-32d725d1d253';

		return this.httpClient.post<UserType>(this.userUrlApi, user);
	}
}
