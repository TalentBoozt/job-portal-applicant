import { TestBed } from '@angular/core/testing';

import { BillingUsageService } from './billing-usage.service';

describe('BillingUsageService', () => {
  let service: BillingUsageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingUsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
