import {NgModule} from "@angular/core";
import {JobDetailsComponent} from "./job-details.component";
import {CommonModule} from "@angular/common";
import {JobDetailsRoutingModule} from "./job-details-routing.module";
import {SharedPipesModule} from "../../../shared/modules/shared-pipes.module";
import {SharedComponentModule} from "../../../shared/modules/shared-component.module";
import {SharedCardsComponentModule} from "../../../shared/modules/shared-cards-component.module";

@NgModule({
    declarations: [
        JobDetailsComponent
    ],
    exports: [
        JobDetailsComponent
    ],
    imports: [
        CommonModule,
        JobDetailsRoutingModule,
        SharedPipesModule,
        SharedComponentModule,
        SharedCardsComponentModule
    ]
})
export class JobDetailsModule { }
