import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FriendService } from '../shared/backend/friend.service';
import { User } from '../shared/models';
import { LoginService } from './../login/login.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  public friends$: Observable<User[]>;

  constructor(
    private friendSrv: FriendService,
    private loginSrv: LoginService
  ) {
    this.friends$ = this.friendSrv.getUserFriends(this.loginSrv.loggedUser$);
  }

  ngOnInit(): void {}

  acceptFriend(event: any, friend: User): void {
    event.stopStopagation();
  }
  denyFriend(event: any, friend: User): void {
    event.stopStopagation();
  }
}
