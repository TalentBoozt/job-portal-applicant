import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OAuthCallbackComponent } from './o-auth-callback.component';

const routes: Routes = [{ path: '', component: OAuthCallbackComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OAuthCallbackRoutingModule { }
