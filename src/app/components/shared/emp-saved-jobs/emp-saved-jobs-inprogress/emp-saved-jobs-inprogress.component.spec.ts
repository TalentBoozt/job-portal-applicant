import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSavedJobsInprogressComponent } from './emp-saved-jobs-inprogress.component';

describe('EmpSavedJobsInprogressComponent', () => {
  let component: EmpSavedJobsInprogressComponent;
  let fixture: ComponentFixture<EmpSavedJobsInprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpSavedJobsInprogressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpSavedJobsInprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
