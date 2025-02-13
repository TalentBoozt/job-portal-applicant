import {NgModule} from "@angular/core";
import {PrivacyPolicyComponent} from "./privacy-policy.component";
import {CommonModule} from "@angular/common";
import {PrivacyPolicyRoutingModule} from "./privacy-policy-routing.module";

@NgModule({
  declarations: [
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule
  ],
})
export class PrivacyPolicyModule { }
