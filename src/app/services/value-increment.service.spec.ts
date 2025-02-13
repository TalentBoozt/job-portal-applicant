import { TestBed } from '@angular/core/testing';

import { ValueIncrementService } from './value-increment.service';

describe('ValueIncrementService', () => {
  let service: ValueIncrementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueIncrementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
