import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpFollowWrapComponent } from './emp-follow-wrap.component';

describe('EmpFollowWrapComponent', () => {
  let component: EmpFollowWrapComponent;
  let fixture: ComponentFixture<EmpFollowWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpFollowWrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpFollowWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
