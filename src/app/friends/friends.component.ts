import { FriendsService } from './friends.service';
import { LoginService } from './../login/login.service';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  public friends$: Observable<User[]>;

  constructor(private friendSrv: FriendsService, private loginSrv: LoginService) {
    this.friends$ = this.friendSrv.getUserFriends(this.loginSrv.loggedUser$);
  }

  ngOnInit(): void {

  }

}
