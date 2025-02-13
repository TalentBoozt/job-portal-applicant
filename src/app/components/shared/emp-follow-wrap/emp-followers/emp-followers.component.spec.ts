import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpFollowersComponent } from './emp-followers.component';

describe('EmpFollowersComponent', () => {
  let component: EmpFollowersComponent;
  let fixture: ComponentFixture<EmpFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpFollowersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
