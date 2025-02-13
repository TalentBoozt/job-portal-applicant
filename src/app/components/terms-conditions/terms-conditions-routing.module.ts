import {RouterModule, Routes} from "@angular/router";
import {TermsConditionsComponent} from "./terms-conditions.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{path: '', component: TermsConditionsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsConditionsRoutingModule {}
