import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FriendJson, User } from '../models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  public friends$: Observable<FriendJson[]>;

  constructor(private http: HttpClient, private userSrv: UserService) {
    this.friends$ = http.get<FriendJson[]>('assets/api/Friend.json');
  }

  public getUserFriends(
    user: Observable<User | undefined>
  ): Observable<User[]> {
    return combineLatest([this.friends$, this.userSrv.users$, user]).pipe(
      map(([friends, users, user]) => {
        return [
          ...friends
            .filter((f) => f.first_user_id == user?.id)
            .map((f) => users.find((i) => i.id == f.second_user_id)),
          ...friends
            .filter((f) => f.second_user_id == user?.id)
            .map((f) => users.find((i) => i.id == f.first_user_id)),
        ] as User[];
      })
    );
  }
}
