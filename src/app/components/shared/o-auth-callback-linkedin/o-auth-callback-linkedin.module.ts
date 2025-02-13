import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OAuthCallbackLinkedinRoutingModule } from './o-auth-callback-linkedin-routing.module';
import { OAuthCallbackLinkedinComponent } from './o-auth-callback-linkedin.component';


@NgModule({
  declarations: [
    OAuthCallbackLinkedinComponent
  ],
  imports: [
    CommonModule,
    OAuthCallbackLinkedinRoutingModule
  ]
})
export class OAuthCallbackLinkedinModule { }
