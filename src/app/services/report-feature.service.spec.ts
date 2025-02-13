import { TestBed } from '@angular/core/testing';

import { ReportFeatureService } from './report-feature.service';

describe('ReportFeatureService', () => {
  let service: ReportFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
