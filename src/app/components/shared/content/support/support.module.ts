import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import {SharedPipesModule} from "../../../../shared/modules/shared-pipes.module";


@NgModule({
  declarations: [
    SupportComponent
  ],
    imports: [
        CommonModule,
        SupportRoutingModule,
        SharedPipesModule
    ]
})
export class SupportModule { }
