import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionModel } from '../../shared/data-models/payment/Subscription.model';
import {UsageDataModel} from "../../shared/data-models/payment/UsageData.model";
import {BillingHistoryModel} from "../../shared/data-models/payment/BillingHistory.model";
import {PaymentMethodsModel} from "../../shared/data-models/payment/PaymentMethods.model";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class BillingUsageService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Get subscription details for a company
  getSubscription(companyId: string): Observable<SubscriptionModel> {
    return this.http.get<SubscriptionModel>(`${this.apiUrl}/subscriptions/${companyId}`);
  }

  // Get usage details for a company
  getUsage(companyId: string): Observable<UsageDataModel> {
    return this.http.get<UsageDataModel>(`${this.apiUrl}/usage/${companyId}`);
  }

  // Get billing history for a company
  getBillingHistory(companyId: string): Observable<BillingHistoryModel[]> {
    return this.http.get<BillingHistoryModel[]>(`${this.apiUrl}/billing/history/${companyId}`);
  }

  // Get payment methods for a company
  getPaymentMethods(companyId: string): Observable<PaymentMethodsModel[]> {
    return this.http.get<PaymentMethodsModel[]>(`${this.apiUrl}/payment-methods/${companyId}`);
  }

  // Add/Update a subscription (Upgrade/Downgrade Plan)
  updateSubscription(companyId: string, subscription: SubscriptionModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/subscriptions/${companyId}`, subscription);
  }

  // Add/Update payment methods
  updatePaymentMethod(companyId: string, paymentMethod: PaymentMethodsModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment-methods/${companyId}`, paymentMethod);
  }
}
