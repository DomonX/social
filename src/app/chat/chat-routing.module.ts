import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './../login.guard';
import { ChatComponent } from './chat.component';
import { ConversationComponent } from './conversation/conversation.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
    children: [{ path: ':id', component: ConversationComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
