import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemNotificationViewComponent } from './system-notification-view.component';

describe('SystemNotificationViewComponent', () => {
  let component: SystemNotificationViewComponent;
  let fixture: ComponentFixture<SystemNotificationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemNotificationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemNotificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
