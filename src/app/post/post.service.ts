import { User } from './../user/user.model';
import { Post, PostJson } from './post.model';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public posts$: Observable<Post[]> = of([]);
  private postsRaw$: Observable<PostJson[]> = of([]);

  constructor(private http: HttpClient, private userSrv: UserService) {
    this.postsRaw$ = http.get<PostJson[]>('assets/api/Post.json');
    this.posts$ = combineLatest([
      this.postsRaw$,
      this.userSrv.users$
    ]).pipe(
      map(([posts, users]) => {
        return posts.map(p => {
          const creator: User | undefined = users.find(u => u.id === p.creator_id);
          const date: Date = moment(p.time_stamp).toDate();
          return {
            ...p,
            postedDate: date,
            postedDateStringified: moment(date).fromNow(),
            creator
          }
        })
      })
    )
  }
}
