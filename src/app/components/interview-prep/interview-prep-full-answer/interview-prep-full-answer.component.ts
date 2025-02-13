import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {NavigationService} from "../../../services/navigation.service";
import {Observable, tap} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-interview-prep-full-answer',
  templateUrl: './interview-prep-full-answer.component.html',
  styleUrls: ['./interview-prep-full-answer.component.scss']
})
export class InterviewPrepFullAnswerComponent {
  questionId: any;
  answerId: any;
  questionsDataStore: any[] = [];
  selectedQuestion: any;
  selectedAnswer: any;

  baseUrl = environment.apiUrl

  constructor(private route: ActivatedRoute, private navigation: NavigationService, private sanitizer: DomSanitizer, private http: HttpClient) {}

  async ngOnInit(): Promise<any> {
    await this.getAllQuestions().subscribe((data) => {
      this.route.paramMap.subscribe(params => {
        this.questionId = params.get('qid');
        this.answerId = params.get('aid');

        this.selectedQuestion = this.questionsDataStore
          .flatMap(q => q.questions)
          .find(question => question.id === this.questionId);

        this.selectedQuestion?.answers.forEach((answer: any) => {
          if (answer.id === this.answerId) {
            this.selectedAnswer = answer;
            this.incrementViewCount(answer);
          }
        })
      });
    })
  }

  getVideoUrl(url: string): any {
    // Assuming the video URL is a YouTube URL, convert it to an embeddable format
    const videoId = this.extractVideoId(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  extractVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : null;
  }

  incrementViewCount(answer: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    })
    this.http.put(`${this.baseUrl}/interview-questions/increment-answer-view/${answer.id}`, {}, {headers})
      .subscribe(() => answer.viewCount++);
    // if (!sessionStorage.getItem(`token_${answer.id}`)) {
    //   sessionStorage.setItem(`token_${answer.id}`, 'true');
    //   const headers = new HttpHeaders({
    //     'Authorization': 'Basic ' + btoa('admin:password')
    //   })
    //   this.http.put(`${this.baseUrl}/interview-questions/increment-answer-view/${answer.id}`, {}, {headers})
    //     .subscribe(() => answer.viewCount++);
    // }
  }

  goBack() {
    this.navigation.back();
  }

  getAllQuestions(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    })
    return this.http.get(`${this.baseUrl}/interview-questions/get`, {headers}).pipe(
      tap((data:any) => {
        this.questionsDataStore = data;
      })
    );
  }
}
