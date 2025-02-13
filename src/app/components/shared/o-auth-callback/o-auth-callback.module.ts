import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OAuthCallbackRoutingModule } from './o-auth-callback-routing.module';
import { OAuthCallbackComponent } from './o-auth-callback.component';


@NgModule({
  declarations: [
    OAuthCallbackComponent
  ],
  imports: [
    CommonModule,
    OAuthCallbackRoutingModule
  ]
})
export class OAuthCallbackModule { }
