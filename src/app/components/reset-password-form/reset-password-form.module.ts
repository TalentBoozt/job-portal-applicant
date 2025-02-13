import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordFormRoutingModule } from './reset-password-form-routing.module';
import { ResetPasswordFormComponent } from './reset-password-form.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ResetPasswordFormComponent
  ],
    imports: [
        CommonModule,
        ResetPasswordFormRoutingModule,
        FormsModule
    ]
})
export class ResetPasswordFormModule { }
