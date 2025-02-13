import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostCard2Component } from './job-post-card2.component';

describe('JobPostCard2Component', () => {
  let component: JobPostCard2Component;
  let fixture: ComponentFixture<JobPostCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPostCard2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
