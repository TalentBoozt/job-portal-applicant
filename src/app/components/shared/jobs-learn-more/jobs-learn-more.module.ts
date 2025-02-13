import {NgModule} from "@angular/core";
import {JobsLearnMoreComponent} from "./jobs-learn-more.component";
import {CommonModule} from "@angular/common";
import {JobsLearnMoreRoutingModule} from "./jobs-learn-more-routing.module";
import {SharedComponentModule} from "../../../shared/modules/shared-component.module";

@NgModule({
  declarations: [
    JobsLearnMoreComponent
  ],
  imports: [
    CommonModule,
    JobsLearnMoreRoutingModule,
    SharedComponentModule
  ],
  exports: []
})
export class JobsLearnMoreModule {}
