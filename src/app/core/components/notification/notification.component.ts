import {Component, Input} from '@angular/core';
import {AuthUserInterface} from "@auth/interface/auth-user.interface";
import {SvgIcon} from "@app/shared/input-calendar/input-calendar-window/base-mixin";
import {WebsocketService} from "@app/core/components/notification/web-socket-service";
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";
import {KeyInterface} from "@app/shared/interface/key-interface";
import {AuthService} from "@auth/service/auth.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent extends SvgIcon(class {

}) {
  @Input() userInfo!: AuthUserInterface;

  constructor(private websocketService: WebsocketService,
              private localService: AuthService) {
    super();
    this.svgIconShow('notification');
  }

  public notification$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  ngOnInit() {
    // this.websocketService.connect(this.userInfo.id);
    const signInUser = this.localService.getSignInUser();

    // this.localService.getAllUserListFromLocaleToStorage().map((userList) => {
    //   userList.notifications?.splice(0, userList.notifications?.length)
    //   this.localService.updateSignInUserAndSameUserFromAllUserList(userList);
    // });

    if (signInUser.notifications?.length) {
      this.notification$.next(signInUser.notifications);
    }

    // this.websocketService.getMessages().subscribe(message => {
    //
    //   if (message.type === 'notification') {
    //     const currentNotification = this.notification$.getValue();
    //
    //     currentNotification.push(message.message);
    //     this.notification$.next(currentNotification);
    //
    //     if (!Array.isArray(signInUser.notifications)) {
    //       signInUser.notifications = [];
    //     }
    //
    //     signInUser.notifications = [
    //       ...signInUser.notifications,
    //       message
    //     ];
    //
    //     this.localService.updateSignInUserAndSameUserFromAllUserList(signInUser);
    //   }
    // });

  }
}
