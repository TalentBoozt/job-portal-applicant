import {NgModule} from "@angular/core";
import {ResetPasswordComponent} from "./reset-password.component";
import {CommonModule} from "@angular/common";
import {ResetPasswordRoutingModule} from "./reset-password-routing.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
    imports: [
        CommonModule,
        ResetPasswordRoutingModule,
        FormsModule
    ],
})
export class ResetPasswordModule { }
