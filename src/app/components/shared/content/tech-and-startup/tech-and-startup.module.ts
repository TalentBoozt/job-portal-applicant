import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechAndStartupRoutingModule } from './tech-and-startup-routing.module';
import { TechAndStartupComponent } from './tech-and-startup.component';
import {SharedPipesModule} from "../../../../shared/modules/shared-pipes.module";


@NgModule({
  declarations: [
    TechAndStartupComponent
  ],
    imports: [
        CommonModule,
        TechAndStartupRoutingModule,
        SharedPipesModule
    ]
})
export class TechAndStartupModule { }
