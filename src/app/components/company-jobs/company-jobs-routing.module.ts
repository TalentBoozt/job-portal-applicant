import {RouterModule, Routes} from "@angular/router";
import {CompanyJobsComponent} from "./company-jobs.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{path: '', component: CompanyJobsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyJobsRoutingModule {}
