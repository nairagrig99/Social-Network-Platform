import {Component, OnInit} from '@angular/core';
import {SvgIcon} from "@app/shared/input-calendar/input-calendar-window/base-mixin";
import {Router} from "@angular/router";
import {AuthService} from "@auth/service/auth.service";
import {NavigationStateInterface} from "@main/interface/navigation-state-interface";
import {WebsocketService} from "@app/core/components/notification/web-socket-service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent extends SvgIcon(class {
}) implements OnInit {

  public inputValue!: string;
  public searchList!: any;

  constructor(private router: Router,
              private store: AuthService,
              private websocketService: WebsocketService) {
    super();
    this.initState();
    this.svgIconShow('search');
  }

  ngOnInit(): void {
    this.search();
  }

  private initState(): void {
    const state = this.router.getCurrentNavigation()?.extras.state as NavigationStateInterface;
    this.inputValue = state?.search;
  }

  public search(): void {

    if (this.inputValue?.length) {
      const trimValue = this.inputValue.replace(" ", "")

      this.searchList = this.store.getAllUserListFromLocaleToStorage().filter((user) => {

        const trimUserName = user.name.concat(user.surname);
        const trimUserSurname = user.surname.concat(user.name);

        return user.name.toLowerCase().includes(this.inputValue)
          || user.surname.toLowerCase().includes(this.inputValue)
          || trimUserName.toLowerCase().includes(trimValue)
          || trimUserSurname.toLowerCase().includes(trimValue);
      });
    }
  }

  sendFriendRequest(userId: number): void {
    const request = {
      type: 'friend-request',
      senderName: this.store.getSignInUser().name,
      recipientId: userId
    };
    this.websocketService.sendMessage(request);
  }
}

