import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PersonalProfileMyComponent
} from "../../components/dashboards/free/personal-profile-my/personal-profile-my.component";
import {
  PersonalProfileSettingsComponent
} from "../../components/dashboards/free/personal-profile-settings/personal-profile-settings.component";
import {
  BusinessProfileMyComponent
} from "../../components/dashboards/free/business-profile-my/business-profile-my.component";
import {
  BusinessProfileSettingsComponent
} from "../../components/dashboards/free/business-profile-settings/business-profile-settings.component";
import {CompanyJobsMyComponent} from "../../components/dashboards/free/company-jobs-my/company-jobs-my.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RouterLink} from "@angular/router";
import {SharedComponentModule} from "./shared-component.module";
import {SharedPipesModule} from "./shared-pipes.module";
import {BillingAndUsageComponent} from "../../components/dashboards/free/billing-and-usage/billing-and-usage.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {JobPostComponent} from "../../components/dashboards/free/job-post/job-post.component";
import {JobDetailsModule} from "../../components/shared/job-details/job-details.module";
import {YearGridComponentModule} from "./year-grid-component.module";



@NgModule({
  declarations: [
    PersonalProfileMyComponent,
    PersonalProfileSettingsComponent,
    BusinessProfileMyComponent,
    BusinessProfileSettingsComponent,
    CompanyJobsMyComponent,
    BillingAndUsageComponent,
    JobPostComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        RouterLink,
        SharedComponentModule,
        SharedPipesModule,
        MatProgressBarModule,
        JobDetailsModule,
        YearGridComponentModule
    ],
  exports: [
    PersonalProfileMyComponent,
    PersonalProfileSettingsComponent,
    BusinessProfileMyComponent,
    BusinessProfileSettingsComponent,
    CompanyJobsMyComponent,
    BillingAndUsageComponent,
    JobPostComponent
  ]
})
export class SharedDashboardModule { }
