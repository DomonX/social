import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-simpleuser',
  templateUrl: './simpleuser.component.html',
  styleUrls: ['./simpleuser.component.scss']
})
export class SimpleuserComponent implements OnInit {

  @Input() user: User | undefined;

  constructor() { }

  ngOnInit(): void { }

}
