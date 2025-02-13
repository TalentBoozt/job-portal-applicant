import {NgModule} from "@angular/core";
import {CompanyJobsComponent} from "./company-jobs.component";
import {CommonModule} from "@angular/common";
import {CompanyJobsRoutingModule} from "./company-jobs-routing.module";
import {SharedPipesModule} from "../../shared/modules/shared-pipes.module";
import {SharedCardsComponentModule} from "../../shared/modules/shared-cards-component.module";
import {SharedComponentModule} from "../../shared/modules/shared-component.module";

@NgModule({
  declarations: [
    CompanyJobsComponent
  ],
  imports: [
    CommonModule,
    CompanyJobsRoutingModule,
    SharedPipesModule,
    SharedCardsComponentModule,
    SharedComponentModule
  ]
})
export class CompanyJobsModule { }
