import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
	standalone: true,
})
export class SignInComponent {
	constructor(
		private store: Store,
		private router: Router,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.authService.redirectIfAuthenticated({
			routes: ['/games'],
		});
	}
}
