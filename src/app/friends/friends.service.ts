import { LoginService } from './../login/login.service';
import { UserService } from './../user/user.service';
import { HttpClient } from '@angular/common/http';
import { of, Observable, combineLatest, iif } from 'rxjs';
import { FriendJ, } from './friend.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  public friends$: Observable<FriendJ[]> = of([]);

  constructor(private http: HttpClient, private userSrv: UserService, private loginSrv: LoginService) {     
    this.friends$ = http.get<FriendJ[]>('assets/api/Friend.json');
  }

  public getUserFriends(user: Observable<User | undefined>): Observable<User[]> {
    return combineLatest([this.friends$, this.userSrv.users$, user]).pipe(
      map( ([friends, users, user]) => {
        return [ 
        ...friends.filter(f => f.first_user_id == user?.id).map(f => users.find(i => i.id == f.second_user_id)),
        ...friends.filter(f => f.second_user_id == user?.id).map(f => users.find(i => i.id == f.first_user_id))
        ] as User[];
      })
    )
  };
}
