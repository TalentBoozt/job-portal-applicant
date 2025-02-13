import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsLearnMoreComponent } from './jobs-learn-more.component';

describe('JobsLearnMoreComponent', () => {
  let component: JobsLearnMoreComponent;
  let fixture: ComponentFixture<JobsLearnMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsLearnMoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsLearnMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
