import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	messages: string[] = [];

	add(message: string): void {
		this.messages.unshift(message);
	}

	clear(): void {
		this.messages = [];
	}
}
