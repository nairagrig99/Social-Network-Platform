import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "@auth/service/auth.service";
import {Router} from "@angular/router";
import {AuthUserInterface} from "@auth/interface/auth-user.interface";
import {ToggleStateService} from "@app/core/service/toggle-state.service";
import {ToggleStateEnum} from "@app/shared/enums/toogle-state.enum";
import {BehaviorSubject, Observable} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  animations: [
    trigger('toggleSettings',
      [
        state('open',
          style({
            position: 'absolute',
            width: '171px',
            height: '162px',
            backgroundColor: ' #D9BA70',
            right: '10px',
            borderRadius: '10px',
            display: 'block'
          })),
        state('close',
          style({
            display: 'none'
          })
        ),
        transition('close<=>open', animate('0ms  ease-in'))
      ]
    )
  ]
})
export class UserProfileComponent implements OnInit {

  @Input() isShowName: boolean = false;

  private toggleStateEnum = ToggleStateEnum;
  public userInfo!: AuthUserInterface;

  public toggleState$: BehaviorSubject<string> = new BehaviorSubject<string>(this.toggleStateEnum.CLOSE);

  constructor(private store: AuthService,
              private router: Router,
              private toggleStateService: ToggleStateService) {
  }

  ngOnInit(): void {
    this.userInfo = this.store.getSignInUser();
  }

  public logOut() {
    this.router.navigate(['auth/login']).then(() => this.store.logOutUser())
  }

  public openUserSettings(): void {
    this.toggleState$.next(this.toggleStateService.changeStateOfElement(this.toggleState$.getValue()))
  }

}
