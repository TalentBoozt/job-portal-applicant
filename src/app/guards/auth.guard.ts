import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    if (this.authService.isExists() && !this.authService.isLocked()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  };

  constructor(private authService: AuthService, private router: Router) {
  }

}
