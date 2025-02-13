import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSavedJobsArchivedComponent } from './emp-saved-jobs-archived.component';

describe('EmpSavedJobsArchivedComponent', () => {
  let component: EmpSavedJobsArchivedComponent;
  let fixture: ComponentFixture<EmpSavedJobsArchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpSavedJobsArchivedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpSavedJobsArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
