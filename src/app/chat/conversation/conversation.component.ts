import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginService } from './../../login/login.service';
import { ChatService } from './../../shared/backend/chat.service';
import { Conversation } from './../../shared/models/message.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  chat$: Observable<Conversation>;

  private shiftClicked: boolean = false;

  constructor(
    private chatSrv: ChatService,
    private loginSrv: LoginService,
    private route: ActivatedRoute
  ) {
    this.chat$ = this.chatSrv
      .getConversationById(this.route.params.pipe(map(({ id }) => id)))
      .pipe(
        map((chat) => {
          chat.messages.sort(
            (a, b) => a.time_stamp.getTime() - b.time_stamp.getTime()
          );
          return chat;
        })
      );
  }

  ngOnInit(): void {}

  messageForm: FormGroup = new FormGroup({
    message: new FormControl(''),
  });

  addMessage(conv: Conversation): void {
    const message: string = this.messageForm.get('message')?.value;
    if (this.isMessageInvalid(message)) {
      return;
    }
    this.messageForm.patchValue({ message: '' });
    this.chatSrv.sendMessage(message, this.loginSrv.loggedUser?.id ?? 0, conv);
  }

  keyDownFunction(event: any, conv: Conversation): void {
    if (event.keyCode === 16) {
      this.shiftClicked = true;
    }
    if (event.keyCode === 13 && !this.shiftClicked) {
      this.addMessage(conv);
    }
  }
  keyUpFunction(event: any, conv: Conversation): void {
    if (event.keyCode === 16) {
      this.shiftClicked = false;
    }
  }
  private isMessageInvalid(message: string): boolean {
    if (!message || !message.length) {
      return true;
    }
    const regex = new RegExp('\\s*');
    const match = message.match(regex);
    return match?.length == 1 && match[0].length === message.length;
  }
}
