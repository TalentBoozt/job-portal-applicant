import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SystemNotificationService} from "../../services/common/system-notification.service";
import {AlertsService} from "../../services/alerts.service";

interface Notification {
  id: string;
  message: string;
  startTime: string;
  endTime: string;
  active: boolean;
  type: string;
  url: string;
}

@Component({
  selector: 'app-system-notifications',
  templateUrl: './system-notifications.component.html',
  styleUrls: ['./system-notifications.component.scss']
})
export class SystemNotificationsComponent implements OnInit{
  notificationForm: FormGroup;
  notifications: Notification[] = [];

  constructor(private fb: FormBuilder, private notificationService: SystemNotificationService, private alertService: AlertsService) {
    this.notificationForm = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(200)]],
      startTime: ['', Validators.required],
      endTime: [''],
      url: [''],
      active: [true]
    });
  }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getAllNotifications().subscribe(
      (notifications: Notification[]) => {
        this.notifications = notifications;
      },
      (error) => {
        console.error("Error loading notifications", error);
      }
    );
  }

  onSubmit(): void {
    if (this.notificationForm.valid) {
      this.notificationService.createNotification(this.notificationForm.value).subscribe(
        response => {
          this.notificationForm.reset({ active: true });
          this.alertService.successMessage('Notification created successfully', 'Success');
        },
        error => {
          this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
        }
      );
    }
  }

  deleteNotification(id: any) {
    if (confirm('Are you sure you want to delete this notification?')) {
      this.notificationService.deleteNotification(id).subscribe(
        response => {
          this.loadNotifications();
          this.alertService.successMessage('Notification deleted successfully', 'Success');
        },
        error => {
          this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
        }
      )
    }
  }

  updateStatus(id: any) {
    if (confirm('Are you sure you want to update the status of this notification?')) {
      this.notificationService.updateStatus(id).subscribe(
        response => {
          this.loadNotifications();
          this.alertService.successMessage('Notification updated successfully', 'Success');
        },
        error => {
          this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
        }
      )
    }
  }
}
