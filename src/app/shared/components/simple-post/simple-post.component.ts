import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Post, User } from '../../models';

@Component({
  selector: 'app-simple-post',
  templateUrl: './simple-post.component.html',
  styleUrls: ['./simple-post.component.scss'],
})
export class SimplePostComponent implements OnInit {
  _post: { post?: Post; creator?: User; postTime?: string } = {};

  @Input() set post(value: Post) {
    this._post.post = value;
    this._post.postTime = moment(value.time_stamp).fromNow();
  }

  @Input() set user(value: User) {
    this._post.creator = value;
  }

  constructor() {}

  ngOnInit(): void {}
}
