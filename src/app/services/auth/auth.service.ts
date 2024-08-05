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
		this.userUrlApi =
			'https://run.mocky.io/v3/374c8f23-ec3d-4046-b916-139fb65c90c0';
		return this.httpClient.post<{ user: UserType; message: string }>(
			this.userUrlApi,
			user
		);
	}

	public signIn(): Observable<{ message: string; user: UserType }> {
		this.userUrlApi =
			'https://run.mocky.io/v3/77d36d5e-6a22-4d40-ba40-4f92bf67a8a5';

		return this.httpClient.get<{ message: string; user: UserType }>(
			this.userUrlApi
		);
	}

	public signOut(user: UserType): Observable<{ message: string }> {
		this.userUrlApi =
			'https://run.mocky.io/v3/a9531b39-4b71-466a-968a-8b7794d73f49';

		return this.httpClient.post<{ message: string }>(this.userUrlApi, user);
	}

	public getUser(): Observable<UserType> {
		this.userUrlApi = '';

		return this.httpClient.get<UserType>(this.userUrlApi);
	}
}
