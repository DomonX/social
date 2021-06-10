import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public menuItems: {
    routerLink: string;
    label: string;
    icon: string;
    badge: number;
  }[] = [];

  isCollapsed = false;

  constructor() {
    this.menuItems = [
      { routerLink: "wall", label: "Wall", icon: "home", badge: 0 },
      { routerLink: "friends", label: "Friends", icon: "user", badge: 1 },
      { routerLink: "chat", label: "Chats", icon: "message", badge: 17 },
      { routerLink: "teams", label: "Teams", icon: "team", badge: 0 },
      { routerLink: "login/logout", label: "Logout", icon: "logout", badge: 0 }
    ];
  }
}
