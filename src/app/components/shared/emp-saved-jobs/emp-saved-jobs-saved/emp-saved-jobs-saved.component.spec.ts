import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSavedJobsSavedComponent } from './emp-saved-jobs-saved.component';

describe('EmpSavedJobsSavedComponent', () => {
  let component: EmpSavedJobsSavedComponent;
  let fixture: ComponentFixture<EmpSavedJobsSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpSavedJobsSavedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpSavedJobsSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
