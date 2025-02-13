import {Component, Input, OnInit} from '@angular/core';
import {EmployeeService} from "../../../../services/employee.service";
import { HttpErrorResponse } from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {AlertsService} from "../../../../services/alerts.service";

@Component({
  selector: 'app-emp-followers',
  templateUrl: './emp-followers.component.html',
  styleUrls: ['./emp-followers.component.scss']
})
export class EmpFollowersComponent implements OnInit{

  @Input() followers: any[] = [];

  followingIds: any[] = [];
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
          this.followingIds = data.empFollowing[0]?.followings?.map((following: any) => following?.followingId) || [];
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
    this.followingIds.push(employee?.followerId);
    this.followBtn = false;
    if (employee) {
      this.employeeService.addFollowing(
        {
          employeeId: this.myId,
          followings: [{
            id: this.generateRandomId(),
            followingId: employee?.followerId || null,
            followingName: employee?.followerName || null,
            followingOccupation: employee?.followerOccupation || null,
            followingImage: employee?.followerImage || null,
            followingLocation: employee?.followerLocation || null
          }]
        }
      ).subscribe(data => {
        if (data != null) {
          const emp = this.me;
          this.employeeService.addFollower({
            employeeId: employee?.followerId,
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
              this.alertService.successMessage('You have followed ' + employee?.followerName, 'Follow')
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
    const index = this.followingIds.indexOf(employee?.followerId);
    this.followBtn = false;
    if (index > -1) {
      this.followingIds.splice(index, 1);
    }
    if (employee) {
      this.employeeService.deleteFollower(employee?.followerId, this.myId).subscribe(data => {
        this.employeeService.deleteFollowing(this.myId, employee?.followerId).subscribe(data => {
          this.getEmployee(this.myId)
          this.alertService.successMessage('You have unfollowed ' + employee?.followerName, 'Unfollow')
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
