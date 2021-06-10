import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable, of, combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users$: Observable<User[]> = of([]);

  constructor(private http: HttpClient) { 
    this.users$ = http.get<User[]>('assets/api/User.json');
  }

  public getUserById(id: Observable<number>): Observable<User> {
    return combineLatest([id, this.users$]).pipe(
      map(([id, users]) => users.filter(user => user.id == id)[0])
    );
  }
}
