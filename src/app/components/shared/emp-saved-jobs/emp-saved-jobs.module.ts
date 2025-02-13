import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpSavedJobsComponent } from './emp-saved-jobs.component';
import { EmpSavedJobsRoutingModule } from './emp-saved-jobs-routing.module';
import { EmpSavedJobsSavedComponent } from './emp-saved-jobs-saved/emp-saved-jobs-saved.component';
import { EmpSavedJobsInprogressComponent } from './emp-saved-jobs-inprogress/emp-saved-jobs-inprogress.component';
import { EmpSavedJobsAppliedComponent } from './emp-saved-jobs-applied/emp-saved-jobs-applied.component';
import { EmpSavedJobsArchivedComponent } from './emp-saved-jobs-archived/emp-saved-jobs-archived.component';

@NgModule({
  declarations: [
    EmpSavedJobsComponent,
    EmpSavedJobsSavedComponent,
    EmpSavedJobsInprogressComponent,
    EmpSavedJobsAppliedComponent,
    EmpSavedJobsArchivedComponent,
  ],
  imports: [
    CommonModule,
    EmpSavedJobsRoutingModule
  ],
})
export class EmpSavedJobsModule {}
