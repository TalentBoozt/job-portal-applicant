import {NgModule} from "@angular/core";
import {
  ApplicantsPerJobBarChartComponent
} from "../../components/dashboards/charts/applicants-per-job-bar-chart/applicants-per-job-bar-chart.component";
import {NgChartsModule} from "ng2-charts";
import {
  ApplicantLocationPieChartComponent
} from "../../components/dashboards/charts/applicant-location-pie-chart/applicant-location-pie-chart.component";
import {NgIf} from "@angular/common";
import {
  JobViewersOverTimeLineChartComponent
} from "../../components/dashboards/charts/job-viewers-over-time-line-chart/job-viewers-over-time-line-chart.component";
import {
  ApplicantsStatusDoughnutChartComponent
} from "../../components/dashboards/charts/applicants-status-doughnut-chart/applicants-status-doughnut-chart.component";
import {
  ViewersStatusPolarAreaChartComponent
} from "../../components/dashboards/charts/viewers-status-polar-area-chart/viewers-status-polar-area-chart.component";
import {
  ApplicantSubmissionDatesChartComponent
} from "../../components/dashboards/charts/applicant-submission-dates-chart/applicant-submission-dates-chart.component";
import {
  ViewerTypesPieChartComponent
} from "../../components/dashboards/charts/viewer-types-pie-chart/viewer-types-pie-chart.component";
import {
  ResumeDownloadRatesChartComponent
} from "../../components/dashboards/charts/resume-download-rates-chart/resume-download-rates-chart.component";
import {
  ApplicantsEmailDomainsChartComponent
} from "../../components/dashboards/charts/applicants-email-domains-chart/applicants-email-domains-chart.component";
import {
  ApplicantsOverTimeLineChartComponent
} from "../../components/dashboards/charts/applicants-over-time-line-chart/applicants-over-time-line-chart.component";

@NgModule({
  declarations: [
    ApplicantsPerJobBarChartComponent,
    ApplicantLocationPieChartComponent,
    JobViewersOverTimeLineChartComponent,
    ApplicantsStatusDoughnutChartComponent,
    ViewersStatusPolarAreaChartComponent,
    ApplicantSubmissionDatesChartComponent,
    ViewerTypesPieChartComponent,
    ResumeDownloadRatesChartComponent,
    ApplicantsEmailDomainsChartComponent,
    ApplicantsOverTimeLineChartComponent
  ],
  imports: [
    NgChartsModule,
    NgIf
  ],
  exports: [
    ApplicantsPerJobBarChartComponent,
    ApplicantLocationPieChartComponent,
    JobViewersOverTimeLineChartComponent,
    ApplicantsStatusDoughnutChartComponent,
    ViewersStatusPolarAreaChartComponent,
    ApplicantSubmissionDatesChartComponent,
    ViewerTypesPieChartComponent,
    ResumeDownloadRatesChartComponent,
    ApplicantsEmailDomainsChartComponent,
    ApplicantsOverTimeLineChartComponent
  ]
})
export class SharedChartsComponentModule {}
