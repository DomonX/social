import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild {

  private loggedUser: User | undefined;

  constructor(private loginSrv: LoginService, private router: Router) {
    loginSrv.loggedUser$.subscribe(userLogged => {
      this.loggedUser = userLogged
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!!this.loggedUser) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
    return !!this.loggedUser;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!!this.loggedUser) {
        return true;
      } else {
        this.router.navigate(['login']);
      }
      return !!this.loggedUser;
  }
  
}
