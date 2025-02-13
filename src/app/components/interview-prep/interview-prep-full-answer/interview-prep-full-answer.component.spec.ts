import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewPrepFullAnswerComponent } from './interview-prep-full-answer.component';

describe('InterviewPrepFullAnswerComponent', () => {
  let component: InterviewPrepFullAnswerComponent;
  let fixture: ComponentFixture<InterviewPrepFullAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewPrepFullAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewPrepFullAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
