import { Component } from '@angular/core';
import {SystemNotificationService} from "../../../services/common/system-notification.service";

interface Notification {
  message: string;
  startTime: string;
  endTime: string;
  active: boolean;
  type: string;
  url: string;
}

@Component({
  selector: 'app-system-notification-view',
  templateUrl: './system-notification-view.component.html',
  styleUrls: ['./system-notification-view.component.scss']
})
export class SystemNotificationViewComponent {
  notifications: Notification[] = [];

  constructor(private notificationService: SystemNotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getActiveNotifications().subscribe(
      (notifications: Notification[]) => {
        this.notifications = notifications;
      },
      (error) => {
        console.error("Error loading notifications", error);
      }
    );
  }

  closeNotification(notification: Notification) {
    notification.active = false;
  }
}
