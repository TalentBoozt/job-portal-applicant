import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemNotificationsComponent } from './system-notifications.component';
import {TokenGuard} from "../../guards/token-guard.guard";

const routes: Routes = [{ path: '', component: SystemNotificationsComponent, canActivate: [TokenGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemNotificationsRoutingModule { }
