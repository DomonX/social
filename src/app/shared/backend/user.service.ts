import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users$: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.users$ = http.get<User[]>('assets/api/User.json');
  }

  public getUserById(id: Observable<number>): Observable<User> {
    return combineLatest([id, this.users$]).pipe(
      map(([id, users]) => users.filter((user) => user.id == id)[0])
    );
  }
}
