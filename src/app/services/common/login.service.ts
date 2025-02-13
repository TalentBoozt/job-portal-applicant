import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = `${environment.apiUrlSimple}/public/logins`;

  constructor(private http: HttpClient) {}

  recordLogin(userId: string) {
    return this.http.post(`${this.baseUrl}/${userId}/record`, null);
  }

  getLoginDates(userId: string, year: number) {
    return this.http.get<string[]>(`${this.baseUrl}/${userId}/year/${year}`);
  }
}
