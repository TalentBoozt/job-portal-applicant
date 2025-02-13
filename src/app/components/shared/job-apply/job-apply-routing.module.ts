import {JobApplyComponent} from "./job-apply.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {Routes} from "@angular/router";
import {AuthGuard} from "../../../guards/auth.guard";

const routes: Routes = [{path: '', component: JobApplyComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobApplyRoutingModule { }
