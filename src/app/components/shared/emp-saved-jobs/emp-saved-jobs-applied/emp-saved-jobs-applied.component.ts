import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../../services/employee.service";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {AlertsService} from "../../../../services/alerts.service";
import {CompanyService} from "../../../../services/company.service";

@Component({
  selector: 'app-emp-saved-jobs-applied',
  templateUrl: './emp-saved-jobs-applied.component.html',
  styleUrls: ['./emp-saved-jobs-applied.component.scss']
})
export class EmpSavedJobsAppliedComponent implements AfterViewInit, OnInit {

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  userSavedIds: any[] = [];

  jobAdDataStore: any[] = [];
  filteredJobs: any[] = [];
  constructor(private employeeService: EmployeeService,
              private companyService: CompanyService,
              private cookieService: AuthService,
              private alertService: AlertsService,
              private router: Router ) { }

  ngAfterViewInit(): void {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  ngOnInit(): void {
    this.employeeId = this.cookieService.userID();
    this.getEmployee(this.employeeId);
    this.getAllJobs();
  }

  getEmployee(id: any) {
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.userSavedIds = this.employee.employee.savedJobs.filter((item: any) => item.status === 'applied').map((job: any) => job.jobId);
      },
      (error: any) => {
        this.alertService.warningMessage('Please Login First to Apply Jobs', 'Reminder');
      }
    );
  }

  getAllJobs() {
    this.companyService.fetchAllPostedJobs().subscribe((data) => {
      data.forEach((company: any) => {
        company.postedJobs.forEach((job: any) => {
          job.companyName = company.companyName;
          job.companyLogo = company.companyLogo;
          job.companyLevel = company.companyLevel;
          this.jobAdDataStore.push(job);
        });
      });
    }, (error: any) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    })
  }

  filterJobs():any[] {
    this.filteredJobs = this.jobAdDataStore.filter((job: any) => this.userSavedIds.includes(job.id));
    return this.filteredJobs;
  }

  removeFav(id: string) {
    this.employeeService.removeFavJobs(this.employeeId, id).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Job Removed Successfully', 'Success');
    }, (error: any) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  isExpired(savedJobs:any, id:any, expiryDate: any) {
    const currentDate = new Date().getTime();
    const jobExpiryDate = new Date(expiryDate).getTime();
    const route = this.router.url.split('/')[2];

    const job = savedJobs.find((j: any) => j.jobId === id);
    if (job.status === 'expired') {
      if (currentDate < jobExpiryDate && route === 'applied') {
        this.employeeService.editFavJobStatus(this.employeeId, {
          jobId: id,
          status: 'applied'
        }).subscribe((data) => {
          this.getEmployee(this.employeeId);
        })
        return false;
      }
      return true;
    } else {
      if (currentDate > jobExpiryDate) {
        this.employeeService.editFavJobStatus(this.employeeId, {
          jobId: id,
          status: 'expired'
        }).subscribe((data) => {
          this.getEmployee(this.employeeId);
        })
        return true;
      }
    }

    return false;
  }
}
