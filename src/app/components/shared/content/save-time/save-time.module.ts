import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaveTimeRoutingModule } from './save-time-routing.module';
import { SaveTimeComponent } from './save-time.component';
import {SharedPipesModule} from "../../../../shared/modules/shared-pipes.module";


@NgModule({
  declarations: [
    SaveTimeComponent
  ],
    imports: [
        CommonModule,
        SaveTimeRoutingModule,
        SharedPipesModule
    ]
})
export class SaveTimeModule { }
