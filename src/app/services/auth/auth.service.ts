import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserType } from 'src/app/configs/user';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private userUrlApi: string = '';

	constructor(private httpClient: HttpClient) {}

	public isAuthenticated(): boolean {
		return true;
	}

	public getUser(): Observable<UserType> {
		this.userUrlApi = '';

		return this.httpClient.get<UserType>(this.userUrlApi);
	}

	public signIn(user: UserType): Observable<UserType> {
		this.userUrlApi = '';

		return this.httpClient.post<UserType>(this.userUrlApi, user);
	}

	public signUp(user: UserType): Observable<UserType> {
		this.userUrlApi = '';

		return this.httpClient.post<UserType>(this.userUrlApi, user);
	}

	public signOut(user: UserType): Observable<UserType> {
		this.userUrlApi = '';

		return this.httpClient.post<UserType>(this.userUrlApi, user);
	}
}
