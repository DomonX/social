import { User } from './user.model';
import { combineLatest,Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user$: Observable<User>;
  public friends$: Observable<User[]> = of([]);

  constructor(private route: ActivatedRoute, private userSrv: UserService) {
    this.user$ = this.userSrv.getUserById(this.route.params.pipe(map(({id}) => id)));    
  }

  ngOnInit(): void {

  }

}
