import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobApplyService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private jobApplySubject = new BehaviorSubject<any>(null);
  private jobApplySubjectByCompanyId = new BehaviorSubject<any>(null);
  private jobApplySubjectByJobId = new BehaviorSubject<any>(null);
  private jobViewerSubject = new BehaviorSubject<any>(null);
  private jobViewerSubjectByCompanyId = new BehaviorSubject<any>(null);
  private jobViewerSubjectByJobId = new BehaviorSubject<any>(null);
  jobApply$ = this.jobApplySubject.asObservable();
  jobApplyByCompanyId$ = this.jobApplySubjectByCompanyId.asObservable();
  jobApplyByJobId$ = this.jobApplySubjectByJobId.asObservable();
  jobViewer$ = this.jobApplySubject.asObservable();
  jobViewerByCompanyId$ = this.jobApplySubjectByCompanyId.asObservable();
  jobViewerByJobId$ = this.jobApplySubjectByJobId.asObservable();

  private jobApplyCacheInitialized = false;
  private jobApplyByCompanyIdCacheInitialized = false;
  private jobApplyByJobIdCacheInitialized = false;
  private jobViewerCacheInitialized = false;
  private jobViewerByCompanyIdCacheInitialized = false;
  private jobViewerByJobIdCacheInitialized = false;

  fetchJobApply(): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    if (!this.jobApplyCacheInitialized) {
      this.http.get<any>(`${this.baseUrl}/cmp_job-apply/getAll`, {headers}).subscribe(data => {
        this.jobApplySubject.next(data);
        this.jobApplyCacheInitialized = true; // Cache is initialized after the first fetch
      });
    }
    return this.jobApply$;
  }

  fetchJobViewer(): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    if (!this.jobViewerCacheInitialized) {
      this.http.get<any>(`${this.baseUrl}/cmp_job-apply/getAll`, {headers}).subscribe(data => {
        this.jobViewerSubject.next(data);
        this.jobViewerCacheInitialized = true; // Cache is initialized after the first fetch
      });
    }
    return this.jobViewer$;
  }

  fetchJobApplyByCompanyId(companyId: any): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    if (!this.jobApplyByCompanyIdCacheInitialized) {
      this.http.get<any>(`${this.baseUrl}/cmp_job-apply/getByCompanyId/${companyId}`, {headers}).subscribe(data => {
        this.jobApplySubjectByCompanyId.next(data);
        this.jobApplyByCompanyIdCacheInitialized = true; // Cache is initialized after the first fetch
      });
    }
    return this.jobApplyByCompanyId$;
  }

  fetchJobViewerByCompanyId(companyId: any): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    if (!this.jobViewerByCompanyIdCacheInitialized) {
      this.http.get<any>(`${this.baseUrl}/cmp_job-apply/getByCompanyId/${companyId}`, {headers}).subscribe(data => {
        this.jobViewerSubjectByCompanyId.next(data);
        this.jobViewerByCompanyIdCacheInitialized = true; // Cache is initialized after the first fetch
      });
    }
    return this.jobViewerByCompanyId$;
  }

  fetchJobApplyByJobId(jobId: any): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    if (!this.jobApplyByJobIdCacheInitialized) {
      this.http.get<any>(`${this.baseUrl}/cmp_job-apply/getByJobId/${jobId}`, {headers}).subscribe(data => {
        this.jobApplySubjectByJobId.next(data);
        this.jobApplyByJobIdCacheInitialized = true; // Cache is initialized after the first fetch
      });
    }
    return this.jobApplyByJobId$;
  }

  fetchJobViewerByJobId(jobId: any): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get<any>(`${this.baseUrl}/cmp_job-apply/getByJobId/${jobId}`, {headers});
  }

  addApplicant(companyId: any, jobId: any, jobApplicant: any): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post<any>(`${this.baseUrl}/cmp_job-apply/addApplicant/${companyId}/${jobId}`, jobApplicant, {headers});
  }

  addViewer(companyId: any, jobId: any, jobViewer: any): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post<any>(`${this.baseUrl}/cmp_job-apply/addViewer/${companyId}/${jobId}`, jobViewer, {headers});
  }

  updateSingleApplicant(jobId: any, applicantId: any, jobApplicant: any): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.put<any>(`${this.baseUrl}/cmp_job-apply/updateByJobId/${jobId}/jobApply/${applicantId}`, jobApplicant, {headers});
  }

  deleteSingleApplicant(companyId: any, jobId: any, applicantId: any): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.delete<any>(`${this.baseUrl}/cmp_job-apply/deleteByJobId/${jobId}/jobApply/${applicantId}`, {headers}).pipe(
      tap(() => {
        this.clearCacheCompanyId();
        this.fetchJobViewerByCompanyId(companyId);
      })
    );
  }

  deleteCompleteApply(id: any): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.delete<any>(`${this.baseUrl}/cmp_job-apply/delete/${id}`, {headers}).pipe(
      tap(() => {
        this.clearCache();
        this.fetchJobApply();
      })
    );
  }

  clearCacheJobId() {
    this.jobApplyByJobIdCacheInitialized = false;
    this.jobApplySubjectByJobId.next(null);
  }

  clearCacheCompanyId() {
    this.jobApplyByCompanyIdCacheInitialized = false;
    this.jobApplySubjectByCompanyId.next(null);
  }

  clearCache() {
    this.jobApplyCacheInitialized = false;
    this.jobApplySubject.next(null);
  }

  clearCacheJobViewerJobId() {
    this.jobViewerByJobIdCacheInitialized = false;
    this.jobViewerSubjectByJobId.next(null);
  }

  clearCacheJobViewerCompanyId() {
    this.jobViewerByCompanyIdCacheInitialized = false;
    this.jobViewerSubjectByCompanyId.next(null);
  }

  clearCacheJobViewer() {
    this.jobViewerCacheInitialized = false;
    this.jobViewerSubject.next(null);
  }
}
