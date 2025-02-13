import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AlertsService} from "../../services/alerts.service";

@Component({
  selector: 'app-interview-questions',
  templateUrl: './interview-questions.component.html',
  styleUrls: ['./interview-questions.component.scss']
})
export class InterviewQuestionsComponent {
  interviewForm: FormGroup;
  baseUrl = environment.apiUrl;

  constructor(private fb: FormBuilder, private http: HttpClient, private alertService: AlertsService) {
    this.interviewForm = this.fb.group({
      category: ['', Validators.required],
      questions: this.fb.array([this.initQuestion()])
    });
  }

  initQuestion(): FormGroup {
    return this.fb.group({
      id: [''],
      question: ['', Validators.required],
      overview: [''],
      viewCount: [0],
      answers: this.fb.array([this.initAnswer()])
    });
  }

  initAnswer(): FormGroup {
    return this.fb.group({
      id: [this.generateRandomId(), Validators.required],
      by: ['', Validators.required],
      position: [''],
      date: [''],
      answer: ['', Validators.required],
      video: [''],
      viewCount: [0]
    });
  }

  get questions(): FormArray {
    return this.interviewForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(this.initQuestion());
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  getAnswersFormArray(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }

  addAnswer(questionIndex: number) {
    const answers = this.questions.at(questionIndex).get('answers') as FormArray;
    answers.push(this.initAnswer());
  }

  removeAnswer(questionIndex: number, answerIndex: number) {
    const answers = this.questions.at(questionIndex).get('answers') as FormArray;
    answers.removeAt(answerIndex);
  }

  onSubmit() {
    if (this.interviewForm.valid) {
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:password')
      });
      this.http.post(this.baseUrl+'/interview-questions/add', this.interviewForm.value, {headers})
        .subscribe(response => {
          this.interviewForm.reset();
          this.alertService.successMessage('Question submitted successfully', 'Success');
        }, error => {
          this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
        });
    }
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
