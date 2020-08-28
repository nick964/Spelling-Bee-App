import { TestBed } from '@angular/core/testing';

import { MyWordService } from './my-word.service';

describe('MyWordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyWordService = TestBed.get(MyWordService);
    expect(service).toBeTruthy();
  });
});
