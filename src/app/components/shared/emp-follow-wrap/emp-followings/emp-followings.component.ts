import {Component, Input, OnInit} from '@angular/core';
import {EmployeeService} from "../../../../services/employee.service";
import {AuthService} from "../../../../services/auth.service";
import {AlertsService} from "../../../../services/alerts.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-emp-followings',
  templateUrl: './emp-followings.component.html',
  styleUrls: ['./emp-followings.component.scss']
})
export class EmpFollowingsComponent implements OnInit{

  @Input() followings: any[] = []

  followingsIds: any[] = [];
  followBtn:boolean = true;
  myId: any;
  me: any;

  constructor(private employeeService: EmployeeService, private cookieService: AuthService, private alertService: AlertsService) { }

  ngOnInit() {
    this.myId = this.cookieService.userID();

    this.getEmployee(this.myId);
  }

  getEmployee(id: any) {
    this.employeeService.clearCache();
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.me = data;
        if (data?.empFollowing && data?.empFollowing.length > 0) {
          this.followingsIds = data.empFollowing[0]?.followings?.map((following: any) => following?.followingId) || [];
        }
      },
      (error: HttpErrorResponse) => {
        return;
      }
    );
  }

  follow(employee: any) {
    if(!this.myId){
      this.alertService.warningMessage('Please Login First to Follow', 'Follow');
      return;
    }
    this.followingsIds.push(employee?.followingId);
    this.followBtn = false;
    if (employee) {
      this.employeeService.addFollowing(
        {
          employeeId: this.myId,
          followings: [{
            id: this.generateRandomId(),
            followingId: employee?.followingId || null,
            followingName: employee?.followingName || null,
            followingOccupation: employee?.followingOccupation || null,
            followingImage: employee?.followingImage || null,
            followingLocation: employee?.followingLocation || null
          }]
        }
      ).subscribe(data => {
        if (data != null) {
          const emp = this.me;
          this.employeeService.addFollower({
            employeeId: employee?.followingId,
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
              this.getEmployee(this.myId)
              this.alertService.successMessage('You have followed ' + employee?.followingName, 'Follow')
            }
          })
        }
        this.followBtn = true;
      }, (error: any) => {
        this.alertService.errorMessage('Something went wrong. Please try again.', 'Follow')
        this.followBtn = true;
      })
    }
  }

  unfollow(employee: any) {
    const index = this.followingsIds.indexOf(employee?.followingId);
    this.followBtn = false;
    if (index > -1) {
      this.followingsIds.splice(index, 1);
    }
    if (employee) {
      this.employeeService.deleteFollower(employee?.followingId, this.myId).subscribe(data => {
        this.employeeService.deleteFollowing(this.myId, employee?.followingId).subscribe(data => {
          this.getEmployee(this.myId)
          this.alertService.successMessage('You have unfollowed ' + employee?.followingName, 'Unfollow')
        })
        this.followBtn = true;
      }, (error: any) => {
        this.alertService.errorMessage('Something went wrong. Please try again.', 'Unfollow')
        this.followBtn = true;
      })
    }
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
