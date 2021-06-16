import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from './../login/login.service';
import { ChatService } from './../shared/backend/chat.service';

@Injectable({
  providedIn: 'root',
})
export class ConversationGuard implements CanActivate {
  constructor(private chatSrv: ChatService, private loginSrv: LoginService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(route.params);
    return true;
  }
}
