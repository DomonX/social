import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Conversation } from '../shared/models/message.model';
import { LoginService } from './../login/login.service';
import { ChatService } from './../shared/backend/chat.service';

interface ChatComponentAvatar {
  src?: string;
  text?: string;
  tooltip: string;
  hasImage: boolean;
}
interface ChatComponentModel {
  avatars: any[];
  title: string;
  message: string;
  messageCreator: string;
  convDate: Date;
  notify: boolean;
  conversation: Conversation;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  conversations$: Observable<Conversation[]>;

  content$: Observable<ChatComponentModel[]>;

  messageForm: FormGroup = new FormGroup({
    message: new FormControl(''),
  });

  constructor(
    private chatSrv: ChatService,
    private loginSrv: LoginService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.conversations$ = chatSrv.loggedUserConversations$.pipe(
      map((convs) => {
        return this.sortConversations(convs);
      })
    );
    this.content$ = this.conversations$.pipe(
      map((convs) => convs.map((i) => this.createViewModel(i)))
    );
  }

  public openConversation(conversation: Conversation): void {
    this.chatSrv.openChat(this.loginSrv.loggedUser?.id ?? 0, conversation);
    this.router.navigate([`${conversation.id}`], { relativeTo: this.route });
  }

  private createViewModel(conversation: Conversation): ChatComponentModel {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    let avatars: ChatComponentAvatar[] = conversation.users
      .slice(0, 2)
      .map((i) => ({
        src: i.profile_picture,
        hasImage: true,
        tooltip: `${i.first_name} ${i.last_name}`,
      }));
    const moreUsers = conversation.users.length - 2;
    if (moreUsers > 0) {
      avatars = [
        ...avatars,
        { text: `+${moreUsers}`, hasImage: false, tooltip: '' },
      ];
    }
    return {
      avatars,
      title: conversation.title,
      message: lastMessage.message,
      messageCreator: lastMessage.user.first_name,
      convDate: lastMessage.time_stamp,
      notify: conversation.notify,
      conversation: conversation,
    };
  }

  private sortConversations(conversations: Conversation[]): Conversation[] {
    return [...conversations]
      .filter((conv) => conv.messages.length > 0)
      .map((conv) => {
        return {
          ...conv,
          messages: conv.messages.sort(
            (a, b) => a.time_stamp.getTime() - b.time_stamp.getTime()
          ),
        };
      })
      .sort(
        (a, b) =>
          b.messages[b.messages.length - 1]?.time_stamp.getTime() -
          a.messages[a.messages.length - 1]?.time_stamp.getTime()
      );
  }

  ngOnInit(): void {}
}
