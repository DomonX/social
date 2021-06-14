import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PostService } from '../../backend/post.service';
import { User } from '../../models';
import { PostWithCreator } from './../../models/post-with-creator.model';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit {
  @Input() user!: User;

  posts$!: Observable<PostWithCreator[]>;

  constructor(private postSrv: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postSrv.getPostsOfUser(of(this.user.id));
  }
}
