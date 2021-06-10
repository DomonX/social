import { FormGroup, FormControl } from '@angular/forms';
import { User } from './../user/user.model';
import { UserService } from './../user/user.service';
import { Observable, combineLatest, BehaviorSubject, Subscription } from 'rxjs';
import { Post } from '../post/post.model';
import { PostService } from './../post/post.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WallComponent implements OnInit, OnDestroy {
  public posts$: Observable<Post[]>;
  public users$: Observable<User[]>;

  private userSelectedId: BehaviorSubject<number> = new BehaviorSubject(0);
  private formValueSub!: Subscription;

  wallForm = new FormGroup({
    user: new FormControl(''),
  });

  constructor(private postSrv: PostService, private userSrv: UserService) {
    this.users$ = userSrv.users$;
    this.posts$ = combineLatest([postSrv.posts$, this.userSelectedId]).pipe(
      map(([posts, formValue]) =>
        posts
          .filter((p) => (formValue ? p.creator?.id == formValue : true))
          .sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime())
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
}
