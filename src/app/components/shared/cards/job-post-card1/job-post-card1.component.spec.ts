import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostCard1Component } from './job-post-card1.component';

describe('JobPostCard1Component', () => {
  let component: JobPostCard1Component;
  let fixture: ComponentFixture<JobPostCard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPostCard1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
