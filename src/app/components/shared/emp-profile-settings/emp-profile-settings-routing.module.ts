import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EmpProfileSettingsComponent} from "./emp-profile-settings.component";
import {AuthGuard} from "../../../guards/auth.guard";

const routes: Routes = [{path: '', component: EmpProfileSettingsComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpProfileSettingsRoutingModule { }
