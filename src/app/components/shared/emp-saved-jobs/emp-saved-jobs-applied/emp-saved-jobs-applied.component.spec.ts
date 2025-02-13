import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSavedJobsAppliedComponent } from './emp-saved-jobs-applied.component';

describe('EmpSavedJobsAppliedComponent', () => {
  let component: EmpSavedJobsAppliedComponent;
  let fixture: ComponentFixture<EmpSavedJobsAppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpSavedJobsAppliedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpSavedJobsAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
