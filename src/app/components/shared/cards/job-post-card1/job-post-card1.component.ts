import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmployeeService} from "../../../../services/employee.service";
import {AlertsService} from "../../../../services/alerts.service";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-job-post-card1',
  templateUrl: './job-post-card1.component.html',
  styleUrls: ['./job-post-card1.component.scss']
})
export class JobPostCard1Component {

  @Input() p: any = {};
  @Input() userSavedIds: any[] = [];
  @Input() employeeId: any;

  @Output() savedJobChanged = new EventEmitter<void>();

  employee: any;

  constructor(private employeeService: EmployeeService, private alertService: AlertsService ) {}
  saveFav(id: string) {
    if (this.employeeId == null) {
      this.alertService.warningMessage('Please Login First to Save Jobs', 'Reminder');
      return;
    }
    this.employeeService.saveFavJobs(this.employeeId, {
      jobId: id,
      status: 'saved'
    }).subscribe((data) => {
      this.alertService.successMessage('Job Saved Successfully', 'Success');
      this.savedJobChanged.emit();  // Emit the event here
    }, (error: any) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  removeFav(id: string) {
    if (this.employeeId == null) {
      this.alertService.warningMessage('Please Login First to Save Jobs', 'Reminder');
      return;
    }
    this.employeeService.removeFavJobs(this.employeeId, id).subscribe((data) => {
      this.alertService.successMessage('Job Removed Successfully', 'Success');
      this.savedJobChanged.emit();  // Emit the event here
    }, (error: any) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }
}
