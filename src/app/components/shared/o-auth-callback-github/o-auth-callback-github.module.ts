import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OAuthCallbackGithubRoutingModule } from './o-auth-callback-github-routing.module';
import { OAuthCallbackGithubComponent } from './o-auth-callback-github.component';


@NgModule({
  declarations: [
    OAuthCallbackGithubComponent
  ],
  imports: [
    CommonModule,
    OAuthCallbackGithubRoutingModule
  ]
})
export class OAuthCallbackGithubModule { }
