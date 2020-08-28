import { TestBed } from '@angular/core/testing';

import { FetchWordService } from './fetch-word.service';

describe('FetchWordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchWordService = TestBed.get(FetchWordService);
    expect(service).toBeTruthy();
  });
});
