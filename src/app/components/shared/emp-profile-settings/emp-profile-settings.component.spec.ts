import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpProfileSettingsComponent } from './emp-profile-settings.component';

describe('EmpProfileSettingsComponent', () => {
  let component: EmpProfileSettingsComponent;
  let fixture: ComponentFixture<EmpProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpProfileSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
