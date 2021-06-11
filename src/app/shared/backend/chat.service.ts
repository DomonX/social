import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { Conversation, Message } from '../models/message.model';
import { LoginService } from './../../login/login.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public conversations$: Observable<Conversation[]>;
  public loggedUserConversations$: Observable<Conversation[]>;

  constructor(
    private http: HttpClient,
    private userSrv: UserService,
    private loginSrv: LoginService
  ) {
    const messages$ = this.http.get<any[]>('assets/api/Message.json');
    const conversations$ = this.http.get<any[]>('assets/api/Conversation.json');
    const userConversations$ = this.http.get<any[]>(
      'assets/api/User_conversation.json'
    );
    this.conversations$ = combineLatest([
      messages$,
      conversations$,
      userConversations$,
      this.userSrv.users$,
      this.loginSrv.loggedUser$,
    ]).pipe(
      map(([messages, conversations, userConvs, users]) => {
        return conversations.map((conv) =>
          this.createConversation(conv, messages, users, userConvs)
        );
      })
    );

    this.loggedUserConversations$ = combineLatest([
      this.conversations$,
      this.loginSrv.loggedUser$,
    ]).pipe(
      map(([convs, loggedUser]) => {
        return convs.filter(
          (i) => i.users.find((j) => j.id == loggedUser?.id) !== undefined
        );
      })
    );
  }

  private createConversation(
    conversation: any,
    messages: any[],
    users: User[],
    usersInConv: any[]
  ): Conversation {
    const usersInThisConv = usersInConv
      .filter((i) => i.conversation_id == conversation.id)
      .map((i) => users.find((j) => j.id == i.user_id) as User);
    const messagesInThisConv = messages
      .filter((i) => i.conversation_id == conversation.id)
      .map((i) => this.createMessage(i, users));
    return {
      id: conversation.id,
      title: conversation.title,
      users: usersInThisConv,
      messages: messagesInThisConv,
    };
  }

  private createMessage(message: any, users: User[]): Message {
    return {
      id: message.id,
      message: message.message,
      user: users.find((user) => user.id == message.user_id) as User,
      time_stamp: new Date(message.time_stamp),
    } as Message;
  }
}
