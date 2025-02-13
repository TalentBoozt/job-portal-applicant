import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewPrepFullAnswerRoutingModule } from './interview-prep-full-answer-routing.module';
import { InterviewPrepFullAnswerComponent } from './interview-prep-full-answer.component';
import {NotFoundModule} from "../../shared/not-found/not-found.module";


@NgModule({
  declarations: [
    InterviewPrepFullAnswerComponent
  ],
    imports: [
        CommonModule,
        InterviewPrepFullAnswerRoutingModule,
        NotFoundModule
    ]
})
export class InterviewPrepFullAnswerModule { }
