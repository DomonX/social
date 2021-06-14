import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostService } from '../shared/backend/post.service';
import { User } from '../shared/models';
import { LoginService } from './../login/login.service';
import { FriendService } from './../shared/backend/friend.service';
import { PostWithCreator } from './../shared/models/post-with-creator.model';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WallComponent implements OnInit, OnDestroy {
  public posts$: Observable<PostWithCreator[]>;
  public users$: Observable<User[]>;

  drawerVisible: boolean = false;

  private userSelectedId: BehaviorSubject<number> = new BehaviorSubject(0);
  private formValueSub!: Subscription;

  wallForm = new FormGroup({
    user: new FormControl(''),
  });

  postForm = new FormGroup({
    postText: new FormControl(''),
  });

  constructor(
    private postSrv: PostService,
    private loginSrv: LoginService,
    private friendSrv: FriendService
  ) {
    this.users$ = friendSrv.getUserFriends(loginSrv.loggedUser$);
    this.posts$ = combineLatest([
      postSrv.postsOfLoggedUsersFriend$,
      this.userSelectedId,
    ]).pipe(
      map(([posts, formValue]) =>
        posts
          .filter((p) => (formValue ? p.creator?.id == formValue : true))
          .sort(
            (a, b) => b.post.time_stamp.getTime() - a.post.time_stamp.getTime()
          )
      )
    );
  }

  ngOnInit(): void {
    this.formValueSub = this.wallForm.valueChanges.subscribe((i) => {
      this.userSelectedId.next(i.user);
    });
  }

  ngOnDestroy(): void {
    this.formValueSub.unsubscribe();
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  addPost(): void {
    this.postSrv.repo.addItem({
      id: 0,
      time_stamp: new Date(Date.now()),
      text: this.postForm.get('postText')?.value,
      creator_id: this.loginSrv.loggedUser?.id ?? 0,
    });
  }
}
