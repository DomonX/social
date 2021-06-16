import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { Conversation, Message } from '../models/message.model';
import { LoginService } from './../../login/login.service';
import { CrudModel } from './../models/crud.model';
import { MessageJson, UserConversationJson } from './../models/message.model';
import { Repository } from './repository';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public conversations$: Observable<Conversation[]>;
  public loggedUserConversations$: Observable<Conversation[]>;

  public messagesRepository: Repository<MessageJson>;
  public conversationsRepository: Repository<CrudModel>;
  public userConversationsRepository: Repository<UserConversationJson>;

  constructor(
    private http: HttpClient,
    private userSrv: UserService,
    private loginSrv: LoginService
  ) {
    this.messagesRepository = new Repository(
      this.http,
      'assets/api/Message.json'
    );
    this.conversationsRepository = new Repository(
      this.http,
      'assets/api/Conversation.json'
    );
    this.userConversationsRepository = new Repository(
      this.http,
      'assets/api/User_conversation.json'
    );

    this.conversations$ = combineLatest([
      this.messagesRepository.getItems(),
      this.conversationsRepository.getItems(),
      this.userConversationsRepository.getItems(),
      this.userSrv.users$,
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
        return convs
          .filter(
            (i) => i.users.find((j) => j.id == loggedUser?.id) !== undefined
          )
          .map((i) => ({
            ...i,
            notify:
              i.users_connections.find((j) => j.user_id == loggedUser?.id)
                ?.notification ?? false,
          }));
      })
    );
  }

  public getConversationById(id: Observable<number>): Observable<Conversation> {
    return combineLatest([id, this.conversations$]).pipe(
      map(([id, convs]) => convs.find((i) => i.id == id) as Conversation)
    );
  }

  public sendMessage(
    message: string,
    user_id: number,
    conversation: Conversation
  ): void {
    this.messagesRepository.addItem({
      user_id,
      conversation_id: conversation.id,
      message,
      time_stamp: new Date(Date.now()).toISOString(),
    });
    conversation.users_connections
      .filter((i) => i.user_id !== user_id)
      .forEach((user) => {
        this.userConversationsRepository.updateItem(user.id, {
          notification: true,
        });
      });
  }

  public openChat(user_id: number, conversation: Conversation) {
    this.userConversationsRepository.updateItem(
      conversation.users_connections.find((i) => i.user_id == user_id)?.id ?? 0,
      { notification: false }
    );
  }

  private createConversation(
    conversation: any,
    messages: any[],
    users: User[],
    usersInConv: UserConversationJson[]
  ): Conversation {
    const usersConvInThisConv = usersInConv.filter(
      (i) => i.conversation_id == conversation.id
    );
    const usersInThisConv = usersConvInThisConv.map(
      (i) => users.find((j) => j.id == i.user_id) as User
    );
    const messagesInThisConv = messages
      .filter((i) => i.conversation_id == conversation.id)
      .map((i) => this.createMessage(i, users));
    return {
      id: conversation.id,
      title: conversation.title,
      users: usersInThisConv,
      messages: messagesInThisConv,
      users_connections: usersConvInThisConv,
      notify: false,
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
