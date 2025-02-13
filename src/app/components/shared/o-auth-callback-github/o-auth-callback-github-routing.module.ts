import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OAuthCallbackGithubComponent } from './o-auth-callback-github.component';

const routes: Routes = [{ path: '', component: OAuthCallbackGithubComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OAuthCallbackGithubRoutingModule { }
