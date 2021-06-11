import { ComponentsModule } from './../shared/components/components.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzAvatarModule,
    NzSpinModule,
    ComponentsModule,
  ],
})
export class UserModule {}
