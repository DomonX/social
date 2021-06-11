import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { ComponentsModule } from './../shared/components/components.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ComponentsModule,
    NzAvatarModule,
    NzToolTipModule,
  ],
})
export class ChatModule {}
