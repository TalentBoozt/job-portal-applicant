import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {EmployeeService} from "../../../services/employee.service";
import { HttpErrorResponse } from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../services/common/common.service";
import {AlertsService} from "../../../services/alerts.service";

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss']
})
export class EmpProfileComponent implements OnInit, AfterViewInit {

  progressValue = 8;
  progressMode: ProgressSpinnerMode = 'determinate';

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  myId: any;
  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  employees: any;
  filteredEmployees: any;

  queryId: any;

  contactUsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  })
  mailLoading: boolean = false;
  contactPrivate: boolean = false;
  contactId: any;

  inviteLink: any;

  followingIds: any[] = [];
  followersIds: any[] = [];
  followBtn:boolean = true;
  showFollowWrapper: boolean = false;
  activeTab: string = 'followers';

  constructor(private employeeService: EmployeeService,
              public cookieService: AuthService,
              private commonService: CommonService,
              private alertService: AlertsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<any> {
    this.employeeId = this.cookieService.userID();
    this.myId = this.cookieService.userID();
    this.route.queryParamMap.subscribe(params => {
      this.queryId = params.get('id');
    })
    if (this.queryId) {
      this.employeeId = this.queryId
    }
    this.getEmployee(this.employeeId)
    this.getAllEmployees()

    this.inviteLink = `https://talentboozt.com?ref=${this.employeeId}`
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  getEmployee(id: any) {
    this.loading = true;
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.calculateProfileProgress(this.employee?.employee);
        if (this.employee?.empContact && this.employee?.empContact.length > 0) {
          this.contactPrivate = this.employee.empContact[0]?.publicity;
          this.contactId = this.employee.empContact[0]?.id;
        }
        if (this.employee?.empFollowing && this.employee?.empFollowing.length > 0) {
          this.followingIds = this.employee.empFollowing[0]?.followings?.map((following: any) => following?.followingId) || [];
        }
        if (this.employee?.empFollowers && this.employee?.empFollowers.length > 0) {
          this.followersIds = this.employee.empFollowers[0]?.followers?.map((follower: any) => follower?.followerId) || [];
        }

        this.loading = false
      },
      (error: HttpErrorResponse) => {
        // Check for different error types
        if (error.status === 404) {
          this.notFound = true;
        } else if (error.status === 500) {
          this.serverError = true;
        } else if (error.status === 0) {
          this.corsError = true;
        } else if (error.status === 403) {
          this.forbidden = true;
        } else {
          this.unexpectedError = true;
        }

        this.loading = false;
      }
    );
  }

  getAllEmployees() {
    this.employeeService.fetchEmployees().subscribe((data: any) => {
      this.employees = data;
    })
  }

  filteredEmployeesList() {
    this.filteredEmployees = this.employees?.filter((employee: any) => employee?.occupation === this.employee?.employee?.occupation);
    return this.filteredEmployees;
  }

  calculateProfileProgress(data: any) {
    this.loading = false;
    if (!data || !data.profileCompleted) {
      this.progressValue = 0; // Or any other default value
      return;
    }

    const profileCompletion = data.profileCompleted;
    if (typeof profileCompletion !== 'object' || profileCompletion === null) {
      // Handle case where profileCompletion is not an object or is null
      this.progressValue = 0; // Or any other default value
      return;
    }

    const completionArray = Object.values(profileCompletion);
    const total = completionArray.length;
    const completed = completionArray.filter((item: any) => item === true).length;
    this.progressValue = Math.round((completed / total) * 100);
  }

  viewProfile(id: any) {
    if (id) {
      this.router.navigate(['/candidate-profile'], {queryParams: {id: id}});
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }
  }

  contact() {
    if (this.contactUsForm.valid) {
      if (this.employee?.employee?.email) {
        this.mailLoading = true;
        this.commonService.personalContact({
          name: this.contactUsForm.get('name')?.value,
          fromEmail: this.contactUsForm.get('email')?.value,
          toEmail: this.employee?.employee?.email,
          subject: this.contactUsForm.get('subject')?.value,
          message: this.contactUsForm.get('message')?.value
        }).subscribe((res: any) => {
          this.mailLoading = false;
          this.contactUsForm.reset();
          this.alertService.successMessage('Your message has been sent.', 'Contact Candidate');
        }, (err: any) => {
          this.mailLoading = false;
          this.alertService.errorMessage('Something went wrong. Please try again.', 'Contact Candidate');
        })
      } else {
        this.alertService.warningMessage('Sorry! this candidate is not provided a public email address.', 'Contact Candidate');
      }
    } else {
      this.alertService.errorMessage('Please fill in all the required fields.', 'Contact Candidate');
    }
  }

  toggleContactPrivate() {
    this.contactPrivate = !this.contactPrivate
    if (this.contactId) {
      this.employeeService.changeContactPublicity(this.contactId).subscribe(data => {
        if (data != null) {
          this.getEmployee(this.employeeId)
          this.alertService.successMessage('Your contact publicity has been updated.', 'Privacy')
        }
      }, (error: any) => {
        this.alertService.errorMessage('Something went wrong. Please try again.', 'Privacy')
      })
    } else {
      this.alertService.errorMessage('Please Add Contact First.', 'Privacy')
    }
  }

  inviteFriend() {
    const copyText: HTMLInputElement = document.getElementById("invite") as HTMLInputElement;

    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(copyText.value);

    const tooltip: HTMLSpanElement = document.getElementById("myTooltip") as HTMLSpanElement;
    tooltip.innerHTML = "Copied: " + copyText.value;
  }

  outFunc() {
    const tooltip: HTMLSpanElement = document.getElementById("myTooltip") as HTMLSpanElement;
    tooltip.innerHTML = "Copy to clipboard";
  }

  follow(employee: any) {
    if(!this.myId){
      this.alertService.warningMessage('Please Login First to Follow', 'Follow');
      return;
    }
    this.followersIds.push(this.myId);
    this.followBtn = false;
    if (employee) {
      this.employeeService.addFollowing(
        {
          employeeId: this.myId,
          followings: [{
            id: this.generateRandomId(),
            followingId: employee?.employee?.id || null,
            followingName: employee?.employee?.firstname + ' ' + employee?.employee?.lastname || null,
            followingOccupation: employee?.employee?.occupation || null,
            followingImage: employee?.employee?.image || null,
            followingLocation: employee?.empContact ? employee?.empContact[0]?.contact ? employee?.empContact[0]?.contact[0]?.country || null : null : null
          }]
        }
      ).subscribe(data => {
        if (data != null) {
          this.employeeService.fetchFullEmployee(this.myId).subscribe(
            (data) => {
              const emp = data;
              this.employeeService.addFollower({
                employeeId: employee?.employee?.id,
                followers: [{
                  id: this.generateRandomId(),
                  followerId: emp?.employee?.id || null,
                  followerName: emp?.employee?.firstname + ' ' + emp?.employee?.lastname || null,
                  followerOccupation: emp?.employee?.occupation || null,
                  followerImage: emp?.employee?.image || null,
                  followerLocation: emp?.empContact ? emp?.empContact[0]?.contact ? emp?.empContact[0]?.contact[0]?.country || null : null : null
                }]
              }).subscribe((data) => {
                if (data != null) {
                  this.getEmployee(this.employeeId)
                  this.alertService.successMessage('You have followed ' + employee?.employee?.firstname + ' ' + employee?.employee?.lastname, 'Follow')
                }
              })
            })
        }
        this.followBtn = true;
      }, (error: any) => {
        this.alertService.errorMessage('Something went wrong. Please try again.', 'Follow')
        this.followBtn = true;
      })
    }
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  unfollow(employee: any) {
    const index = this.followersIds.indexOf(this.myId);
    this.followBtn = false;
    if (index > -1) {
      this.followersIds.splice(index, 1);
    }
    if (employee) {
      this.employeeService.deleteFollower(employee?.employee?.id, this.myId).subscribe(data => {
        this.employeeService.deleteFollowing(this.myId, employee?.employee?.id).subscribe(data => {
          this.getEmployee(this.employeeId)
          this.alertService.successMessage('You have unfollowed ' + employee?.employee?.firstname + ' ' + employee?.employee?.lastname, 'Unfollow')
        })
        this.followBtn = true;
      }, (error: any) => {
        this.alertService.errorMessage('Something went wrong. Please try again.', 'Unfollow')
        this.followBtn = true;
      })
    }
  }

  openFollowWrapper(tab: string) {
    this.activeTab = tab;
    this.showFollowWrapper = true;
  }

  closeFollowWrapper() {
    this.showFollowWrapper = false;
  }

  generateCV(){
    const anchor = document.createElement("a") as HTMLAnchorElement;
    anchor.href = `https://cv.talentboozt.com/resume-builder?id=${this.employeeId}`;
    // anchor.href = `http://localhost:4200/resume-builder?id=${this.employeeId}`;
    anchor.target = '_blank';
    anchor.click();
  }
}
