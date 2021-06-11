import { Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../shared/backend/user.service';
import { User } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loggedUser$: Observable<User | undefined>;

  private loggedInfo: ReplaySubject<User | undefined>;
  private emailInfo: ReplaySubject<string>;
  private passwordInfo: ReplaySubject<string>;

  constructor(private userSrv: UserService) {
    this.loggedInfo = new ReplaySubject(1);
    this.emailInfo = new ReplaySubject(1);
    this.passwordInfo = new ReplaySubject(1);
    this.loggedInfo.next(undefined);
    combineLatest([
      this.userSrv.users$,
      this.emailInfo.asObservable(),
      this.passwordInfo.asObservable(),
    ])
      .pipe(
        map(
          ([users, email, password]) =>
            users.filter(
              (user) => user.email == email && user.password == password
            )[0]
        )
      )
      .subscribe((loggedUser) => {
        this.loggedInfo.next(loggedUser);
      });
    this.loggedUser$ = this.loggedInfo.asObservable();
  }

  public login(email: string, password: string): void {
    this.emailInfo.next(email);
    this.passwordInfo.next(password);
  }

  public logout(): void {
    this.emailInfo.next('');
    this.passwordInfo.next('');
    this.loggedInfo.next(undefined);
  }
}
