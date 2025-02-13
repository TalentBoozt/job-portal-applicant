import {NgModule} from "@angular/core";
import {JobApplyComponent} from "./job-apply.component";
import {CommonModule} from "@angular/common";
import {JobApplyRoutingModule} from "./job-apply-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    JobApplyComponent
  ],
    imports: [
        CommonModule,
        JobApplyRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class JobApplyModule { }
