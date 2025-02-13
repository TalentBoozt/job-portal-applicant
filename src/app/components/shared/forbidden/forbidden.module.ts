import {NgModule} from "@angular/core";
import {ForbiddenRoutingModule} from "./forbidden-routing.module";
import {SharedComponentModule} from "../../../shared/modules/shared-component.module";

@NgModule({
  declarations: [],
  imports: [
    ForbiddenRoutingModule,
    SharedComponentModule
  ],
  exports: [],
})
export class ForbiddenModule { }
