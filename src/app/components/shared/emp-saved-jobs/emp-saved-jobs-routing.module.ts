import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpSavedJobsComponent } from './emp-saved-jobs.component';
import { EmpSavedJobsSavedComponent } from './emp-saved-jobs-saved/emp-saved-jobs-saved.component';
import { EmpSavedJobsInprogressComponent } from './emp-saved-jobs-inprogress/emp-saved-jobs-inprogress.component';
import { EmpSavedJobsAppliedComponent } from './emp-saved-jobs-applied/emp-saved-jobs-applied.component';
import { EmpSavedJobsArchivedComponent } from './emp-saved-jobs-archived/emp-saved-jobs-archived.component';
import {AuthGuard} from "../../../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: EmpSavedJobsComponent,
    children: [
      { path: '', redirectTo: 'saved', pathMatch: 'full' },
      { path: 'saved', component: EmpSavedJobsSavedComponent, canActivate: [AuthGuard] },
      { path: 'inprogress', component: EmpSavedJobsInprogressComponent, canActivate: [AuthGuard] },
      { path: 'applied', component: EmpSavedJobsAppliedComponent, canActivate: [AuthGuard] },
      { path: 'archived', component: EmpSavedJobsArchivedComponent, canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpSavedJobsRoutingModule {}
