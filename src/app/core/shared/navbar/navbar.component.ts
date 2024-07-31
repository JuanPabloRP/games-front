import { Component } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	isOpen: boolean = false;

	constructor() {}

	toggleIsOpen() {
		console.log();
		this.isOpen = !this.isOpen;
	}
}
