import {Component, Input} from '@angular/core';
import {AuthUserInterface} from "@auth/interface/auth-user.interface";
import {SvgIcon} from "@app/shared/input-calendar/input-calendar-window/base-mixin";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent extends SvgIcon(class  {

}){
  @Input() userInfo!: AuthUserInterface;
  constructor() {
    super();
    this.svgIconShow('notification')
  }
}
