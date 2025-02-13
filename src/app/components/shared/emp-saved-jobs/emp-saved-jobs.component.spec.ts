import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSavedJobsComponent } from './emp-saved-jobs.component';

describe('EmpSavedJobsComponent', () => {
  let component: EmpSavedJobsComponent;
  let fixture: ComponentFixture<EmpSavedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpSavedJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpSavedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
