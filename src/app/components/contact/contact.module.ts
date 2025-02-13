import {NgModule} from "@angular/core";
import {ContactComponent} from "./contact.component";
import {CommonModule} from "@angular/common";
import {ContactRoutingModule} from "./contact-routing.module";
import {GoogleMapsModule} from "@angular/google-maps";
import {SharedPipesModule} from "../../shared/modules/shared-pipes.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ContactComponent
  ],
    imports: [
        CommonModule,
        ContactRoutingModule,
        GoogleMapsModule,
        SharedPipesModule,
        ReactiveFormsModule
    ],
  exports: []
})
export class ContactModule {}
