import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewQuestionsComponent } from './interview-questions.component';
import {TokenGuard} from "../../guards/token-guard.guard";

const routes: Routes = [{ path: '', component: InterviewQuestionsComponent, canActivate: [TokenGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewQuestionsRoutingModule { }
