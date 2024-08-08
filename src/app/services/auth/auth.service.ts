import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AUTH_URL_API_CONSTANTS, UserType } from 'src/app/configs/user';
import * as UserSelectors from 'src/app/store/selectors/user.selectors';

@Injectable({
	providedIn: 'root',
})
export class AuthService {

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
	
		return this.httpClient.post<{ user: UserType; message: string }>(
			`${AUTH_URL_API_CONSTANTS}/check`,
			user
		);
	}

	public signIn(): Observable<{ message: string; user: UserType }> {
		

		return this.httpClient.get<{ message: string; user: UserType }>(
			`${AUTH_URL_API_CONSTANTS}/check`
		);
	}

	public signOut(user: UserType): Observable<{ message: string }> {
	
		return this.httpClient.post<{ message: string }>(
			`${AUTH_URL_API_CONSTANTS}/check`,
			user
		);
	}

	public getUser(): Observable<UserType> {
	
	
		return this.httpClient.get<UserType>(`${AUTH_URL_API_CONSTANTS}/check`);
	}
}
