import {NgModule} from "@angular/core";
import {LockScreenComponent} from "./lock-screen.component";
import {CommonModule} from "@angular/common";
import {LockScreenRoutingModule} from "./lock-screen-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LockScreenComponent
  ],
    imports: [
        CommonModule,
        LockScreenRoutingModule,
        ReactiveFormsModule
    ],
})
export class LockScreenModule { }
