import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginService } from './login/login.service';
import { ChatService } from './shared/backend/chat.service';
import { User } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loggedUser$: Observable<User | undefined>;
  chatMessages$: Observable<number>;

  public menuItems: {
    routerLink: string;
    label: string;
    icon: string;
    badge: Observable<number>;
  }[] = [];

  isCollapsed = false;

  constructor(private loginSrv: LoginService, private chatSrv: ChatService) {
    this.loggedUser$ = loginSrv.loggedUser$;
    this.chatMessages$ = chatSrv.loggedUserConversations$.pipe(
      map((convs) => convs.filter((i) => i.messages.length > 0).length)
    );
    this.menuItems = [
      { routerLink: 'wall', label: 'Wall', icon: 'home', badge: of(0) },
      { routerLink: 'friends', label: 'Friends', icon: 'user', badge: of(1) },
      {
        routerLink: 'chat',
        label: 'Chats',
        icon: 'message',
        badge: this.chatMessages$,
      },
      { routerLink: 'teams', label: 'Teams', icon: 'team', badge: of(0) },
      {
        routerLink: 'login/logout',
        label: 'Logout',
        icon: 'logout',
        badge: of(0),
      },
    ];
  }
}
