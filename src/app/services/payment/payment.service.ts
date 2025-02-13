import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  simpleBaseUrl = environment.apiUrlSimple;

  constructor(private http: HttpClient) { }

  public createPaymentIntent(companyId: string, planName: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post(`${this.simpleBaseUrl}/api/payments/create-payment-intent`, {
      companyId: companyId,
      planName: planName
    }, {headers});
  }

  public createCheckoutSession(companyId: string, planName: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    })
    return this.http.post(`${this.simpleBaseUrl}/webhook/create-checkout-session`, {
      companyId: companyId,
      planName: planName
    });
  }

}
