import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PostWithCreator } from './../../models/post-with-creator.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() posts$!: Observable<PostWithCreator[]>;

  constructor() {}

  ngOnInit(): void {}
}
