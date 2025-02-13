import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickAndEasyRoutingModule } from './quick-and-easy-routing.module';
import { QuickAndEasyComponent } from './quick-and-easy.component';
import {SharedPipesModule} from "../../../../shared/modules/shared-pipes.module";


@NgModule({
  declarations: [
    QuickAndEasyComponent
  ],
    imports: [
        CommonModule,
        QuickAndEasyRoutingModule,
        SharedPipesModule
    ]
})
export class QuickAndEasyModule { }
