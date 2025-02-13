import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  baseUrl = environment.apiUrlSimple;
  cBaseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getHealthMetrics(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get(`${this.baseUrl}/actuator/health`, {headers});
  }

  getPerformanceMetrics(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get(`${this.baseUrl}/actuator/metrics`, {headers});
  }

  getMetricData(metricName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get(`${this.baseUrl}/actuator/metrics/${metricName}`, {headers});
  }

  getTaskExecutionMetrics(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get(`${this.cBaseUrl}/metrics/task-executor`, {headers});
  }

  getUserActivityMetrics(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get(`${this.cBaseUrl}/metrics/user-activity`, {headers});
  }

  fetchUserActivities(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get<any[]>(`${this.cBaseUrl}/metrics/user-activities`, {headers});
  }

  clearUserActivities(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.delete(`${this.cBaseUrl}/metrics/delete/user-activities`, {headers});
  }

  getActiveUsers(): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get<number>(`${this.cBaseUrl}/metrics/active-users`, {headers});
  }

  getActivityTrends(interval: string): Observable<{ [key: string]: number }> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    })
    return this.http.get<{ [key: string]: number }>(
      `${this.cBaseUrl}/metrics/activity-trends?interval=${interval}`, {headers}
    );
  }

}
