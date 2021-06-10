import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SimpleuserComponent } from './simpleuser/simpleuser.component';


@NgModule({
  declarations: [
    UserComponent,
    SimpleuserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzAvatarModule,
    NzSpinModule
  ],
  exports: [
    SimpleuserComponent
  ]
})
export class UserModule { }
