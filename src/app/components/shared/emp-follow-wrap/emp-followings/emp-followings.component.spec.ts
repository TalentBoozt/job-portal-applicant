import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpFollowingsComponent } from './emp-followings.component';

describe('EmpFollowingsComponent', () => {
  let component: EmpFollowingsComponent;
  let fixture: ComponentFixture<EmpFollowingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpFollowingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpFollowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
