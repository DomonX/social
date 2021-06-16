import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { ComponentsModule } from './../shared/components/components.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ConversationComponent } from './conversation/conversation.component';

@NgModule({
  declarations: [ChatComponent, ConversationComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ComponentsModule,
    NzAvatarModule,
    NzToolTipModule,
    NzFormModule,
    NzIconModule,
    ReactiveFormsModule,
  ],
})
export class ChatModule {}
