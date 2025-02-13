import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewQuestionsRoutingModule } from './interview-questions-routing.module';
import { InterviewQuestionsComponent } from './interview-questions.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    InterviewQuestionsComponent
  ],
    imports: [
        CommonModule,
        InterviewQuestionsRoutingModule,
        ReactiveFormsModule
    ]
})
export class InterviewQuestionsModule { }
