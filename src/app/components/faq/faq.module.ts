import {NgModule} from "@angular/core";
import {FaqComponent} from "./faq.component";
import {CommonModule} from "@angular/common";
import {FaqRoutingModule} from "./faq-routing.module";
import {SharedCardsComponentModule} from "../../shared/modules/shared-cards-component.module";

@NgModule({
  declarations: [
    FaqComponent
  ],
    imports: [
        CommonModule,
        FaqRoutingModule,
        SharedCardsComponentModule
    ],
  exports: []
})
export class FaqModule {}
