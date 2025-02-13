import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-interview-prep',
  templateUrl: './interview-prep.component.html',
  styleUrls: ['./interview-prep.component.scss']
})
export class InterviewPrepComponent implements OnInit{

  interviewPrepData:any[] = [];
  selectedQuestion: any;

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<any> {
    await this.getAllQuestions().subscribe((data) => {
      this.selectedQuestion = this.interviewPrepData[0].questions[0];
      this.incrementViewCount(this.selectedQuestion);
    })
  }

  selectQuestion(question: any) {
    this.selectedQuestion = question;
    this.incrementViewCount(question);
  }

  incrementViewCount(question: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    })
    this.http.put(`${this.baseUrl}/interview-questions/increment-question-view/${question.id}`, {}, {headers})
      .subscribe(() => question.viewCount++);

    // if (!sessionStorage.getItem(`token_${question.id}`)) {
    //   sessionStorage.setItem(`token_${question.id}`, 'true');
    //   const headers = new HttpHeaders({
    //     'Authorization': 'Basic ' + btoa('admin:password')
    //   })
    //   this.http.put(`${this.baseUrl}/interview-questions/increment-question-view/${question.id}`, {}, {headers})
    //     .subscribe(() => question.viewCount++);
    // }
  }

  getAllQuestions(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    })
    return this.http.get(`${this.baseUrl}/interview-questions/get`, {headers}).pipe(
      tap((data:any) => {
        this.interviewPrepData = data;
      })
    );
  }
}
