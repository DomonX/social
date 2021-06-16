import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Post, PostWithCreator, User } from '../models';
import { LoginService } from './../../login/login.service';
import { PostJson } from './../models/post.model';
import { FriendService } from './friend.service';
import { Repository } from './repository';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public posts$: Observable<Post[]>;
  public postsWithCreator$: Observable<PostWithCreator[]>;
  public postsOfLoggedUsersFriend$: Observable<PostWithCreator[]>;

  public repository: Repository<PostJson>;

  constructor(
    private http: HttpClient,
    private userSrv: UserService,
    private loginSrv: LoginService,
    private friendSrv: FriendService
  ) {
    this.repository = new Repository<PostJson>(http, 'assets/api/Post.json');
    this.posts$ = this.repository
      .getItems()
      .pipe(
        map((posts) =>
          posts.map((p) => ({ ...p, time_stamp: new Date(p.time_stamp) }))
        )
      );
    this.postsWithCreator$ = combineLatest([this.posts$, userSrv.users$]).pipe(
      map(([posts, users]) =>
        posts.map((p) => this.mapToPostWithCreator(p, users))
      )
    );

    this.postsOfLoggedUsersFriend$ = combineLatest([
      this.postsWithCreator$,
      this.friendSrv.getUserFriends(this.loginSrv.loggedUser$),
      this.loginSrv.loggedUser$,
    ]).pipe(
      map(([posts, friends, loggedUser]) => {
        return posts.filter(
          (post) =>
            post.creator.id == loggedUser?.id ||
            friends.find((friend) => friend.id == post.creator.id) !== undefined
        );
      }),
      shareReplay(1)
    );
  }

  public getPostsOfUser(
    id$: Observable<number>
  ): Observable<PostWithCreator[]> {
    return combineLatest([this.postsWithCreator$, id$]).pipe(
      map(([posts, id]) => {
        return posts.filter((post) => post.creator.id == id);
      })
    );
  }

  public getPostById(id$: Observable<number>): Observable<Post> {
    return combineLatest([this.posts$, id$]).pipe(
      map(([posts, id]) => posts.find((i) => i.id == id) as Post)
    );
  }

  public getPostWithCreator(
    post$: Observable<Post>
  ): Observable<PostWithCreator> {
    return combineLatest([post$, this.userSrv.users$]).pipe(
      map(([post, users]) => this.mapToPostWithCreator(post, users))
    );
  }

  public sortAndFilter(
    posts$: Observable<PostWithCreator[]>,
    creator_id: Observable<number>
  ): Observable<PostWithCreator[]> {
    return combineLatest([posts$, creator_id]).pipe(
      map(([posts, formValue]) =>
        posts
          .filter((p) => (formValue ? p.creator?.id == formValue : true))
          .sort(
            (a, b) => b.post.time_stamp.getTime() - a.post.time_stamp.getTime()
          )
      )
    );
  }

  private mapToPostWithCreator(post: Post, users: User[]): PostWithCreator {
    return {
      post,
      creator: users.find((user: User) => user.id == post.creator_id) as User,
    };
  }
}
