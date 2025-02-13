import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmpProfileSettingsRoutingModule} from "./emp-profile-settings-routing.module";
import {EmpProfileSettingsComponent} from "./emp-profile-settings.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedComponentModule} from "../../../shared/modules/shared-component.module";

@NgModule({
  declarations: [
    EmpProfileSettingsComponent
  ],
    imports: [
        CommonModule,
        EmpProfileSettingsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentModule,
    ]
})
export class EmpProfileSettingsModule { }
