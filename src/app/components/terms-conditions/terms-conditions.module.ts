import {NgModule} from "@angular/core";
import {TermsConditionsComponent} from "./terms-conditions.component";
import {CommonModule} from "@angular/common";
import {TermsConditionsRoutingModule} from "./terms-conditions-routing.module";

@NgModule({
  declarations: [
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    TermsConditionsRoutingModule
  ],
  exports: []
})
export class TermsConditionsModule {}
