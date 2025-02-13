import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SystemNotificationService {

  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getActiveNotifications(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get(`${this.apiUrl}/system-notifications/active`, {headers});
  }

  getAllNotifications(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get(`${this.apiUrl}/system-notifications/all`, {headers});
  }

  createNotification(notification: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post(`${this.apiUrl}/system-notifications/add`, notification, {headers});
  }

  updateNotification(notification: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.put(`${this.apiUrl}/system-notifications/update/${notification.id}`, notification, {headers});
  }

  deleteNotification(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.delete(`${this.apiUrl}/system-notifications/delete/${id}`, {headers});
  }

  updateStatus(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.put(`${this.apiUrl}/system-notifications/update-status/${id}`, {}, {headers});
  }
}
