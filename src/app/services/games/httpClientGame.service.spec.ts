import { TestBed } from '@angular/core/testing';

import { HttpClientGameService } from './httpClientGame.service';

describe('GamesService', () => {
	let service: HttpClientGameService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(HttpClientGameService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
