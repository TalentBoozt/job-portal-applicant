import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OAuthCallbackLinkedinComponent } from './o-auth-callback-linkedin.component';

const routes: Routes = [{ path: '', component: OAuthCallbackLinkedinComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OAuthCallbackLinkedinRoutingModule { }
