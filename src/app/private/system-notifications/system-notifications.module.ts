import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemNotificationsRoutingModule } from './system-notifications-routing.module';
import { SystemNotificationsComponent } from './system-notifications.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SystemNotificationsComponent
  ],
    imports: [
        CommonModule,
        SystemNotificationsRoutingModule,
        ReactiveFormsModule
    ]
})
export class SystemNotificationsModule { }
