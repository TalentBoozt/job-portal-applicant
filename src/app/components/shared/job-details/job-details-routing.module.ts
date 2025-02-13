import {JobDetailsComponent} from "./job-details.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {Routes} from "@angular/router";

const routes: Routes = [{path: '', component: JobDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobDetailsRoutingModule { }
