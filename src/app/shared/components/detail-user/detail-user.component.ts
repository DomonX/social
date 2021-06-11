import { Component, Input, OnInit } from '@angular/core';

import { User } from '../../models';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit {
  @Input() user!: User;

  constructor() {}

  ngOnInit(): void {}
}
