import { Component, Input, OnInit } from '@angular/core';

import { User } from '../../models';

@Component({
  selector: 'app-simple-user',
  templateUrl: './simple-user.component.html',
  styleUrls: ['./simple-user.component.scss'],
})
export class SimpleUserComponent implements OnInit {
  @Input() user!: User;

  constructor() {}

  ngOnInit(): void {}
}
