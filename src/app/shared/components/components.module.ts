import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { DetailUserComponent } from './detail-user/detail-user.component';
import { PostListComponent } from './post-list/post-list.component';
import { ScrollFrameComponent } from './scroll-frame/scroll-frame.component';
import { SimplePostComponent } from './simple-post/simple-post.component';
import { SimpleUserComponent } from './simple-user/simple-user.component';

@NgModule({
  declarations: [
    SimpleUserComponent,
    SimplePostComponent,
    DetailUserComponent,
    PostListComponent,
    ScrollFrameComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzAvatarModule,
    NzCardModule,
    NzSpinModule,
    NzToolTipModule,
  ],
  exports: [
    SimpleUserComponent,
    SimplePostComponent,
    DetailUserComponent,
    PostListComponent,
  ],
})
export class ComponentsModule {}
