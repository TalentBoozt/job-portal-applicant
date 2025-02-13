import {NgModule} from "@angular/core";
import {AboutComponent} from "./about.component";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {AboutRoutingModule} from "./about-routing.module";
import {GoogleMapsModule} from "@angular/google-maps";
import {SharedPipesModule} from "../../shared/modules/shared-pipes.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedCardsComponentModule} from "../../shared/modules/shared-cards-component.module";

@NgModule({
  declarations: [
    AboutComponent
  ],
    imports: [
        CommonModule,
        AboutRoutingModule,
        GoogleMapsModule,
        SharedPipesModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        SharedCardsComponentModule
    ]
})
export class AboutModule { }
