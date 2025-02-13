import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewPrepFullAnswerComponent } from './interview-prep-full-answer.component';

const routes: Routes = [{ path: '', component: InterviewPrepFullAnswerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewPrepFullAnswerRoutingModule { }
