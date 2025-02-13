import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreOrderRoutingModule } from './pre-order-routing.module';
import { PreOrderComponent } from './pre-order.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedComponentModule} from "../../../shared/modules/shared-component.module";


@NgModule({
  declarations: [
    PreOrderComponent
  ],
    imports: [
        CommonModule,
        PreOrderRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentModule
    ]
})
export class PreOrderModule { }
