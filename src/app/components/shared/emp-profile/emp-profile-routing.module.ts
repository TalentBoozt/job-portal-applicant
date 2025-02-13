import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {EmpProfileComponent} from "./emp-profile.component";
import {AuthGuard} from "../../../guards/auth.guard";

const routes: Routes = [{path: '', component: EmpProfileComponent, canActivate: [AuthGuard]}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpProfileRoutingModule { }
