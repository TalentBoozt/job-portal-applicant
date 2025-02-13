import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpFollowWrapComponent } from './emp-follow-wrap.component';
import {EmpFollowingsComponent} from "./emp-followings/emp-followings.component";
import {EmpFollowersComponent} from "./emp-followers/emp-followers.component";

const routes: Routes = [{ path: '', component: EmpFollowWrapComponent, children: [
  { path: '', redirectTo: 'followers', pathMatch: 'full' },
  { path: 'followers', component: EmpFollowersComponent },
  { path: 'followings', component: EmpFollowingsComponent },
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpFollowWrapRoutingModule { }
