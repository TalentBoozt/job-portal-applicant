import {RouterModule, Routes} from "@angular/router";
import {BusinessProfileComponent} from "./business-profile.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{ path: '', component: BusinessProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessProfileRoutingModule { }
