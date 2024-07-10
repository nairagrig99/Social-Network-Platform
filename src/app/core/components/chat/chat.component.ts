import {Component, Input, OnInit} from '@angular/core';
import {AuthUserInterface} from "@auth/interface/auth-user.interface";
import {SvgIcon} from "@app/shared/input-calendar/input-calendar-window/base-mixin";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent extends SvgIcon(class {
}) implements OnInit {
  @Input() userInfo!: AuthUserInterface;
  @Input() allUsersList!: AuthUserInterface[];
  public isChatOpen: boolean = false;
  public isNotificationChatOpen: boolean = false;
  public selectedUserForCommunication!: AuthUserInterface;

  constructor() {
    super();
    this.svgIconShow('chat');
  }

  public openChat(): void {
    this.isNotificationChatOpen = !this.isNotificationChatOpen;
  }

  public communicateWithUser(user: AuthUserInterface) {
    this.selectedUserForCommunication = user;
    this.isChatOpen = !this.isChatOpen;
  }

  ngOnInit(): void {
    this.allUsersList = this.allUsersList.filter((user) => user.id !== this.userInfo.id)
  }
}
