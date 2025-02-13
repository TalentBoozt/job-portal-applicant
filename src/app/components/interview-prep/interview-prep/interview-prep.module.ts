import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewPrepRoutingModule } from './interview-prep-routing.module';
import { InterviewPrepComponent } from './interview-prep.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SharedPipesModule} from "../../../shared/modules/shared-pipes.module";


@NgModule({
  declarations: [
    InterviewPrepComponent
  ],
  imports: [
    CommonModule,
    InterviewPrepRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    SharedPipesModule
  ]
})
export class InterviewPrepModule { }
