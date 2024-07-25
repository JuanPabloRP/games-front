import { TestBed } from '@angular/core/testing';

import { GameDataStorageService } from './game-data-storage.service';

describe('GameDataStorageService', () => {
  let service: GameDataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
