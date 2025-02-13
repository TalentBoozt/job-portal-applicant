import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReportIssueService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addIssue(issue: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    })
    return this.http.post(this.baseUrl + '/portal_report-issues/add', issue, {headers});
  }

  updateAttachment(issue: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    })
    return this.http.put(this.baseUrl + '/portal_report-issues/update/updateAttachment', issue, {headers});
  }
}
