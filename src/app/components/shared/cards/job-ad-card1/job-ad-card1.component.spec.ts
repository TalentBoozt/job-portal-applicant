import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdCard1Component } from './job-ad-card1.component';

describe('JobAdCard1Component', () => {
  let component: JobAdCard1Component;
  let fixture: ComponentFixture<JobAdCard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAdCard1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAdCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
