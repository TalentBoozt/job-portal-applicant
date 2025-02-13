import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpFollowWrapRoutingModule } from './emp-follow-wrap-routing.module';
import { EmpFollowWrapComponent } from './emp-follow-wrap.component';
import { EmpFollowersComponent } from './emp-followers/emp-followers.component';
import { EmpFollowingsComponent } from './emp-followings/emp-followings.component';
import {SharedPipesModule} from "../../../shared/modules/shared-pipes.module";


@NgModule({
    declarations: [
        EmpFollowWrapComponent,
        EmpFollowersComponent,
        EmpFollowingsComponent
    ],
    exports: [
        EmpFollowWrapComponent
    ],
    imports: [
        CommonModule,
        EmpFollowWrapRoutingModule,
        SharedPipesModule
    ]
})
export class EmpFollowWrapModule { }
