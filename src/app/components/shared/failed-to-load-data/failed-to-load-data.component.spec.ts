import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedToLoadDataComponent } from './failed-to-load-data.component';

describe('FailedToLoadDataComponent', () => {
  let component: FailedToLoadDataComponent;
  let fixture: ComponentFixture<FailedToLoadDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedToLoadDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedToLoadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
