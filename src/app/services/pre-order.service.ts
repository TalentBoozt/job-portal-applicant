import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PreOrderService {

  private baseUrl = environment.apiUrl

  constructor(private http:HttpClient) { }

  public addPreOrder(preOrder: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post<any>(`${this.baseUrl}/preorder/add`, preOrder, {headers});
  }
}
