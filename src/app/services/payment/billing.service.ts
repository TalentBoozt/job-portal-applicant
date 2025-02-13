import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private baseUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:password'),
  });

  constructor(private http: HttpClient) {}

  savePrePaymentData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pre-payment/save`, data, {
      headers: this.headers,
    });
  }

  // 1. Retrieve subscription details
  getSubscriptionDetails(companyId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/subscriptions/get/${companyId}`, {
      headers: this.headers,
    });
  }

  // 2. Retrieve invoices
  getInvoices(companyId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices/get/${companyId}`, {
      headers: this.headers,
    });
  }

  // 3. Retrieve usage data
  getUsageData(companyId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/usage/get/${companyId}`, {
      headers: this.headers,
    });
  }

  // 4. Update billing address
  updateBillingAddress(companyId: string, address: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/billing-address/update/${companyId}`,
      address,
      { headers: this.headers }
    );
  }
}
