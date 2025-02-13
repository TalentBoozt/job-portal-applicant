import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {ApiResponse} from "../DTO/ApiResponse";

@Injectable({
  providedIn: 'root'
})
export class TokenGuard {

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const token = route.queryParamMap.get('token');
    if (!token) {
      this.router.navigate(['/403']);
      return of(false);
    }
    const headers = new HttpHeaders({Authorization: `Basic ${btoa('admin:password')}`});
    return this.http.get<ApiResponse>(`${this.baseUrl}/validate-token?token=${token}`, {headers}).pipe(map(response => response.message === "Valid token"), catchError(error => {
      this.router.navigate(['/403']);
      return of(false);
    }));
  };

  constructor(private http: HttpClient, private router: Router) {
  }

  private baseUrl = environment.apiUrl;
}
