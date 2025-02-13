import { TestBed } from '@angular/core/testing';

import { AdminProGuard } from './admin-pro.guard';

describe('AdminProGuard', () => {
  let guard: AdminProGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminProGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
