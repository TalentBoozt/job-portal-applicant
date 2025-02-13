import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReportFeatureService {

  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  addFeature(feature: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    })
    return this.http.post(this.baseUrl + '/portal_report-features/add', feature, {headers});
  }

  updateAttachment(feature: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    })
    return this.http.put(this.baseUrl + '/portal_report-features/update/updateAttachment', feature, {headers});
  }
}
