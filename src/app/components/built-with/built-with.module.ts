import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuiltWithRoutingModule } from './built-with-routing.module';
import { BuiltWithComponent } from './built-with.component';


@NgModule({
  declarations: [
    BuiltWithComponent
  ],
  imports: [
    CommonModule,
    BuiltWithRoutingModule
  ]
})
export class BuiltWithModule { }
