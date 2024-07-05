import { TestBed } from '@angular/core/testing';

import { ValidatetokenService } from './validatetoken.service';

describe('ValidatetokenService', () => {
  let service: ValidatetokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatetokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
