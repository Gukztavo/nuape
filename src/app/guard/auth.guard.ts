import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HelperService } from '../service/helper.service';
import { AuthServiceService } from '../service/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private userService: AuthServiceService,
    private router: Router,
    private helperService: HelperService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log('aqui')
    if (this.userService.isLoggedIn) {
      return true;
    } else {
      return this.router.navigate(['/attempt', { url: state.url }]);
    }
  }
}