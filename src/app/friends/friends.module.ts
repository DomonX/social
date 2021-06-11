import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';

import { ComponentsModule } from './../shared/components/components.module';
import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';

@NgModule({
  declarations: [FriendsComponent],
  imports: [CommonModule, FriendsRoutingModule, ComponentsModule, NzCardModule],
})
export class FriendsModule {}
