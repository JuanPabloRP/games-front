import { Component } from '@angular/core';
import { MessageService } from '../../services/message/message.service';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
	messages: string[] = [];
	constructor(public messageService: MessageService) {
		this.messages = this.messageService.messages;
	}

	ngOnInit() {}

	add(message: string): void {
		this.messageService.add(message);
	}

	clear(): void {
		this.messageService.clear();
		this.messages = this.messageService.messages;
	}
}
