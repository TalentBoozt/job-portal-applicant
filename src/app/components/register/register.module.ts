import {NgModule} from "@angular/core";
import {RegisterComponent} from "./register.component";
import {CommonModule} from "@angular/common";
import {RegisterRoutingModule} from "./register-routing.modules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class RegisterModule { }
