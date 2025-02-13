import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import {FormsModule} from "@angular/forms";
import {SharedCardsComponentModule} from "../../shared/modules/shared-cards-component.module";
import {SharedPipesModule} from "../../shared/modules/shared-pipes.module";


@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    SharedCardsComponentModule,
    SharedPipesModule
  ]
})
export class EmployeeModule { }
