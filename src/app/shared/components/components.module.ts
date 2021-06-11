import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';

import { DetailUserComponent } from './detail-user/detail-user.component';
import { SimplePostComponent } from './simple-post/simple-post.component';
import { SimpleUserComponent } from './simple-user/simple-user.component';

@NgModule({
  declarations: [SimpleUserComponent, SimplePostComponent, DetailUserComponent],
  imports: [CommonModule, RouterModule, NzAvatarModule, NzCardModule],
  exports: [SimpleUserComponent, SimplePostComponent, DetailUserComponent],
})
export class ComponentsModule {}
