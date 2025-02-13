import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {HomeRoutingModule} from "./home-routing.module";
import {SharedPipesModule} from "../../shared/modules/shared-pipes.module";
import {SharedCardsComponentModule} from "../../shared/modules/shared-cards-component.module";
import {FooterModule} from "../shared/footer/footer.module";
import {HeaderModule} from "../shared/header/header.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        MatIconModule,
        RouterModule,
        SharedPipesModule,
        SharedCardsComponentModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        FooterModule,
        HeaderModule
    ],
  providers: [
  ],
})
export class HomeModule { }
