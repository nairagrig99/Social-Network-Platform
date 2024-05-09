import {Component, Input} from '@angular/core';
import {AuthUserInterface} from "@auth/interface/auth-user.interface";
import {SvgIcon} from "@app/shared/input-calendar/input-calendar-window/base-mixin";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent extends SvgIcon(class {
}) {
  @Input() userInfo!: AuthUserInterface;
  constructor() {
    super();
    this.svgIconShow('chat')
  }

}
