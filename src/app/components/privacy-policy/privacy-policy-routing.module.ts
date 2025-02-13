import {RouterModule, Routes} from "@angular/router";
import {PrivacyPolicyComponent} from "./privacy-policy.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{path: '', component: PrivacyPolicyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyPolicyRoutingModule {}
