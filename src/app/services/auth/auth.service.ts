import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AUTH_URL_API, UserType } from 'src/app/configs/user';
import * as UserSelectors from 'src/app/store/selectors/user.selectors';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private userUrlApi: string = AUTH_URL_API;
	private isAuthenticated: boolean = false;

	constructor(
		private httpClient: HttpClient,
		private store: Store,
		private router: Router
	) {}

	public getIsAuthenticated(): boolean {
		this.store
			.select(UserSelectors.selectIsAuthenticated)
			.subscribe((res) => (this.isAuthenticated = res!));

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

	public signUp(
		user: UserType
	): Observable<{ user: UserType; message: string }> {
		this.userUrlApi = `${AUTH_URL_API}/check`;
		return this.httpClient.post<{ user: UserType; message: string }>(
			this.userUrlApi,
			user
		);
	}

	public signIn(): Observable<{ message: string; user: UserType }> {
		this.userUrlApi = `${AUTH_URL_API}/check`;

		return this.httpClient.get<{ message: string; user: UserType }>(
			this.userUrlApi
		);
	}

	public signOut(user: UserType): Observable<{ message: string }> {
		this.userUrlApi = `${AUTH_URL_API}/check`;

		return this.httpClient.post<{ message: string }>(this.userUrlApi, user);
	}

	public getUser(): Observable<UserType> {
		this.userUrlApi = '';

		return this.httpClient.get<UserType>(this.userUrlApi);
	}
}
