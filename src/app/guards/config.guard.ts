import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigGuard {
  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    if (this.authService.level() === '0') {
      return true;
    } else {
      this.router.navigateByUrl('/403');
      return false;
    }
  };

  constructor(private authService: AuthService, private router: Router) {
  }

}
