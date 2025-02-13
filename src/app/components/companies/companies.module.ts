import {NgModule} from "@angular/core";
import {CompaniesComponent} from "./companies.component";
import {CommonModule} from "@angular/common";
import {CompaniesRoutingModule} from "./companies-routing.module";
import {SharedPipesModule} from "../../shared/modules/shared-pipes.module";
import {SharedCardsComponentModule} from "../../shared/modules/shared-cards-component.module";
import {SharedComponentModule} from "../../shared/modules/shared-component.module";

@NgModule({
  declarations: [
    CompaniesComponent
  ],
    imports: [
        CommonModule,
        CompaniesRoutingModule,
        SharedPipesModule,
        SharedCardsComponentModule,
        SharedComponentModule
    ],
  exports: []
})
export class CompaniesModule {}
