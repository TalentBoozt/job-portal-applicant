import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommingSoonRoutingModule } from './comming-soon-routing.module';
import { CommingSoonComponent } from './comming-soon.component';


@NgModule({
  declarations: [
    CommingSoonComponent
  ],
  imports: [
    CommonModule,
    CommingSoonRoutingModule
  ]
})
export class CommingSoonModule { }
