import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Conversation } from '../shared/models/message.model';
import { ChatService } from './../shared/backend/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  conversations$: Observable<Conversation[]>;

  constructor(private chatSrv: ChatService) {
    this.conversations$ = chatSrv.loggedUserConversations$.pipe(
      map((convs) => this.sortConversations(convs))
    );
  }

  private sortConversations(conversations: Conversation[]): Conversation[] {
    return [...conversations]
      .filter((conv) => conv.messages.length > 0)
      .map((conv) => {
        return {
          ...conv,
          messages: conv.messages.sort(
            (a, b) => b.time_stamp.getTime() - a.time_stamp.getTime()
          ),
        };
      })
      .sort(
        (a, b) =>
          b.messages[0]?.time_stamp.getTime() -
          a.messages[0]?.time_stamp.getTime()
      );
  }

  ngOnInit(): void {}
}
